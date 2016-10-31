---
title: First impressions of Docker on Windows
date: 2016-10-31 12:45:00 Z
tags:
- docker
- docker-windows
shortpost: true
layout: post
---

Not to be confused with Docker *for* Windows (Docker inside a Linux Hyper-V VM on Windows 10), these are my initial opinions on Microsoft's implementation of Docker, running on Windows 2016 Server, and also currently available on the [beta version of Docker for Windows on Windows 10](https://docs.docker.com/docker-for-windows/).

Like the current release of .net core, Docker on Windows feels like a beta product not quite ready "for production". There's unlikely to be any support for it on ECS, Kubernetes, Rancher and Mesos for a while which means you'll end up deploying and managing containers yourself, probably through RDP on the server - or let the magic of Azure do it for you.

## My biggest complaints

### You can't use the Docker Linux eco system
For example I wanted to use the Elasticsearch image and couldn't as it's a Linux image. There are [a lot of mature images on the official registry](https://hub.docker.com/_/) right now that you'd have to use on a separate Docker host.

### No Docker logs
Forwarding of logs from the system/application eventlog isn't automatic - you have to `docker exec -it powershell` and use `Get-Logs application`.

### The original Docker images are (weirdly) not open source

The problem with not being able to see the base Dockerfile for all the `microsoft/xyz` Docker registry images is you don't know what's going on under the hood. This is useful if you don't know what's happening in the base - for example what the `ENTRYPOINT` does.

Maybe there's some tooling to come that will allow this - something similar to Packer that generates the Docker image based off an iso and an autounattend.xml file.

### They all use cmd.exe as their default entrypoint

The only image that seems to have powershell as the default shell is the `microsoft/iis` one. This makes Dockerfiles platform dependendent (file paths are Windowerised and commands like `mkdir` don't exist).

## Minor moans

- All but the Nano image are 10gb in size. It's not an issue until you create your own ones based of `microsoft/xyz` and watch your registry use 10gb at a time. But thanks for the Docker layering system these are probably less than 10gb
- IIS is slow to launch.
- A bug in the NAT implementation of the Docker for Windows beta means you can't use localhost, you have to use the multi-cast address (172...) of the container, using its internal port.

## Ending on a positive

It's easy to be negative as Docker for Windows is clearly quite rushed and Microsoft seem very keen catch up with the Linux world as part of their Azure vision. Give Docker on Windows a year and it's going to make Windows applications (primarily web ones I imagine) far easier to deploy, scale up and upgrade. I'm currently working on getting Roadkill into Docker (albeit cross-platform) for this reason.

I'm hoping Microsoft find a way of combining all Docker images in Windows, maybe through some Hyper-V or Linux Subsystem magic. The tooling is also likely to rapidly improve as it's Microsoft we're talking about, the kings of developer tooling.