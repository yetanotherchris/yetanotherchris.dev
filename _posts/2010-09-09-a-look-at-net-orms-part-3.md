---
Published: 2010-09-09
title: "A Look At .NET ORMs - Part 3"
author: Chris S
excerpt: "The final part of .NET orm series, looking at ODX, NHibernate, CoolStorage and Lightspeed."
layout: post
permalink: /orm/a-look-at-net-orms-part-3/
dsq_thread_id:
  - 1077619867
tags:
  - .net
  - orm
---
<a name="odx"></a>

### ODX

[www.codeplex.com/odx/][1]

This project looks like a one-man ORM. It uses ActiveRecord's attribute idea to mark classes as tables and properties as columns. You have to also inherit your classes from a base Entity class to denote that they should be persisted. 

<!--more-->

It supports SQL Server, Oracle and Access. Querying is done via a form of SQL where the parameters are specified with the usual &#8220;?&#8221; holders. Lazy loading is the default behaviour for it on collections, and operations are done via a session/context facade class. 

#### The Pros

  * PDF overview to get started quickly
  * Attributes on classes and properties makes mapping to tables fast (although some might say this polutes the Domain Model, if you like your domain models skinny and non-functional).
  * Supports &#8220;offline&#8221; editing of objects, then going back online and it synchronising
  * Has logging and caching inbuilt
  * Has 13 sample projects that come with it
  * Has some nice features for saving state at certain points, going back online.
  * Intuitive API in the session object for retrieving/saving.

#### The Cons

  * Only one contributor
  * Initiation makes you pass ADO.NET objects around with DbFactorys.
  * The only documentation is in CHM format
  * Last updated November 2007, but 1.6 release.
  * A few unanswered messages on codeplex, and a lack of any forum or community

<a name="nhibernate"></a>

### NHibernate / ActiveRecord

[www.nhforge.org/][2]   
[www.castleproject.org][3] 

Lastly is Active Record, an open source project that sits ontop of NHibernate using the Active Record pattern. Before I describe Active Record I'll go into some brief detail about NHibernate. As I mentioned above I use the two in my job so this section will be longer than the rest. 

NHibernate is the .NET port of the Java Hibernate project. The Hibernate project itself is quite mature (currently version 3) and has a large community surrounding it, plus several books in print. So it's obviously trusted by people to as an ORM. 

NHibernate isn't a carbon copy of the Hibernate project, but rather a project run by one Hibernate contributor full time, and a couple of others, one of which now works at Microsoft. As it is taken from Java, it contains some esoteric java-esque ways of doing things that can maybe befuddle people aren't familiar Java, mostly in the interface and hierarchy of the classes. This is all nomenclature however. NHibernate receives a fair amount of downloads on Sourceforge where it's hosted, around 500+ downloads per day. It has 22 people involved with the project. 

NHibernate uses XML to define its entity to table mappings and relationships. These XML files are embedded as resources into your binary, which NHibernate scans, and provides mappings to the classes you have specified in the XML. All operations are performed by Session object (like a facade class) for CRUD activities. The session has various different modes of operation to ensure you have concurrency and non dirty read/writes. 

For querying you have 3 options: criteria API, query by example (which uses the criteria api), and HQL which is an object oriented version of SQL. In HQL you can use something like SELECT p from Person p WHERE p.Address.PostCode='SW1&#8242;. 

