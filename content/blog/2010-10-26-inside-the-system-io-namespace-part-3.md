---
title: Inside The System.IO Namespace Part 3
date: 2010-10-26 00:00:00 Z
permalink: "/net/inside-the-systemio-namespace-part-3/"
tags:
- ".net"
Published: 2010-10-26 00:00:00 Z
author: Chris S
description: The final part to a series of posts looking at the System.IO namespace.
layout: post
dsq_thread_id:
- 1077684547
---

  * [Part 1][1]
  * [Part 2][2]
  * Part 3

### Flushing your Streams

Flush is available in all Stream and Writer classes. Quite often it's essential that you Flush() before you read back, otherwise the data you have previously written to the stream doesn't get written to the Stream's buffer. A good example of this is the NetworkStream example further down. 

<!--more-->

On the following Stream or Writer classes, Flush performs the following actions:

  * StreamWriter - Calls write if necessary on the stream, and then flush on the stream.
  * TextWriter - Does nothing
  * StringWriter - Does nothing
  * BinaryWriter - Calls flush on the stream
  * Stream - Abstract method
  * BufferedStream - Calls write or read, depending on the current write position. Write actually calls Write and then Flush on the underlying stream, while reed seeks to the end of the stream.
  * NetworkStream - Does nothing
  * FileStream - Does a lot!
  * MemoryStream - Does nothing

### Manipulating Streams - the Reader/Writer helper classes

On first glance there seem to be a lot of different ways of doing the same thing with reading and writing inside the IO namespace in .NET. Writing and reading from a Stream object can be done with any of the classes in the image below.

![Reader Writer][3]

The class hierarchy can infact be simplified into just 2 types of classes: BinaryReader/Writer and TextReader/Writer and their derived classes.

### BinaryReader/BinaryWriter

The BinaryReader/Writer classes are intended for writing simple types to files. The classes support bool,float,integerss,strings and more along the same kind of lines as the Java DataInputStream and DataOutputStream classes. They support different encoding types. You might be mistaken for thinking they are intended for writing and reading data in as bytes, however this is generally the jobs of the StreamReader/Writer classes (or just raw manipulation of the Stream itself).

### BinaryWriter

BinaryWriter has 4 methods:Close,Flush,Seek,Write and a BaseStream property for the stream it's writing to. It implements IDisposable so can be wrapped inside a using() clause just like the Stream classes could, which it most usually will be.

#### Strings

The BinaryWriter writes a string using the encoding you specify in the constructor, or the default encoding (Windows 1252 for most Western users as mentioned above). How does it know where to read to? It prepends the string length and then the string itself. For example:

<pre>writer.Write( "Hello world" );
</pre>

This comes out as

<pre>0b 48 65 6c 6c 6f 20 77 6f 72 6c 64
</pre>

So 0b (11) is the length of &#8220;Hello world&#8221; followed by the string. If you have written a different format such an integer and then read it back in, it will just try to read this back using the symbol table for the encoding you have. For example:

<pre>writer.Write( "Hello world" );
writer.Write( (byte) 11 );
writer.Write( "Hello world" );
</pre>

will come back as two strings: &#8220;Hello world&#8221; and &#8220;vHello worl&#8221;. Changing the line (byte) 11 to (byte) 255 gets you an EndOfStreamException.

#### Ints

<pre>//
// Ints
//
// Uses 4 bytes to write each int
writer.Write(1); // 01
writer.Write(10); // 0a
writer.Write(100); // 64
writer.Write(1000); // 3e8
writer.Write(10000); // 2710
//writer.Write(123456789); // 75BCD15
</pre>

The above is displayed as:

<pre>01 00 00 00 0a 00 00 00 64 00 00 00 e8 03 00 00 10 27 00 00 15 cd 5b 07
</pre>

The output is Little Endian Format, which puts the Least Significant Bit (LSB) first, or in other words the digits are read right to left. As you can see ints are 0 zero padded and assumed to be 32bit integers rather than scaling it up and down according to the number (e.g. only using 1 byte for the 1, 10, 100, 1000, 10000).

