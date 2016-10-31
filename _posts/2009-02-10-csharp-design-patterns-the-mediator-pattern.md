---
title: 'C# Design Patterns: the Mediator pattern'
date: 2009-02-10 00:00:00 Z
permalink: "/csharp/csharp-design-patterns-the-mediator-pattern/"
tags:
- c#
- design-patterns
Published: 2009-02-10 00:00:00 Z
author: Chris S
excerpt: A summary and example of the mediator design pattern.
layout: post
dsq_thread_id:
- 1074134407
---

### Summary

This pattern is best illustrated in code as the source describes it a lot more concisely than in prose.

<!--more-->

One central class (the mediator) is used by many &#8216;client' classes to send messages with (n.b. &#8216;client' is my own term not one from the original pattern description). A &#8216;client' or several &#8216;client' classes then have a reference to this mediator instance as a private field, and use it to send messages. The mediator has an event which each &#8216;client' subscribes to. This event is fired each time the mediator sends a message. 

### Example

A chat room could use the Mediator pattern, or a system where many &#8216;clients' each receive a message each time one of the other clients performs an action (for chat rooms, this would be when each person sends a message). In reality using the Mediator pattern for a chat room would only be practical when used with remoting. Using raw sockets wouldn't allow for the delegate callbacks (people subscribed to the Mediator class' MessageReceived event).

<script src="https://gist.github.com/yetanotherchris/4746404.js"></script>