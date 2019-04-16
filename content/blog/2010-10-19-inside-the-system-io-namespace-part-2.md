---
title: Inside The System.IO Namespace Part 2
date: 2010-10-19 00:00:00 Z
permalink: "/net/inside-the-systemio-namespace-part-2/"
tags:
- ".net"
Published: 2010-10-19 00:00:00 Z
author: Chris S
description: The second in a series of posts looking at the System.IO namespace.
layout: post
dsq_thread_id:
- 1077686629
---

  * [Part 1][1]
  * Part 2
  * [Part 3][2]

### BufferedStream

This is intended to improve performance of (file) read/write operations by storing the bytes in memory as a cache. The BufferedStream is an example of the Decorator pattern. You wrap a stream inside a BufferedStream in order to benefit from its functionality.

<!--more-->

No new methods or properties can be found in BuffereredStream, however it overrides the Stream class' methods/properties to implement its own cache.

Whilst it's recommended you use a BufferedStream for large files on disk, you can also just set a large buffer on your FileStream and the same benefit will be had. To quote a Microsoft developer who worked on the System.IO namespace:

> &#8220;..there is zero benefit from wrapping a BufferedStream around a FileStream. We copied BufferedStream’s buffering logic into FileStream about 4 years ago to encourage better default performance&#8221; 

When I was writing the file reading logic in Statmagic (an open source project for parsing web log files), my strategy was to use a large buffer and skip using the BufferedStream. I assumed that my application would be running on a server with 4gb+ of SDRAM, or a desktop machine where the size of RAM far exceeds the size of the log file. Of course running it on a mobile device would require a different approach. Many websites have 100mb or GB log files per day but from tests I ran, it tears through even 2gb log files. The default size of the buffer in Statmagic is 16mb, which I got after some experimentation and reading of this discussion. In tests, this runs fine in both the single threaded reads and the multi-threaded reads where more than 1 log file is read at the same time. The single-threaded reads run slightly faster on a SATA (raid0'd) hard drive, though I haven't tried it on a server setup yet.

### FileStream

As the name implies, this is for reading and writing files. Some of the FileStream's functionality is available via the File class (which just uses a FileStream under the hood).

<pre>Stream stream;
stream = new FileStream("file.txt", FileMode.Open);
stream = File.Open("file.txt", FileMode.Open); // this infact simply uses the line above with either FileAccess.Write or FileAccess.ReadWrite,
stream = File.OpenRead("file.txt"); // equivalent to new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read);

// Writing to a FileStream, or reading is dependent on the file type being read.
// Basic text files can be read a number of ways, possibly the easiest is
using ( StreamReader sr = new StreamReader( File.OpenRead() )
{
	string contents = sr.ReadToEnd();
}
</pre>

### NetworkStream

NetworkStream is used for reading binary from a socket typically via UDP or TCP. I spent some of my spare time many years ago writing C# libraries to read UDP packets from game servers for Quake 3, Half Life, Unreal. The main project went the way of a lot OS projects and remained unfinished, however the main bulk of the UDP reading logic was complete. Unfortunately there is no NetworkStream implementation with the UdpClient class that I used, instead you are fed the packet data as a byte array.

The code below is an example of doing a HTTP GET with a NetworkStream. There is of course easier ways of doing this with the WebClient class, but this demonstrates how you might use the NetworkStream class. Attempting to use the Random access methods such as Seek() with the NetworkStream class will throw a NotImplemented exception, as I mentioned above you never have the whole data to work with, so Seek'ing makes no sense.

`gist:yetanotherchris/4964062`

### MemoryStream

The MemoryStream class only adds one new method, WriteTo() which copies the contents of the stream to a new stream and a Capacity property which is the size of the stream in memory.

MemoryStream always deals with a byte array, which means if you want to manipulate string data you'll be working with the Encoding class (or possibly the Convert class too). Once you've create a MemoryStream you can't change its capacity. One gotcha with the class is the Write() method.

<pre>Write(byte[] buffer,offset,length);
</pre>

The offset parameter is actually the offset you want it to start from in your byte array, not the offset in the Stream.

An aside about Encodings and Unicode in .NET  
One thing that can trip you up when reading character streams in .NET is using the wrong encoding to read byte representations of text. This really only happens if you are on a western computer using the default encoding or ascii. Below is some example code, some characters might appear as &#8216;?' in your browser, use a Unicode text editor like Metapad to view the code in or the solution file.

`gist:yetanotherchris/4964045`

### GZipStream/DeflateStream

These were added in .NET 2 to the new System.IO.Compression namespace to provide compression and decompression, in particular with ZIP files. There are no helper readers or writers for the 2 classes, so common tasks like zipping a folder are quite cumbersome. The examples below don't stray much from the MSDN documentation, I've chunked the functionality to make it a bit clearer and concise.

NB The GZipStream doesn't support adding files to an archive, as MSDN states: 

> &#8220;&#8230;however, this class does not inherently provide functionality for adding files to or extracting files from .zip archives&#8221; 

The GZipStream is purely for compressing a stream of bytes, it's not intended to act as a zipping library like the SharpZipLib. 

### Writing

`gist:yetanotherchris/4964019`

 [1]: /net/inside-the-systemio-namespace-part-1
 [2]: /net/inside-the-systemio-namespace-part-3