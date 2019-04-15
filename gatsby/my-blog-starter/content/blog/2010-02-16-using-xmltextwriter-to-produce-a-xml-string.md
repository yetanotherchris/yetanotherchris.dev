---
title: Using XmlTextWriter to produce a XML string
date: 2010-02-16 00:00:00 Z
permalink: "/csharp/using-xmltextwriter-to-produce-a-xml-string/"
tags:
- c#
- xml
Published: 2010-02-16 00:00:00 Z
author: Chris S
excerpt: This is a small snippet showing an example of using a XmlTextWriter to produce
  Xml that validates.
layout: post
dsq_thread_id:
- 1079916908
---

This is a small snippet showing an example of using a XmlTextWriter to produce Xml that validates.

One point to note is that because .NET strings are held internally as double-byte UTF16, using a StringWriter will always output to UTF16. If you try to force it down, the byte-order of the file will be wrong. Make sure if you're using File.WriteAllText, you use the overloaded version and specify Encoding.Unicode or it will write your string as UTF-8 with not Byte Order Mark. This confuses Visual Studio so that it doesn't open the files correctly.

<!--more-->

Using UTF8 can cause some problems when you store XML inside databases (or specifically SQL Server). Also some XML pads don't like UTF16 so you may need to convert the string to UTF8 for editing if you're only using Western characters, shown in the second method.

`gist:yetanotherchris/4773932`