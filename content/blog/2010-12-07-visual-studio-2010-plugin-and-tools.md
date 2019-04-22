---
title: Visual Studio 2010 plugin and tools
date: 2010-12-07 00:00:00 Z
permalink: "/tools/visual-studio-2010-plugin-and-tools/"
tags:
- tools
Published: 2010-12-07 00:00:00 Z
author: Chris S
description: A long list of Visual Studio 2008/2010 plugins and productivity tools. Since
  the extension manager arrived in 2010, the plugins on the list are a bit redundant.
layout: post
dsq_thread_id:
- 1085017567
---

This is nothing more than a list of plugins and tools that I use with Visual Studio, so I can remember where to get them each time I flatten Windows. Most of these work with 2005 also.

<!--more-->

  * [Ghostdoc][1] - autodocuments for you.
  * [Sourceoutliner][2] - your current class' members ala the classview.
  * [Powercommands][3] - lots of new context menu options
  * [Coderush][4] - free version with some useful extra refactor tools
  * [Pex][5] - automates creating unit tests, sort of
  * [Snipper][6] - the tool I wrote for editing snippets
  * [Slashdocs][7] - extracts XML comments into a separate file from the source.
  * [JSLint compiler][8] - runs all .js files in your project through JSLint during compilation.

And the others below are fairly standard tools:

  * [SQL Server Dumper][9]
  * [Everything][10]
  * [Metapad][11]
  * [Snippet Compiler][12]
  * [JQuery API][13]
  * [Process Explorer][14]
  * [Expresso Regex Tester][15] - free registration needed
  * [7zip][16]
  * [Virtual clone drive][17]
  * [SpecQ][18] - ditch calc.exe and use this, it works like notepad.

### A decent tool for merges in Visual Studio 2008/2010

For diffing and merging, by far the best tool in my view is [DiffMerge][19], a free tool by SourceGear. You can configure it to work with Visual Studio by going to Tools:Options:Source Control:VSTFS:Configure User tools.

From there, add these options for merge:

  * Extension: .*
  * Operation: Merge
  * Command: C:\Program Files\SourceGear\DiffMerge\DiffMerge.exe
  * Argument: /m /r=%4 /t1=%7 /t2=%9 /t3=%6 /c=%9 %2 %3 %1

and these options for compare:

  * Extension: .*
  * Operation: Compare
  * Command: C:\Program Files\SourceGear\DiffMerge\DiffMerge.exe
  * Argument: /t1=%6 /t2=%7 %1 %2

### Snippets

Here's a few snippets I use a lot, in zipped format. Stick them in your C:\Users\USERNAME\Documents\Visual Studio 2008\Code Snippets\Visual C#\My Code Snippetsfolder

[Snippets.zip][20]

  * aa: Assert.AreEqual(o,o);
  * cr: Console.Readline()
  * docctor: creates a constructor with MSDN format documentation. Made slightly redundant by Ghostdoc.
  * doceq: creates Equals, ToString, GetHashCode with MSDN format documentation.
  * eqsummary: creates Equals summary XML documentation in MSDN format.
  * docevent: creates an Event and the raising method with MSDN format documentation.
  * docgethashcode: MSDN format documentation for GetHashCode()
  * doctostring: MSDN format documentation for ToString()
  * propgg: getter property with a backing field
  * propgs: getter/setter property with a backing field
  * linq: this one is a bit stupid. I often forget the syntax of lambda select statements (I prefer fluent) so this spits out the format.
  * newv: creates MyObject obj = new MyObject() where you enter the type and variable name.
  * nullcheck: throws an ArgumentException if an argument is null
  * snull: string.IsNullOrEmpty() snippet
  * snullex: throws an ArgumentException if a string argument is null
  * t3: sticks 3 lines of comments which I sometimes use when I have to write large sections of code in 1 method, and want to delimit them without regions. This was inspired by some C source some time ago but I should probably change this to /\* and \*/

And a [dependency project snippet][21] for Silverlight, which saves many hours of typing.

For Eclipse and Java/Android developer, [here is a settings file][22] that takes the standard Visual Studio 2010 code color scheme for your text editor, and also binds F5/F6 to debug/compile.

 [1]: http://www.roland-weigelt.de/ghostdoc/
 [2]: http://www.codeplex.com/SourceCodeOutliner
 [3]: http://code.msdn.microsoft.com/PowerCommands
 [4]: http://msdn.microsoft.com/en-us/vcsharp/dd218053.aspx
 [5]: http://research.microsoft.com/en-us/projects/Pex/
 [6]: /assets/2013/02/Snipper1.zip
 [7]: http://blog.scott.willeke.com/2008/05/slashdocs-c-xml-comment-add-in-updated.html
 [8]: http://www.codeproject.com/KB/macros/JSLintVS.aspx
 [9]: http://www.ruizata.com/
 [10]: http://www.voidtools.com/
 [11]: http://liquidninja.com/metapad/download.html
 [12]: http://www.sliver.com/dotnet/SnippetCompiler/
 [13]: http://api.jquery.com/
 [14]: http://technet.microsoft.com/en-us/sysinternals/bb896653.aspx
 [15]: http://www.ultrapico.com/Expresso.htm
 [16]: http://www.7-zip.org/
 [17]: http://www.slysoft.com/en/virtual-clonedrive.html
 [18]: http://www.speqmath.com/index.php?id=4
 [19]: http://www.sourcegear.com/diffmerge/
 [20]: /assets/2013/02/snippets.zip
 [21]: /assets/2013/02/Dependency-property.zip
 [22]: /?p=924