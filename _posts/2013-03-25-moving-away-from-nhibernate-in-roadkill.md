---
title: Moving away from NHibernate in Roadkill
date: 2013-03-25 00:00:00 Z
permalink: "/umbraco/moving-away-from-nhibernate-in-roadkill/"
tags:
- roadkill-wiki
- nhibernate
Published: 2013-03-25 00:00:00 Z
author: Chris S
layout: post
---

In the next version of Roadkill (1.6) I've moved away from NHibernate, the ORM that has been powering it for two years since version 1 and to a commercially supported ORM called Lightspeed.

Unlike the [Umbraco drama][1] that emerged last year this wasn't for performance reasons or a badly engineered business layer. I give myself a big pat on back infact, as it was really simple to switch firstly to a Mongodb repository and then over to Lightspeed. Nor was it from lack of NH experience as I've used NH day to day for 3 or so years.

<!--more-->

MicroORMs became quite fashionable last year with the emergence of the highly optimised dapper as used on Stackoverflow and also Rob Connery's Tiny. The arguments against ORMs were quite well laid out then and pretty much apply to my decision: lack of control.

Having said that the conversion was complicated by the different way Lightspeed's LINQ provider works with sessions/unit of work. One thing I discovered during the conversion was that persistance ignorance (or ignorance of how the persistence is really working) works well until you want to tweak. NH just works until you have complex joins which you then of course tweak NH for. 

But this this was my main reason for changing: I needed to shell out lots of cash to effectively see how NHibernate was querying and using its cache and just don't see how learning about NH's foibles is any more productive than doing the same with stored procs.

It's slightly hypocritical to say this of course as I've replaced one ORM with another, albeit better supported and more clearly documented. So now Lightspeed sits in its place and with the addition of a custom tracelistener it outputs its sql and caching to log2console, making my world a better place.

 [1]: http://ayende.com/blog/156577/on-umbracos-nhibernates-pullout