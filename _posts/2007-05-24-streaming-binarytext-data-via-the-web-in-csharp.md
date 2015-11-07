---
Published: 2007-05-24
title: "Streaming binary/text data via the web in C#"
author: Chris S
excerpt: "An dated example of downloading binary data to autoupdate an application."
layout: post
permalink: /csharp/streaming-binarytext-data-via-the-web-in-csharp/
dsq_thread_id:
  - 1069222286
tags:
  - 'c#'
  - xml
---
[Download][1]

This rough example was originally intended for auto-update functionality in an application (it downloads the new .exe, runs a bootstrap application that replaces the existing .exe with the new one, and runs it).

<!--more-->

The code is a windows forms application that shows 3 ways of performing the download. The first is the built in DownloadFile method in the WebClient class. The 2nd shows streaming HTML from a website into a listbox (you'll need to add a listbox to the form for this). The 3rd downloads winrar from rarlabs.com and streams the file to disk. The first 2 methods have been commented out.

It includes a progress bar to show the progress, and total bytes expected. The solution is in Visual Studio 2005 format. The application assumes you have a c:\ drive to download onto. 

For now it doesn't deal with different content types, it's pretty basic.

 [1]: /storage/downloads/webdownloadexample.zip