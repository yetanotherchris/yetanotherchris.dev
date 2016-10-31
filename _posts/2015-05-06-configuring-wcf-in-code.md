---
title: Configuring WCF in code
date: 2015-05-06 00:00:00 Z
permalink: "/xml/configuring-wcf-in-code/"
tags:
- xml
- wcf
Published: 2015-05-06 00:00:00 Z
author: Chris S
layout: post
dsq_thread_id:
- 4207372827
---

One of the main issues I have with WCF, compared to say a WebApi or a NancyFX based API, are the ridiculously large configuration options you have available. The ABC approach it uses (addresses, bindings, contracts) can adds a lot of confusion when you're creating a service and also connecting with a client.

<!--more-->

  
WCF was designed as a replacement for COM+ and has a lot of &#8216;enterprisey' uses that a REST api doesn't, such as MSMQ support and named pipes - there's an interesting discussion on its merits vs NServiceBus <a href="https://groups.yahoo.com/neo/groups/nservicebus/conversations/topics/712" target="_blank">here</a> - but with all these extra configuration options you have the usual Microsoft preference of crow barring it all into XML, their favourite overly-verbose markup format.

If you want a good example of how XML isn't the solve-all format for everything, just look at an MSBuild project versus a Travis CI (YAML) description file. XML is great for providing structured data between services but for configuration I would argue it's terrible, as you want configuration options to be readable and editable quickly, and it looks like Microsoft are heading away from XML in vNext anyway and onto JSON.

So a giant WCF XML configuration section in your web.config could look something like this:

<script src="https://gist.github.com/yetanotherchris/27f02f697b997be78623.js"></script>

<a href="https://msdn.microsoft.com/en-us/library/ee530014%28v=vs.110%29.aspx" target="_blank">In .NET 4 you can actually remove the services section</a>

> In .NET Framework 4, the <span class="code"><service></span> element is optional. When a service does not define any endpoints, an endpoint for each base address and contract implemented are added to the service. 

You let WCF create all the defaults for you, getting a leaner web.config:

<script src="https://gist.github.com/yetanotherchris/0ae2c3c88dbad0ae9393.js"></script>  
However, for the most part you will always be using WCF in the same way so having all of this in C# is a lot more expressive and easier for project templates. This is its equivalent in C#, note the magical `public static void Configure(ServiceConfiguration config)` which is called by the framework in every service you create:

<script src="https://gist.github.com/yetanotherchris/6ee7819a5fe3f42f0cc0.js"></script>