If you want to write integers/floats out using Big Endian, Jon Skeet has written a utility for doing so [here][4].

#### Bools

<pre>// Boolean
writer.Write(true);
writer.Write(false);
</pre>

Bools are written as 1 byte integers of value 1 or 0. This appears to waste space, but makes sense as the Reader would be unable to tell whether something like 10000000 (8 bits) was  
true,false,false,false,false,false,false,false, i.e. 8 bool values, or just 1 true value and 7 empty values.

#### Small ints

<pre>// Small int
writer.Write((Int16) 100);
Small int only uses 2 bytes, so the above is written as (padded zeros)0x6400
</pre>

#### Floats

Looking at the source code of BinaryWriter, floats (single) are written the following way using unsafe code:

<pre>uint num = *((uint*) &value);
this._buffer[0] = (byte) num;
this._buffer[1] = (byte) (num &gt;&gt; 8);
this._buffer[2] = (byte) (num &gt;&gt; 0x10);
this._buffer[3] = (byte) (num &gt;&gt; 0x18);
this.OutStream.Write(this._buffer, 0, 4);
</pre>

This is takes value (a float) and dereferences it, getting the memory address's contents which is a hexadecimal.

So for 0.01f you get 0x3c23d70a.

The lines that follow split this value into its 4 byte parts, the first is the last byte (0a - conversion to a byte drops the other 3 bytes). It then extracts d7 by bit shifting to the right by 8 bits, and then again by 16 bits, and finally 24 bits.

Writing a double uses a similar technique too. If you're curious how 0.01 came to be represented as 0x3c23d70a, take a look at this tool to see how IEEE-754 floating point numbers (single/double value types) are stored in memory in the CLR. 1 bit is used for the sign, 8 bits for the exponent, and the remaining 23 bits (for single precion/float) for the mantissa or significand.

### BinaryReader

This is a straight forward case of reading back the values you've written. If you try to replace int32 values with int16 it reads them back as 0. The same applies for bool values, which takes the byte and converts from there. It is a forward only reader. You can optionally just read the entire byte stream back as shown in the comments below, and then process as you want, but this is suited for a stream that you didn't write or know the format of.

<pre>using (FileStream stream = new FileStream(@"c:binarywriter.dat", FileMode.Open))
{
	BinaryReader reader = new BinaryReader(stream);

	//byte[] b = reader.ReadBytes( (int) stream.Length );
	int i = reader.ReadInt32();
	i = reader.ReadInt32();
	i = reader.ReadInt32();
	i = reader.ReadInt32();
	i = reader.ReadInt32();
	i = reader.ReadInt32();
	reader.Close();
}
</pre>

### TextReader/TextWriter

The abstract TextReader and TextWriter are the basis for the StreamReader/Writer and StringReader/Writer classes. These 4 classes are geared towards reading/writing text, as the base classes imply.

TextReader supplies the following methods

  * Close
  * Peek
  * Read
  * ReadBlock
  * ReadLine
  * ReadToEnd

TextWriter provides:

  * Close
  * Flush
  * Write
  * WriteLine

Anyone that has written custom server controls will be familiar with the TextWriter as the HttpTextWriter is derived from it.

### StringWriter

StringWriter uses a StringBuilder to write strings in a very similar way to StringBuilder, but obviously without being able to read back (it actually uses a StringBuilder behind the scenes). A common use is with the XmlTextReader in the System.XML namespace, which takes a StringWriter in one of its constructors. This is the easiest way of writing XML in memory without worrying about using MemoryStreams.

Under the hood the StringWriter really doesn't do anything more complex than stringBuilder.Append() using the StringBuilder you provide. From TextWriter, it provides a large set of Write() overloads that take various .NET value types, converting them to their string equivalent.

