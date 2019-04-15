---
title: An extension method for converting a byte array to a string (reading its BOM)
date: 2010-07-19 00:00:00 Z
permalink: "/csharp/an-extension-method-for-converting-a-byte-array-to-a-string-reading-its-bom/"
tags:
- c#
Published: 2010-07-19 00:00:00 Z
author: Chris S
excerpt: An extension method that adapts Rick Strahl's code (and the comments too)
  to stop you having to guess or read the byte order mark of a byte array or text
  file each time you convert it to a string.
layout: post
dsq_thread_id:
- 1083980747
---

Below is an extension method that adapts [Rick Strahl's code][1] (and the comments too) to stop you having to guess or read the byte order mark of a byte array or text file each time you convert it to a string.

The commonest way of doing this is usually with 

<pre>byte[] buffer = File.ReadAllBytes(@"C:\file.txt");
System.Text.Encoding.xxx.GetString(buffer)
</pre>

where xxx is Ascii, Unicode, or UTF8, or Default, but the extension method you to simply do

<!--more-->

<pre>byte[] buffer = File.ReadAllBytes(@"C:\file.txt");
string content = buffer.GetString();
</pre>

Here's the method

`gist:yetanotherchris/4956908`

 [1]: http://www.west-wind.com/WebLog/posts/197245.aspx