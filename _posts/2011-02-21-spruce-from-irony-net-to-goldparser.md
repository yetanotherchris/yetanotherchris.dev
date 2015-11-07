---
Published: 2011-02-21
title: "Spruce: From Irony.NET to GoldParser"
author: Chris S
excerpt: "In the last post I was all geared up and ready to write my search engine parser with the Irony framework. As has happened a fews times to me in with searching out solutions with development, shortly after writing the post I stumbled upon Gold Parser and Calitha. I'm not usually that fickle with frameworks that I’ll ditch one straight away, however Gold Parser was exactly what I was looking for originally, that ANTLR failed to provide."
layout: post
permalink: /spruce/spruce-from-irony-net-to-goldparser/
dsq_thread_id:
  - 1092394892
tags:
  - goldparser
  - irony.net
  - lalr
  - spruce
---
In the last post I was all geared up and ready to write my search engine parser with the Irony framework. As has happened a fews times to me in with searching out solutions with development, shortly after writing the post I stumbled upon Gold Parser and Calitha.

I’m not usually that fickle with frameworks that I’ll ditch one straight away, however Gold Parser was exactly what I was looking for originally, that ANTLR failed to provide.

<!--more-->

  
In a nutshell, Gold Parser takes a BNF file (that also has syntax for defining terminals and sets of characters), parses it for you, let’s you test your syntax in a kind of mini-IDE and then produces a “compiled grammar file”. This grammar file can then be used by any language that implements their engine specification. There are lots of these engines, including about 4 for C# of which Calitha is the best suited for my needs. There’s also a really healthy ecosystem for Gold, which considering it was released 5 years ago is impressive.

A terminal, incidently, is simply a token that can’t be broken down into any more parts. For example &#8220;if then…&#8221; has &#8220;if&#8221; and &#8220;then&#8221; as terminals, but can be further broken down into more rules.

I’ve found it a lot trickier to define the search grammar for Spruce than if I was defining my own domain specific language or brand new language. The reason for this is search text is far looser in what it allows than a programming language. For example the line:

> var a = true;

contains very strict rules about what is allowed. If you just start writing a poem on a line of source code then it will fail almost immediately as there’s no quotes or comment starter. However if I do a search for:

> bug with publishing reports -february

the search grammar has to establish exactly which parts are search syntax and which are simply words I search for. This is where regexes, which you might argue are a form of BNF or meta-BNF, fall down. They don’t handle recursion effectively and you end up with a mess of spaghetti if you want one rule/statement to be able to be used inside another.

Large amount of learning Gold simply requires you to experiment and then take a break and try again from a different angle, including getting your head around the recursion that it supports for rules. Gold has quite a lot of decent documentation and tonnes of sample grammar files for every language you can think of, including brainfuck.

Here’s the IDE of Gold and the small proof of concept search demo console app I wrote using Calitha:

![gold parser IDE][1]  
![calitha demo][2]

I’ve found it very interesting to learn and play with DSLs and AST parsers. I can see so many possibilities with writing your own mini language (DSL) for things like a product rules language that is humanly readable (instead of using AOP), or writing your own installer language for installation files specific to what your installing, as opposed to the catch-all installer languages of install shield, nullsoft etc.

The next update should bring with it the completed grammar file for the search and some integration into Spruce. Once this step is done, the richer more TFS-centric functionality such as attachments and link items will get underway.

 [1]: /wp-content/uploads/2011/02/sprucegoldparser.png
 [2]: /wp-content/uploads/2011/02/sprucedemo.png