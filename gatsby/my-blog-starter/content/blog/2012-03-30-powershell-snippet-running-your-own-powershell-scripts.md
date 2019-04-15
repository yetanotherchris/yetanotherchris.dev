---
title: 'Powershell snippet: running your own Powershell scripts'
date: 2012-03-30 00:00:00 Z
permalink: "/tools/powershell-snippet-running-your-own-powershell-scripts/"
tags:
- tools
Published: 2012-03-30 00:00:00 Z
author: Chris S
layout: post
dsq_thread_id:
- 
---

If you try to run your own powershell scripts via the console, they won't be allowed by Powershell by default due to its paranoid security policy. To get around this, open a powershell console as an administrator and type:

<!--more-->

<pre>Set-ExecutionPolicy RemoteSigned</pre>

There are of course security risks to this, which it will prompt you with.