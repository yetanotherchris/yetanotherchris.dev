---
title: A look at .NET Object Relational Mappers (ORM)s
date: 2009-09-09 00:00:00 Z
permalink: "/orm/a-look-at-net-object-relational-mappers-orms/"
tags:
- ".net"
- orm
Published: 2009-09-09 00:00:00 Z
author: Chris S
description: 'This post looks at the many different ORM (object relational mappers) that
  exist for C#/.NET. These Object Relational Mappers aim to bridge the gap that exists
  between database servers and their native SQL, and the object-oriented world of
  non-tabular data. My main source for the ORMs I chose to look at were from csharp
  source and wikipedia along with a codeplex search, and just general knowledge of
  the products out there. I''ve excluded dead links from wikipedia, commercial ORMs
  (of which lots also exist) and narrowed it down the ones that seemed fairly mature
  and easy to assess from available walkthroughs. '
layout: post
dsq_thread_id:
- 1077609778
---

### Contents

  * [db4o][1]
  * [Linq to Entities/Entity framework][2]
  * [SOODA][3]
  * [Persistor .NET Express][4]
  * [NPersist][5]
  * [Subsonic][6]
  * [ODX][7]
  * [NHibernate / Active Record][8]
  * [Coolstorage][9]
  * [Lightspeed][10]
  * [Lllbgen][11]

<!--more-->

### Introduction

This post looks at the many different ORM (object relational mappers) that exist for C#/.NET. These Object Relational Mappers aim to bridge the gap that exists between database servers and their native SQL, and the object-oriented world of non-tabular data. 

My main source for the ORMs I chose to look at were from csharp source and wikipedia along with a codeplex search, and just general knowledge of the products out there. I've excluded dead links from wikipedia, commercial ORMs (of which lots also exist) and narrowed it down the ones that seemed fairly mature and easy to assess from available walkthroughs. 

I've been using ORMs since around 2005 in both proprietary and open source format, but right now I use NHibernate and ActiveRecord in my daily job. Having used this for almost a year I was curious what the competition was like 3 years on and being indoctrinated into the Active Record pattern, which once you start using makes others seem clumsy. I wouldn't be switching anytime soon as NH/AR are my job (and as I found out I wouldn't want to) but I did manage to test Subsonic and the Entiy Framework quite extensively with the Soot project I've been making. 

Anyway, my criteria for assessing and ORM was: 

  * &#8220;Turnkey&#8221; abilities of it, or how easy it is to just dive in
  * The documentation, support (through forums, FAQ, knowledge bases)
  * The date of the last release, to indicate how fresh/stale the project is
  * Ease of use and flexibility of the API
  * Caching and performance
  * Others: inheritance, complex relationships, concurrency

The 2 most important features, in my view, of an ORM though are: 

  * Querying - dynamic filtering, quality of SQL produced, joining, paging, eager/lazy loading
  * Save/Create and unique id handling and ease of use of CRUD operations

### Links

  * [CSharp-source details][12]
  * [SharpToolBox list][13]
  * [Wikipedia article][14]

### Additional resources

  * [Entity Framework FAQ][15]
  * [Entity framework Howto videos][15]
  * [Entity framework Channel 9 article][16]

### NHibernate

  * [NHibernate manual][17]
  * [Quick start guide, tools, docs etc.][18]
  * [Codeproject articles about NHibernate][19]

 [1]: /tags/orm/a-look-at-net-orms-part-1#db4o
 [2]: /tags/orm/a-look-at-net-orms-part-1#linqtoentities
 [3]: /tags/orm/a-look-at-net-orms-part-1#sooda
 [4]: /tags/orm/a-look-at-net-orms-part-2#persistor
 [5]: /tags/orm/a-look-at-net-orms-part-2#npersist
 [6]: /tags/orm/a-look-at-net-orms-part-2#subsonic
 [7]: /tags/orm/a-look-at-net-orms-part-3#odx
 [8]: /tags/orm/a-look-at-net-orms-part-3#nhibernate
 [9]: /tags/orm/a-look-at-net-orms-part-3#coolstorage
 [10]: /tags/orm/a-look-at-net-orms-part-3#lightspeed
 [11]: /tags/orm/a-look-at-net-orms-part-3#lllbgen
 [12]: http://csharp-source.net/open-source/persistence
 [13]: http://sharptoolbox.com/categories/object-relational-mappers
 [14]: http://en.wikipedia.org/wiki/List_of_object-relational_mapping_software
 [15]: http://blogs.msdn.com/adonet/archive/2008/05/20/how-do-i-new-entity-framework-videos.aspx
 [16]: http://channel9.msdn.com/shows/Going+Deep/ADONET-Entity-Framework-What-How-Why/
 [17]: http://www.scribd.com/doc/2567151/nhibernate-reference
 [18]: http://nhforge.org/
 [19]: http://www.codeproject.com/info/search.aspx?artkw=nhibernate&sbo=kw