---
Published: 2009-03-18
title: "Automated browser screenshot capture"
author: Chris S
layout: post
permalink: /csharp/automated-browser-screenshot-capture/
dsq_thread_id:
  - 
tags:
  - 'c#'
  - winforms
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

 [1]: /storage/downloads/browsercapture.exe.zip
 [2]: /storage/downloads/browsercapture.zip
 [3]: http://www.developerfusion.com/code/4630/capture-a-screen-shot/