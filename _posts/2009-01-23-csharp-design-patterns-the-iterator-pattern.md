---
Published: 2009-01-23
title: "C# Design Patterns: the Iterator pattern"
author: Chris S
excerpt: "A summary and example of the iterator design pattern."
layout: post
permalink: /csharp/csharp-design-patterns-the-iterator-pattern/
dsq_thread_id:
  - 4207300352
tags:
  - 'c#'
  - design-patterns
---
### Summary

Iterate through a list of items, with an enumerator class ordering the set/list before it is iterated through. 

<!--more-->

### Example

Iterators are built into C# via foreach statements and IEnumerator. The iterator is the foreach statement, which requires the object it is iterating through to implement IEnumerator. The foreach statement calls GetEnumerator on the collection or class you specify. With the introduction of the yield keyword into C# this has been made even simpler.

<script src="https://gist.github.com/yetanotherchris/4746312.js"></script>

The output is:

<pre>Andrew
(Gemini)
Berfa
(Cancer)
Fred
(Aquarius)
Hans
(Pisces)
Zach
(Scorpio)
</pre>