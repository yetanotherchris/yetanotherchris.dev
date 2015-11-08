---
Published: 2009-10-13
title: "Inside The System.IO Namespace Part 1"
author: Chris S
excerpt: "The first in a series of posts looking at Streams,Writers and Readers in System.IO"
layout: post
permalink: /net/inside-the-systemio-namespace-part-1/
dsq_thread_id:
  - 1077675657
tags:
  - .net
---
  * Part 1
  * [Part 2][1]
  * [Part 3][2]

[Download the solution file for the examples below][3]

The System.IO namespace can appear (on the surface) to have a lot of ways of performing the same or very similar tasks. This small article and example code should help to de-mystify it. All of the classes in the System.IO namespace can be found in the mscorlib assembly.

<!--more-->

Microsoft already has a lot of quickstarts on reading and writing files:

#### Basic File I/O

<http://msdn2.microsoft.com/en-us/library/336wast5.aspx>

#### Common IO tasks

<http://msdn2.microsoft.com/en-us/library/ms404278.aspx>

This includes:

  * How to write text to a file
  * Read text from a file
  * Read from a binary file
  * Write to a binary

This article is a more in depth look at the classes of System.IO, but should hopefully also serve as a reference.

The Shared Source Common Language Infrastructure mentioned in this series can be viewed online at Koders.com. It estimates the project cost was $14m and apparently 0.21% of it is Perl! 

### Stream

The MSDN documentation gives you a fair bit of information about the Stream class. The Stream class is essentially your place to store the data you want to read and write to, or a backing store in MSDN parlance. This can be in memory (MemoryStream), a file (FileStream),a zip file (GZipStream) or a remote server (NetworkStream). The base Stream class implements IDisposable which allows it to be wrapped in a using clause. The Dispose method simply calls Close so you don't have to worry about the cleanup (more details on this below).

As Stream is an abstract class so you'll use its derived classes for any functionality, such as a FileStream for dealing with a file.

Stream has the following methods

  * BeginRead
  * BeginWrite
  * Close
  * EndRead
  * EndWrite
  * Flush
  * Read
  * ReadByte
  * Seek
  * SetLength
  * Write
  * WriteByte

The following properties

  * CanRead
  * CanSeek
  * CanTimeout
  * CanWrite
  * Length
  * Position
  * ReadTimeout
  * WriteTimeout

As the MSDN documentation points out, you can perform random access in the Stream class with the Seek() method, but this isn't always possible - the NetworkStream class doesn't allow it as you never have the whole data to deal with, only the current packet or set of packets. Below shows classes that are derived from the Stream class.

![Stream][4]

The classes you will typically deal with on a day to day basis are BufferedStream, FileStream, MemoryStream, NetworkStream. Unless you are dealing with a byte array yourself, using one of the Reader/Writers listed below is the easiest way to use the various Stream classes.

 [1]: /net/inside-the-systemio-namespace-part-2/
 [2]: /net/inside-the-systemio-namespace-part-3/
 [3]: /wp-content/uploads/2013/02/systemiotests.zip
 [4]: /wp-content/uploads/2009/10/stream.gif