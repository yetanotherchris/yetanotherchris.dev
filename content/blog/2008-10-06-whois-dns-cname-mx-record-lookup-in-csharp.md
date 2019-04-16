---
title: Whois, DNS, CName, MX record lookup in C#
date: 2008-10-06 00:00:00 Z
permalink: "/csharp/whois-dns-cname-mx-record-lookup-in-csharp/"
tags:
- c#
Published: 2008-10-06 00:00:00 Z
author: Chris S
description: This is the source code from the network tools page that use to exist on
  the previous domain (when the site was hosted on a dedicated server). A good replacement
  site is [who.is][6], however the source for the tools is below.
layout: post
dsq_thread_id:
- 1072994329
---

[Download][1]

This is the source code from the network tools page that use to exist on the previous domain (when the site was hosted on a dedicated server). A good replacement site is [who.is][2], however the source for the tools is below.

<!--more-->

The download contains the class library used for the Network Tools and a sample console application. The Whois lookup isn't included, you can grab that from the Whois post. Most of the credit for tools goes to the [NMail server project][3]. The DNS lookup functions were all adapted from that project, such as CNAME, Nameservers and MX records.

The code below shows the simple Hostname to IP and visa versa methods.

![Network tools console][4]

`gist:yetanotherchris/4746180`

 [1]: /assets/2013/02/networktools.zip
 [2]: http://www.who.is/
 [3]: http://sourceforge.net/projects/nmailserver/
 [4]: /assets/2008/10/networktools.gif