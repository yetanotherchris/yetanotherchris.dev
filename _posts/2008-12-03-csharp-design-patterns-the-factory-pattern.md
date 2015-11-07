---
Published: 2008-12-03
title: "C# Design Patterns: the Factory pattern"
author: Chris S
excerpt: "A summary and example of the factory design pattern in C#."
layout: post
permalink: /csharp/csharp-design-patterns-the-factory-pattern/
dsq_thread_id:
  - 1072259537
tags:
  - 'c#'
  - design-patterns
---
### Summary

One class (the factory) creates instances of other classes which all implement the same interface or subclass a specific class. The factory optionally calls the method(s) of the instance it creates.

<!--more-->

### Example usage

Plugin architecture (implemented alongside reflective loading of types) is one good usage of the Factory design pattern. 

<script src="https://gist.github.com/yetanotherchris/4746259.js"></script>