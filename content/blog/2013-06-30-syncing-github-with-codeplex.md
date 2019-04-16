---
title: Syncing Github with Codeplex
date: 2013-06-30 00:00:00 Z
permalink: "/git/syncing-github-with-codeplex/"
tags:
- github
Published: 2013-06-30 00:00:00 Z
author: Chris S
layout: post
---

Assuming you have used the Github Windows gui (or the console) to clone a Github repository, you can push it up to Codeplex in the console by using something like this:

<pre>git push --all https://git01.codeplex.com/roadkill</pre>

I use [this][1] Mercurial plugin on an Ubuntu box to synchronise my Bitbucket Mercurial repository onto Github. It's a crazy setup to have 3 repositories, but this comes from the problem that Bitbucket gets very little exposure to the .NET community while Codeplex is used heavily. Git is probably a close second behind Codeplex for exposure but I still prefer Mercurial to Git, at least for the 1-man Roadkill project.

Why not sync Bitbucket with a Codeplex mercurial repository? The Codeplex Mercurial support is terrible by their own admission, and pushing any large changes simply times out, so I have to jump through these hoops to sync everything up.

 [1]: http://hg-git.github.io/