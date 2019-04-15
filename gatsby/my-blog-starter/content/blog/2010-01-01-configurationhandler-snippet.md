---
title: IConfigurationSectionHandler example
date: 2010-01-01 00:00:00 Z
permalink: "/csharp/configurationhandler-snippet/"
tags:
- c#
Published: 2010-01-01 00:00:00 Z
author: Chris S
excerpt: This is a small snippet for the basics of writing a ConfigurationHandler
  to read a configuration section from your web.config or app.config.
layout: post
dsq_thread_id:
- 1077165684
---

This is a small snippet for the basics of writing a ConfigurationHandler to read a configuration section from your web.config or app.config. Since I wrote this I've moved to the easier ConfigSection way of doing things, there's an example [here][1].

You start off with the XML definition in the config file:

<!--more-->

  
`gist:yetanotherchris/4758085`

And then define your own parser class, and a Settings class to store the details in:

`gist:yetanotherchris/4758068`

And then when you application first initializes, read the settings like so:

<pre>var settings = (Settings)ConfigurationManager.GetSection("mysection");</pre>

An alternative way of doing this is to make the Settings class responsible for initializing itself inside a static constructor, using the above line. You would then make the Settings class a singleton.

 [1]: http://www.bitbucket.org/roadkill/src/4b864a2a214f/Roadkill.Core/RoadkillSection.cs