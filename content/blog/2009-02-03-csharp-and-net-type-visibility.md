---
title: C# and .NET type visibility
date: 2009-02-03 00:00:00 Z
permalink: "/csharp/csharp-and-net-type-visibility/"
tags:
- ".net"
- c#
Published: 2009-02-03 00:00:00 Z
author: Chris S
description: This post is a reference article about visibility in C# and .NET.
layout: post
dsq_thread_id:
- 
---

## Classes and Structs

Classes and structs allow the following type visibility options in C#:

### public

Viewable by all types in the current and referencing assemblies.

### internal

Viewable by types in the current assembly only.

For example:

<!--more-->

<pre>public struct PublicStruct {}
internal struct InternalStruct {}
struct DefaultStruct {} // internal by default
public class MyPublic {}
internal class MyInternal {}
class DefaultClass {} // internal by default
</pre>

in terms of IL output, you either get the tokens [public] or [notpublic] used in the TypeDef metadata table. That is:

<pre>TypDefName: MyNamespace.PublicStruct (02000003)
Flags : [Public] [SequentialLayout] [Class] [Sealed] [AnsiClass] [BeforeFieldInit] (00100109)
TypDefName: MyNamespace.InternalStruct (02000004)
Flags : [NotPublic] [SequentialLayout] [Class] [Sealed] [AnsiClass] [BeforeFieldInit] (00100108)
</pre>

You will notice the [sealed] keyword above. All structs are sealed as there's no inheritence between value types, as side from the built in FCL ones such as Enum, Void, Nullable.

The following rules also apply:

  * Classes allow for the sealed and abstract keywords ontop of the access modifiers.
  * Classes can be marked as static. This restricts its members to being static only, and the class is instantiated when the appdomain loads.
  * The partial keyword is also possible which has its uses within source control.
  * Classes and structs are internal by default. Enum members are public.

## Nested Types

You get one extra modifier for nested types (class,struct,enum,interface), the private keyword. For example:

`gist:yetanotherchris/4746383`

## Properties / Methods / Events / Fields

### private

Accessible by methods in the class/struct and nested types.

### protected

Accessible by methods in the class, nested types, or derived type (regardless of assembly)

### internal

Accessible by all methods in the current assembly only.

### protected internal

Accessible by methods in derived types (any assembly), and any method of any type in the current assembly.

### public

Accessible by all methods in all assemblies.

### &#8220;almost-internal protected&#8221; (family and friend in CLR)

(This doesn't exist in C# but exists inside the CLR.)  
Accessible by methods in the class/struct, nested types, and derived types in the current assembly. This is almost identical to internal except it's this/derived/nested types only, rather than any type.

### All members are private by default.

For interface implentations, members are forced to public by the C# compiler unless defined as explicit.

## Ontop of the visibility options

  * Methods can also be marked as extern, usually coinciding with importing of win32 libraries. For example using SendMessage.
  * Methods and fields (but not properties,events) can be marked as volatile.
  * Methods, fields and properties can be marked with static.

## Methods, events and properties can be marked with

  * abstract
  * new
  * override
  * virtual

You will find that the C# compiler uses the IL callvirt op by default, which calls a method virtually checking if the object variable is null first.

## Fields can additionally be

  * const
  * readonly

## Sharing internal members accross assemblies

This is a very useful trick for unit tests. If you have one assembly that performs all your unit tests and another assembly, say a data access layer, in another assembly you typically can't test some of the 2nd assembly's internal types in a unit test as they won't be accessible. You can get around this by adding the following line to your AssemblyInfo.cs

<pre>[assembly:InternalsVisibleTo("Type,PublicKey=xxx")]</pre>