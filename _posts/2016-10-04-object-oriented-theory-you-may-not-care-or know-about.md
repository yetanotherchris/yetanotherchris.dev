---
Published: 2016-10-04
title: Object-oriented theory you may not care or know about, but are doing
author: Chris S
layout: post
shortpost: true
tags:
  - object-oriented
  - c#
---
### The law of demeter

A method `m` in a `class A` should not send a message to another object unless that object is one of the following: 

- An instance variable used in the method m; 
- A parameter to the method m; 
- An object created in the method m; 
- A global variable (public static variable) used in the method m.

One of the commonest examples is not exposing `List<T>` as properties, but `IEnumerable<T>` and providing methods to Add and Remove from the underlying list.

### SOLID principles

I've asked about these so many times in interviews and I still can't remember all the words behind the acronym - the point isn't to memorise some words but rather understand the ideas behind them. 
The most important parts (for me) are having a single responsibility for an object, IoC/DI and having many interfaces rather than just one.

- **S**ingle responsibility. "Do one thing and do it well"
- **O**pen/closed principle. Less important unless you are doing a lot with inheritence. Modification over extension of classes.
- **L**iskov substitution principle. I've seen this abused with 8 class inheritence chains for a class ultimately is about performing a search. When abused, you end up unsure what the result of your override will do because of the mess above it.
- **I**nterface Segregation Principle. This ties into single responsibility - an example of it going wrong is where you might implement an interface and be forced to put empty implementations for half the methods.
- **D**epdency inversion principle. If you're using a DI framework like Structuremap then you'll be following this.

### Forks and Cascades

I've deliberately avoid LINQ to remove any confusion:

**Fork**

    var microsoft = new Company();
    Person john = microsoft.GetPerson("john");
    int age = john.Age;
    

**Cascade**

      var microsoft = new Company();
      Person john = microsoft.GetPerson("john");
      int age = microsoft.GetAge("john");

### Inheritence vs Composition


Fairly self-explanatory: inheritence is inheriting from a base class while composition is allowing properties of your classes to be filled, e.g. `MyCompany.Person`. Most of the time you will use composition, and DI you get to use it via Setter injection, or constructor injection which then fill properties.
