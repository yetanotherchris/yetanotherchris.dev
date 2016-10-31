---
title: Wake up from Sleep (CreateWaitableTimer) in C#
date: 2009-06-18 00:00:00 Z
permalink: "/csharp/wake-up-from-sleep-createwaitabletimer-in-csharp/"
tags:
- c#
- winforms
Published: 2009-06-18 00:00:00 Z
author: Chris S
excerpt: The code illustrates how to set a timer to wake your computer up having been
  sleep'd. It's tested on Vista and Windows 7 with sleep mode.
layout: post
dsq_thread_id:
- 114268110
---

This code isn't mine, but from a [newsgroup posting][1] on [Eggheadcafe.com][2] by MVP Willy Denoyette (I couldn't find a homepage to link). I'm reposting it here for my own benefit, safe in the knowledge it will never disappear unless my database backup corrupts.

<!--more-->

The code illustrates how to set a timer to wake your computer up having been sleep'd. It's tested on Vista and Windows 7 with sleep mode. I haven't tried it with a laptop or hibernating however.

I'll be making it into a winforms in the future soon, that sits in the system tray - I'll update the page and make a google code project when this is done.

<script src="https://gist.github.com/yetanotherchris/4986402.js"></script>

 [1]: http://www.eggheadcafe.com/conversation.aspx?messageid=31842625&threadid=31842595
 [2]: http://www.eggheadcafe.com