---
Published: 2011-10-22
title: "A new Spruce UI, a big refactor and a release candidate!"
author: Chris S
excerpt: "It’s been roughly a year since I started the Spruce project, back in November 2010. Over the course of a year it’s had a lot of hold-ups and could be mistaken for yet another open source project where the author excitedly starts the project and then ditches it after about 3 beta releases. It’s also understandably not had much interest – I would guess that small .NET/C++ teams generally use Fogbugz, JIRA and other web-based bug and task tracking tools, while larger teams will either use TFS with the CMMI project type or the Scrum dashboards via tools like Urban Turtle and the Scrum Dashboard, or just Visual Studio."
layout: post
permalink: /spruce/a-new-spruce-ui-a-big-refactor-and-a-release-candidate/
dsq_thread_id:
  - 1092783440
tags:
  - spruce
---
It’s been roughly a year since I started the Spruce project, back in November 2010. Over the course of a year it’s had a lot of hold-ups and could be mistaken for yet another open source project where the author excitedly starts the project and then ditches it after about 3 beta releases. It’s also understandably not had much interest – I would guess that small .NET/C++ teams generally use Fogbugz, JIRA and other web-based bug and task tracking tools, while larger teams will either use TFS with the CMMI project type or the Scrum dashboards via tools like Urban Turtle and the Scrum Dashboard, or just Visual Studio.

<!--more-->

So now I’ve finally reached the last milestone having released no betas at all for it – it’s ready to be packaged up into a zip file and given a download link on Codeplex. This post is a long technical walk through of the changes I’ve made to Spruce, and some screenshots. To skip the boring, dry intro and download the RC head over to [Codeplex][1].

<!--more-->

### New UI

Since my last update on the UI in June, Spruce has had its projects, areas and iterations re-designed so they’re a lot easier to use. The tool has been used internally at the company I work for for around 8 months, so its had a lot of user testing. The redesign was helped by my colleague/boss and seems to get the thumbs up from both technical and none-technical people.

![projects-bar][2]

Its missing some solid unit tests, I’ve avoided the TDD approach as these are quite hard to engineer without creating a huge Mock of the Spruce API. Watin tests may come later on, but they also require a TFS server with a clean project, which unlike SQL Server testing isn’t that easy to setup.

### Screenshots

![screenshot][3]  
![screenshot][4]  
![screenshot][5]  
![screenshot][6]  
![screenshot][7]  
![screenshot][8]

### TFS Work item plug system

There has been another, larger change since the post about the UI. Spruce is now using a plugin style architecture for the Work Item templates. All the code that was hardcoded for MS Agile inside the Core library has been refactored out, and the system is designed &#8216;from the ground up' to work with any TFS project type.

The default plugin (I’ve called them templates in Spruce) is an MS Agile one that supports the Bug and Task work item types. I may add the remaining work item types I describe in [this post][9] later on, and these two types also work with CMMI projects. It’s very simple to write your own Spruce templates for TFS project types, you simply create a set of views, controllers and a few model classes and tie them altogether.

There’s base classes for controllers, models, querying and saving that give you 99% of the functionality you need. The only tricky part will be working around the TFS workflow that some work items use (for example going from Open to Resolved to Closed states).

I will be happy to give email/chat support to anyone who wants to write a plugin project for a TFS project type, or their own work items, just send me a message via [Bitbucket][10] or [Codeplex][1].

I’m not planning on writing large reams of documentation for Spruce as that feels like a bit of a waste of time, however it is fully XML documented.

### RavenDB and user settings

A new feature I’ve added to Spruce since the June blog post is persistent user settings. Every list of work items has a set of filters that you can filter with: title, date, assigned to and so on. These user settings are saved each time the page finishes its life cycle, and previously this was being done to an XML file in App_Data folder.

This was obviously far from ideal and we have databases to do this kind of thing, however I was reluctant to make Spruce have a dependency on SQL Server or SQL Compact, mostly because I had troubles getting SQL Compact to work with my 64 bit Windows 7. So I decided upon an OO database, or NoSQL as they’re called these days (yes I realise NoSQL has REST/JSON etc.!). I’ve previously used [db4o][11] and was tempted to use it again, as its dual-license however this felt like an excuse to try out [RavenDB][12] in the wild, so I went with that.

Spruce now uses RavenDB in embedded mode. It does occasionally get a bit upset when debugging as you recompile and it’s still got a lock open from before, but in general it works quite seemlessly. You give it your UserSettings object for the current user and just save it. That is was NoSQL is all about, large document stores for bags of properties and it’s soo much easier than a**ing about with SQL Schemas. Having said that, I’ve only used it with one object and a couple of leaf nodes, I might change my opinion with a large object graph.

### TFS Reason field

One issue that remains a small bug in the forthcoming release candidate is the Reasons field. This is a core field in TFS that is intended to accompany the state field when you change a work item from open/resolve/closed etc. So if you close a bug, you should give a reason why you’re closing it. However I didn’t find a way to filter this list based on the state you want the work item to be – you can only get this list of reasons after you’ve changed state. I might be missing something but I can see this causing a few bug reports when Spruce gets used.

### History comments

One other area I got stuck on with the TFS api is adding comments to each change of a work item. In Visual Studio you can read and write to these easily – so each time you update a work item you leave a small note of why you’ve changed it. I couldn’t read this at all using the API so unfortunately it’s not in Spruce. If anyone can help me out with this I’ll add it to Spruce.

### And lastly…

Over the coming months I’m hoping to add support for the other work items, and possibly look at the Scrum TFS project types as new template types in Spruce.

One feature I would be very keen to add is the ability to see a list of bugs and tasks for all projects. I support a number of products at my workplace, and each of these is a separate TFS project. Tracking the outstanding tasks and bugs for each project can get tedious and even though the search supports this in Spruce, it needs a lovely UI for the job.

Aside from this it’s not going to receive large amount of updates besides bug fixes – as far as I’m concerned it’s feature complete and it matches the [7 principles][13] I originally set out to achieve!

 [1]: https://github.com/yetanotherchris/spruce
 [2]: /wp-content/uploads/2011/10/spruce-projects-areas-bar.png
 [3]: /wp-content/uploads/2011/10/sprucedashboard.png
 [4]: /wp-content/uploads/2011/10/sprucemarkdown.png
 [5]: /wp-content/uploads/2011/10/sprucebugs.png
 [6]: /wp-content/uploads/2011/10/sprucesearch.png
 [7]: /wp-content/uploads/2011/10/spruceedit.png
 [8]: /wp-content/uploads/2011/10/sprucerss.png
 [9]: /tfs/tfs-template-types
 [10]: http://www.bitbucket.org/yetanotherchris/
 [11]: http://www.db4o.com/
 [12]: http://ravendb.net/
 [13]: /spruce/some-base-principles-for-spruce