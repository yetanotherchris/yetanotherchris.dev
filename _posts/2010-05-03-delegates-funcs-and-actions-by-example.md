---
title: Delegates, Funcs and Actions by example
date: 2010-05-03 00:00:00 Z
permalink: "/csharp/delegates-funcs-and-actions-by-example/"
tags:
- c#
Published: 2010-05-03 00:00:00 Z
author: Chris S
excerpt: This is a small set of reference examples of the various ways of declaring
  delegates, funcs and actions across the different versions of the framework and
  C#
layout: post
dsq_thread_id:
- 
---

This is a small set of reference examples of the various ways of declaring delegates, funcs and actions across the different versions of the framework and C#. I haven't included any examples of passing Funcs,Actions as method parameters and interogating them, but Jon Skeet has [a good post][1] on it, and [this stackoverflow][2] question also demonstrates Action based operations quite succinctly. None of this article is under-the-hood in depth stuff - just a simple reference.

<!--more-->

I haven't included [Expressions][3] and System.Linq.Expression - there's [a large MSDN article][4] on Expression trees which is very detailed already. A great example usage of Expressions is found in [Fluent NHibernate][5] and [the source][6] for its ClassMap class.

### Delegates

> The [Delegate][7] class is the base class for delegate types. However, only the system and compilers can derive explicitly from the Delegate class 

<script src="https://gist.github.com/yetanotherchris/4956144.js"></script>

### Func<TResult,..>

> [Func][8] Encapsulates a method that has one parameter and returns a value of the type specified by the TResult parameter. 

The biggest difference with Func and Action (introduced in .NET 3.5) and delegates, aside from removing delegate definition repetition, is you can declare your Func inside a method and aren't restricted to declaring at a field level. From what I can tell and I maybe wrong, this restriction on non-field delegate definitions is to avoid confusion with the anonymous method (funcMethod2) way of doing inline delegates.

<script src="https://gist.github.com/yetanotherchris/4956179.js"></script>

### Action<T,..>

> [Action][9] encapsulates a method that takes a single parameter and does not return a value. 

Action was introduced in .NET 2.0 alongside helpers such as EventHandler<T> that made a lot of repetitive delegate definitions redundant.

<script src="https://gist.github.com/yetanotherchris/4956191.js"></script>

 [1]: http://codeblog.jonskeet.uk/2008/08/09/making-reflection-fly-and-exploring-delegates/comment-page-1/
 [2]: http://stackoverflow.com/questions/156779/c-how-do-i-define-an-inline-method-funct-as-a-parameter
 [3]: http://msdn.microsoft.com/en-us/library/system.linq.expressions.expression.aspx
 [4]: http://msdn.microsoft.com/en-us/library/bb882637.aspx
 [5]: https://github.com/jagregory/fluent-nhibernate/wiki/Auto-mapping
 [6]: http://github.com/jagregory/fluent-nhibernate/blob/master/src/FluentNHibernate/Mapping/ClassMap.cs
 [7]: http://msdn.microsoft.com/en-us/library/system.delegate.aspx
 [8]: http://msdn.microsoft.com/en-us/library/bb549151.aspx
 [9]: http://msdn.microsoft.com/en-us/library/018hxwa8.aspx