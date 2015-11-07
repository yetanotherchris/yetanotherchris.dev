---
Published: 2009-01-13
title: "C# Design Patterns: the Singleton pattern"
author: Chris S
excerpt: "A summary and example of the singleton design pattern."
layout: post
permalink: /csharp/csharp-design-patterns-the-singleton-pattern/
dsq_thread_id:
  - 1074101178
tags:
  - 'c#'
  - design-patterns
---
### Summary

A class that only allows one instance of itself, which is accessed via a static property.

<!--more-->

### Example usage

The commonest example is an application only allowing one instance of itself, much like Windows Media Player does. Another example is a &#8216;global' instance of a class, which contains settings or config information. 

This is Jon Skeet's lazy implementation example. He has a full discussion on the various ways of implementing a singleton in C#, the example below being the final version. The full article can be found [here][1]

<script src="https://gist.github.com/yetanotherchris/4746293.js"></script>

 [1]: http://www.yoda.arachsys.com/csharp/singleton.html