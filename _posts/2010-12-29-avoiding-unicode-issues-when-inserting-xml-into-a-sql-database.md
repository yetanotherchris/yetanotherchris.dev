---
Published: 2010-12-29
title: "Avoiding Unicode issues when inserting XML into a SQL Database"
author: Chris S
excerpt: "If you have to insert XML into a SQL Server (2005+) XML column, there's three ways of doing it..."
layout: post
permalink: /sql-server/avoiding-unicode-issues-when-inserting-xml-into-a-sql-database/
dsq_thread_id:
  - 1092317575
tags:
  - sql-server
  - xml
---
If you have to insert XML into a SQL Server (2005+) XML column, there's three ways of doing it.

  1. Perform a raw string insert, which is unlikely to work
  2. Use an XmlReader and SqlDbType.Xml
  3. Use SqlDbType.Text and a Stream.

<!--more-->

Below is my preferred way of doing it and gets around the problem you might come up with:

> XML parsing: line 1, character (xx),  
> unable to switch the encoding 

This occurs when you're trying to shove a UTF8 string into the database XML column, using

<pre>&lt;?xml version="1.0" encoding="utf-8"?&gt;</pre>

It might also happen with a file with no BOM, which can be fixed by opening + saving the file in notepad. Anyway the solution below gets around this issue.

<script src="https://gist.github.com/yetanotherchris/4984662.js"></script>