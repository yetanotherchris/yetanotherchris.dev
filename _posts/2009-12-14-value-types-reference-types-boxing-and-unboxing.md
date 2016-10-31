---
title: Value types, reference types, boxing and unboxing in C#
date: 2009-12-14 00:00:00 Z
permalink: "/csharp/value-types-reference-types-boxing-and-unboxing/"
tags:
- c#
Published: 2009-12-14 00:00:00 Z
author: Chris S
excerpt: There's hundreds of posts and articles out there about value vs reference
  types, boxing and unboxing, the stack and the heap. Here's another!
layout: post
dsq_thread_id:
- 1077752575
---

No boxing topic is complete without a quick summary of value types and reference types:

## Value types

  * Stored on the stack (STAtiC types are stored in the STACk), unless it is inside a reference type (e.g. a property on a class) where it is then accessed by reference or pointer.
  * Passed around by value rather than a memory location (pointer). This means that when you call a method that takes value types as its parameter, the values are copied.
  * Not garbage collected.
<!--more-->

  * Doesn't support inheritence, only implementations of Interfaces (the built in Enum type does infact inherit from ValueType but that's built into the framework
  * The default base Equals() method (inside ValueType) is slow as it uses reflection to get every field's value and do a comparison with each of these versus the object.
  * Have to be initialised, they can't be null (enforced by the compiler however ILasm is forgiving and generates a 1 byte value if they're null).
  * Since .NET 2.0 value types can be nullable by prefixing ? before the type, e.g. int? myvalue; This indicates that zero might be a valid value, so null implies no value has been set.
  * The ? shortcut translates into:

#### Example

<pre>Nullable n = new Nullable();
n = null;
</pre>

## Reference types

  * Stored on the heap.
  * Passed as pointers rather than the actual value;
  * Supports inheritence
  * The default base Equals() method (inside Object) compares both object's memory location rather than field values, so this is fast.
  * Can be null
  * Are garbage collected depending on how new they are and if anything has a reference to the instance.

In short, boxing is taking a value type, and turning it into a reference type. This is done by the CLR by copying every field's value into a reference type. Unboxing is taking a boxed reference type and turning it back into a value type.

Implied boxing means you aren't forceable trying to box the valuetype, but rather it happens automatically, such as

<pre>int i = 30;
object o = i;
</pre>

Explicit boxing is when you are performing the box to a reference type via a manual cast:

<pre>int i = 30;
object o = (object) i;
</pre>

Boxing requires a performance hit, particularly inside loops. Unboxing is not so intense as the values are stored inside the boxed reference (the first point under the Vale type section) type and can just be retrieved back. Most examples of boxing out there show an example turning an int into an object and back, such as:

<pre>int n = 100;
Object o = n;
int x = (int) o;
n = 200;
Console.WriteLine(o);
</pre>

You would rarely want to achieve something like the above, particularly since the introduction of generics in 2.0. One of the biggest gains generics added to .NET in 2.0 was the ability to add value types to a collection without the need to box. Consider the following: 

<pre>int n = 100;
ArrayList list = new ArrayList();
list.Add(n);
list.Add(n);
n = 200;
Console.WriteLine(list[0]); // prints 100
Console.ReadLine();
</pre>

Here n is being boxed twice, once each time time it's stored inside the ArrayList. The underlying IL is:

<pre>IL_000c: box [mscorlib]System.Int32
IL_0011: callvirt instance int32 [mscorlib]System.Collections.ArrayList::Add(object)
</pre>

Changinge the above code to a List<T>:

<pre>int n = 100;
List&lt;int&gt; list = new List&lt;int&gt;();
list.Add(n);
list.Add(n);
n = 200;
</pre>

Compiles into:

<pre>IL_000c: callvirt instance void class [mscorlib]System.Collections.Generic.List`1::Add(!0)
IL_0011: nop
</pre>

The box keyword is now gone. Generic collections remove the boxing of value types when dealing with lists and collections in general adding huge performance gains. Infact there is a whole thread [here][1] about the difference in speed between a none generics ArrayList and a List<T>. 

There is also MSDN information about boxing at [MSDN online][2]. 

## The As keyword instead of explicit casting.

Consider the following block of C#:

<pre>public override bool Equals(Object obj)
{
	if ( obj != null)
	{
		MyClass myclass = (MyClass) obj;
		// do some comparison with myclass
	}
	else
	{
		return false;
	}
}
</pre>

This is a common branching block that is regularly written. The problem with it is it unnecessarily performs two casts. When called repeatedly over a set of thousands of objects this can be a performance hit. It's avoidable however, thanks to the &#8216;As' keyword, illustrated below. No exception is thrown if obj is null when using &#8216;as', whilst a bracketed cast would do this. 

<pre>public override bool Equals(object obj)
{
	MyClass myclass = obj as MyClass;
	if (myclass != null)
	{
		// do some comparison with myclass
	}
	else
	{
		return false;
	}
}
</pre>

 [1]: http://www.gamedev.net/community/forums/topic.asp?topic_id=456728&PageSize=25&WhichPage=1
 [2]: http://msdn.microsoft.com/en-us/library/25z57t8s.aspx