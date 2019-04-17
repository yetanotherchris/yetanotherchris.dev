---
title: Output from the Uri class
date: 2009-02-27 00:00:00 Z
permalink: "/csharp/output-from-the-uri-class/"
tags:
- csharp
Published: 2009-02-27 00:00:00 Z
author: Chris S
layout: post
dsq_thread_id:
- 1074137365
---

This shows the output from all the properties of the URI class for the current request. The Uri has been hardcoded as:

<!--more-->

<pre>// Add a querystring a different port just to show it working in the Uri class.
Uri uri = new Uri("http://www.yetanotherchris.me:8900/code-snippets/csharp/uri-class-output.aspx?myid=30");
AbsolutePath        /code-snippets/csharp/uri-class-output.aspx
AbsoluteUri         http://www.yetanotherchris.me:8900/code-snippets/csharp/uri-class-output.aspx?myid=30
Authority           www.yetanotherchris.me:8900
DnsSafeHost         www.yetanotherchris.me
Fragment
Host                www.yetanotherchris.me
HostNameType        Dns
IsAbsoluteUri       True
IsDefaultPort       False
IsFile              False
IsLoopback          False
IsUnc               False
LocalPath           /code-snippets/csharp/uri-class-output.aspx
OriginalString      http://www.yetanotherchris.me:8900/code-snippets/csharp/uri-class-output.aspx?myid=30
PathAndQuery        /code-snippets/csharp/uri-class-output.aspx?myid=30
Port                8900
Query               ?myid=30
Scheme              http
Segments            /,code-snippets/,csharp/,uri-class-output.aspx
UserEscaped         False
UserInfo
</pre>