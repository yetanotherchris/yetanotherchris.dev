---
title: Templates in TFS 2010
date: 2010-11-05 00:00:00 Z
permalink: "/tfs/templates-in-tfs-2010/"
tags:
- tfs
Published: 2010-11-05 00:00:00 Z
author: Chris S
excerpt: One of the things I wanted to establish early on with Spruce was whether
  it was feasible to build an editor for TFS that could handle work items, without
  the software needing too many variations for each template type...
layout: post
dsq_thread_id:
- 
---

One of the things I wanted to establish early on with Spruce was whether it was feasible to build an editor for TFS that could handle work items, without the software needing too many variations for each template type.

In TFS you get to create templates for your work process that give you access to field customisation. So for example if you want to add a field called “PEBKAC error” for your bugs this is easy to do using custom fields in TFS.

There’s a number of templates available:

<!--more-->

  * CMMI v5 (comes as standard)
  * Agile v5 (comes as standard)
  * Scrum template (download + install)
  * Microsoft process template (download and install: http://mpt.codeplex.com/) - this is the actual template Microsoft use internally.

One thing you may notice if you’re use to bug tracking software like Fogbugz or Unfuddle is there amount of variations there are on the &#8220;work item&#8221; in TFS, and the number of fields you are given. My goal in spruce has been to simplify this with just the core (system) fields for editing. This might annoy some people who want all their fields available, it may change in future to have an advanced &#8220;tab&#8221; to cater for these.

There’s just two project types that come preinstalled with Visual Studio 2010: Agile and CMMI. The latter - Capability Maturity Model Integration - focuses on a far more formal process and Spruce really isn’t well geared towards this template. You can use Spruce with it, but you will be missing out on a number of fields that are important for it. I’m not going to pretend I know how the process works, but it’s a fair guess that those fields are there to force you down a particular route.

So this essentially leaves Spruce with the Agile template. As I listed above, there is also a Scrum template you can download and install, which includes work item types such as Sprint, Backlog Item, Impediment. Spruce does work with this template for bugs and tasks but like CMMI, it won’t give you all the options available for the template which a lot of people will view as defeating the purpose of the template. No burn down charts, no sprints. If you want to use a Scrum template, then the Scrum Dashboard on codeplex will suit you better.

So in terms of testing I’m focusing on the Agile project for development.