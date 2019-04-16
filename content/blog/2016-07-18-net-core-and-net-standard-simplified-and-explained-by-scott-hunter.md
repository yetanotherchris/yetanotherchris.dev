---
title: ".NET Core and .NET Standard simplified and explained by Scott Hunter"
date: 2016-07-18 00:00:00 Z
tags:
- net-core
Published: 2016-07-18 00:00:00 Z
author: Chris S
layout: post
shortpost: true
---

With all the changes to .NET that have happened this year, and the constantly evolving .NET core/standard (and the bombshell that project.json is going), it's quite hard to decipher what Microsoft are doing to the frameworks besides the main marketing features of it running on Linux/MacOS with NPM style packages and ASP.NET getting Kestrel.

Probably the clearest explanation I've found is hidden away in [this DotNetConf Keynote by Scott Hunter](https://channel9.msdn.com/Events/dotnetConf/2016/NET-Conf-Day-1-Keynote-Scott-Hunter). The first 20 minutes gives the lowdown on the new architecture, or you can read the slides if you don't have time.

![.net today](/assets/2016/dotnet-today.png)

**Note: The usage of Core library in this slide is slightly confusing, Scott is referring to System.Core.dll and for Base Class Library (BCL) this is typically system.dll**

And if you really don't want to read the slides, my summary would be: .net standard is a versioned contract that the implementation has to adhere to (like the CLR and CLS standards). It'll get more APIs over time, and each implementation will have to honor the contract to keep up. If you want to be re-confused, try reading [this doc](https://github.com/dotnet/corefx/blob/master/Documentation/architecture/net-platform-standard.md#user-content-list-of-net-corefx-apis-and-their-associated-net-platform-standard-version). Why is everything version 4? Probably because it came straight from the .NET 4.0 code base.

So .NET Core is an implementation of the .NET Standard (.NET Core is version 1.0 right now, .NET Standard is version 1.6). The version numbers really don't help at all, they would've benefited from resetting them all to 1.0 and blown a big raspberry at anyone who was using the betas and RC1 and RC2.

![.net core](/assets/2016/dotnet-tommorow.png)

Also worth checking out is [the .NET roadmap up until the start of 2017](https://blogs.msdn.microsoft.com/dotnet/2016/07/15/net-core-roadmap/)
