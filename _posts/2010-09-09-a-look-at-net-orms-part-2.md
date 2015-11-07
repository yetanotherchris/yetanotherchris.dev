---
Published: 2010-09-09
title: "A Look At .NET ORMs - Part 2"
author: Chris S
excerpt: "Part two of the ORM series looks at Persister.NET, NPersist, Paladin and Subsonic"
layout: post
permalink: /orm/a-look-at-net-orms-part-2/
dsq_thread_id:
  - 4207232490
tags:
  - .net
  - orm
---
<a name="persitor"></a>

### Persistor.NET Express

[www.persistor.net][1]

Persistor is a commercial ORM but features a community edition like many commercial software tools do now. I tried it out but didn't bother writing any CRUD code with it, or querying as its free version was really too restrictive to be any use to anyone except the complete ASP.NET beginner doing their first website. 

<!--more-->

#### The Pros

  * Works with zero configuration with SQL Express, defines and creates the schema for you
  * As with db4o, this makes automated testing a lot easier
  * Good documentation
  * As it's commercial it has regular updates

#### The Cons

  * (Free edition) SQL Server Express only
  * Uses a very strange way of storing objects - doesn't just map tables to classes and columns to properties, but seems to use SQL in a non-relational way.
  * Doesn't use joins for its schema - relationships are added as columns on the table, e.g. Employee.Person.Name would be stored as a column called Employee.Person.Name.
  * Doesn't work with existing databases
  * Doesn't support nullable types
  * (Free edition) no lazy loading or retrieving objects by id.
  * Not as flexible as other ORMs
  * Forum is a ghost town
  * Seems to store POCOs (plain old CLR objects) definitions in the database too.

#### Example

<script src="https://gist.github.com/yetanotherchris/4959811.js"></script>

### Paladin

[www.codeplex.com/paladin][2]

I've used Paladin previously for some mid-sized projects. It works in the way the Entity Framework works, by having a generator create your entity classes for you, it differs though as it uses the Active Record pattern approach, where you save on the domain objects themselves, e.g Person person = new Person(); person.Save(); 

The codeplex project doesn't link to the forums but they can be found here: community.sgdotnet.org/forums/50.aspx and the documentation at community.sgdotnet.org/forums/t/3332.aspx. 

The framework was available from this site before it reached codeplex in 2007. It seems to be a dead project now so it wouldn't be advisable for anything except to play around with, and pros and cons seem a bit useless as it doesn't compete with the other ORMs really, I just thought I'd give it a mention. 

<a name="npersist"></a>

### NPersist

[www.codeplex.com/PuzzleNPersist][3]   
[www.puzzleframework.com][4] 

NPersist is one of the contenders for NHibernate/ActiveRecord in my view, and has a lot of features that sell an ORM to me. The main of these is querying via linq, comprehensive documentation and being able to specify relationships in attributes or XML. Unfortunately the forum seems to be a bit dead since February 2008 and all the examples are locked inside a doc file instead of on the website. This can make finding details via search engines difficult. 

All operations in NPersist work via a session, or context (facade class). Unlike the Entity framework though, this doesn't appear to lose its scope but does mean you end up passing the context around outside the &#8220;business layer&#8221; if you need to perform tasks in other worker classes (for example, if you had namespace that performed all crawling of websites in a search engine). 

#### The Pros

  * Supports XML entity definition files, and also attributes
  * Thorough documentation - 200 page manual
  * Impressive feature list
  * Has its own query language NPath, just like SQL and also linq.
  * Includes validation
  * All new objects are created via a factory class, making object identity confusion less messy.

#### The Cons

  * Only 3 contributors (though this isn't really a small amount)
  * Last updated in February and quiet forums
  * No web-based help, it's all inside a large Word document.
  * All new objects are created via a factory, making &#8220;offline&#8221; creation hard, or meaning the context has to be passed around.
  * As with the Entity Framework, NPersist's context model means all the object belong to the context they were created in, although it's not as restrictive (i.e. doesn't have the one context only bug) as the EF one.

#### Example

<script src="https://gist.github.com/yetanotherchris/4959801.js"></script>

<a name="subsonic"></a>

### Subsonic

[www.codeplex.com/subsonic][5]

**Update:**   
Version 3 is now available, and is a complete rewrite. It has some nice new features including T3 templates, LINQ support and a SimpleRepository that allows you to persist basic classes (no relationships are supported) with the need for attribute decoration.

The information and code below is based on Subsonic 2.

Subsonic is a kind of amalgamation of the Entity framework and ActiveRecord with no custom querying language. The whole package is very slick and friendly to use. I was put off by the generator and reams of code that it produced, even though it was very quick to get going. It has the clever facility for working with the web 2.0 style web apps (app*data folder style) via its own build provider, though this style of project isn't something I use and have never liked the app*data etc. model. 

#### The Pros

  * Uses the Active Record pattern
  * 9 Contributors
  * Good documentation howtos and active forums
  * Last update August 2009
  * Well marketed so there's plenty of guides for getting started and performing tasks
  * Bundled with a useful winforms app for editing data with.
  * Intuitive and fast to use
  * Querying is performed using method names for SQL actions - .InnerJoin() and so on.

#### The Cons

  * Relies on the generator to produce your entity classes, doing it manually is like the Entity framework - lots of work is involved.
  * &#8220;Subsonic <3&#8221;, &#8220;All your database belong to us&#8221; - The Conservative world of enterprise middle tier just isn't ready for the netspeak!
  * I had problems with the SQL parser (Ansi92 generator), it suffered from null reference exceptions doing a 3 table joins. But being open source atleast I could find the bug 

#### Example

<script src="https://gist.github.com/yetanotherchris/4959794.js"></script>

[Part 3 >>][6]

 [1]: http://www.persistor.net/
 [2]: http://www.codeplex.com/paladin
 [3]: http://www.codeplex.com/PuzzleNPersist
 [4]: http://www.puzzleframework.com
 [5]: http://www.codeplex.com/subsonic
 [6]: /orm/a-look-at-net-orms-part-3