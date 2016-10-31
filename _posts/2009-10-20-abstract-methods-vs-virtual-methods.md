---
title: Abstract methods vs Virtual methods
date: 2009-10-20 00:00:00 Z
permalink: "/csharp/abstract-methods-vs-virtual-methods/"
tags:
- c#
Published: 2009-10-20 00:00:00 Z
author: Chris S
excerpt: Many moons I was curious about the difference in IL that is produced between
  abstract and virtual methods. This post gives the details.
layout: post
dsq_thread_id:
- 1077695438
---

Many moons ago I was curious about the difference in IL that is produced between abstract and virtual methods, and this is the result. 

What IL code is emitted when you have an abstract method, and a virtual method? For the C# below

<pre>public abstract class MyAbstract
{
	public abstract void Run(int x);
}

public class MyConcrete
{
	public virtual void Run(int x)
	{
	}
}
</pre>

The equivalent IL is:

<!--more-->

  
<script src="https://gist.github.com/yetanotherchris/4757547.js"></script>

As you can see, MyConcrete.Run() actually contains op codes while MyAbstract.Run() as you'd expect, contains nothing. Abstract methods are virtual though which probably isn't a huge surprise either. Both of the above use the newslot keyword which indicates that it should override any existing space in the v-table for this method (as they are base classes there is nothing to override).