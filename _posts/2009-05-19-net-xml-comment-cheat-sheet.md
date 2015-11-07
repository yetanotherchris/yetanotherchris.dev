---
Published: 2009-05-19
title: ".NET XML Comment Cheat Sheet"
author: Chris S
excerpt: "If you like to give your code meaningful XML comments and want the output to look vaguely like the MSDN documentation, then below are a few templates you can use for consistency. These aren't 'how to write XX method' but just how the textual descriptions appear in most of the .NET framework documentation, for example you'll find 'Raises the ... event' in almost all event descriptions."
layout: post
permalink: /net/net-xml-comment-cheat-sheet/
dsq_thread_id:
  - 4207230545
tags:
  - .net
  - xml
---
[Download .snippet file][1]

**Update:** Ghost doc (free addin for Visual Studio 2008) makes a lot of the snippets redundent. Some are still relevant however.

If you like to give your code meaningful XML comments and want the output to look vaguely like the MSDN documentation, then below are a few templates you can use for consistency. These aren't &#8220;how to write XX method&#8221; but just how the textual descriptions appear in most of the .NET framework documentation, for example you'll find &#8216;Raises the &#8230; event' in almost all event descriptions.

<!--more-->

The download above the examples below in snippet format (for VS.NET 2005/2008) that autocompletes various methods. To use the .snippet download, copy it to your &#8216;C:\Users\Documents\Visual Studio 2008\Code Snippets\Visual C#' directory and then type eqts inside the code editor in Visual Studio. 

Make sure you click &#8216;view plain' to get the properly formatted text, as some lines span over the textarea. 

### Embedding tags

If you need to put a tag inside you description use HTML/XML coding. There's no need to do this for CDATA.

<pre>&lt; &gt;</pre>

### New Paragraphs

You will need to wrap descriptions in these tags if you want it to be readable instead of a wall of text.

<pre>&lt;para&gt;&lt;/para&gt;</pre>

### Standard constructor

<pre>/// &lt;summary&gt;
/// Initializes a new instance of the &lt;see cref="MyClass"&gt;MyClass&lt;/see&gt; class.
/// &lt;/summary&gt;
</pre>

### Standard event and raising the event

<pre>/// &lt;summary&gt;
/// Occurs when the page is process is complete.
/// &lt;/summary&gt;
public event EventHandler Complete;

/// &lt;summary&gt;
/// Raises the &lt;see cref="Complete"&gt;Complete&lt;/see&gt; event.
/// &lt;/summary&gt;
/// &lt;param name="e"&gt;An &lt;see cref="EventArgs"&gt;EventArgs&lt;/see&gt; object that contains the event data.&lt;/param&gt;
protected virtual void OnComplete(EventArgs e)
{
	if (Complete != null)
	Complete(this, e);
}
</pre>

### Embedding links to other classes, properties, methods

Update: The latest Sandcastle build now works with links without having to specify the name inside the see tag's content.

<pre>&lt;summary&gt;
Go on, have a look at &lt;see cref="MyClass"/&gt;
Go on, have a look at &lt;see cref="MyClass.MyMethod"/&gt; and
Go on, have a look at &lt;see cref="MyClass.MyProperty"&gt;Custom text&lt;/see&gt;
&lt;/summary&gt;
</pre>

### Embedding an example

Remember to use CDATA or you'll get documentation errors.

<pre>/// &lt;example&gt;
/// Below is an example of using MyMethod to do something.
/// &lt;code&gt;
/// &lt;![CDATA[
/// MyClass a = new MyClass();
/// string result = a.MyMethod();
/// ]]&gt;
/// &lt;/code&gt;
/// &lt;/example&gt;
</pre>

### Linking to external documentation

From another file (for large amounts of documentation that makes it hard to read the source file)

<pre>&lt;include file="blah.xml" path="/documentation/members[@Name='Class1']"/&gt;
</pre>

The XML file would be:

<pre>&lt;?xml version="1.0" encoding="utf-8" ?&gt;
&lt;documentation&gt;
&lt;members name="Class1"&gt;
&lt;summary&gt;
All the usual XML tags here.
&lt;/summary&gt;
&lt;/members&gt;
&lt;members name="Class2"&gt;
&lt;summary&gt;
etc.
&lt;/summary&gt;
&lt;/members&gt;
&lt;/documentation&gt;
</pre>

### Throwing exceptions

The deliberate design decision to remove the forcing of exception handling chains like in Java is in my view one of the major pluses of C# over Java. The idea is to place it in documentation instead. Unfortunately it's not really kept to (most programmers don't like to document as a feeling of completeness like I do, which for time constraints is my weak point).

<pre>/// &lt;exception cref="InvalidOperationException"&gt;
/// Here you describe why the exception will be thrown.
/// &lt;/exception&gt;
</pre>

### Exception class headers

<pre>/// &lt;summary&gt;
/// Initializes a new instance of the &lt;see cref="MyException"&gt;MyException&lt;/see&gt; class using the
/// specified message and inner exception.
/// &lt;/summary&gt;
/// &lt;param name="message"&gt;The error message that explains the reason for the exception.&lt;/param&gt;
/// &lt;param name="innerException"&gt;The exception that is the cause of the current exception. If the innerException parameter is not a null reference, the current exception is raised in a catch block that handles the inner exception.&lt;/param&gt;
</pre>

### Overriding Hashcode

In the written style of MSDN documentation

<pre>/// &lt;summary&gt;
/// Computes and retrieves a hash code for an object.
/// &lt;/summary&gt;
/// &lt;remarks&gt;
/// This method implements the &lt;see cref="Object"&gt;Object&lt;/see&gt; method.
/// &lt;/remarks&gt;
/// &lt;returns&gt;A hash code for an object.&lt;/returns&gt;
</pre>

### Overriding ToString

In the written style of MSDN documentation

<pre>/// &lt;summary&gt;
/// Displays information about the &lt;c&gt;Field&lt;/c&gt; in readable format.
/// &lt;/summary&gt;
/// &lt;returns&gt;A string representation of the object.&lt;/returns&gt;
</pre>

### Overriding Equals

In the written style of MSDN documentation

<pre>/// &lt;summary&gt;
/// Determines whether two &lt;see ref="X"&gt;X&lt;/see&gt; objects are equal.
/// &lt;/summary&gt;
/// &lt;remarks&gt;
/// For the two &lt;see ref="X"&gt;X&lt;/see&gt; objects to be equal, they must have the same Number.
/// &lt;/remarks&gt;
/// &lt;param name="obj"&gt;The &lt;see ref="X"&gt;X&lt;/see&gt; object to compare to the current &lt;see ref="X"&gt;X&lt;/see&gt;.&lt;/param&gt;
/// &lt;returns&gt;True if the specified &lt;see ref="X"&gt;X&lt;/see&gt; is equal to the current &lt;see ref="X"&gt;X&lt;/see&gt;; otherwise false.&lt;/returns&gt;
</pre>

### Links

  * [Ghost doc][2]
  * [GUI for Sandcastle, which replaces NDoc][3]
  * [Sandcastle (required for the GUI)][4]
  * [MSDN docs for .NET XML documentation (local)][5]
  * [MSDN docs for .NET XML documentation (online)][6]

 [1]: /storage/downloads/snippets.zip
 [2]: http://www.roland-weigelt.de/ghostdoc/
 [3]: http://www.codeplex.com/Sandcastle
 [4]: http://www.codeplex.com/SHFB
 [5]: http://msdn.microsoft.com/en-us/library/5ast78ax(v=vs.71).aspx
 [6]: http://msdn2.microsoft.com/en-us/library/5ast78ax(VS.80).aspx