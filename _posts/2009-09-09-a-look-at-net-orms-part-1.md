---
Published: 2009-09-09
title: "A Look At .NET ORMs - Part 1"
author: Chris S
excerpt: "Part one of look at .NET ORMs, including examples of using db4o, Linq to Entities, Sooda,"
layout: post
permalink: /orm/a-look-at-net-orms-part-1/
dsq_thread_id:
  - 1077619711
tags:
  - .net
  - orm
---
[Back to contents][1]

I'm not going to waste the article waxing about how these make an ORM useful as there's plenty of sites out there that describe the concepts of ORMs, on codeproject and blogs. So first of all I'll introduce you to one of my favourite non-ORM, ORMs. 

<!-- more-->

<a name="db4o"></a>

## db4o

[www.db4o.com/][2]

db4o is an object database, and not strictly an ORM. Its intention is be an embedded database along the lines of SQL Lite. Unlike SQL Lite, it contains its own API for CRUD operations and querying, rather than an ADO.NET driver. I thought I'd include here anyway as I've had good experiences using it in the past. 

db4o comes in both Java and .NET form much like Hibernate (except the .NET version has equal love to the Java one). It's released under the GPL and if you're not releasing your project as GPL'd, you need to buy a commercial license. It's particularly good for personal projects or projects with small amounts of data as it's very fast to develop with and stores itself, like SQL Lite, in a .db file. 

### The Pros

  * As it's commercial, it's updated a lot - Has query by example, basic and advanced querying - Easy to backup and move databases about with just a .db file - No need for config files with connection strings - Testing is simplified as everything is in memory, no need for dummy data scripts - No worrying about object states, concurrency as its handled by the db4o database engine. - Version 7 supports LINQ to its own query engine, and using LINQ on the compact framework. - Good tutorial with lots of examples - Includes an object viewer to view your saved objects with. 

### The Cons

  * Doesn't scale well with heavy objects above 1m records in my experience (using version 5.x). This may have changed since then. Of course d4bo can counter for this by saying it's intended for embedded use and not as a replacement for an enterprise RDBMS.
  * Slow to query large sets when the objects are &#8216;heavy'.
  * Support takes a while on the forum
  * Requires your objects to be in memory (as it uses its own Id generation for objects) - detached updates are a pain to do.

I mention it's slow with large amounts of data, especially textual data as I tried to write an ASP.NET forum using it, but came to a dead end when it came to querying strings and working with large post data. It is quicker with 30,000 objects than mySQL/Hibernate though, as their benchmark shows: www.db4o.com/about/productinformation/benchmarks/ which is probably a lot more than the amount of objects I'd imagine most people choosing an ORM would have. 

### Example

<script src="https://gist.github.com/yetanotherchris/5004085.js"></script>

<a name="linqtoentities"></a>

## Linq to Entities / Entity framework

[MSDN entity framework page][3]

LINQ to Entities and the Entity framework is Microsoft's attempt (a word which most people seem to accredit it) at building an ORM into the .NET framework. It was released with 3.5 SP1 under the System.Data.Entities namespace, and has tools built into Visual Studio 2008 SP1 to work with it. 

It works but defining all your entities and their relationships in an XML file. You then specify this XML file in your connection string, and change your provider to the entities provider. You then have to create your own classes than implement various classes. All saving and loading is done via one facade class. Visual Studio 2008 SP1 produces these classes for you automatically in a &#8220;designer.cs&#8221; file that it makes by looking at your databaes schema. You can then rename the properties and relationships in a UML-esque designer. 

### The Pros

  * Microsoft are behind it, so it's guaranteed to have an active team and updates and not just be a pet project occasionally looked at.
  * Produces very clean and efficient SQL without tweaking
  * Allows you to use LINQ on objects to produce the SQL
  * Lazy loading is enabled by default, to load collections you have to use Load()
  * Uses the recognisable conventions of ADO.NET, a connection string to indicate where the entity definition XML file is.
  * Easy to implement caching system

### The Cons

  * Very patchy documentation, except 5 walkthrough videos. Most information is found through the ADO.NET blog (see the links at the bottom of the page for a selection of links)
  * The class hierarchy makes it hard to manually edit the classes, as so many events and attributes are required by your implementing class.
  * Visual Studio designer doesn't produce meaningful property names
  * The whole XML entity format is the usual overly verbose Microsoft style. 400 lines for 4 database tables of 4-5 columns each.
  * The session class is inflexible and you end having to place business code everywhere. You can't update outside the original scope. This is a restriction of version 1 however.

### Example

<script src="https://gist.github.com/yetanotherchris/5004068.js"></script>

<a name="sooda"></a>

## SOODA

[sooda.sourceforge.net/][4]

I couldn't get the tool to work in Sooda, it just froze each time I used it (which could be a Visual Studio 2008 issue), so I can only list the features of it 

  * 8 developers and a stable release
  * Started in 2003, last update (v.1) August 2007.
  * The mailing list seems to have died since 2007, and the forums
  * Works like NHibernate: an XML file to describe your entities and their relationships.
  * Supports SQL Server, mySQL, Postgres, Oracle 8
  * Comes with an installer.
  * Has a good amount of documentation - virtually a whole book's worth - on a single web page
  * Includes a tool to reverse engineer a database.
  * Supports before and after update/insert events for objects and fields.
  * Contains NHibernate-esque Level 1 and Level 2 cache systems.
  * Has its own SQL like query language SOOQL, plus a converter class to convert to SQL and back.

### Example

<script src="https://gist.github.com/yetanotherchris/5004059.js"></script>

[Part 2 >>][5]

 [1]: /orm/a-look-at-net-object-relational-mappers-orms/
 [2]: http://www.db4o.com/
 [3]: http://msdn.microsoft.com/en-us/library/aa697427(VS.80).aspx
 [4]: http://sooda.sourceforge.net/
 [5]: /orm/a-look-at-net-orms-part-2/