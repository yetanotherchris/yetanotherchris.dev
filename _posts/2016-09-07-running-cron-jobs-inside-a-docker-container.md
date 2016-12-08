---
title: Running cron jobs inside a Docker container
date: 2016-09-07 00:00:00 Z
tags:
- docker
- unix
- ".net-core"
Published: 2016-09-07 00:00:00 Z
author: Chris S
layout: post
shortpost: true
---

Probably the most basic use of a Docker image is to run it, and let it exist - like `docker run hello-world`. If you want to do this on a regular schedule, you have several options but the cron one is narrowed down to running cron on the Docker host or in the container.

I wanted to run a dotnet core console app that parses Reddit posts and posts itself, inside a Docker container, every 30 minutes on set days of the week.

Running the Docker image as a daemon with cron running inside it makes it a lot easier to update the Docker image and also bring up on other machines.

There's quite a few gotchas to doing this however, which I discovered and spent hours Googling the answers for. Most of the answers were dredged from Github repositories which luckily Google managed to find the keywords for. This included:

* Cron doesn't run as an interactive shell - you don't get any environmental variables  - a well known restriction but nobody seemed to know the answer. I found my solution in [this repository](https://github.com/draffensperger/postgres-s3-backup).
* I'm running a .NET Core console app. It writes a temp file to its folder on the filesystem, but you don't have permission to do this without CHMOD'ing the app directory.
* Cron inside a Docker container can't write to a cron.log so you end up having to map a volume. Without this you get the error "tail: unrecognized file system type 0x794c7630 for '/var/log/cron.log'". This makes the Docker image rely on the host volume for storage, but it's only a log file. The fix came [from here](https://github.com/bringnow/docker-letsencrypt-manager/commit/7a157dcd05ea8e745ec604734f6e7aa2e9e7b7cc).


Below is the Docker file and the scripts are with the Gist.

<script src="https://gist.github.com/yetanotherchris/e5185530eee16495a1432d3acf7f3e32.js"></script>

Some relevant Stackoverflow posts that helped:

- http://stackoverflow.com/questions/27771781/how-can-i-access-docker-set-environment-variables-from-a-cron-job
- http://stackoverflow.com/questions/15557777/crontab-job-does-not-get-the-environment-variables-set-in-bashrc-file
