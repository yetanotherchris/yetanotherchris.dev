---
title: Installing the Spruce alpha
date: 2010-12-08 00:00:00 Z
permalink: "/spruce/installing-the-spruce-alpha/"
tags:
- spruce
Published: 2010-12-08 00:00:00 Z
author: Chris S
layout: post
dsq_thread_id:
- 
---

The installation of (the current version of Spruce when this post was written) is very straightforward:

<!--more-->

  * You need TFS 2010, it won’t work with 2008. Install .NET 4 and register it for IIS.
  * Create a new Application Pool on your TFS IIS server, give it Network Service as the owner
  * Create a new application in your TFS website under /TFS/. It must be under this path for the windows authentication to work
  * Assign the application pool to this application
  * Point it to the place you’ve put your spruce directory
  * Edit the web.config in spruce to change the DefaultProjectName to the project you want to appear by default for every user.

Future versions will have a proper per-user configuration for projects, currently it’s session based only.