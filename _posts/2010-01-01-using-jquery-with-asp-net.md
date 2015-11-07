---
Published: 2010-01-01
title: "Using JQuery with ASP.NET"
author: Chris S
excerpt: "This post is all about calling and parsing data from an ASP.NET web service using jQuery."
layout: post
permalink: /asp-net/using-jquery-with-asp-net/
dsq_thread_id:
  - 1077782437
tags:
  - asp.net
---
**Small update**   
In this article I stuck to using a separate file for the web service. The [Webmethod] attribute could easily just be stuck on a method inside the Default.aspx.cs file. Additionally, you could use $.get() in jquery to simply call a plain .aspx file to return the HTML (skipping the XML parsing), or even better as a JQuery JSON request, using a call to an ASPX file that returns a JSON formatted string.

Here's an example:

<!--more-->

<pre>// In your javascript block
$.ajax(
{
	url: "/my/url.aspx/DoSomething",
	type: "POST",
	contentType: "application/json; charset=utf-8",
	data: "{ id: 999 }",
	dataType: "json",
	success: function() { alert("done"); }
});

// In the codebehind
[WebMethod]
public static void DoSomething(string id)
{
}
</pre>

* * *

This article assumes you know how to make a web service, and are familiar with the scriptmanager/asp.net (atlas) approach to ajax, and know what JQuery is. Basically it's not a beginners' walkthrough for the 3. My knowledge for this article comes from my experiences both professionally and for a small side project I to create a filterable RSS aggregator, similar to what Feedly and Pulse are now. 

The articles includes: - Loading data dynamically through jquery and an asp.net web services

  * Sending the data to the web service
  * Parsing the XML data returned from the web service
  * Adding a loading animation to indicate work is being done
  * Loading data as you scroll down the page

I initially set about writing my own Ajax enabled ASP.NET control in order to dynamically load feeds in Soot, but quickly realised the learning curve of developing these was too steep for what I required. I'm sure they're as powerful or even more powerful than a plain web service and JQuery, but I was after a fast solution and being very familiar with JQuery I prefered this route. 

JQuery is intuitive, has a very active and chatty community, features a host of plugins and plenty of documentation and is also lightweight. Using it for async (ajax/xmlhttp) requests is also very simple as I found out. I'll admit upfront that I hate Javascript (I know I'm not alone in this). Even with Microsoft and Google's efforts to make it more predictable and faster to use, is still a painful developer experience. This isn't because I'm a newbie to Javascript, I've been using it since version 1.3 and remember the desk-pounding, keyboard-headbutting days of writing for Netscape prior to &#8220;web 2.0&#8221;. Because debugging it so fiddly and almost always results in alerts() or a debug div, and it being a strange mix of a prototyped,OO and loosely typed language that writing anything that isn't basic is hard work. Fortunately we now have lots of well written libraries stuck on top of Javascript taking most of the misery away. But that's enough Javascript ranting.. 

### Getting started

Here's what is needed to get JQuery working with ASP.NET and calling a webservice to load data dynamically. 

  * Minor web.config tweak to get web services working with Jquery.
  * A web service
  * The latest JQuery .js file.
  * A webpage with JQuery included
  * Call the webservice
  * Parse the items returned by the webservice

Nothing overly complex there. I could probably have improved the integration further by making the JQuery .js file an embedded resource in your ASP.NET application if, but I've skipped that step for now. 

### The web.config tweak

The first step before doing anything is to configure your web service calls so that JQuery can post to them. This is done with the following:

<pre>&lt;system.web&gt;
	&lt;webServices&gt;
		&lt;protocols&gt;
			&lt;add name="HttpGet"/&gt;
			&lt;add name="HttpPost"/&gt;
		&lt;/protocols&gt;
	&lt;/webServices&gt;
&lt;/system.web&gt;
</pre>

If you don't do this, you receive an error message when you call the webservice in JQuery: 

&#8220;Request format is unrecognized for URL unexpectedly ending in jquery&#8221; 

### The webservice

The webservice doesn't require any special changes to it. Simply create your webservice, add a new method with [WebMethod] added and return whatever needs to be returned. Here's my webservice, with some code shortened to leave out the non essential bits:

<script src="https://gist.github.com/yetanotherchris/4757954.js"></script>

### Calling the webservice with JQuery

Now the web service is complete, the actual jquery work can be started. There's a few ways to make Ajax calls in JQuery, the one we're interested in the $.ajax() method or function. This function takes a set of config options as with a lot of JQuery calls. The settings that are important for ASP.NET web services are: 

  * It needs to be a POST, for this example anyway
  * processData is false
  * dataType is xml
  * Make sure you give it an error function to call, this is extremely useful for finding out where things are going wrong - on the client or server.
  * The URL format is &#8220;webservice.asmx/MethodName&#8221;

Here's one I'm using for the Soot application: 

<pre>$.ajax(
{ 
	type: "POST",
	url: "WebService.asmx/MyMethod",
	dataType: "xml",
	data: "arg1=" +arg1+ "&arg2=" +arg2,
	processData: false,
	error: function(XMLHttpRequest, textStatus, errorThrown) { ajaxError(XMLHttpRequest,textStatus, errorThrown); },
	success: function(xml) { ajaxFinish(xml); }
});
</pre>

