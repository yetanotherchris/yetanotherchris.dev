---
title: 'Your base class: Abstract or Interface?'
date: 2009-05-18 00:00:00 Z
permalink: "/csharp/your-base-class-abstract-or-interface/"
tags:
- csharp
Published: 2009-05-18 00:00:00 Z
author: Chris S
description: One thing that is often overlooked by the tutorials and books is deciding
  when to use an abstract class vs an interface. The fashion for using interfaces
  for everything often rejects abstract classes outright. This post goes into a bit
  of detail about it.
layout: post
dsq_thread_id:
- 1069180544
---

This could be seen as a bit of a beginner's topic, but one thing that is often overlooked by the tutorials and books is deciding when to use each one. The fashion for using interfaces for everything often rejects abstract classes outright. If you look at the BCL it gives some good pointers when to use which, and points you in the direction of using both, if needed. There are examples of this inside System.Collections.Generics such as IList<T> and List<T>. 

<!--more-->

The best advice I've read from various books is to think what type of relationship you want the derived class to have: should it have to perform all tasks the interface wants it to? Look at it from the perspective of the developer who will be creating the derived class. If the class should always implement every method/property/event an interface sets out then interface is the right choice. If you want to give them some flexibility to choose which methods are implemented then make it an abstract class. This also ensures consistency - enforcing an interface where a lot of the methods don't make sense to anyone except the original developer of the interface is a waste, good examples of this can be found in the IE api and the Office toolbars. 

A more detailed discussion can be found in the must have &#8220;CLR via C#&#8221; by Jeffrey Richter (I'm not pretending my advice has equal standing to his, I'm just regurgiting good advice or my own research rather than having worked for Microsoft with the .NET team). 

On top of these design choices are of the C# restrictions you have: 

  * You can inherit from multiple interfaces but only one abstract class.
  * A class can implement any number of interfaces; an interface can be implemented by any number of classes.
  * Neither can be instantiated. 
  * Abstract classes shouldn't be used to restrict instantiation. Use a private or internal constructor for this. 
  * Abstract classes can have fields. 
  * Abstract classes can implement default functionality. 
  * Abstract classes normally have at least one abstract method, but can have concrete methods/properties etc (as above)
  * Interfaces are restricted to methods, events, properties and indexers only. 
  * Interfaces allow the same method to be implemented in different ways (Something Java lacks) using explicit implementation (example below)

### Example

<pre>public class Tester : InterfaceA, InterfaceB
{
	void InterfaceA.Run()
	{
	}
	
	void InterfaceB.Run()
	{
	}
}
</pre>

  * Explicit interface implementations are always private while implicit are public. Implicit will provide the implementation for all interfaces if no explicit signature exists per interface.
  * Value types can't inherit from anything except interfaces (for example System.Boolean implements IComparable, IConvertible among others).
  * If you implement an interface's method explictly in your value type, it will beed to be boxed to a reference type in order to use it, for example using Int32's implementation of IConvertible.