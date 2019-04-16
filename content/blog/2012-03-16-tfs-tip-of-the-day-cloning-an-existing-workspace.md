---
title: TFS tip of the day - cloning an existing workspace
date: 2012-03-16 00:00:00 Z
permalink: "/tfs/tfs-tip-of-the-day-cloning-an-existing-workspace/"
tags:
- tfs
Published: 2012-03-16 00:00:00 Z
author: Chris S
layout: post
dsq_thread_id:
- 1074299854
---

Open visual studio command line prompt, and type:

<pre>tf workspace /new /template:EXISTINGWORKSPACE;username NEWWORKSPACE</pre>