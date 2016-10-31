---
title: Automated browser screenshot capture
date: 2009-03-18 00:00:00 Z
permalink: "/csharp/automated-browser-screenshot-capture/"
tags:
- c#
- winforms
Published: 2009-03-18 00:00:00 Z
author: Chris S
layout: post
dsq_thread_id:
- 
---

[BrowserCapture.exe.zip][1]  
[Project source (Visual Studio 2008)][2]

This small windows forms application does the following:

  * Opens a website you specify in Internet Explorer, Firefox, Safari and Opera.
  * Resizes the window to the size you set. 
  * Takes a screengrab of each one.
  * Optionally closes each browser. 

<!--more-->

You can specify the browser paths and path to save the screenshots (which are saved in PNG format) to.

The screenshot mechanism is courtesy a class from of this [article][3]. The remaining code is some straight forward windows enumeration via the winapi and PostMessage.

 [1]: /wp-content/uploads/2013/02/browsercapture.exe.zip
 [2]: /wp-content/uploads/2013/02/browsercapture.zip
 [3]: http://www.developerfusion.com/code/4630/capture-a-screen-shot/