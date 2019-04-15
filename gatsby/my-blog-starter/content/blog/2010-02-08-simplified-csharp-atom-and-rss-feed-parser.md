---
title: Simplified C# Atom and Rss feed parser
date: 2010-02-08 00:00:00 Z
permalink: "/csharp/simplified-csharp-atom-and-rss-feed-parser/"
tags:
- c#
Published: 2010-02-08 00:00:00 Z
author: Chris S
excerpt: A set of snippets for parsing RSS and ATOM feeds.
layout: post
dsq_thread_id:
- 4207230687
---

.NET already has quite a few open source RSS and ATOM libraries for parsing feeds. The most complete one is [Argotic][1] but there are also 3-4 others on codeplex and google code.

**Update**   
.NET 4 now has built in RSS support in the framework in the [System.ServiceModel.Syndication][2] namespace. 

<!--more-->

A lot of the time these APIs are a bit overkill and bulky for what you need - the Link, Title, Content and Publish date. With LINQ-to-XML this is easily achievable with the the XDocument object and some basic node searching.

The only drawback with this method is it doesn't remove the namespaces from the nodes, which is why there are Where lookups going on instead of straight XName comparisons. When you have a namespace declaration in your XML document at the root, all XElement nodes than get called &#8220;{namespace}node&#8221;. XElement has an overriden comparison operator to compare with a string, but unfortunately it uses this full name instead of its LocalName property, which would just be &#8220;Node&#8221;.

I haven't done any performance comparisons but I will make a wild guess that it's faster than most feed APIs for parsing, as it ignores all the unwanted nodes. For downloading the feed versus a custom HttpWebRequest it may be slower as it uses the XDocument.Load method.

### Usage

<pre>FeedParser parser = new FeedParser();
var items = parser.Parse("http://www.ft.com/rss/home/uk",FeedType.RSS);
</pre>

### Source

Firstly the Item class for holding a Feed's metadata. You might want to add a Site property to this for grouping per site.

`gist:yetanotherchris/4773831`

Any bad publish dates are turned into DateTime.Min. The idea behind the virtual methods is that you can subclass and do something more. At present though these methods don't return an Item but the entire list so there isn't much gained from overriding them. Sometime in the future I will probably add it.

`gist:yetanotherchris/4773855`

 [1]: http://www.codeplex.com/Argotic
 [2]: http://msdn.microsoft.com/en-us/library/system.servicemodel.syndication.aspx