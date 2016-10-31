---
title: Adding NETWORKSERVICE as a dbo user in SQL Server
date: 2014-01-03 00:00:00 Z
permalink: "/iis/adding-networkservice-as-a-dbo-user-in-sql-server/"
tags:
- iis
Published: 2014-01-03 00:00:00 Z
author: Chris S
excerpt: excerpt
layout: post
---

If you want to enable integrated security in your SQL Server connection string, and don't want to have to update your App Pool with a username across different machines you can simply add &#8216;NT AUTHORITY\NETWORK SERVICE' as a dbo for the database you're querying.

You can also add &#8220;NT AUTHORITY\LOCAL SERVICE&#8221; too.

Obviously this isn't recommended for production use, and shouldn't really be used in larger teams or multi-environments (staging, live-staging, live) setups.