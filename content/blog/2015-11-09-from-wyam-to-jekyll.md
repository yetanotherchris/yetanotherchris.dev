---
title: From Wyam to Jekyll
date: 2015-11-09 00:00:00 Z
tags:
- Jeykll
- news
Published: 2015-11-09 00:00:00 Z
layout: post
description: Converting the blog over to Jekyll for free Github hosting.
---

A few of us recently set about [re-vamping the website](https://github.com/CancerVaccine/cancervaccine.github.io) for the Cancer Vaccine Institute charity. After battling with a terrible Wordpress theme, we settled on using Jekyll and static HTML. This was fairly serendipitous for me, as I got a crash course on getting Jekyll to run on Windows, the template engine it uses called Liquid, and getting free-hosting from Github.

The steps are a lot easier than I thought:

1. Create a Github repository called `{your-username.github.io}` e.g. `yetanotherchris.github.io`
2. Add a .gitignore for Jekyll
3. Clone it, and add some default folders as the Jekyll docs describe.
4. `choco install ruby`
5. Close the powershell console, open a new one.
6. `gem install jekyll`
7. CD into your repository, `jekyll server`
8. Go to "http://localhost:4000" and be amazed.
9. Add a CNAME file with your domain name.
10. Update your DNS records so the A record points to the Github IP.
11. `git push` your repository and watch it appear on http://yourusername.github.io and in 10 minutes, your domain you set in the CNAME file.

Most of the time spent was converting to the Liquid templating engine, which is just like the hundreds of other templating engines such as Smarty, and making the markdown files Jekyll-friendly.

The source for the site is available on https://github.com/yetanotherchris/yetanotherchris.github.io.
