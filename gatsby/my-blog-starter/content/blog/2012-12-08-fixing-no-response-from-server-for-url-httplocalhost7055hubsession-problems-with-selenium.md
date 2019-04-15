---
title: Fixing 'No response from server for url http://localhost:7055/hub/session/'
  problems with Selenium
date: 2012-12-08 00:00:00 Z
permalink: "/selenium/fixing-no-response-from-server-for-url-httplocalhost7055hubsession-problems-with-selenium/"
tags:
- selenium
- testing
Published: 2012-12-08 00:00:00 Z
author: Chris S
excerpt: If you're using a Windows Server 2008 R2 for your CI builds and tests, you
  may run into issues with running Selenium tests that Server 2003 didn't have.
layout: post
dsq_thread_id:
- 4207354224
---

If you're using a Windows Server 2008 R2 for your CI builds and tests, you may run into issues with running Selenium tests that Server 2003 didn't have. It took me a good 1/2 day of trial and error to fix the problem, but it's so obscure I thought I'd share. The error you'll see from Selenium is usually this one:

> &#8220;No response from server for url http://localhost:7055/hub/session/&#8230;&#8221;

<!--more-->

  
The error is actually FirefoxDriver related rather than Selenium itself, although ChromeDriver may just fail silently. The problem comes from the security of the default Temp directory on Windows 2008/2007. The solution is fairly straight forward, change the global environmental TEMP and TMP variables to a directory that has read/write access by the Everyone user - for example C:\temp. You can do this via

> Computer->Properties->Advanced System Settings->Environment Variables->System Variables.

It's a small security risk but as it's only a build box it shouldn't matter much, and fixes the issue.

I found the clue to the solution from [this newsgroup posting][1]

 [1]: http://code.google.com/p/selenium/issues/detail?id=2774