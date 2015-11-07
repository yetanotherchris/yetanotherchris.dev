---
Published: 2012-04-04
title: "Razor: Defining a section inside a HTML helper extension method"
author: Chris S
layout: post
permalink: /asp-net-mvc/razor-defining-a-section-inside-a-html-helper-extension-method/
dsq_thread_id:
  - 1067464549
tags:
  - asp.net-mvc
---
If you need to inject a generic section of code to your view you'd typically write an extension method for the HtmlHelper class and return an MVCHtmlString. You can also create an extension method that will add a @section Name to the view, using something like the snippet below:

<!--more-->

<pre>public static MvcHtmlString ShowModalForPage(this HtmlHelper helper, int pageIndex)
{
	WebViewPage page = helper.ViewDataContainer as WebViewPage;
	if (page != null)
	{
		page.DefineSection("Head", () =&gt;
		{
			StringBuilder builder = new StringBuilder();
			builder.Append(@"&lt;script type=""text/javascript""&gt;");
			builder.Append("$(document).ready(function () ");
			builder.Append("{");
			builder.Append("    showModal(" + pageIndex+ " );");
			builder.Append("});");
			builder.Append("&lt;/script&gt;");
			page.Write(MvcHtmlString.Create(builder.ToString()));
		});
	}
	
	return MvcHtmlString.Empty;
}
</pre>

You still need to return a MvcHtmlString regardless of the fact it's being added to the page via the WebViewPage.Write method.