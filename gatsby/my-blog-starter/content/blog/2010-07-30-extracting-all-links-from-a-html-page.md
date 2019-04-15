---
title: Extracting all links from a HTML page
date: 2010-07-30 00:00:00 Z
permalink: "/csharp/extracting-all-links-from-a-html-page/"
tags:
- c#
Published: 2010-07-30 00:00:00 Z
author: Chris S
layout: post
dsq_thread_id:
- 1084072781
---

The code below is a small class that extracts all links from a HTML page using a regular expression. The method returns a list of URLs, which can include formats such as &#8220;#&#8221; and &#8220;javascript:;&#8221;.

If you get proxy authentication problems behind a corporate firewall or proxy, add an app.config with the following lines:

<!--more-->

  
`gist:yetanotherchris/4957306`

This will take the proxy details from IE. I still get issues even with the above configuration, so it is fairly hit and miss depending on the hardware or software you proxy is using.

`gist:yetanotherchris/4957320`