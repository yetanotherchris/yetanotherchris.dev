---
Published: 2010-12-22
title: "Linked list and Double linked list in C#"
author: Chris S
excerpt: "Two examples of implementing a linked and double linked list in C# from scratch."
layout: post
permalink: /csharp/linked-list-and-double-linked-list-in-csharp/
dsq_thread_id:
  - 1085038992
tags:
  - 'c#'
---
Below are two examples of implementing a linked and double linked list in C#. The framework already has a [LinkedList<T> implementation][1] from version 2.0 - it is infact a double linked list and supports a whole lot of features the example below doesn't. I wrote the code below out of curiosity more than anything (some programmers like doing this kind of thing, some don't!). Most degree students or earlier will have learnt about linked lists in their courses, some may have not.

<!--more-->

The links at the bottom of the page give a whole host of discussions on the subject, mostly from stackoverflow. You might wonder where you'd ever need to use a (double) linked list, and you might be right when it comes .NET however the class itself is used internally by [Regex][2] and by a System.Net timer. It's not (as I previously said here) used by stacktraces for Exceptions, these are are handled by the [StackTrace][3] and [StackFrame][4] classes.

But anything that needs a parent-child relationship makes use of a form of it, and a single linked list is an alternative form of a stack or queue.

As always with all the code on the site, if you spot a bug or something you think is a glaring load of rubbish, feel free to contact me on the contact page.

### Linked List

<script src="https://gist.github.com/yetanotherchris/4960175.js"></script>

### Doubly linked list

As you can see, the implementation for a doubly linked list doesn't differ much from a linked list. The extra functionality comes in the form of operations like deep copying, enumerators, advanced finds and inserts which I've left out; these are in framework's LinkedList<T> implementation.

<script src="https://gist.github.com/yetanotherchris/4960171.js"></script>

### Links

  * [Three][5] [different][6] [discussions][7] on stackoverflow about linked lists.
  * [Wikipedia's article][8] isn't that great but can help.
  * [Codeproject][9] naturally has an implementation as you'd expect.

 [1]: http://msdn.microsoft.com/en-us/library/he2s3bh7.aspx
 [2]: http://msdn.microsoft.com/en-us/library/system.text.regularexpressions.regex.aspx
 [3]: http://msdn.microsoft.com/en-us/library/system.diagnostics.stacktrace.aspx
 [4]: http://msdn.microsoft.com/en-us/library/system.diagnostics.stackframe.aspx
 [5]: http://stackoverflow.com/questions/670104/what-are-real-world-examples-of-when-linked-lists-should-be-used
 [6]: http://stackoverflow.com/questions/10042/how-do-i-implement-a-linked-list-in-java
 [7]: http://stackoverflow.com/questions/712429/plain-linked-and-double-linked-lists-when-and-why
 [8]: http://en.wikipedia.org/wiki/Linked_list
 [9]: http://www.codeproject.com/KB/recipes/doubly-linkedlist.aspx