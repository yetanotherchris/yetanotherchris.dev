---
Published: 2012-03-14
title: "Serializing an object to XML snippet"
author: Chris S
layout: post
permalink: /csharp/serializing-an-object-to-xml-snippet/
dsq_thread_id:
  - 1069228112
tags:
  - 'c#'
---
I've written this same snippet so many times I've decided to shove it here to save my fingers a few calories in future. It's nothing special, just a way of serializing an object to XML.

<!--more-->

<pre>string ToXml(object instance)
{
	XmlSerializer serializer = new XmlSerializer(instance.GetType());
	StringBuilder builder = new StringBuilder();
	using (StringWriter writer = new StringWriter(builder))
	{
		serializer.Serialize(writer, instance);
		return builder.ToString();
	}
}
</pre>