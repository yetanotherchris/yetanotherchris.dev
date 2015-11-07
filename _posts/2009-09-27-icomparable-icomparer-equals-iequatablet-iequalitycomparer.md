---
Published: 2009-09-27
title: "IComparable, IComparer, Equals, IEquatable&lt;T&gt;, IEqualityComparer"
author: Chris S
excerpt: "A look at the difference between these 4 interfaces, used for sorting and comparisons."
layout: post
permalink: /csharp/icomparable-icomparer-equals-iequatablet-iequalitycomparer/
dsq_thread_id:
  - 4207230505
tags:
  - 'c#'
---
A look at the difference between these 4 interfaces, used for sorting and comparisons.

## IComparer

This is used for custom sorting of objects. Prior to .NET 3.5 it was used primarily for Array.Sort but now finds itself used for sorting with LINQ. It has several default implementations including (as the MSDN page says) Comparer, CaseInsensitiveComparer. When implementing the interface, there is one method to fill:

<pre>int Compare(Object x,Object y)
Returns:
x &lt; y       -1
x == y      0
x &gt; y       1
</pre>

<!--more-->

IComparer<T> allows you to specialise the comparison by type. 

### Using IComparer <T> with C# 3.0 closures

With the introduction of closures in C# 3.0, you can now shorten your code with IComparer<T> and sorting. Here's an example with sorting items in N2:

<script src="https://gist.github.com/yetanotherchris/4757270.js"></script>

## IComparable

IComparable gives you one method to implement: 

<pre>int CompareTo(Object obj)</pre>

The same return value system applies as IComparer. The difference between this and IComparer is IComparable will be implemented on the class that contains your field values, while IComparable derived classes are used for custom sorting. So for example:

<script src="https://gist.github.com/yetanotherchris/4757276.js"></script>

The CompareTo method would be the default way of ordering your User class, perhaps comparing by Name. If you then decided that you wanted to sort a list of User objects by another property, say Age, you could write a class that implemented IComparer instead of altering CompareTo inside User. This would perform the custom sorting, for example: 

<script src="https://gist.github.com/yetanotherchris/4757292.js"></script>

As with IComparer you can specialise the comparison by implementing IComparable<Tgt;.

## Equals

Besides object comparison, Equals is also used in a few common collection methods. IndexOf(), Contains() both use the Equals() method for equality comparisons. This extends even further with .NET 3.5 and the inclusion of LINQ into the equation, where Equals is used frequently for comparion which leading to&#8230; 

## IEquatable<T>

This interface was added in .NET 2.0. Its primary use is with value types to avoid the use of ValueType.Equals() (which all structs automatically use if Equals isn't overriden). ValueType.Equals uses reflection to iterate through every field in the struct, checking for equality. If they are all equal to the object passed then true is returned (see the source further on in the article). Implementing IEquatable<Tgt; only does a comparion between your object and <Tgt; which is most likely to be the same type. This is performed frequently with the new methods brought in alongside LINQ in 3.5. Overriding Equals() from ValueType will do a check for any object type, and it's recommended this is overridden with any custom value type alongside implementing IEquatable<Tgt;. 

## IEqualityComparer<T>

This interface, also added in 2.0, allows you to pass custom object equality checking to a Hashtable, Dictionary and NameValueCollection. You pass in your custom comparison implementation much like you do with IComparer and the Hashtable will use this for equality checks. This is done inside the constructor.