---
title: Listing all mime types without using OLE and IIS in .NET
date: 2011-04-04 00:00:00 Z
permalink: "/asp-net/listing-all-mime-types-without-using-ole-and-iis-in-net/"
tags:
- asp.net
Published: 2011-04-04 00:00:00 Z
author: Chris S
excerpt: An ASP.NET example of mapping file extensions to their mime types, without
  needing to query IIS via COM.
layout: post
dsq_thread_id:
- 1092478740
---

If you're offering uploading on a web application, or providing a file proxy of some sort, at some point the list of files you offer will exceed a simple switch statement.

In order for the file to be recognised correctly by the browser that's downloading the file you need to pass the correct headers back. You can do this the long, more complete way by querying the IIS mimetype metabase (which requires COM interop with IIS6). 

<!--more-->

Or you can cheat and simply query an XML file list of mimetypes. The application below does this, based on [a list from webmaster-toolkit.com][1]. **Update** - that's now a dead link. [This link has a list](http://www.whoishostingthis.com/resources/mime-types/) (thanks Tim).

The full download includes the XML serialized file.

### Usage

<pre>class Program
{
	static void Main(string[] args)
	{
		var list = MimeType.Load();
		MimeType mimetype = list.FirstOrDefault(m =&gt; m.Extension == "jpg");
	}
}
</pre>

### MimeType class

`gist:yetanotherchris/4985418`

 [1]: http://www.webmaster-toolkit.com/mime-types.shtml
