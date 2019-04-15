---
title: 'C# Design patterns: the Strategy pattern'
date: 2009-01-28 00:00:00 Z
permalink: "/csharp/csharp-design-patterns-the-strategy-pattern/"
tags:
- c#
- design-patterns
Published: 2009-01-28 00:00:00 Z
author: Chris S
excerpt: A summary and example of the strategy design pattern.
layout: post
dsq_thread_id:
- 4207300078
---

## Summary

Multiple classes implement an interface, handling an algorithm in a different way. 

<!--more-->

## Example

Sorting is the clearest working example of the Strategy pattern. In .NET you'll find it in the IComparer interface alongside Array.Sort/LINQ, see the links section for an article on this on MSDN.

`gist:yetanotherchris/4746350`