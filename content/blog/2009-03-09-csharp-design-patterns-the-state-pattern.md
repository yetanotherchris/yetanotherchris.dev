---
title: 'C# Design Patterns: the State pattern'
date: 2009-03-09 00:00:00 Z
permalink: "/csharp/csharp-design-patterns-the-state-pattern/"
tags:
- c#
- design-patterns
Published: 2009-03-09 00:00:00 Z
author: Chris S
description: A summary and example of the state design pattern.
layout: post
dsq_thread_id:
- 1074224903
---

### Summary

Like a finite state machine but implemented using a class for each state, rather than an enumeration and/or switch statement. 

<!--more-->

### Example

A basic example would be a traffic light system - GreenState, AmberState, RedState. Each of the classes is expected to implement an IState() interface or subclass a base class which contains the states that can be moved from/to via methods. The pattern lends itself to allowing each class to handle the state it represents in more detail (and a lot easier to read and maintain) than a giant switch statement. The current state (called the Context) is passed to each class in each method. 

For games where your current state (context) is important, like (MMO)RPG games, the State pattern could be used. For example some games of this genre require you to have perform one action, say cast a specific spell, before you can perform another spell. 

`gist:yetanotherchris/4746689`