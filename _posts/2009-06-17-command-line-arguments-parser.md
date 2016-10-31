---
title: Command line arguments parser
date: 2009-06-17 00:00:00 Z
permalink: "/csharp/command-line-arguments-parser/"
tags:
- c#
- command-line
Published: 2009-06-17 00:00:00 Z
author: Chris S
excerpt: There are already 2 or 3 command line arguments in C#, two of which are found
  on the codeproject.com website. Both of these didn't match my exact needs so I decided
  to write my own one.
layout: post
dsq_thread_id:
- 1069176934
---

There are already 2 or 3 command line arguments in C#, two of which are found on the codeproject.com website. Both of these didn't match my exact needs so I decided to write my own one.

An updated and more advanced parser can be found in the [CommandOptions class][1].

<!--more-->

*The format is the Unix bash command line format, not the Windows forward slash format.*

The one below doesn't use regular expressions (mostly from realising I could do it faster tokenizing than failing with the regex syntax for hours). It's implemented using a basic state machine, it could probably be improved to use the [State pattern][2], but works fine for now. I haven't researched the optimum way for token parsing, as I'm sure there are proven methods for doing it. If you know any sites or examples of these (Douglas Crokford's JSLint is one example I know), contact me on the contact page.

<!--more-->

Without specifying the args, the class automatically grabs the command line from the System.Environment.CommandLine property, and removes the current process name from this.

**Correct formats it accepts are**:

> -arg=value   
> -arg1=value -arg2=value   
> -arg='my value'   
> -arg=&#8221;my value&#8221;   
> -arg=1,2,3,4 -arg2=another 

**Incorrect formats it won't accept are:**

> -arg1 = value   
> &#8212;arg1=value   
> -arg1 value   
> -arg1 &#8220;value value&#8221; 

Here's the source, with example usage:

<script src="https://gist.github.com/yetanotherchris/4747009.js"></script>

 [1]: /csharp/commandoptions-interactive-console-application-command-parser/
 [2]: /csharp/csharp-design-patterns-the-state-pattern