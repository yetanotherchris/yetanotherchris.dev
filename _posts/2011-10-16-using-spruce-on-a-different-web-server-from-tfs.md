---
Published: 2011-10-16
title: "Using Spruce on a different web server from TFS"
author: Chris S
excerpt: "One of the big issues I’ve come up against when developing Spruce has been using the website on a different web server from the one TFS runs as. By default TFS creates itself as ‘Team Foundation Server’ as a separate site inside IIS. As its API is entirely web services based, this is where your calls are made to, the .NET assemblies simply wrap these HTTP calls up in an easy to use package."
layout: post
permalink: /spruce/using-spruce-on-a-different-web-server-from-tfs/
dsq_thread_id:
  - 1092640693
tags:
  - spruce
---
One of the big issues I've come up against when developing Spruce has been using the website on a different web server from the one TFS runs as. By default TFS creates itself as ‘Team Foundation Server’ as a separate site inside IIS. As its API is entirely web services based, this is where your calls are made to, the .NET assemblies simply wrap these HTTP calls up in an easy to use package.

<!--more-->

TFS expects you to use pass through authentication with these .NET assemblies, so in a web application you have to enable this with:

<pre>&lt;authentication mode="Windows"/&gt;
&lt;identity impersonate="true" /&gt;
</pre>

This works fine if you’re inside a single Active Directory domain. However if you’re in a separate forest, for example a small branch office, then the impersonation doesn't work.

What I discovered from [asking on Stackoverflow][1], and subsequently [answering with my own question][2] is that it’s a simple issue of setting up delegation for the IIS server inside your domain controller in Active Directory.

One issue I found from running on a separate IIS server was I had a lot of issues with TFS URLs, and it ran quite a lot slower (presumably from the extra authentication) than simply sitting on the same TFS server. I also got a lot of frustrated with configuration of firewalls and other permissions.

To add to our headache our TFS server talks to the main domain controller to grab the users who can authenticate with it. It has permission to do this by running as a main domain login for its app pool. I had many hours of fun trying to get this list to update itself more regularly, particularly after our domain had switched from Surname Firstname to the other way round. I tried all the [obvious advice][3] including hacking at my own login inside TFS but it wouldn't budge.

The conclusion I came to was unless you have someone on the TFS team in your office, in other words you’re Microsoft, expect to have lots of headaches and hours of Googling when using TFS in a cross-domain setup. Alternatively ask for administrator rights on both domains, something you’re unlikely to be given at most companies.

 [1]: http://stackoverflow.com/questions/4013081/passthrough-impersonation-authentication-with-asp-net-and-tfs-api
 [2]: http://stackoverflow.com/questions/4013081/passthrough-impersonation-authentication-with-asp-net-and-tfs-api/4019735#4019735
 [3]: http://social.msdn.microsoft.com/forums/en-US/tfsadmin/thread/fca050bd-70fc-4712-a310-1985295d72bb/