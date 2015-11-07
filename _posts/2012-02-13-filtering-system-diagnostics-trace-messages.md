---
Published: 2012-02-13
title: "Filtering System.Diagnostics Trace messages"
author: Chris S
layout: post
permalink: /csharp/filtering-system-diagnostics-trace-messages/
dsq_thread_id:
  - 1074352095
tags:
  - 'c#'
---
One of the biggest points earners for me on Stackoverflow has been [this question][1] about Error logging in C#/.NET. Having been fairly experienced with the setup of Log4net, I've seen firsthand how much over kill it generally is for logging (unless you like to use your live servers for debugging), and also how it just isn't needed as .NET has its own in built and comprehensive logging framework built in.

One thing that isn't mentioned in my answer is how to filter your log messages according to error type: information, error, critical etc. It's fairly easy to do with TraceListeners, but requires quite a few extra lines of XML in your web.config/app.config. The example below shows how to filter information messages, it's setup to use the eventlog and write to the ASP.NET category, which is necessary with web apps if the user you are running the app pool with doesn't have admin access, or the registry key for a new event log source doesn't exist.

<script src="https://gist.github.com/yetanotherchris/4747141.js"></script> 

<!--more-->

You should be using a wrapper/Façade class for the logging so you can have a single entry point and class with one responsibility in your app. Checking for the output level is then easy:

<pre>private TraceSource _traceSource  = new TraceSource("defaultSource");

public void LogInformation(string message,object params args)
{
	if ((_traceSource.Switch.Level & SourceLevels.Information) == SourceLevels.Information)
	{
		...
	}
}
</pre>

 [1]: http://stackoverflow.com/questions/147557/error-logging-in-c-sharp/148117