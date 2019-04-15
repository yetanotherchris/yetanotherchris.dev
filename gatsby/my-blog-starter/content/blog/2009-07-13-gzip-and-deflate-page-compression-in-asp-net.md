---
title: GZip and Deflate page compression in ASP.NET
date: 2009-07-13 00:00:00 Z
permalink: "/csharp/gzip-and-deflate-page-compression-in-asp-net/"
tags:
- asp.net
- c#
Published: 2009-07-13 00:00:00 Z
author: Chris S
excerpt: A re-packaged version of Bart De Smet's ASP.NET page compression using GZIP.
layout: post
dsq_thread_id:
- 1077124267
---

[Download][1]

Having written a GZip compression class in PHP many moons ago, I was interested to find out if anyone had done something similar in ASP.NET/C#. I found it strange that I couldn't find much out there until I stumbled upon Bart De Smet's article on MSDN (no longer available). I can't take much credit for the code below/download besides packaging it up into a download, Bart's article saved me re-reading the IHttpModule docs and figuring out where to get the stream from that's for sure.

<!--more-->

Most people who have access to their server through terminal services and the IIS manager won't need to bother with a GZip compression module, as page caching is built into IIS 6 upwards. This probably explains why nobody has done a commercial or OS GZip module for ASP.NET. There's also tools out there like [port 80.com's page compression ISAPI filter][2] that does the job. However for those of us using shared hosting, a GZip compression module is pretty handy for speeding up the responsiveness of the site and saving bandwidth. Most modern browsers support GZip and Deflate (infact I'd guess that all do by now, maybe with the exception of Mobiles/Pocket PCs), and as the module only sends zip'd content back if the browser supports it, so there's nothing to lose.

The only draw backs of using IHttpModule compared to IIS is that you're restricted to compressing files that are mapped to the asp.net ISAPI filter. This typically means aspx files but a few others can be included. So your images, css files and javascript files won't be compressed down. There is a [solution to this on codeproject.com][3] if you want your script and css files compressed too.

The Zip format lends itself to HTML pages very nicely as the algorithm works best with text files. All that white space you have in your source that makes it humanly readable is left out, squeezing the pages down. 

The good things about ASP.NET 2.0 is it makes the whole process so easy it can be done in about 10 lines of code thanks to the IHttpModule interface and the new System.IO.Compression namespace which contains Deflate and GZIP as standard. Previously you would need to have used the Sharp libraries for zipping but now it's just one assembly.

To install the module, simply copy the download above to your Bin directory, and alter your web.config file to include the following in the node:

I couldn't think of an original namespace so I settled with Compression. If you want to check that your ASPX pages are being GZip'd or Deflated, install the [Live HTTP Headers addon][4] for Firefox, press ALT+L and watch the accept header. As far as I can remember, IE has a similar tool for viewing headers with its web developer [toolbar][5].

### Reference

Having finished this mini article, I realised Bart's code does have source code to download, doh!

There is also an open-source compression library for ASP.NET called  
[HttpCompress][6].

`gist:yetanotherchris/4754907`

 [1]: /assets/2013/02/pagecompression.zip
 [2]: http://www.port80software.com/
 [3]: http://www.codeproject.com/aspnet/httpcompression.asp
 [4]: https://addons.mozilla.org/en-US/firefox/addon/3829
 [5]: http://www.microsoft.com/downloads/details.aspx?familyid=e59c3964-672d-4511-bb3e-2d5e1db91038&displaylang=en
 [6]: http://www.blowery.org/code/HttpCompressionModule.html
