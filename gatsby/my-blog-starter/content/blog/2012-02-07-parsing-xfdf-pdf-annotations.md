---
title: Parsing XFDF (PDF annotations) in C#
date: 2012-02-07 00:00:00 Z
permalink: "/csharp/parsing-xfdf-pdf-annotations/"
tags:
- c#
Published: 2012-02-07 00:00:00 Z
author: Chris S
layout: post
dsq_thread_id:
- 4207230070
---

I'm in the middle of doing the final two modules of the 3rd year of my part-time Computer Science degree, which means going back to the books. I've gone through virtually every note taking technique possible for the reading over the years - textbook + pencil on the tube, Pulse pen, converting PDFs by hand for the Kindle and netbook. This year I've decided to try something different, and use the annotations functionality built into the PDF 9+ format. Fortunately the Open University provides most of the course reading in PDF format (except [this book][1], the main course text of one module). There's no lectures and occasional seminars so the majority of your time is spent reading the course texts and doing the activities for each assignment.

<!--more-->

So far PDF annotations have been quite successful for me, and cut down on the arduous task I had in past years of typing up my notes into Google Docs. I'm using RepliGo on my Android phone for the annotations as it's bar far the most polished and smoothest, although I did buy + try Foxit and EzPdf. Even better is I can read/squint at my phone while I'm crammed into a commuter train each morning.

Of all the PDF readers there are, mobile or desktop, none provide the annotations as plain text. It's frustrating as RepliGo stamps its name in the title of the annotation, which ends up in the exported annotations PDF (which Foxit does provide). ezPDF Reader on Android provides an export to XFDF feature - a new Adobe file format I discovered yesterday.

XFDF is Adobe's PDF format format, which is just XML. Foxit can export to this format, giving you something similar to:

<pre>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;xfdf xmlns="http://ns.adobe.com/xfdf/" xml:space="preserve"&gt;
	&lt;annots&gt;
		&lt;highlight page="5" color="#ffff00" date="D:20120202165351Z00'00'" rect="141.36,518.13,538.56,569.96"
		title="RepliGo Reader" creationdate="D:20120202165351Z00'00'"
		opacity="1.0" subject="Your text" coords="..."/&gt;
		....
	&lt;/annots&gt;
	&lt;fields/&gt;
	&lt;f href="unit2.pdf"/&gt;
	&lt;ids original="3f6a55fb77e99aa479b4fce428bb0ebb" modified="b8903ee8c6c74e19b95bcdca02eb1809"/&gt;
&lt;/xfdf&gt;
</pre>

<!-- more -->

So in order for me to turn this into a Google docs friendly format, I present my 14-liner solution that every PDF reader didn't think was necessary to provide us poor students with:

<pre>static void Main(string[] args)
{
	string xml = File.ReadAllText("export.xfdf", Encoding.UTF8);
	XDocument doc = XDocument.Load(new StringReader(xml));
	var elements = doc.Root.Element(XName.Get("annots", "http://ns.adobe.com/xfdf/"))
					.Elements(XName.Get("highlight", "http://ns.adobe.com/xfdf/"))
					.OrderBy(e =&gt; int.Parse(e.Attribute("page").Value));
	StringBuilder builder = new StringBuilder();
	builder.Append("&lt;html&gt;&lt;body&gt;");
	
	foreach (XElement element in elements)
	{
		builder.AppendFormat("&lt;p&gt;{0}&lt;/p&gt;", element.Attribute("subject").Value);
	}
	builder.Append("&lt;/body&gt;&lt;/html&gt;");
	
	File.WriteAllText(@"C:\annotations.html", builder.ToString(), Encoding.Unicode);
}
</pre>

 [1]: http://www.id-book.com/