---
title: High performance and scaling ASP.NET Core and Docker
Published: 2018-07-28 18:25:04 +0000
author: Chris S
layout: post
date: 2018-08-17 14:23:09 +0000
shortpost: true
tags:
- docker
- dotnet-core

---
For a recent project I was part of, we were given the NFR (non-functional requirement) of having a cluster of ASP.NET Core Docker containers able to scale up to \~100,000 requests per minute.

Easy right? Just add more containers??

Unfortunately not, it was far more involved than that (particularly as the orchestration tool chosen wasn't particularly easy to scale with).

We learned a lot while soak testing, and regrettably with live traffic too, exactly how sensitive .NET Core applications at this scale are to the smallest contention issue with threading, networking and also tweaks to the Docker container and the orchestration tool (ECS in this case).

One of these was the ulimit default you have on a container. This is the number of open file handles the container instance can have open.

The default was something around the 100 mark, something we needed to increase into the thousands.

More information can be found [here on Ubuntu Stackexchange](https://askubuntu.com/questions/162229/how-do-i-increase-the-open-files-limit-for-a-non-root-user). There were half a dozen other issues which I could go into more detail with, perhaps in a later blog post or telling you in person!