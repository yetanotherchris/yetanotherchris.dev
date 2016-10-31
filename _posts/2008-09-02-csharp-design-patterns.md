---
title: C# Design Patterns
date: 2008-09-02 00:00:00 Z
permalink: "/csharp/csharp-design-patterns/"
tags:
- c#
- design-patterns
Published: 2008-09-02 00:00:00 Z
author: Chris S
excerpt: This is the introduction to a series of 7 blog posts describing and illustrating
  common design patterns in C#, based on those found in the Gang of Four book.
layout: post
dsq_thread_id:
- 1072256499
---

### Contents

  * [Factory][1]
  * [Abstract Factory][2]
  * [Singleton][3]
  * [Strategy][4]
  * [Iterator][5]
  * [Mediator][6]
  * [Observer][7]
  * [State][8]
  * [Facade][9]
  * [The others][10]

### Introduction

**[Download example solution][11]**  
<!-- more -->

  
Featured above are 7 design patterns given with example source code along a brief summary and example code. The idea is to keep the summary and example brief, serving as an overview instead of an in-depth description of each. If you are after more detailed information on each pattern have a look at the links section at the end of the article, which includes books. These books along with the information online are where I've based my source code and descriptions from, and also from using them over the years -sometimes without realising its a known pattern and other times deliberately.

I haven't included any UML class diagrams to try to keep the article concise. If you find UML explains the class/interface relationships better then the Gang of Four and O'Reilly C# books all contain these and are definitely worth investing in. Or you can read the codeproject articles. The patterns aren't categorised either as you'll see.

The code examples are generally just the pattern itself (i.e. the classes/interfaces involved in the pattern) and not the types in use. The download link above contains a full solution of all 7 patterns (in Visual Studio 2008 format) with usage, so it's worth downloading this to get a clearer picture.

### Links

#### [Discover the Design Patterns You're Already Using in the .NET Framework][12]

MSDN article about the design patterns you've been using in the .NET framework perhaps without knowing.

#### [Ian Mariano's articles on codeproject.com][13]

A series on design patterns in C#, with UML diagrams and categorised like the gang of four book into creational, behavioural, structural patterns.

#### [Wikipedia][14]

Scroll to the bottom of the page for a list of patterns. Features some clear and concise example source code, mostly in Java.

#### [Design patterns : elements of reusable object-oriented software][15]

The original &#8220;gang of four&#8221; book, has clear descriptions and UML class diagrams.

#### [C# 3.0 Design patterns][16]

Quite a decent book with UML diagrams of each pattern. A little bit patchy with code examples in places, and the code is far from the FX-cop standards.

#### [Martin Fowler's website][17]

The author of Patterns of Enterprise Application Architecture, another patterns book geared at software for the &#8220;enterprise&#8221; (not star trek).

 [1]: /csharp/csharp-design-patterns-the-factory-pattern
 [2]: /csharp/csharp-design-patterns-the-abstract-factory-pattern
 [3]: /csharp/csharp-design-patterns-the-singleton-pattern
 [4]: /csharp/csharp-design-patterns-the-strategy-pattern
 [5]: /csharp/csharp-design-patterns-the-iterator-pattern
 [6]: /csharp/csharp-design-patterns-the-mediator-pattern
 [7]: /csharp/csharp-design-patterns-the-observer-pattern
 [8]: /csharp/csharp-design-patterns-the-state-pattern
 [9]: /csharp/csharp-design-patterns-the-facade-pattern/
 [10]: /csharp/other-design-patterns
 [11]: /wp-content/uploads/2013/02/designpatterns.zip
 [12]: http://msdn.microsoft.com/en-gb/magazine/cc188707.aspx
 [13]: http://www.codeproject.com/script/Articles/MemberArticles.aspx?amid=52003
 [14]: http://en.wikipedia.org/wiki/Design_Patterns
 [15]: http://www.amazon.co.uk/Design-patterns-elements-reusable-object-oriented/dp/0201633612/ref=sr_1_2?ie=UTF8&s=books&qid=1216066920&sr=8-2
 [16]: http://www.amazon.co.uk/3-0-Design-Patterns-Judith-Bishop/dp/059652773X/ref=sr_1_4?ie=UTF8&s=books&qid=1216066920&sr=8-4
 [17]: http://martinfowler.com/articles/writingPatterns.html