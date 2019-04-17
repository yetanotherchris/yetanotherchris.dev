---
title: Monotouch Controllers by example
date: 2010-10-10 00:00:00 Z
permalink: "/monotouch/monotouch-controllers-by-example/"
tags:
- monotouch
Published: 2010-10-10 00:00:00 Z
author: Chris S
description: The first of a few posts about using XIB-free Controllers in Monotouch.
layout: post
dsq_thread_id:
- 1084985186
---

![UINavigationController][1]![UITableController][2]![UITableController][3]

<!--more-->

If you're use to the Winforms or ASP.NET way of laying out controls and have moved to Monotouch, one of the biggest hurdles to get over is learning your way around Interface builder and how Monotouch ties in with it. 

The alternative to using Interface builder is to lay out all your views inside C# and not open Interface builder again. The learning curve is slightly steeper with this method but you get finer control on your Views and this technique is more familiar if you're used to laying out controls (or Views in Cocoa land) in code. 

It's slower to design as you generally adjust pixels and the flow of a view, rebuild and view in the simulator and it's not the prefered solution if you're collaborating with a graphic designer who can simply use Interface builder. 

But coming from a .NET winforms, ASP.NET/ASP.NET MVC and even Java Swing background I'm comfortable laying out views in markup and C#, so I've decided to write up my adventures as a set of 2 articles. The two controllers I'll cover, which are the basis for 90% (I made that statistic up) of iPhone apps: 

  * [UINavigationController by example][4]
  * [UITableViewController by example][5]

The two articles cover most of the basics and a bit more via code, and they include a solution file download.

 [1]: /assets/2010/10/UINavigationController2.png
 [2]: /assets/2010/10/UITableViewController3.png
 [3]: /assets/2010/10/UITableViewController4.png
 [4]: /tags/iphone/uinavigationcontroller-by-example
 [5]: /tags/monotouch/uitableviewcontroller-by-example/