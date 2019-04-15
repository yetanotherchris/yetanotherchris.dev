---
title: ASP.NET control event order/lifecycle
date: 2010-03-24 00:00:00 Z
permalink: "/asp-net/asp-net-control-event-orderlifecycle/"
tags:
- asp.net
Published: 2010-03-24 00:00:00 Z
author: Chris S
excerpt: A very concise reference for the order which events are fired when you subclass
  a control
layout: post
dsq_thread_id:
- 1083144045
---

This is a very concise reference for the order which events are fired when you subclass a control. The longer more detailed MSDN page on the lifecycle can be found [here][1]. The particular control this came from was a subclassed CompositeControl, but this could be any control, or a page.

<!--more-->

> OnInit: 1   
> LoadViewState: 2   
> CreateChildControls: 3   
> OnLoad: 4   
> ShowButton: 5   
> OnPreRender: 6   
> Render: 7   
> OnUnload: 8 

The code that produced this is below. The list above was produced after a button press on the form. This button pressed called the ShowButton() method below.

`gist:yetanotherchris/4952931`

There is also an equivalent [lifecycle chart for AJAX][2].

Here's a few gotchas that have gotcha'd me:

  * OnInit() is called before the ViewState is loaded, so if you need the values of the controls after postback, this isn't the event.
  * OnLoad() is called before your control events on the page are fired. So if you have a button with an event handler and that changes your control, any OnLoad logic for properties of the control will be overwritten.
  * CreateChildControls() is not guaranteed to be 3rd as show above. It may be called at any stage as the MSDN docs state.
  * If you put rendering code in PreRender() and a method in your control that is called by a button event (or any event) relies on a control created in PreRender(), you'll get an exception. The control won't have been created until after that event has fired.
  * Put the properties of the control that need persitance inside the ViewState, not just a backing field (example below). It might seem an obvious point but can cause headaches.

`gist:yetanotherchris/4952974`

 [1]: http://msdn.microsoft.com/en-us/library/aa719775(VS.71).aspx
 [2]: http://aspnetresources.com/downloads/MS%20Ajax%20Client%20Life-Cycle%20Events.pdf