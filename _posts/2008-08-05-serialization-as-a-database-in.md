---
Published: 2008-08-05
title: "Serialization as a database"
author: Chris S
excerpt: "Using serialization as persistent object store (in non bs-bingo: a database)"
layout: post
permalink: /csharp/serialization-as-a-database-in/
dsq_thread_id:
  - 
tags:
  - 'c#'
  - serialization
---
[Download][1]

This app from 2004 demonstrates serialization in its simplest form, in particular for use as a storage medium. The demo creates 20,000 &#8220;Product&#8221; objects, adds them to a collection, and serializes the collection. It's a basic app, it was made to test whether serialization can be used for storing data (&#8216;persisting') efficiently.

<!--more-->

So long as the objects are simple and the collection is quite small, it's viable. In this example it takes around 10 seconds to deserialize and load the 20,000 objects into a listview.

There are of course far better ways of storing objects to disk. The object framework page has more details of this.

A project called Prevalance, taken from Java, uses the notion that RAM is so cheap now that you could store all your objects in memory all the time, and simply serialize them at checkpoints (hourly or daily). It takes it one step further than this by also recording the methods that were performed on the object and their state (much like a RDBMS transaction log). The project is used as a cache in HHibernate but hasn't really been updated since 2003. The site says it is a lot faster than using a RDBMS though I personally wouldn't want to use it for anything outside of caching.

 [1]: /storage/downloads/serializationdemo.zip