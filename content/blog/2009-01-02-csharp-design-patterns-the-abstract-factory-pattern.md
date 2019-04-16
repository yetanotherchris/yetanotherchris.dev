---
title: 'C# Design Patterns: the Abstract Factory Pattern'
date: 2009-01-02 00:00:00 Z
permalink: "/csharp/csharp-design-patterns-the-abstract-factory-pattern/"
tags:
- c#
- design-patterns
Published: 2009-01-02 00:00:00 Z
author: Chris S
description: A summary and example of the abstract factory design pattern.
layout: post
dsq_thread_id:
- 1072257829
---

### Summary

The abstract factory is the base class of all factory classes, but is responsible for creating instances of the classes that are derived from it (via a static method). 

It goes one step further after this, so each derived class creates an instance of another abstract class (Renderer in my example) specialized for its use.

<!--more-->

### Example usage

As the code below illustrates, a common use is for abstracting GUI elements out, so that that each different concrete factory creates components for a different platform, this could be an operating system or device like the web/windows. This is a fairly common example that's found in the Oreilly C# book and on wikipedia. 

`gist:yetanotherchris/4746280`