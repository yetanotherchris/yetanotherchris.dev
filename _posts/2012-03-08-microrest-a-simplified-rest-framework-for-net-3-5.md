---
Published: 2012-03-08
title: "MicroRest, a simplified REST framework for .NET 3.5+"
author: Chris S
layout: post
permalink: /open-source-projects/microrest-a-simplified-rest-framework-for-net-3-5/
dsq_thread_id:
  - 1092542251
tags:
  - open source projects
---
**Update 2:**  
Now it's 2015 and WebApi is almost in version 3 (vNext edition), I've removed the Microrest source from Bitbucket.

**Update:**  
You can now grab MicroRest on Nuget: Install-Package MicroRest

I've been using [StackService][1] recently to create a private REST API for a project at work, and enjoying its simplicity over T-Rex sized WCF alot. I've discovered 
that it doesn't fit neatly with the pattern we employ at work for API design: certain behaviours are explicity disabled to ensure you don't get the domain into an 
invalid state (creating a user for example). StackService is designed so that everything is mapped directly to objects or DTOs, so essentially everything you do is based 
around an object - CRUD operations. If you want a set of custom parameters for a REST method you need to create then a brand new object is required for each method.

<!--more-->

That's how it's designed and the author has made it clear why it's like that, which has meant searching for another REST framework that fits our design pattern. 
I've tried the 2 competing technologies for StackService - WCF and NancyFX. You can expose REST with WCF but it's a lot of farting about for what many people think isn't a pleasant experience, one of the reasons StackService was made. NancyFX was my clear alternative choice, but as I discovered its .NET 4-centric and the projects I'm looking after are stuck with 3.5 for various reasons.

So I did what every software developer does: re-invented the wheel and made my own micro REST framework, called MicroRest. It's sitting on Bitbucket with 
just 4 classes and not much code, albeit very simplistic reflection. All and any feedback (as long as it's glowing and sycophantic) are welcome, as are patches and contributions on Bitbucket.

 [1]: http://servicestack.net/