---
title: 'C# Design Patterns: the Façade pattern'
date: 2009-04-14 00:00:00 Z
permalink: "/csharp/csharp-design-patterns-the-facade-pattern/"
tags:
- c#
- design-patterns
Published: 2009-04-14 00:00:00 Z
author: Chris S
description: A summary and example of the façade design pattern.
layout: post
dsq_thread_id:
- 1074291095
---

### Summary

Access multiple classes in one simple to use class. This class is often static too. 

<!--more-->

### Example

A common use of the Façade pattern is with data access managers, a façade class that contains only static methods for CRUD operations. Another example might be a class that handles payment in an online store. This façade class would link into multiple payment providers (paypal, visa/mastercard) as well as updating any order details in a database table. Rather than making the UI perform 10-20 lines of code, this could be done in a simple CheckoutManager.ProcessPayment(&#8230;) method. 

`gist:yetanotherchris/4746929`