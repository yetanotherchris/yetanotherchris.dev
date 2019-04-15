---
title: Objective C by example for a C# developer
date: 2009-06-22 00:00:00 Z
permalink: "/csharp/objective-c-by-example-for-a-csharp-developer/"
tags:
- c#
- iphone
Published: 2009-06-22 00:00:00 Z
author: Chris S
excerpt: This is a small set of code snippets that may assist as a quick reference
  when switching between C# and Objective-C concepts. It's all beginner level and
  I've skipped some major concepts that a book will explain, as well as any C related
  tasks.
layout: post
dsq_thread_id:
- 1074325398
---

This is a small set of code snippets that may assist as a quick reference when switching between C# and Objective-C concepts. It's all beginner level and I've skipped some major concepts that a book will explain, as well as any C related tasks.

**Update**   
Thanks to Bill Bumgarner from Apple for his corrections and feedback. In particular alloc and init, autorelease, abstract classes and the constructor sections have been changed.

**Update 2**  
Since I wrote this article I've shifted from battling with objective-c to using [Monotouch][1]. I'm now maintaining [this page][2] of snippets for Monotouch.

<!--more-->

### Object creation

`gist:yetanotherchris/4747023`

### The import keyword

There's two ways of importing, just as with C/C++. The one you want to care about most of the time is in quotes. The angled brackets approach forces the preprocessor to look for the file in the system header directory.

<pre>#import &lt;Foundation/Foundation.h&gt;
#import "MyClass.h"
</pre>

### Naming conventions

Objective-C is much like Java and uses Pascal case for classes, and camel case for methods and properties. The link at the bottom page gives more information.

### Reflection equivalent, or typeof/is

As far as I'm aware objective-c has no equivalent to reflection in the framework. However for type checking there are many features built in.

`gist:yetanotherchris/4747030`

### Foundation.h, Cocoa, UIKit and AppKit

Regardless of your application, you will almost always include Foundation.h as an import. This is the base library of classes like NSObject, NSString and so on, much like mscorlib.dll in .NET.

Cocoa is used for Cocoa applications on OS X, however on the iPhone/iTouch this is Cocoa Touch library. AppKit is part of the desktop/netbook Cocoa library, however this is replaced by UIKit on the Touch platform. Confused yet?

### Classes, encapsulation

Below shows most features you'll need to know about, with comments describing what is going on. I've arranged it in 2 separate files - the header and implementation file. It's possible to define a class and implementation in the same file however the standard is to have the interface in a header (.h) file, and the implementation in the source (.m) file.

`gist:yetanotherchris/4747038`

### Exception handling

`gist:yetanotherchris/4747042`

### String example

`gist:yetanotherchris/4747045`

### Documentation

`gist:yetanotherchris/4747046`

### Collections: Dictionary

`gist:yetanotherchris/4747055`

### Date formatting

`gist:yetanotherchris/4747060`

### Links

  * Fortunately the Apple documentation is high quality for the Foundation and Cocoa APIs, and has a large amount of tasks much like the MSDN documentation. [Here's an example][3].
  * Most of the above has come from reading [Stephen G. Kochan's Programming in Objective-C 2.0 book][4] *(affliate link)*. I recommend it, however I haven't really read any others. 
  * [Naming convention information][5].
  * There is a huge wealth of information on the web - a good tutorial can be found [here][6], and [here][7].
  * Information about synthesised properties can be found on the [Apple developer site][8] and [here][9].

 [1]: http://www.monotouch.net
 [2]: /monotouch/monotouch-tips-and-snippets/
 [3]: http://developer.apple.com/documentation/Cocoa/Conceptual/Exceptions/Tasks/RaisingExceptions.html
 [4]: http://www.amazon.com/gp/product/0321566157?ie=UTF8&tag=sloppycode-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0596526784
 [5]: http://developer.apple.com/mac/library/documentation/Cocoa/Conceptual/CodingGuidelines/Articles/NamingBasics.html#//apple_ref/doc/uid/20001281-BBCHBFAH
 [6]: http://www.otierney.net/objective-c.html
 [7]: http://theocacao.com/document.page/510
 [8]: http://developer.apple.com/documentation/Cocoa/Conceptual/ObjectiveC/Articles/ocProperties.html
 [9]: http://www.cocoacast.com/?q=node/103