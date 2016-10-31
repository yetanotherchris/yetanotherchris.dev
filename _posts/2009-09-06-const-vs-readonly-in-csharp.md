---
title: Const vs Readonly in C#
date: 2009-09-06 00:00:00 Z
permalink: "/csharp/const-vs-readonly-in-csharp/"
tags:
- c#
Published: 2009-09-06 00:00:00 Z
author: Chris S
excerpt: The differences between const and readonly, including some ILASM.
layout: post
dsq_thread_id:
- 4207230630
---

### Const

The value of your const property is set at compile time and can't change at runtime. Where the const is used in the callee, this value is replaced by the compiler. This can lead to versioning problems if your const changes in later versions.

So if you have version 1 of a class library, and the constant value is &#8220;3&#8221;, and then you change this value in version 2 to &#8220;5&#8221;, you will get some unpredictable things happening, possibly breaking your code. The image below shows a class called Tester, that in version 1 had CONST_B as &#8220;3&#8221; then in version 2 changed this to &#8220;5&#8221;. It's a crude example but you get an idea of how the compiler is using the field from the tooltip.

<!--more-->

<img src="/wp-content/uploads/2009/09/constreadonly.gif" alt="Constant readonly" width="318" height="128" />

Const can't be marked as static - the keyword denotes they are static, unlike readonly fields which can.

They also can't be anything except value (primitive) types, with the exception of strings. If you try to assign your const to something like:

<pre>public const System.Net.Cookie CONST_A = new System.Net.Cookie();</pre>

You get a semantic error from the compiler.

### Readonly

The readonly keyword marks the field as unchangeable. However the property can be changed inside the constructor of the class. If the field is also static, then the same applies but inside the static constructor. This means the problems with versioning you get with the const keyword are removed, the value isn't replaced by the compiler but rather a field exists with metadata. 

The readonly only keyword can also be combined with static to make it act in the same way as a const (atleast on the surface). There is a marked difference when you look at the IL between the two. In the image below MYVALUE2 is static readonly, MYVALUE3 is readonly (no static), CONSTB is just marked as const.

<img src="/wp-content/uploads/2009/09/constreadonlyildasm.gif" alt="Const readonly ildasm" width="290" height="150" />

You can see that const fields are marked as &#8220;literal&#8221; while readonly is &#8220;initonly&#8221;. Initonly is also a keyword in [managed C++][1]. In terms of memory management of the two, I assume that static &#8216;literals' are stored on the stack with value types, being limited to value types only.

More detailed information can be found on [here][2].

 [1]: http://msdn2.microsoft.com/en-us/library/4d8xah36(VS.80).aspx
 [2]: http://en.csharp-online.net/const,_static_and_readonly