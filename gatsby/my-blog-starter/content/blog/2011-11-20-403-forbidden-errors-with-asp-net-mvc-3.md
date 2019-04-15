---
title: 403 Forbidden errors with ASP.NET MVC 3
date: 2011-11-20 00:00:00 Z
permalink: "/asp-net-mvc/403-forbidden-errors-with-asp-net-mvc-3/"
tags:
- asp.net-mvc
Published: 2011-11-20 00:00:00 Z
author: Chris S
layout: post
dsq_thread_id:
- 1092518275
---

Have you just created an ASP.NET MVC 3 site on your local/developer box to use Windows authentication, mapped it correctly and then continually got an authentication box appearing even though you're typing the username/password correctly? And the permissions on disk are fine, you even have everyone mapped to the root folder.

When you cancel, you get a 403.1 or 403.x error. As I discovered this error comes from a security feature of Windows Vista/7 that stops loop back auth checks which essentially cripples your windows authentication settings without changing the registry. **It only ever happens when you're testing the site on localhost, or using a domain that's mapped to 127.0.0.1 in your hosts file or DNS server.**

There's a support.microsoft.com page about it [here][1], but the most reliable fix is the 1st of the two options. Here's the relevant parts:

<!--more-->

> In Registry Editor, locate and then click the following registry key:  
> HKEY*LOCAL*MACHINE\SYSTEM\CurrentControlSet\Control\Lsa\MSV1_0
> 
> Right-click MSV1_0, point to New, and then click Multi-String Value.
> 
> Type BackConnectionHostNames, and then press ENTER.
> 
> Right-click BackConnectionHostNames, and then click Modify.
> 
> In the Value data box, type the host name or the host names for the sites that are on the local computer, and then click OK.

 [1]: http://support.microsoft.com/kb/896861