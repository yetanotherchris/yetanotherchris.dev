---
Published: 2009-01-28
title: "C# Design patterns: the Strategy pattern"
author: Chris S
excerpt: "A summary and example of the strategy design pattern."
layout: post
permalink: /csharp/csharp-design-patterns-the-strategy-pattern/
dsq_thread_id:
  - 4207300078
tags:
  - 'c#'
  - design-patterns
---
## Summary

Multiple classes implement an interface, handling an algorithm in a different way. 

<!--more-->

## Example

Sorting is the clearest working example of the Strategy pattern. In .NET you'll find it in the IComparer interface alongside Array.Sort/LINQ, see the links section for an article on this on MSDN.

<script src="https://gist.github.com/yetanotherchris/4746350.js"></script>