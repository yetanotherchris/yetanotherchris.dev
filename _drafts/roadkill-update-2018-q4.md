---
title: Roadkill update, 2018 Q4
Published: 2018-07-28 18:25:04 +0000
author: Chris S
layout: post
date: 2018-11-01 09:26:25 +0000
shortpost: true
tags: []

---
[Roadkill version 3](http://github.com/roadkillwiki/roadkill) has been a long time coming, over 2 years in fact. The main reason for this has been the volatile nature of the .NET ecosystem of the past few years, and uncertainty of the .NET Standard/.NET Core roadmap, up until project.json was ditched recently.

The conversion started with a standard .NET Framework to .NET Core upgrade. This took about 6 months of my free time, and eventually got nowhere as the [number of changes between the framework was so great.](https://gist.github.com/yetanotherchris/197963aec1872c40bba515f8f95b7e0f)

I changed direction at the start of the year, and have now moved to a direct re-write of Roadkill, moving to an API-first approach. 

Roadkill v3 is an API project, and a website project. The status so far is:

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