<pre>StringBuilder builder = new StringBuilder();
using (StringWriter writer = new StringWriter(builder))
{
	writer.Write(true);
	writer.Write(12345);
	writer.Write((byte) 0x0a);
	writer.WriteLine("A line of text");
}

Console.WriteLine(builder.ToString());
</pre>

### StringReader

StringReader takes a string for its constructor and then allows you to read from the string using the methods the TextReader base class hands to it. It doesn't add any new methods from the base class. Behind the scenes, the to ReadToEnd() simply returns the string, or does a substring if you are advanced pass position zero. It tracks the position you're at in the character array for this. For to ReadLine() it checks (hardcodes infact) for r and then n and returns the previous line it captured.

<pre>// The \r\n should be replaced Environment.NewLine, although \r and \n is hardcoded
// into the StringReader source.
string s = "A line of text\r\nAnother line";
using (StringReader reader = new StringReader(s))
{
	char next = (char)reader.Peek(); // 65 or A
	reader.Read();
	char[] line = new char[5];
			
	// Set the line variable to contain ' line'.
	// N.B. the index argument is based on the current pointer position not the
	// string as a whole.
	reader.ReadBlock(line, 0, 5);
	Console.WriteLine(line);
	Console.WriteLine(reader.ReadLine());
		
	// ReadLine() has advanced the internal pointer to 'A' from 'Another'.
	reader.Read();
	reader.Read();
	reader.Read();
	Console.WriteLine(reader.ReadToEnd());
}
</pre>

The output from the above is:

<pre>line
 of text
ther line
</pre>

### StreamReader

StreamReader as the name implies, reads streams. However its purpose is to read text-based streams rather than binary ones, which is why it's derived from TextReader. It doesn't add any new methods from TextReader, although it does give you 3 new properties: BaseStream,CurrentEncoding,EndOfStream. It defaults to UT8 if no encoding is set.

The ReadToEnd() method uses a StringBuilder internally to read through the backing string. ReadLine() is just like the StringReader class's implementation, but using a StringBuilder rather than a string to build up the string.

<pre>Stream stream = File.Open(@"c:INSTALL.LOG", FileMode.Open);
using (StreamReader reader = new StreamReader(stream))
{
	// Read character by character
	StringBuilder builder = new StringBuilder();
	while (!reader.EndOfStream)
	{
		builder.Append((char)reader.Read());
	}
	Console.WriteLine(builder.ToString());
}

// 0x0A86 is '?' in Unicode (Gujarati AA).
// Casting it to 2 bytes makes it useable as Unicode.
// This could be removed if we wanted and stick to UTF32
byte[] buffer = BitConverter.GetBytes((Int16)0x0A86);
MemoryStream stream2 = new MemoryStream(buffer);
using (StreamReader reader = new StreamReader(stream2, Encoding.Unicode))
{
	string contents = reader.ReadToEnd();
}

// For NetworkStream, see the other example
// BufferedStream offers no performance benefit so isn't shown
</pre>

Below is the example which featured in the NetworkStream section, this time using a StreamReader (and Writer) and also a different URL that returns more (HTML) textual data.

<pre>string host = "codeproject.com";
string page = "/KB/scripting/HTMLFixedHeaders.aspx";
TcpClient tcp = new TcpClient();
tcp.Connect( host, 80 );
NetworkStream stream = tcp.GetStream();

// Send a HTTP request
byte[] data = Encoding.Unicode.GetBytes( string.Format( "GET {0} HTTP/1.0{1}{1}", page, "rn" ) );

// Make sure you flush or it isn't written out
StreamWriter writer = new StreamWriter( stream );
stream.Write(data, 0, data.Length );
writer.Flush();
string s = "";
using (StreamReader reader = new StreamReader(stream) )
{
	s = reader.ReadToEnd();
}
using (writer = new StreamWriter( @"c:out.html" ) )
	writer.Write(s);
</pre>

## StreamWriter

