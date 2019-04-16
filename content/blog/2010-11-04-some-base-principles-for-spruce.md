---
title: Some base principles for Spruce
date: 2010-11-04 00:00:00 Z
permalink: "/tfs/some-base-principles-for-spruce/"
tags:
- spruce
- tfs
Published: 2010-11-04 00:00:00 Z
author: Chris S
description: Here's 7 guiding principles I'm sticking to with the development of the Spruce
  front end for TFS.
layout: post
dsq_thread_id:
- 1093195283
---

There’s 7 ‘guiding principles’ I’ve laid down for Spruce:

**1. Attractive and easy to use UI**

It’d be nice to have a professional designer offer his/her design and HTML experience but in the mean time I’ve designed it. The first version looks reasonable and, after all, the target audience is mostly developers who prefer function over form the majority of the time. My goal is to also have it simple to use and fast to use - there should not be ugly 8pt fonts, mysterious ways of getting to a page nor over complicated AJAX where static HTML will work.

<!--more-->

**2. Technology**

It will be based on ASP.NET MVC 2/3, jQuery and plugins and SQL Server Express. The targeted browsers will be Firefox and Chrome, with IE supported but not the primary browser. HTML5 features will be incorporated where necessary.

**3. It only supports the default Microsoft TFS templates**

The templates you get with TFS (more on this in a coming post) are Agile and CMMI. They also offer a Scrum template that you can install, however I don’t plan on supporting this, atleast not until the core functionality is in place.

CMMI works with Spruce, however the Agile template is the recommended option.

**4. It only supports tasks and bugs to begin with**

More on this in a future post, but in a nutshell there are a lot of variations on the Workitem in TFS. Spruce aims to provide bug and task editing, and possibly issues later.

**5. It’s free until it’s possible to market it commercially**

The project will be GPL’d rather than MIT’d to avoid it being resold. Having said that, as the copyright holder I would much prefer to offer it for an affordable nominal fee AND it be a lot more feature rich and configurable than have a rotting open source corpse of a project where bugs aren’t fixed for months and support is seen as a charitable gesture. But until the Dragon’s from Dragon’s Den cough up (I’d pitch it in a christmas tree costume) it will be free.

**6. Features: It’s not a replacement for the Visual Studio GUI**

The features I want it to have by version 1 are:

  * Search
  * Easy to use filtering, simple forms for CRUD
  * Favouriting using SQL Server Express
  * History support
  * Attachment support
  * Linked items support: parent/child, related

I'm not planning on having a complicated WIQL (work item query item) interface or every possible field available. It should however (and the current version does), adhere to the workflow that TFS forces you to. So you shouldn't be able to create a new bug with the state of &#8220;resolved&#8221; or similar.

**7. Predictable dates for new features and fixes**

I won’t be working on this full time, nor will I be able to dedicate every evening to it. So my aim is to produce Spruce as version 0.1 to 0.9, with each version being 1 or 2 weeks.

This scatters the workload so the features are achievable, the minor versions will add each of the features listed above one by one, and include any suggestions or fixes. When it reaches version 1 I’ll come up with a new plan.