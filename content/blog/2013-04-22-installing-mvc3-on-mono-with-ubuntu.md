---
title: Installing MVC3 on Mono with Ubuntu
date: 2013-04-22 00:00:00 Z
permalink: "/asp-net-mvc/installing-mvc3-on-mono-with-ubuntu/"
tags:
- asp.net-mvc
- roadkill-wiki
Published: 2013-04-22 00:00:00 Z
author: Chris S
layout: post
---

I managed to get the wiki engine I spend a lot of more spare time writing, [Roadkill][1] working on Ubuntu with Mono this weekend. Unfortunately for me, a lot of the documentation is patchy which meant it took a few hours to get it up and running by scouring Stackoverflow, blogs and news groups. It is infact very simple to get MVC3 working with Apache on Linux, provided you have the right Apache config settings and are willing to add a few hacks into your code to cater for the gaps (NotImplementedExceptions) in the Mono framework.

Below are two snippets for getting Mono and MVC3 going with Ubuntu. The majority of the credit goes to:

<!--more-->

  * [http://www.toptensoftware.com/Articles/6/Setting-up-a-Ubuntu-Apache-MySQL-Mono-ASP-NET-MVC-2-Development-Server]() 
  * <http://devblog.rayonnant.net/2012/11/mvc3-working-in-mono-ubuntu-1210.html>

Copy the second snippet into /var/www/default.txt and save the first snippet as &#8220;install.sh&#8221; into your user directory, running it using &#8220;sudo sh install.sh&#8221;. The full Roadkill bash script can be found [here][2]. I started making EC2 AMIs for the installation, and then found a few issues that made me eventually abandon my dreams of a [cheap $5 Roadkill Ubuntu server][3], as it would be a lot of effort maintaining both Windows and Mono tests for Roadkill.

Don't take that as criticism of Mono + MVC3 though - Roadkill does a lot with the framework that most apps wouldn't. If you are running data-driven MVC apps, then using a database like MongoDB would work very well with Mono on Ubuntu.

`gist:yetanotherchris/5433565`  
`gist:yetanotherchris/5433557`

 [1]: http://roadkill.codeplex.com
 [2]: https://gist.github.com/yetanotherchris/5426167/
 [3]: http://www.digitalocean.com