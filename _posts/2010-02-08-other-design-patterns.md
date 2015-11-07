---
Published: 2010-02-08
title: "Other Design Patterns"
author: Chris S
excerpt: "Here's a few more design patterns I left out from my design patterns series."
layout: post
permalink: /csharp/other-design-patterns/
dsq_thread_id:
  - 1076935965
tags:
  - 'c#'
  - design-patterns
---
Here are some remaining software design patterns I missed out from the set of examples I gave.

<!--more-->

### Adapter

A good example of the Adapter pattern can be found inside the Framework class library (see the links section below). 

### Memento

Used for saving the current state of your system, which serialization helps to accomodate. You can find this in games for the &#8220;save game&#8221; functionality. The pattern can also accomodate &#8216;undo' into it. 

### Proxy

Access methods,fields etc. of a class via another class - the proxy. A common use for this is Authentication where you have to be authenticated before you are allowed to use the other classes. The proxy can switch the classes it uses internally as they implement an interface. 

### Command

You will have come accross this pattern before if you have dealt with toolbars UI controls. A control's click event will fire an event which passes just the command name. You have to then switch on the command name and perform the relevant action. 

### Chain of Responsibility

An elegant way of passing responsibility up down a linked-list like chain of classes, where each class references the next class up the chain. The next class up has more responsibility, or rights than the previous class. So the first might be &#8220;viewer&#8221;, the second &#8220;editor&#8221;, the third &#8220;admin&#8221;. 

### And there's more

There's even more my mini-summaries have missed: Template, Visitor, Interpretor, Decorator and Bridge. Wikipedia and the other links [in the first blog post][1] have details on these.

 [1]: /csharp/csharp-design-patterns/ "C# Design Patterns"