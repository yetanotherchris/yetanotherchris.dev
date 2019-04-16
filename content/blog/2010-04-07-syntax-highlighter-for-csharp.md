---
title: Syntax highlighter for C#
date: 2010-04-07 00:00:00 Z
permalink: "/csharp/syntax-highlighter-for-csharp/"
tags:
- c#
Published: 2010-04-07 00:00:00 Z
author: Chris S
description: This is small class for color coding, syntax highlighting, pretty printing,
  prettifying (any of the above) C# source code. It produces HTML with span tags and
  a css class. It's not perfect and undoubtedly has bugs in it, but on the whole works
layout: post
dsq_thread_id:
- 1083208021
---

This is small class for color coding, syntax highlighting, pretty printing, prettifying (any of the above) C# source code. It produces HTML with span tags and a css class. It's not perfect and undoubtedly has bugs in it, but on the whole works. It was written in a lunchhour and given some spit and polish at night - any suggestions or bugs you find are welcomed.

<!--more-->

The online demo is no longer available, however there is an even better version at [Manoli.net][1]

Here's an overview:

  * It's not a beautifully engineered state machine and does not work for any language or geared for re-use. It has some re-useability through limited inheritence but is mostly aimed at one feature: producing HTML source code of prettified C#.
  * If you want a BNF/state machine based syntax highlighter for ASP.NET the free [Actipro CodeHighlighter][2] is a good choice, and uses ANTLR for its parsing.
  * Uses 4 CSS classes which you can configure through properties: keyword, comment, type, quote
  * Has an option to insert the default Visual Studio colours as a stylesheet. This is true by default.
  * Has the ability to wrap your source in pre tags
  * Has the ability to add keywords via a string List. Comes with a set of default C# ones (and the list is probably missing some keywords)
  * It could quite easily be modified for Java, C and C++.

Bare in mind it's not perfect, and can occasionally get confused. On the whole though I've found it highlights fairly reliably. 

This is how it works. It's fairly simple: 2 methods, the HighlightSource does the hard work. It does the following:

  1. Removes all /**/ comments, inserts a token placeholder, appended with a number. This is done via a regex from website
  2. Removes all quotes and places token placeholders in their place. This isn't done with a regex, it probably can be but I found it easier with simple looping through a char array and some basic state flags
  3. Removes all // comments (including XML documentation ones) and puts a token placeholder in their place.
  4. Highlights types. This is done in 4 regex passes, gradually replacing small variations. The basic rule is space, capital, alphanumeric,space with variations for generics and new instances.
  5. Replaces keywords with some basic string.Replace() calls.
  6. Replaces the token placeholders in 1-3 back, with their CSS.

`gist:yetanotherchris/4953115`

 [1]: http://www.manoli.net/csharpformat/
 [2]: http://www.actiprosoftware.com/Products/DotNet/ASPNET/CodeHighlighter/Default.aspx