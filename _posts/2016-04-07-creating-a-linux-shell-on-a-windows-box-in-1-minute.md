---
title: Creating a Linux shell on a Windows box in 1 minute (or 7 lines of Powershell)
date: 2016-04-07 00:00:00 Z
tags:
- vagrant
- linux
layout: post
shortpost: true
Published: 2016-04-07 00:00:00 Z
---

Through the magic of Vagrant (it works well with Linux, not so well with Windows thanks mainly to Windows), you can create a virtual Ubuntu machine on your Windows box in 7 commands:

*Needs [Chocolatey](https://chocolatey.org/) installed*

    choco install virtualbox -y
    choco install vagrant -y
    md c:\vagrant
    cd c:\vagrant
    vagrant init ubuntu/trusty64
    vagrant up
    vagrant ssh
