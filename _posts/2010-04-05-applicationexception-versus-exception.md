---
title: ApplicationException versus Exception
date: 2010-04-05 00:00:00 Z
permalink: "/csharp/applicationexception-versus-exception/"
tags:
- best-practices
- c#
Published: 2010-04-05 00:00:00 Z
author: Chris S
excerpt: The two often repeated phrases about Exceptions in .NET is they should be
  used for 'exceptional behaviour' and sparingly; they are a performance hit on your
  application and aren't a replacement for logging. This post goes into some details
  about Exceptions and ApplicationExceptions.
layout: post
dsq_thread_id:
- 1083200872
---

### Exceptions

The two often repeated phrases about Exceptions in .NET is they should be used for &#8220;exceptional behaviour&#8221; and sparingly; they are a performance hit on your application and aren't a replacement for logging. These are of course good recommendations, however one point that is often neglated is guidance of when Exceptions should be thrown, and when they are just a performance hit. 

<!--more-->

The best discussion I've read on the topic is once again inside &#8220;CLR via C#&#8221; by Jeffrey Richter where he describes more simply how an exception should be thrown when your method doesn't perform the contract it describes it will do. I find this idiom a lot easier to work with than the &#8220;exceptional behaviour&#8221; metaphor, and his standpoint is that exception handling, while a performance drain, is a lot more beneficial than having code that performs iratically but milliseconds faster. 

Or having code that doesn't stop when it's not performing what it is functionally required to do - in simple terms not taking the input and returning the output it specifies.

This obviously has to be used with common sense, always throwing an exception when something unexpected happened such as empty data in a database isn't what the advice is about. However simple template'd exception handling like parameter checking on each method for ArgumentNullExceptions (there's a good extension method for argument exceptions on [stackoverflow.com][1] which is also on codeplex.com by &#8216;bovium'), throwing exceptions when an object's property you're using is null, database loads/saves not performing is far more intuitive (in my view) than having to step through or search through logs especially on production environments.

Jeffrey Richter covers it in a lot more detail in his book, along with talking about the Windows legacy of HRESULT and COM error passing. 

### Custom Exceptions: ApplicationException vs Exception

*(This discussion is also in more detail in [&#8220;CLR via C#&#8221; by Jeffrey Richter][2])*

When creating a custom exception, which class should you derive from: ApplicationException or Exception? MSDN and other sources say inherit from ApplicationException, one of the well known C#/.NET standard practices along with the &#8220;exceptional behaviour&#8221; metaphor mentioned above. The idea behind it is all CLR exceptions inherit from SystemException, and your custom exceptions inherit from ApplicationException making generic application exception handling a case of: 

<pre>catch ( ApplicationException e)
{
// ...
}
</pre>

Microsoft developers working on the .NET framework have voiced opposite views on deriving from ApplicationException.

The problem with the guideline of using ApplicationException is that there are actually classes in the framework that inherit from ApplicationException! Not many but they are still present. More importantly using this guideline stops you from inheriting functionality from existing SystemException classes, forcing you to reinvent functionality that already exists. Take for example ArgumentException. If you wanted to create your own version so that callers know they passed a bad argument to your code, you would be reinventing this class basing it on ApplicationException when really the benefits are few. It would break on systems that catch all ApplicationExceptions, but how many of these exist? I'm happy inheriting from the relevant Exception class in the framework and ignoring the ApplicationException guideline, as both Microsoft engineers and Jeffrey Richter's own inner-knowledge of Microsoft point out that Microsoft want to remove the two-pronged Exception structure but can't due to legacy code. 

A longer discussion on the do's and don'ts of custom exceptions can also be found at on [this blog][3] which gives a contradictory view to the above.

 [1]: http://stackoverflow.com/questions/271398/post-your-extension-goodies-for-c-net-codeplex-com-extensionoverflow
 [2]: http://www.amazon.com/CLR-via-Second-Pro-Developer/dp/0735621632
 [3]: http://blogs.msdn.com/kcwalina/archive/2005/03/16/396787.aspx