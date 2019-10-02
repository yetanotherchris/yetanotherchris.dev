---
title: Equals vs IEqualityComparer, IEquatable<T>, IComparable, IComparer
date: 2009-09-27 00:00:00 Z
permalink: "/csharp/equals-vs-iequatable-iequalitycomparer-icomparable-icomparer/"
tags:
- csharp
Published: 2009-09-27 00:00:00 Z
author: Chris S
description: A look at the difference between Equals vs IEqualityComparer, IEquatable<T>, IComparable, IComparer, used for sorting and comparisons.
layout: post
---

This is a look at the difference between Equals vs IEqualityComparer, IEquatable<T>, IComparable, IComparer which are used for sorting and comparisons.

## Cheatsheet

The TLDR version:

- `Distinct()` - override `Equals()` and `GetHashcode()` in your object. If T is an interface, then pass a `IEqualityComparer<T>` implementation.
- `Dictionary<T>` - your T should override `Equals()` and `GetHashcode()`. If T is an interface, then pass a `IEqualityComparer<T>` implementation.
- Contains and IndexOf also follow the rules above.

## Equals

Besides object comparison, Equals is also used in a few common collection methods. IndexOf(), Contains() both use the Equals() method for equality comparisons. This extends even further with .NET 3.5 and the inclusion of LINQ into the equation, where Equals is used frequently for comparion of methods like Distinct.

## IEquatable<T>

This interface was added in .NET 2.0. Its primary use is with value types to avoid the use of ValueType.Equals() (which all structs automatically use if Equals isn't overriden). ValueType.Equals uses reflection to iterate through every field in the struct, checking for equality. If they are all equal to the object passed then true is returned (see the source further on in the article). Implementing IEquatable<T> only does a comparion between your object and <T> which is most likely to be the same type. This is performed frequently with the new methods brought in alongside LINQ in 3.5. Overriding Equals() from ValueType will do a check for any object type, and it's recommended this is overridden with any custom value type alongside implementing IEquatable<T>. 

## IEqualityComparer<T>

This interface, also added in 2.0, allows you to pass custom object equality checking to a Hashtable, Dictionary and NameValueCollection. You pass in your custom comparison implementation much like you do with IComparer and the Hashtable will use this for equality checks. 

The main use of this interface is you can write a single implementation of `IEqualityComparer<T>` which several classes can then use, removing the need to rewrite the comparison logic for every class. For example if you class implements `IEntity` which has an `Id` property, you could then use a comparison class for all equality checks that implements `IEqualityComparer<IEntity>`.

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

With the introduction of closures in C# 3.0, you can now shorten your code with IComparer<T> and sorting. Here's an example with sorting items:

`gist:yetanotherchris/4757270`

## IComparable

IComparable gives you one method to implement: 

<pre>int CompareTo(Object obj)</pre>

The same return value system applies as IComparer. The difference between this and IComparer is IComparable will be implemented on the class that contains your field values, while IComparable derived classes are used for custom sorting. So for example:

`gist:yetanotherchris/4757276`

The CompareTo method would be the default way of ordering your User class, perhaps comparing by Name. If you then decided that you wanted to sort a list of User objects by another property, say Age, you could write a class that implemented IComparer instead of altering CompareTo inside User. This would perform the custom sorting, for example: 

`gist:yetanotherchris/4757292`

As with IComparer you can specialise the comparison by implementing IComparable<T>.
