---
title: TFS Caching work items
date: 2010-11-16 00:00:00 Z
permalink: "/tfs/tfs-caching-work-items/"
tags:
- tfs
Published: 2010-11-16 00:00:00 Z
author: Chris S
layout: post
dsq_thread_id:
- 
---

A few days ago I bulk inserted 1000 work items for one iteration and area. The performance of the main bug list after this wasn’t too bad considering there’s no cache in place in Spruce right now. I’m not planning on putting one in until version 1, unless there is a real need for it. I’m guessing most people will be using it on a local network so the latency shouldn’t be too bad, the TFS api also does a good job caching items itself.

<!--more-->

It should also be pointed out that the software is intended to be used per iteration and area, instead of using a big long list of every item - this is what the filter box is for. So 1000 workitems for one iteration is probably an unrealistic performance test but was good for giving me a general idea of whether it’s dog slow or not.