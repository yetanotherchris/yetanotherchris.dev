---
title: The new Spruce solution structure
date: 2011-03-02 00:00:00 Z
permalink: "/spruce/the-new-spruce-solution-structure/"
tags:
- spruce
Published: 2011-03-02 00:00:00 Z
author: Chris S
description: 'I’m quite anally retentive when it comes to folder structure in Visual Studio
  projects: I like to keep all C# source and site assets in a structured way that
  will avoid me having to spend (accumulated) hours doing pointless searches and treasure
  hunts through the solution explorer...'
layout: post
dsq_thread_id:
- 1092440805
---

I’m quite anally retentive when it comes to folder structure in Visual Studio projects: I like to keep all C# source and site assets in a structured way that will avoid me having to spend (accumulated) hours doing pointless searches and treasure hunts through the solution explorer. I’m pretty sure it’s some form of OCD but at the same time I don’t really care too much as I subscribe to the [Bob Martin school of thought][1] that says leave the campsite cleaner than when you arrived.

<!--more-->

So for Spruce I’m keen to get the project and folder structure neat from the start. At my place of work we already use a very tidy structure for our projects (the usual Core, Site setup) but there is one discrepancy that has always made me do a small developer frown – where do you store the classes that your Site project uses. Not the designer/codebehinds for vanilla ASP.NET, but the classes that are extension methods, helpers, summary objects and so on.

### No C# source in your Site project

I decided to look around for an answer to this dilemma for Spruce, and came across [this][2] elegant solution from Jimmy Bogard, the author of [AutoMapper][3]. The philosophy is very simple: the Site project should contain absolutely no C# code at all – just Views, Scripts, Images/Movies/Sound, CSS.

This seems like clean way of doing things so I’ve adopted it for Spruce. It has one minor setback that I can’t see a way around which is the SiteMaster designer and codebehind. The rest of the Site is free of all C# except that found in the views.

This means Spruce now has the controllers inside its Core, and has the class that inherits from HttpApplication (the global.asx.cs) – SpruceApplication – sat there too. It’s quite neat and feels a lot nicer than before. I’m not sure if this would work with an ASP.NET project but fortunately Spruce is an MVC 3 project.

### MVC 3

I’ve moved Spruce to using MVC 3, previously it was MVC 2. The main purpose for this move is to use the Razor view engine that MVC 3 provides. I was very apprehensive about Razor when it was first announced by Scott Gu last year, having used Sharp Template, and for my sins, Smarty Template with PHP many moons ago, Razor felt like a step back towards that world of templating engines again, which existed purely because nobody had been bothered to put some engineering manpower into a decent MVC setup like the Microsoft one.

I’m fickle and I’ve changed my mind completely. [This post on Stackoverflow][4] convinced me otherwise and now Spruce is using the Razor syntax which the next batch of Bitbucket checkins will reflect, along with the new solution structure.

 [1]: http://www.amazon.co.uk/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882/ref=sr_1_1?ie=UTF8&qid=1296940810&sr=8-1
 [2]: http://www.lostechies.com/blogs/jimmy_bogard/archive/2009/12/08/organizing-asp-net-mvc-solutions.aspx
 [3]: http://automapper.codeplex.com/
 [4]: http://stackoverflow.com/questions/4019740/does-razor-syntax-provide-a-compelling-advantage-in-ui-markup