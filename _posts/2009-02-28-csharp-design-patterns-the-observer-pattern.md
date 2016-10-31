---
title: 'C# Design Patterns: the Observer pattern'
date: 2009-02-28 00:00:00 Z
permalink: "/csharp/csharp-design-patterns-the-observer-pattern/"
tags:
- c#
- design-patterns
Published: 2009-02-28 00:00:00 Z
author: Chris S
excerpt: A summary and example of the observer design pattern.
layout: post
dsq_thread_id:
- 1074143144
---

### Summary

Very similar to the Mediator pattern. The only difference is the &#8216;clients', or the Observers as they are now called, don't broadcast via the mediator (now called the Subject). The observers just sit and listen for event(s) being broadcast by the Subject. The subject can be doing anything it likes completely independent of the Observers; the observers as the name implies just observe, they aren't expected to interact with the subject in the pattern. 

<!--more-->

### Example

System messages is one example of the Observer pattern - where lots of Observers sit listening for various different messages. In Java ActionListeners implement a form of the Observer pattern (and Command pattern), in C# the delegate callback system for events makes the Observer pattern transparent with the syntax of the language. You can find examples of this with events in control libraries. 

<script src="https://gist.github.com/yetanotherchris/4746426.js"></script>