---
Published: 2012-03-16
title: "TFS tip of the day - cloning an existing workspace"
author: Chris S
layout: post
permalink: /tfs/tfs-tip-of-the-day-cloning-an-existing-workspace/
dsq_thread_id:
  - 1074299854
tags:
  - tfs
---
Open visual studio command line prompt, and type:

<pre>tf workspace /new /template:EXISTINGWORKSPACE;username NEWWORKSPACE</pre>