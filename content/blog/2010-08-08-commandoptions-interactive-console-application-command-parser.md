---
title: CommandOptions - interactive console application command parser
date: 2010-08-08 00:00:00 Z
permalink: "/csharp/commandoptions-interactive-console-application-command-parser/"
tags:
- csharp
- command-line
Published: 2010-08-08 00:00:00 Z
author: Chris S
description: This is a class based on the Novell Options class for easily parsing commands
  and their arguments for console applications that sit and wait for input. I've tried
  to keep it as elegant the Novel Options class, which is aimed at console applications
  that exit immediately. My adaption is for interactive apps, and restricts you to
  two types of handler methods - no arguments, and an array of strings as params.
layout: post
dsq_thread_id:
- 1084090884
---

This is a class based on the [Novell Options class][1] for easily parsing commands and their arguments for console applications that sit and wait for input. I've tried to keep it as elegant the Novel Options class, which is aimed at console applications that exit immediately. My adaption is for interactive apps, and restricts you to two types of handler methods - no arguments, and an array of strings as params.

The example below should help to illustrate what it does.

<!--more-->

### Example usage

`gist:yetanotherchris/4957373`

### Source

`gist:yetanotherchris/4957349`

 [1]: http://www.ndesk.org/Options