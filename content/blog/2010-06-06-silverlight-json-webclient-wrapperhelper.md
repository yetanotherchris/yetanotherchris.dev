---
title: Silverlight JSON WebClient wrapper/helper
date: 2010-06-06 00:00:00 Z
permalink: "/csharp/silverlight-json-webclient-wrapperhelper/"
tags:
- csharp
- silverlight
- webclient
Published: 2010-06-06 00:00:00 Z
author: Chris S
description: This is a small class that uses the NewtonSoft JSON.NET library to make JSON
  requests to a URL. It handles both requests that require parameters, and those that
  just return results.
layout: post
dsq_thread_id:
- 4207230556
---

This is a small class that uses the [NewtonSoft JSON.NET][1] library to make JSON requests to a URL. It handles both requests that require parameters, and those that just return results (for example a GetProducts() call).

<!--more-->

I chose NewtonSoft over the default Microsoft JSON deserializer as it handles nested objects and doesn't require attributes on your domain objects.

The class probably needs a few tweaks to be completely production-ready.

`gist:yetanotherchris/4956818`

 [1]: http://json.codeplex.com/