The StreamWriter does the text equivalent of the BinaryWriter, writing various datatypes to the stream you give it, but as plaintext rather than a byte representation like the BinaryWriter does. The example below illustrates how it's used to write both plain text, and how it translates to a byte array with MemoryStream.

<pre>public static void StreamWriterTest()
{
	// Basic test
	using ( StreamWriter writer = new StreamWriter(@"c:streamwriter.dat") )
	{
		writer.Write(true);
		writer.Write(1234);
		writer.Write("A string");
		writer.WriteLine("A whole line of text!");
		writer.WriteLine(1234);
	}
	
	// Output:
	//
	// True1234A stringA whole line of text!
	// 1234
	//
	//
	// Test with MemoryStream
	MemoryStream memoryStream = new MemoryStream( 8 );
	using ( StreamWriter writer = new StreamWriter(memoryStream) )
	{
		writer.Write( "1234" );
	}

	// This only returns the amount of bytes in the MemoryStream (4 bytes), not the capacity (8 bytes)
	byte[] buffer = memoryStream.ToArray();

	//
	// Output of buffer with default encoding:
	// 49,50,51,52
	// e.g. The ascii equivalent of those numbers.
	//
	// With unicode it's a 10 byte array, first two are 254,255 (not sure what this is),
	// followed by 49,0,50,0,51,0,52,0
}
</pre>

## Closing writers and streams

All of the classes mentioned in this article (except File of course) implement IDisposable. This allows you to wrap them in the using() clause which ensures they are efficiently disposed and collected by the GC.

In dealing with the streams and the helper classes this way, you don't need to worry about calling Close, as the Dipose() methods do this for you, either directly on the stream or on the underlying stream in the case of the reader/writer helpers.

## System.IO and System.XML

The commonest use inside the framework class library for the stream read/writers is inside the System.XML namespace. The XmlTextReader and XmlReader classes both take a TextReader (the latter in its constructor, former in the static Create method).

## IO Exception handling

The IO exception hierachy (below) is fairly straight forward, with specialized classes for catching specific errors like the common error of not finding the file.

![IO Exceptions][5]

With several of the IO classes like FileStream you will need to nest catching to gracefully close the stream, for example 

<pre>try
{
	// Open a file
	try
	{
		// read the stream
	}
	catch (EndOfStreamException e)
	{
		// close the stream here
	}
}
catch (FileNotFoundException e)
{
}
</pre>

Of course you could catch the whole lot in an IOException, but this is widely accept as a bad practice in exception handling; you should only catch what you are expecting to fail, leave the rest to the caller, or a more generic exception handler such as Application.ThreadException in windows forms app.

Other exceptions you need to watch out for when performing IO operations, that don't inherit from IOException:

### System.UnauthorizedAccessException.

One scenario this can happen is if you try to open a file that is readonly, and want to write to it. File.Open does this when you don't set the FileAccess.Read as a parameter, as it sets the FileStream to FileAccess.ReadWrite. 

> {&#8220;The process cannot access the file &#8216;C:xxx' because it is being used by another process.&#8221;} 

These errors occur when something else is opening and using your file. They throw an IOException rather than an UnauthorizedAccessException. 

### System.NotSupportedException.

This can occur if you try to Write() to a stream that has been opened with read access only.

### System.ArgumentException.

This is thrown if you try to read from a stream at a point that doesn't exist in it, the &#8220;offset and length were out of bounds&#8221; error.

### System.OutOfMemoryException.

Reading very large files (eg dvd-size) or buggy in-memory manipulation with MemoryStreams can be culprits for this. Test it for yourself using:

<pre>byte[] b = new byte[int.MaxValue];</pre>

 [1]: /net/inside-the-systemio-namespace-part-1
 [2]: /net/inside-the-systemio-namespace-part-2
 [3]: /assets/2010/10/readerwriter.gif
 [4]: http://www.yoda.arachsys.com/csharp/miscutil/
 [5]: /assets/2010/10/ioexception.gif