---
Published: 2017-02-01
title: .NET Core continous integration and deployment with Gitlab, Docker, Kubernetes, Gitlab and Google Cloud
author: Chris S
layout: post
shortpost: false
tags:
  - tag1
  - tag2
---

Over the past few months I've put Roadkill on hold in my free time, to get some .NET core projects working inside Docker. They're mostly sandbox websites for exploring the tech stack, and are hosted privately in Gitlab. Gitlab gives you a decent CI server for free, which works really well with CI and deployment of .NET core apps (both websites and console apps).

<!--more-->

As .NET core runs in Linux, you no  longer have to worry about spinning up an over-powered Windows server. What's more you can do it all inside a Docker container. I plan to do a series of posts on my learnings with .NET core and Kubernetes, in the meantime below is the YAML build definition build I used. It does the following:

1. Build and publish (publish is just creating a clean bin folder with assets) the .NET Core app in release mode
2. Build the Docker image in the repository: `docker build -t gcr.io/my-kube-project/...`
3. The tag I use for each Docker image is the short Git commit ID.
4. Finally push to the Google Cloud Docker registry.

One final step you could easily add is performing a `kubectl edit deployments/...` to update the Docker image to the latest tag, but it's not in the YAML build definition file.

<script src="https://gist.github.com/yetanotherchris/7be82856f3240776a880d3bf540bf844.js"></script>
