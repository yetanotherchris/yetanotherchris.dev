---
title: 6 ways to get the current directory in C#
date: 2010-08-17 00:00:00 Z
permalink: "/csharp/6-ways-to-get-the-current-directory-in-csharp/"
tags:
- csharp
Published: 2010-08-17 00:00:00 Z
author: Chris S
description: Different approaches to getting the assembly or application's current directory
layout: post
dsq_thread_id:
- 4207229875
---

*Small update: added the dotnet core way of doing things (Directory.GetCurrentDirectory())*

### System.AppContext.BaseDirectory
This is the prefered replacement for AppDomain.CurrentDomain.BaseDirectory in .net core beta (at least until the API appears for AppDomain, if it ever will).

### AppDomain.CurrentDomain.BaseDirectory

This is the best option all round. It will give you the base directory for class libraries, including those in ASP.NET applications.

<!--more-->

### Directory.GetCurrentDirectory()

Note: in .NET Core this is the current best practice. The details below relate to the .NET Framework 4.5 and below.

This does an interop call using the winapi GetCurrentDirectory call inside kernel32.dll, which means the launching process' folder will often be returned. Also as the MSDN documents say, it's not guaranteed to work on mobile devices.

### Environment.CurrentDirectory

This simply calls Directory.GetCurrentDirectory()

### Assembly.Location

This would be called using

<pre>this.GetType().Assembly.Location</pre>

This returns the full path to the calling assembly, including the assembly name itself. If you are calling a separate class library, then its base directory will be returned, such &#8220;C:\myassembly.dll&#8221; - depending obviously on which Assembly instance is being used.

### Application.StartupPath

This is inside the System.Windows.Forms namespace, so is typically used in window forms application only. 

### Application.ExecutablePath

The same as Application.StartupPath, however this also includes the application name, such as &#8220;myapp.exe&#8221;
