---
Published: 2010-11-09
title: "WorkItems that spruce supports: tasks, bugs, issues"
author: Chris S
layout: post
permalink: /tfs/workitems-that-spruce-supports-tasks-bugs-issues/
dsq_thread_id:
  - 
tags:
  - spruce
  - tfs
---
The flexibility and arguably the over complexity of TFS versus other online bug tracking software is its ability to create custom work item types that cover anything you like. For the Scrum template this includes a Sprint workitem, a product backlog item as well as the standard bug and task items.

<!--more-->

My main goal for spruce is to create functionality that apes that found in the &#8220;simpler&#8221; bug tracking software. For this I’ve focused on two work item types that are standard across templates: bugs and tasks.

These two types always have a title, a description (which depending on the template, can be a different field), an assigned to person and a state: new, closed, resolved etc. For version one I’m sticking rigidly to a specific set of fields rather than making it flexible.

It would of course be nice to be able to define work item types in an XML file for Spruce, which includes the fields each workitem type uses, a sort of web framework for TFS. Tempting as this is to do, it’ll also add complexity to the project that isn’t really necessary for the majority of uses and will mean I end up tracking about 15 different work item type scenarios.

Having said that, having spruce as a glorified todo list is not the goal. So I’ll see how this pans out if when it starts getting some use.