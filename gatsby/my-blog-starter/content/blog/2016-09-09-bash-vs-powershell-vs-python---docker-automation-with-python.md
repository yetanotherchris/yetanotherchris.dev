---
title: Bash vs Powershell vs Python - Docker automation with Python
date: 2016-09-09 00:00:00 Z
tags:
- python
- docker
Published: 2016-09-09 00:00:00 Z
author: Chris S
layout: post
shortpost: false
---

Today I became a Python developer (writing a single script counts as a being a Python developer doesn't it?!).

This was born from getting frustrated going between Powershell and Bash for automating Docker. As the comments in the gist below describe, I exhausted many different approaches to pulling the latest Docker images and bringing them up on a DigitalOcean server. As this is only for some low key sites and personal projects, I ended up running a Python script on the server via SSH.

The mildly amusing part to picking Python was the pOpen API doesn't behave in the same way on Windows as on Linux (Linux is picky about using using lists). I also realised Python 3 should've been my choice from the start, instead of 2 - but running python on an Ubuntu server always defaults to 2.7, so you end up doing a `python3 myscript.py`.

`gist:yetanotherchris/84177157d590acdb0614866ff1d1c536.js"></script>