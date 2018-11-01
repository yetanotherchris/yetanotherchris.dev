---
title: Roadkill update, 2018 Q4
Published: 2018-07-28 18:25:04 +0000
author: Chris S
layout: post
date: 2018-11-01 09:26:25 +0000
shortpost: false
tags: []

---
[Roadkill version 3](http://github.com/roadkillwiki/roadkill) has been a long time coming, over 2 years in fact. The main reason for this has been the volatile nature of the .NET ecosystem of the past few years, and uncertainty of the .NET Standard/.NET Core roadmap, up until project.json was ditched recently.

#### Converting to .NET Core beta, 1.1, 2.1

The conversion started with a standard .NET Framework to .NET Core upgrade. This took about 6 months of my free time, and eventually got nowhere as the [number of changes between the framework was so great.](https://gist.github.com/yetanotherchris/197963aec1872c40bba515f8f95b7e0f)

I changed direction at the start of the year, and have now moved to a direct re-write of Roadkill, moving to an API-first approach. 

Roadkill v3 is an API project, and a website project.

#### The status so far

* Users and roles - more details below. Roadkill will now be using AspNetIdentity and get the extra features it supports. _(25% done)_.
* File uploads and management. Roadkill will support multi-cloud by default (S3, Azure). More details below _(25% done)_.
* It's Postgres only using Marten, as having so many databases to support was a major headache, even with an ORM. _(100% done)_
* It's cross platform and Dockerized _(100% done)_
* It now uses Elasticsearch for search. _(50% done)_
* It's markdown only, and has been rewritten to use Markdig for Markdown parsing. Subsequently extensions will not be supported for the v3 initial release. _(100% done)_
* HTML Sanitization is done using the [HtmlSanitization](https://github.com/mganss/HtmlSanitizer) library, which itself is derived from Roadkill v2! Go team. _(100% done)_
* Localization is now a separate project. _(100% done)_
* The API is fairly complete now, minus search and users _(80% done)_
* The admin UI hasn't been started. I'm looking at SPA framework like ReactJS for this. _(0% done)_
* The front end UI hasn't been started. Also SPA. _(0% done)_
* Mailing templates are to-do. [Mailkit](https://github.com/jstedfast/MailKit) is now being used by Roadkill to send mails. _(50% done)_
* Conversion from v2->v3 tool is to-do _(0% done)_

#### Users 

The main bulk of work that is currently being done on Roadkill is around users. It's being completely re-written using AspNet Identity. I've spent a fair amount of time writing [this library](https://github.com/yetanotherchris/marten.AspNetIdentity) that enables Marten support for the AspNetIdentity framework.

I am now exploring IdentityServer4.AspNetIdentity and IdentityServer4 to enable OAuth2 support (login via Twitter, Facebook, Google etc.). Also I'm exploring user interfaces for managing users and roles, with a long term goal of making a re-usable admin interface that can be used to manage AspNetIdentity users.

#### Files

Another library I've created that Roadkill will use is [CloudFileStore](https://github.com/yetanotherchris/CloudFileStore), which reads and writes files to various cloud providers - for now Google, AWS/S3 and Azure.

#### Summary

So in short, there's a lot happening around Roadkill, assembling components that v3 will use. Version 3 will be a complete re-write, but re-using a large chunk of the source code. I've wasted around 18 months on bumbling around with .NET Core betas an .NET 1.1, but now it's on track.

I should also mention I have commitments for Packt right now, for a new video, so my time is quite limited.

And any help with the front send SPA frameworks would be welcome.