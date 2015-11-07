---
Published: 2010-04-16
title: "Listing Windows users and groups in C#"
author: Chris S
excerpt: "One method of listing Windows users and groups in C#."
layout: post
permalink: /csharp/listing-windows-users-and-groups-in-c/
dsq_thread_id:
  - 1083214265
tags:
  - 'c#'
---
This example is borrowed from a newsgroup post, apologies to whoever should take the credit but I lost the original url. It's a basic console application that prints out access lists and groups lists using WMI for the windows directory.

<!--more-->

If you'd rather use the System.DirectoryServices namespace then there is a good example in [the roadkill source][1].

<script src="https://gist.github.com/yetanotherchris/4953130.js"></script>

 [1]: http://www.bitbucket.org/yetanotherchris/roadkill/src/4b864a2a214f/Roadkill.Core/Domain/Managers/Security/ActiveDirectoryUserManager.cs