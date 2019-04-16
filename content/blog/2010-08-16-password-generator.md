---
title: Password Generator
date: 2010-08-16 00:00:00 Z
permalink: "/csharp/password-generator/"
tags:
- c#
- password-generator
Published: 2010-08-16 00:00:00 Z
author: Chris S
description: This Silverlight-based tool produces either prounceable or alphanumeric passwords
  of the length you want, and quantity.
layout: post
dsq_thread_id:
- 1084093463
---

Update: It's 2015 and no browser supports Silverlight anymore (good riddance). Feel free to compile the source and turn it into a console app.

This Silverlight-based tool produces either prounceable or alphanumeric passwords of the length you want, and quantity. 

Alphanumeric passwords are mixed case passwords in the form of something like &#8220;B3Bf0f42F4&#8221;. The generator performs an MD5 hash on a random number.

<!--more-->

Prounceable passwords tend to be more useful for password rotation as they are memorable, so people will be less inclined to write them down. Examples include words like &#8220;llantedynd&#8221; (ok not so prounceable unless you're Welsh), &#8220;cardellelt&#8221;, &#8220;flotshrous&#8221;. Combining the output with additional numbers and and none alphanumeric characters helps the password strength. 

The password generator classes are available to download [here][1].

<div id="silverlightControlHost" style="width:400px; height:320px;">
</div>

 [1]: /csharp/pronounceable-password-generator/
