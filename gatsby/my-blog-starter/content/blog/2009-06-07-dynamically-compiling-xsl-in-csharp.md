---
title: Dynamically compiling XSL in C#
date: 2009-06-07 00:00:00 Z
permalink: "/csharp/dynamically-compiling-xsl-in-csharp/"
tags:
- c#
- xml
Published: 2009-06-07 00:00:00 Z
author: Chris S
excerpt: This post shows an alternative to using XSLTC.exe to compile XSL, when the
  XSLT you're using is dynamically generated from the database.
layout: post
dsq_thread_id:
- 1069177988
---

If you use XSL extensively in any .NET applications then you will probably find yourself encountering performance issues with your XSL in an ASP.NET environment. This can either come from customscripts (which are recompiled into a new assembly each time the XSL is transformed) or simply because the XSLCompiledTransform class has to create its assembly from fresh each time your page or resource is accessed. It not so much of a problem for windows forms or other types of application that sit in memory and don't die after a page request, but for ASP.NET it's a big issue, and as I found out a memory hog.

<!--more-->

The XslCompiledTransform class turns your XSL into a .NET assembly, turning the XSL into a tree using a XmlWriter under the hood and a few other techniques - if you look at a compiled output you can see what is going on. To avoid it doing this re-compilation everytime, you have the option to compile the XSL into an assembly, and simply load this assembly (which is loaded once) rather than recompiling each time.

There's a tool for doing this already called XSLTC.exe. This is fine for applications that have static XSL however if you are retrieving your XSL from a database then running this over the command line at the start of your ASP.NET application is a pain, and also brings up security issues. This is where the XslCompiler class comes in. It does pretty much the same thing as XSLTC, except you can use it inside your code. You specify where the Assembly is outputted to, and it can compile multiple XSL files into one assembly. Portions of it are based on the dissasembled source of XSLTC (via reflector).

<!--more-->

  
`gist:yetanotherchris/4746998`