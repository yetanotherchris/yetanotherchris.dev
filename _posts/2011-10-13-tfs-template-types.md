---
Published: 2011-10-13
title: "TFS Template types"
author: Chris S
excerpt: "One of the main features of using TFS for bug and backlog tracking is the power it gives you to edit work item templates. A work item is simply a bag of properties/fields grouped together, like a class in C#/Java/every other OO language. You can customise these fields, and you also get a set of core fields, but you also get to choose the workflow of each field. For example you can’t set a bug to closed, before it’s been resolved."
layout: post
permalink: /tfs/tfs-template-types/
dsq_thread_id:
  - 1092516278
tags:
  - tfs
---
One of the main features of using TFS for bug and backlog tracking is the power it gives you to edit work item templates. A work item is simply a bag of properties/fields grouped together, like a class in C#/Java/every other OO language. You can customise these fields, and you also get a set of core fields, but you also get to choose the workflow of each field. For example you can’t set a bug to closed, before it’s been resolved.

Team Foundation server comes with 2 templates that contain around 4-5 work item types. There’s MS Agile 4.2 (for TFS 2008) and 5, and CMMI. There’s an additional two that exist out there: Microsoft’s Scrum template and another that EPI (who make the CMS Epi Server) have created which is goes side-by-side with their .NET web front end for it.

The work items you get for default 3 templates are:

<!--more-->

**CMMI4**

![cmmi4][1]

**CMMI5**

*This template allows you to organize and track the progress and health of projects that require a framework for process improvement and an auditable record of decisions.*

![cmmi5][2]

**MS Agile 5**

*This template allows you to organize and track the progress and health of a small- to medium-sized Agile project.*

![agile5][3]

I wrote about these templates in this previous post, where I said I was concentrating on just the MS Agile project type. I’ve since reversed this decision as it’s apparent that using TFS without the ability to use custom work item types is a bit pointless. You nearly always get asked “can we have a ‘who’s-to-blame’ field” or something that goes beyond the standard fields that MS Agile gives you.

### The big refactor

With this in mind, I have recently finished a large re-factor of Spruce so that you can now create your own MVC-based project and write your own controllers/views/models to display your work item types. The first and only of these templates is configured for MS Agile 4.2 and 5. However I’ve written it so it’s not hard work to create a new template from scratch – the API includes a base Controller which has a lot of core functionality you can piggy-back onto, and the domain has many new features to it, such as a WIQL query builder and a WorkItemSummary you can subclass easily. The code base is also a lot cleaner now, extensible, and easier to maintain which is the most important part.

I don’t plan on creating a CMMI template as the project type is really geared towards a UI that doesn’t lend itself well to the main principles I’ve stuck with for Spruce, that is a simply to use bug-tracking web front end, along the lines of fogbugz and github.

I’m also not planning on writing any documentation for creating the templates as it feels like a huge waste of time for a task that probably 1-2 others may use. I’m happy to provide email support though, which I’ll repeat in the wiki once the release version is ready.

### Creating your own work item templates

To create your own work item templates in TFS, you first need to install the power tools. Once installed, you get two new extensions in your extension manager: Process template editor and WITDesigner.

You also get a new menu inside your Tools menu:

> Tools->Process Editor 

In here you select ->Work Item Types and view a type one from the server. You can edit and view the fields this way, also viewing the transitions between states in a slightly confusing designer. There’s also a winforms designer for the visual studio UI.

I’ve built in an action into spruce that lets you also view all the fields for a work item type. You can do this by using /{type}/showfields where {type} is the work item type, e.g. http://localhost/spruce/bugs/showfields . This only works if you have created the controller, views, and model for the work item type though – so for work item types like Risk in CMMI you won’t be able to view the fields this way.

 [1]: /wp-content/uploads/2011/10/sprucecmmi4.png
 [2]: /wp-content/uploads/2011/10/sprucecmmi5.png
 [3]: /wp-content/uploads/2011/10/sprucemsagile5.png