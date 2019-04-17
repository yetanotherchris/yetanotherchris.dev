---
title: 'C# Design Patterns: the Factory pattern'
date: 2008-12-03 00:00:00 Z
permalink: "/csharp/csharp-design-patterns-the-factory-pattern/"
tags:
- csharp
- design-patterns
Published: 2008-12-03 00:00:00 Z
author: Chris S
description: A summary and example of the factory design pattern in C#.
layout: post
dsq_thread_id:
- 1072259537
---

### Summary

One class (the factory) creates instances of other classes which all implement the same interface or subclass a specific class. The factory optionally calls the method(s) of the instance it creates.

<!--more-->

### Example usage

Plugin architecture (implemented alongside reflective loading of types) is one good usage of the Factory design pattern. 

`gist:yetanotherchris/4746259`