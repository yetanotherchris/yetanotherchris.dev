---
title: String.Equals(), == and String.Compare()
date: 2010-03-02 00:00:00 Z
permalink: "/csharp/string-equals-and-string-compare/"
tags:
- assemblies
- c#
Published: 2010-03-02 00:00:00 Z
author: Chris S
description: What's the difference between ==, .equals and string.Compare()? This post
  explores the three ways of comparing strings in C#/.NET.
layout: post
dsq_thread_id:
- 1083137256
---

Most C# books will tell you from the early chapters that you should always override Equals in your class instead of relying on the base Object.Equals. As mentioned a few times previously, this is essential for value types as the base ValueType.Equals() method (which overrides Object.Equals) uses reflection to decide whether two objects are equal, comparing the field values. The source code for ValueType.Equals (from the Shared Source CLI) is shown below. 

<!--more-->

  
`gist:yetanotherchris/4952780`

For reference types, the base Object.Equals() method does a call to an internal method as its signature shows:

<pre>public virtual bool Equals(object obj)
{
	return InternalEquals(this, obj);
}

[MethodImpl(MethodImplOptions.InternalCall)]
internal static extern bool InternalEquals(object objA, object objB);
</pre>

This InternalEquals method can be found in the CLR VM source code [here][1], or if you prefer to download the source, it's at [Shared Source CLI 2.0][2]. 

Assuming you know some basic C++, you can see from the InternalEquals source that all sanity checks are done inside the VM rather than the Object.Equals() source show above. These include checking both types aren't null, checking they're the same type (using a method table lookup). The memory addresses of the two reference types are then compared, returning true or false. 

For reference types that don't perform operator overloading, == will check whether its memory address is equal to the 2nd object. ReferenceEquals() performs the same task to this. The MSDN docs describe how &#8220;To check for reference equality, use ReferenceEquals. To check for value equality, use Equals.&#8221;. This is a bit contradictory as the Object.Equals() method checks for reference equality, so reference types that don't override Equals() will be checking for reference equality by default. 

With String.Equals(), the String class has overridden Object.Equals() so that it does its own comparison checking instead of the default reference check: 

<pre>public override bool Equals(object obj)
{
	string strB = obj as string;
	if ((strB == null) &#038;&#038; (this != null))
	{
		return false;
	}
	return EqualsHelper(this, strB);
}</pre>

[EqualsHelper][3] is the internal method that determines if two strings are the same. This use to be inside the VM source in 1.1, but has since been moved into the BCL source code. The first check it does is to determine if they are the same length, returning false if they're not. After this it checks each character (in blocks of 10, working backwards on the string) 2 bytes at a time (i.e. a single character in Unicode). 

The String class also overrides the == and != operators: 

<pre>public static bool operator ==(string a, string b)
{
	return Equals(a, b);
}
</pre>

Now say you do the check on two Unicode strings that don't use the default Western ISO 1252 codepage (the default on Windows US/UK installs): 

<pre>string a = "Unicode text 1";
string b = "Unicode text 2";
if ( a == b )
	Console.WriteLine("Equal from ==");
if ( a.Equals(b) )
	Console.WriteLine("Equals from Equals()");
</pre>

Equals() does a 2 byte Unicode lookup (strings are stored in Unicode format internally in .NET). I've heard or read in the past that &#8220;equals is faster than ==&#8221;. Here's the IL from above: 

`gist:yetanotherchris/4952840`

Is it really faster/more optimised to call Equals()? The code above shows that it's one less method on the stack so arguably yes. The speed difference is unlikely to be noticeable in 99% of applications, and I prefer, and always will use == unless asked not to. But it's down to preference of the programmer, and what languages have influenced them in the past. There is an argument that says you should always use Equals as it describes to other programmers exactly what type of comparison you are doing (ordinal case-insensitive), which I can see I still prefer == though. 

MSDN describes what == does (or the Equals method it calls): 

> This method performs an ordinal (case-sensitive and culture-insensitive) comparison.

When would you ever need a non-ordinal (the numeric value of the character) comparison, i.e. String.Compare instead of == or Equals()? Inside a method that uses sorting, for example an IComparer implementation. Sorting è,é,ê and ë for is one example. The Equals() method in comparison is more suited to checking your internal strings such as filenames, resource names, database connection strings.

 [1]: http://www.koders.com/cpp/fid191D8DC42DC6E980F49546893D6E3243A04AB1B1.aspx?s=InternalEquals
 [2]: http://www.microsoft.com/downloads/details.aspx?FamilyId=8C09FD61-3F26-4555-AE17-3121B4F51D4D&displaylang=en
 [3]: http://www.koders.com/csharp/fid6135F77482E6125D97DC3197AD53876AE1098662.aspx?s=EqualsHelper