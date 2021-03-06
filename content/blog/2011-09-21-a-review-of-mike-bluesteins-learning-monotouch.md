---
title: A review of Mike Bluesteins Learning Monotouch'
date: 2011-09-21 00:00:00 Z
permalink: "/monotouch/a-review-of-mike-bluesteins-learning-monotouch/"
tags:
- monotouch
Published: 2011-09-21 00:00:00 Z
author: Chris S
description: I have been lucky enough to receive a review copy of Mike Bluestein’s 'Learning
  Monotouch'. This is a mini review of the book.
layout: post
dsq_thread_id:
- 1092636141
---

![Book cover][1]

I have been lucky enough to receive a review copy of Mike Bluestein’s “Learning Monotouch”. This is a mini review of the book.

Although I’m no longer very active in the Monotouch community, I can remember Mike being (and still is) one of the core bloggers and contributors for the MT community and his blog was fairly invaluable, along with Wally McClure’s, Craig Dunn’s, Chris Hardy’s, Eduardo Scoz’s and a few others. This book goes sort of goes head to head with the Wrox book, the fact it has one author though is down to Mike being fairly prolific blogger on MT, so he has a mountain of posts to already build on. I’m hoping I don’t offend the other camp by doing this review!

<!--more-->

The book goes from the standard 1st chapter hello world app all the way to using WCF inside Monotouch, and includes chapters on iOS subjects that you really can’t create a decent app without – tables, the UI controls and controllers.

The book is focused on using XCode for your views which is something I began Monotouch with, and then rapidly moved away from after realising how poor XCode’s Interface Builder is. The support for XCode with Monodevelop improved in the latest versions, and it makes a lot more sense to write the book this way as most agencies will have a professional designer for the views who create using XCode, rather than putting it all together inside code behind. The only downside is a lot of the github examples out there don’t use NIBs (Interface Builder’s version of XAML) so you may struggle to find as many examples to support the book.

You’re steered through Interface Builder and guided on the requirements for downloading and installing the various bits to get going with iPhone development which can be a minefield to get started with.

One of the stumbling blocks for my initial few months with Monotouch was being use to JIT development with .NET, and moving into the mind set of AOT compilation. I also discovered the large holes in my .NET knowledge this way so it had some benefits. The book reminds you that Monotouch’s debugger is JIT while the app deployed on the phone is AOT. It could have probably done with going into a bit more detail here, some background on the stop-the-world (AOT) nature of Monotouch and avoiding the pitfalls of weak references; but I was pleased to find information on NSAutoReleasePool and Objective-C’s reference counting.

The rest of the book, or 90% of it, is clearly laid out and gives you pretty much everything you need to make an app. You get XML parsing, Sqlite integration, Maps and location and even PDFs – a sore point for the iPhone. The book’s demo app is for creating and saving notes, and has some good bits on using NSUserDefaults vs SQLite for storage.

The book is out now in both Kindle and Paperback formats ([Amazon link][2]). If you’re new to Monotouch I’d recommend the paperback format as it has a fair number of images for the UI control chapters, plus (at least in the UK) the Kindle version is more expensive thanks to our arcane tax laws on digital items.

 [1]: /assets/2011/09/learningmonotouch.png
 [2]: http://www.amazon.com/gp/product/0321719921/ref=as_li_tf_tl?ie=UTF8&tag=sloppycode-20&linkCode=as2&camp=217145&creative=399373&creativeASIN=0321719921