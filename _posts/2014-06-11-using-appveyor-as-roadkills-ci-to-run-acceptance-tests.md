---
title: Using Appveyor as Roadkill's CI to run acceptance tests
date: 2014-06-11 00:00:00 Z
permalink: "/appveyor/using-appveyor-as-roadkills-ci-to-run-acceptance-tests/"
tags:
- appveyor
- continuous-integration
Published: 2014-06-11 00:00:00 Z
author: Chris S
layout: post
---

A while ago Roadkill's CI solution was hosted on Appharbor, which was a great solution (and free for a single project), but the configuration hacking and I problems with the hosted environment with the unit tests meant it wasn't a viable solution for Roadkill's requirements.

After Appharbor I moved onto using Bamboo from Atlassian. This, like Appharbor, was also a great hosted product but was costing me a lot in Amazon EC2 hosting costs which I was too cheap and miserly to pay for.

I then moved onto Teamcity which is the CI I'm most familiar with, having set it up and used in two companies over the past 5 years. Right now, the Teamcity mothership is hosted on DigitalOcean and a Teamcity agent runs on my desktop PC to run the build. I'm also too cheap with this solution to keep it running 24/7, so I launch it on demand which is really when I do check-ins to Roadkill.

A few days ago I heard about [Appveyor][1] through the grapevine and decided to give it a try with Roadkill. Appveyor does all its instancing via Azure, but also lets you control the instance using post-install and post-build powershell hooks rather than the completely sandboxed approach of Appharbor.

So far I've been impressed at how easy it is to use, but also how customisable your instances can be.

With a post-install hook I installed Chocolatey and then Chrome and MongoDB (with SQL Express 2012 already installed):

<script src="https://gist.github.com/yetanotherchris/0f1d763e6d539fc61857.js"></script>  
<!--more-->

  
After this, I had to do a bit of hackery to change the configuration file connection strings, as they default to using (local) for the instance and integrated security. The best tool for hacky ugly code is of course Powershell:

<script src="https://gist.github.com/yetanotherchris/741b3ca836e505d04c59.js"></script>

&#8220;gc&#8221; is a shortcut for get-content, and the &#8220;output-file&#8221; cmdlet is important as the text file isn't saved without it.

With these scripts in place, there is a small tweak you should make to the Git settings (Appveyor is free for public Github and Bitbucket projects) - make sure the clone depth is 1 to avoid the entire history of a project being downloaded. That's important for Roadkill, as I store the Nuget packages folder in the repository so I can work offline on my laptop easily.

Everything works well and it is really fast to get going. The main setbacks I've had, which are Roadkill related, are the size of the Roadkill Git repository is huge (around 200mb), and Chrome/MongoDB is also a lengthy install. So the builds go from around 15 minutes locally to 30 minutes on Appveyor.

The acceptance tests ran via Chrome, against the local IIS Express server, however they conk out after 30 tests which I'm assuming is from the instance running out of memory or having a maxed out CPU. Integration and Unit tests both ran fine however, with the main set back being the launch time. But I don't mind too much about that, and I can live without the acceptance tests being run via the CI for now, happy to &#8220;decomission&#8221; the Teamcity in the coming weeks.

 [1]: http://www.appveyor.com