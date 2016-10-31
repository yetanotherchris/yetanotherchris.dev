---
title: Pronounceable password generator
date: 2009-03-15 00:00:00 Z
permalink: "/csharp/pronounceable-password-generator/"
tags:
- c#
Published: 2009-03-15 00:00:00 Z
author: Chris S
excerpt: A c# password generator which creates both random alpha-numeric and the more
  useful prounceable passwords.
layout: post
dsq_thread_id:
- 1074276890
---

This is the source code for the pronounceable generator from the [password generator page][1]. The alpha-numeric password generator is very simple and doesn't do anything complicated besides generate a random MD5 hash and truncate the output.

The pronounceable password generator is more complex. It is originally from [this Java source][2], which I converted over to C#. Pronounceable passwords are intended to be safe from dictionary attacks but comprise of words very similar to English words, making them memorable. Adding several numbers and a non-alphanumeric digit is recommended to strengthen them even further.

<!--more-->

### Pronounceable password generator source

<script src="https://gist.github.com/yetanotherchris/4746867.js"></script>

 [1]: /csharp/password-generator/
 [2]: http://www.multicians.org/thvv/gpw.html