Castle ActiveRecord sits as a layer on top of NHibernate, and provides several new features. The main features is you no longer have to define your class to table relationships in an XML file. Instead you simple add attributes to the classes and properties of the class to indicate which table or column they map to. So on a class you would add [ActiveRecord(&#8220;MyTable&#8221;)] and on one of its properties, [Property(&#8220;MyColumn&#8221;)]. ActiveRecord then reads these attributes once at start up, and creates the NHibernate XML mappings for you. 

ActiveRecord also obviously implements the Active Record pattern. This allows you to subclass the ActiveRecord class by your data classes, which then in turn gives you a set of methods relating to CRUD activities. For example you could now perform user.Save(), user.Delete() on your class. 

Other features it adds include automatic session management, a set of &#8216;helper' methods for querying, and also a way of using a façade class (ActiveRecordMediator) to perform CRUD actions without using the activerecord pattern. The Pros and conns listed below are for ActiveRecord rather than NHibernate. 

#### The Pros

  * Fast to get going and intuitive to use
  * Provides both the ActiveRecord model, and the facade or dao model via a ActiveRecordMediator class
  * Has a lot of web-based documentation on the Castleproject website
  * Lots of forum activity
  * Access to NHibernate's toolbox when you need it, and has its own SimpleQuery,HQLBasedQuery as helpers.
  * Provides validation
  * Ability to tie into save,update etc. events
  * Unlike other ORMS (though this is mostly a feature of NHibernate) - no messy domain model source code with 10s of event handlers and attributes - all base classes are cleanly done
  * Simplifies NHibernate session management with ASP.NET

#### The Cons

  * Slow initial load up time (for debugging)
  * For complex scenarios, it can often be slower to produce a result than simply writing raw SQL
  * Hasn't been updated for NHibernate 2.0, making it a year old
  * Doesn't work with NHibernate's 2nd level SysCache as it's compiled with a different version of NHibernate. To get it working you have to get the SysCache project and recompile it
  * Scarce MSDN style documentation that doesn't have many solid examples
  * Examples normally end up searching the forums or blog posts.
  * yourobject.FindAll() doesn't perform any eager fetch/join strategy by default, producing huge amounts of SQL and also doesn't make use of 2nd level caching
  * Confusion can arise with how the relationships are mapped onto their NHibernate versions
  * Lazy loading requires every property and method in the class to be virtual - interfaces aren't supported I got this wrong, ActiveRecord does support interfaces, so map the entity to an interface, mark the implementing class as Lazy=True and it functions the same way as marking properties as virtual.
  * Primary key issues can occur with custom ids
  * The main developer is now at Microsoft, so Castle is no longer used day to day for his income

#### Example

<script src="https://gist.github.com/yetanotherchris/4959845.js"></script>

<a name="coolstorage"></a>

### Coolstorage

[www.codeplex.com/CoolStorage][4]

The first of the three ORMs I've added to the list is Coolstorage. This is a sole creation of Philippe Leybaert. He has also written the templating engine SharpTemplate, and a runtime dynamic evaluator called LazyParser.NET. Coming from an Active Record background Coolstorage has now found its way to getting the &#8216;prestigious' accolade of &#8220;my favourite of the alternative ORMs&#8221; (alongside db4o perhaps). Everything about it is geared towards what I think ORMs should be about: fast application development with an easy to use API and querying. No worrying about the ORM catering for all situations that rarely occur, and most importantly it produced very good SQL.

My tests were based with a small applications - around 5 domain objects - but I can tell that Coolstorage could scale up for larger sets of domain objects. Its work item pattern also means that it's well suited for web development. If you are use to HQL and NHibernate, it also has object notation for querying. With Philippe Leybaert's experience with LazyParser.NET you can be fairly certain the use of reflection and query parsing is optimised in it as well. This forum post has more details. 

#### The Pros

  * Well written 17 page PDF documentation which covers most topics - No need for contexts, everything is done using the unit of work pattern - Implements the 90% rule that the Lightspeed documentation talks about (see below) - Good optimised SQL produced for SQL Server - good with joins and minimum fuss for eagerness (tested with a simple one-to-many relationship) - Easy to use API, the CSList collection class is good to work with. - Easy to adapt classes, no designer required. - Intuitive and easy paging syntax - Object notation is supported for filtering, plus iterating through individual elements (much like HQL) and also some inbuilt scalar/aggregate functions in this notation. - Fairly active forums

#### The Cons

  * No cache
  * Documentation is limited to the PDF, no example solution.
  * Requires your domain objects to inherit from the CSObject base class, which might hinder inheritence
  * Requires all properties on your class that store data to be abstract
  * Forum lacks FAQs or common problems
  * Only one active developer
  * I had Issues with saving relationships (cascading updates)

#### Example

<script src="https://gist.github.com/yetanotherchris/4959829.js"></script>

<a name="lightspeed"></a>

### Lightspeed

<http://www.mindscapehq.com/products/lightspeed> 

Lightspeed was recommended from the comments below (before I switched to google friend connect), I hadn't heard of it from the any of the ORM product pages. Lightspeed has a good free/commercial license based on the number of domain objects your application uses. It is the product of Mindscape - two MVPs from New Zealand. It has a very active forum with the benefit of decent support coming from the commercial side. 

The documentation is very complete and also covers some theory of ORMs such as the unit of work pattern from Fowler. The documentation makes an interesting point about Lightspeed's philosophy behind ORMs: it is designed to cover &#8220;the 90% rule&#8221;. This 90% rule is concerned with the average usage of an ORM, and uses NHibernate as an example. NHibernate has many bits of functionality included that are rarely used by 90% of the applications you want to write, but make it slower to write the majority applications. In other words it tries to cater for all situations that an ORM will be used rather than just making do with fitting the majority of scenarios. This isn't really unique to ORMs but seems to be a downfall of (object-oriented) programmers: trying to cater for every possible future use and being as generic as possible. Jeff Atwood from codinghorror.com [describes it a bit more eloquently][5] in this post about writing regexs. 

Lightspeed is a mature product and well supported. However my main beef with it comes from the way you have to name columns in the database. Your database column names are meant to be the same as your object property names (with a little bit of flexibility) so mapping to existing databases isn't that easy. It can be done by implementing the INamingStrategy interface, and using this implemented class in the context object's NamingStrategy property which is what I ended up doing. Your setters in the properties also have to call the base class' Set() method with the value by reference, although this (combined with the column names) avoids the use of reflection. I prefer the attribute method for declaring properties/mappings to tables even if it means a performance penalty, as caching and the cost of hardware now rarely makes it an issue. This is down to preference instead best practices. 

If you're starting from fresh with a database and want to produce an application quickly then Lightspeed is worth a look at, and comes with a large solution of example projects and tests related to the theory of ORMs. 

#### The Pros

  * Thorough documentation and big example solution
  * Nice commercial/freeware models
  * Lack of reflection for saving and loading from the database increases performance
  * Active forum and support
  * Lots of performance options and identity options
  * Supports linq
  * Simple to use with most applications

#### The Cons

  * Column names in the database must match the properties, unless you implement an interface
  * Absence of attributes makes it less intuitive than ActiveRecord/Coolstorage/NPersist to apply to your domain objects in code
  * I found one to many relationships harder to configure than other ORMs

#### Example

<script src="https://gist.github.com/yetanotherchris/4959824.js"></script>

<a name="lllbgen"></a>

### Lllbgen

[www.llblgen.com][6]

Last of the updates is Llbgen. I said at the top I'd exclude commercial ORMs but I decided I might as well include this from the comments below, and the fact I've added Lightspeed too. Llbgen has been around for a long time in the ORM market and has a list of blue chip clients on its homepage to get you interested. Its name isn't the most memorable, infact I had to go back and check when I was writing this as I couldn't remember the last 4 letters. It's basically a designer ORM and much like Subsonic, isn't geared towards writing domain object code in source. 

Everytime you need to update a class, you have to update it in the designer. The designer produces a huge amount of classes and is really not that intuitive to use. Unlike all the others listed in this article, I actually had trouble finding the right façade class or domain class to use to get objects back, even with the documentation. 

One plus with being a commercial product is you (usually) get thorough documentation. The biggest time drainer for Open Source products and where a lot ultimately fail is the lack of documentation and example usages. LLbgen has decent amounts of documentation and a lot of examples in the form of a solution. 

I won't list off the the pros and cons of the product as I didn't get far enough to do this. Once I realised it was a designer only and that I couldn't achieve even basic querying without a hour of configuring it I gave up.

 [1]: http://www.codeplex.com/odx/
 [2]: http://www.nhforge.org/
 [3]: http://www.castleproject.org
 [4]: http://www.codeplex.com/CoolStorage
 [5]: http://www.codinghorror.com/blog/archives/001016.html
 [6]: http://www.llblgen.com