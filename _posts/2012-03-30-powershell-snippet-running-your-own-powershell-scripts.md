---
Published: 2012-03-30
title: "Powershell snippet: running your own Powershell scripts"
author: Chris S
layout: post
permalink: /tools/powershell-snippet-running-your-own-powershell-scripts/
dsq_thread_id:
  - 
tags:
  - tools
---
If you try to run your own powershell scripts via the console, they won't be allowed by Powershell by default due to its paranoid security policy. To get around this, open a powershell console as an administrator and type:

<!--more-->

<pre>Set-ExecutionPolicy RemoteSigned</pre>

There are of course security risks to this, which it will prompt you with.