So you can see a couple of things here. First is the data (the parameters of the webservice method) are passed in, in querystring format. Secondly the error function delegate passes the XML object, status and the error to its error handling function. Lastly the success function, the one called if it all works, gets passed a XMLHttpRequest object, which I've called &#8216;xml'. So as well as the call above, you would have two functions: 

<pre>function ajaxFinish(xml)
{
	// parse the object
}

function ajaxError(xmlObj,textStatus,errorThrown)
{
	// Comment this out for live environments, and put a friendly error message
	alert("(Ajax error: "+txt+")");
	alert(request.responseText);
}
</pre>

### Parsing the XML

This was the part of the whole process I struggled with the most. Fortunately some blogs were at hand to help, this one was particularly helpful, as was this one. 

The fastest way to figure out what you're getting back in your ajaxFinish(xml) function is to simply do alert(xml). This will display the SOAP XML returned from your webservice. There is infact a SOAP parser plugin for JQuery which I haven't used, but could be incorporated with this to parse the returned XML. For my needs, I've used JQuery's inbuilt XML DOM parser to get at the tags I need. The &#8216;xml' parameter is an XMLHTTPRequest object but you don't have to worry about using this, as JQuery can take this type and do its magic allowing you to find tags within it. 

Once you have worked out the format of the document returned, you can use alert($(xml).find(&#8220;YourTag&#8221;).children().length to see if it's retrieving the XML elements ok. 

Here's an example I've stripped from Soot that parses the following XML format: 

<script src="https://gist.github.com/yetanotherchris/4757898.js"></script>

This is formed from returning a FeedItemSummary[] array. FeedItemSummary is no more complex than the XML above shows (FeedItemSummary is actually a projected object from NHibernate): 

<pre>public class FeedItemSummary
{
	public string Title {get;set;}
	public string TldName {get;set;}
	public string Content {get;set;}
	public string PublishDate {get;set;}
	public int Hash {get;set;}
	public string FeedImage {get;set;}
	public string Url {get;set;}
}
</pre>

My advice is to keep your returned objects in a format that is friendly to Javascript, so stick to primitive types and don't use DateTimes or other .NET specialities, keep to strings,ints,bools, doubles. Unless you enjoy writing 5x more lines of JQuery to get at the tags. 

In parsing the XML I'm only interested in each FeedItemSummary. My parsing code builds up some dynamic HTML from each item, adding it to the DOM of page. This makes the initial loading of the page very fast, adding chunks of 10 items each time you scroll. Here's the JQuery: 

<script src="https://gist.github.com/yetanotherchris/4757998.js"></script>

Ignoring the structure of the page, it simply gets the text of each property of a FeedItemSummary and uses it to append to the #feedcontainer div. 

### Adding some polish

The loading animation One UI aspect you will be keen to include is a loading animation. A kind hourglass cursor except it's obviously now a hypnotic circle that rotates. There's lots of free animations you can use for this at [www.ajaxload.info][1] which allows you to configure the background colour and foreground colour of it. 

It's fairly trivial to add this loading animation in JQuery, you simple add a hidden div to your pay with this animation in, and toggle its display. So before your $.ajax call you toggle the div (I've called #loading): 

<pre>$("#loading").toggle();
$.ajax(...);
</pre>

Then inside either the ajaxFinish() or ajaxError() functions you once again call it:

<pre>function ajaxFinish(xml)
{
	$("#loading").toggle();
	...
}

function ajaxError(xmlObj,textStatus,errorThrown)
{
	$("#loading").toggle();
	....
}
</pre>

### Loading data while scrolling the page.

The items for each category/website in Soot don't all load when the page loads but instead get paged 10 items at a time. This happens when you scroll the page down and is something you find fairly frequently on websites now, one obvious example is Google Reader.

I won't take any credit for this, it was taken entirely from [this post][2].

I've simply tied in this example to increment the page by 1 each time the scrollbar hits the bottom of the page, like so:

<pre>function onScroll()
{
	if (_enableDynamicLoad && !_itemsComplete)
	{
		if ($(window).scrollTop() == $(document).height() - $(window).height())
		{
			_currentPage++;
			filterFeeds(); // calls the webservice to get the next page of 10 items
		}
	}
}
</pre>

This dynamic loading can be turned on and off so that mobile-based browsers such as Safari on the IPod/IPhone or IE on Windows Mobile can load the entire feed list, then disconnect from the web to read them offline.

### Finally

I'm still testing Soot so it will have some bugs to iron out over the next month. The UI for the filtering is getting an overhaul soon and the feed HTML cleaning code is gradually getting worked on. You will notice it has no ability to add your own feeds. This is deliberate, as the point of it is to take feeds from popular sources that have good content, and provide combined filtering on them. I'm also planning to have a new feature to email the latest 5-10 feeds from each category or website to you twice a day, a bit like a mailing list summary.

That's about it, hopefully this article has helped with you getting JQuery and ASP.NET/Ajax working together.

 [1]: http://www.ajaxload.info/
 [2]: http://www.webresourcesdepot.com/load-content-while-scrolling-with-jquery/