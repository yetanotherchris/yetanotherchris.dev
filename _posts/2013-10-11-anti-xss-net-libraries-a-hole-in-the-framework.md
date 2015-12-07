---
Published: 2013-10-11
title: "Anti-XSS .NET libraries in 2013"
author: Chris S
layout: post
permalink: /asp-net/anti-xss-net-libraries-a-hole-in-the-framework/
dsq_thread_id:
  - 4207230580
tags:
  - anti-xss
  - asp.net
  - roadkill-wiki
---
One of the more important parts in Roadkill Wiki is removing malicious HTML from the markup that's entered, even when the markup (Creole and Markdown) is controlled.

The markup you enter is converted into HTML, and then sanitized internally to remove any HTML that is bad, the markup can also contain HTML itself - the Creole parser allows this as does the Markdown parser to an extent.

Malicious HTML usually comes in the form of XSS (Cross Site Scripting) attacks but can also be more innocuous but annoying things like showing Javascript alert() messages on the page or doing a Myspace style butchering of the stylesheets on the page.

For the most part Roadkill Wiki doesn't need this level of sophistication in its text parsing,  
<!--more-->

  
as its target audience is mostly internal wikis for businesses or personal use. I keep the extra protection in as I prefer to think that for those one or two wikis that are public, they won't run the risk of having scripts injected into the page. One small incident like that and Roadkill is forever known as the .NET wiki with a security vulnerability, something PHPBB has suffered from over the years.

ASP.NET has a sledgehammer approach to dealing with the problem by out-of-the-box, which is to disallow any HTML being posted from a page. Once you turn this feature off, your options besides basic HTML encoding are restricted to a couple of libraries:

  * <a href="http://wpl.codeplex.com/" target="_blank">Microsoft Web Protection Library</a>
  * <a href="https://www.owasp.org/index.php/Category:OWASP_AntiSamy_Project_.NET" target="_blank">OWASP Anti-Samy library</a>

The first library is a bit of an embarrassment to Microsoft - it's broken and looks like it will stay that way for a bit. It stripped some safe HTML of mine away, and judging by <a href="http://wpl.codeplex.com/releases/view/80289#ReviewsAnchor" target="_blank">the feedback</a>  is doing the same for everyone else. After playing with prototype apps with it for a few hours I gave up.

The 2nd library is an OWASP project and is a lot better thought out and thorough. OWASP is &#8220;The Open Web Application Security Project (OWASP) is a 501(c)(3) worldwide not-for-profit charitable organization focused on improving the security of software&#8221; and where most of the advice that Roadkill incorporates into its solution comes from. However the the Anti-Samy project was a really over kill for what I was after, and would've involved a lot of work to integrate it into Roadkill.

I couldn't find any other web security frameworks out there - I'm guessing there are quite a few in house ones floating about for .NET-based websites, but nothing on the open source market. So my solution to the problem was to take <a href="http://ajaxcontroltoolkit.codeplex.com/SourceControl/latest#Server/AjaxControlToolkit/Sanitizer/HtmlAgilityPackSanitizerProvider.cs" target="_blank">this sanitizer </a> from the AJAX Control library and re-purpose it for what Roadkill needed. The project is vaguely related to web security but the sanitizer code is in fact a hidden gem: it's comprehensive and uses the reliable Html Agility Pack for its HTML parsing.

After a few iterations, this is what Roadkill does/can do with the HTML:

**1)** Uses a HTML white list of elements and attributes. This is stored in an XML file, where any tag/attribute not present in the list is removed. The list of HTML tags allowed by default can be <a href="https://bitbucket.org/mrshrinkray/roadkill/src/c1f05afb22bda5743e582756c86ea7c0eef1e9bb/src/Roadkill.Site/App_Data/Internal/htmlwhitelist.xml?at=default" target="_blank">seen here</a>, and customizable.

**2)** Cleans all HTML attributes so that they're encoded, and removed of things like &#8220;javascript&#8221;, &#8220;script&#8221; and also any style attributes with expressions and behaviours.

I've turned this off by default as it was affecting some people's urls that contained &#8216;script' in them - the AJAX control library's source code needs some tweaking in this area.

**3)** Any characters in the HTML that are not alphanumeric are encoded into their hex equivalent. This is in the original AJAX control kit's source and is <a href="https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet" target="_blank">the advice from OWASP</a>

\n, \r and \t are ignored, and any control characters (<32 in ASCII) or characters between the ASCII range of 127 to 159 are encoded into the Unicode 0xFFDD. In unicode, <a href="http://www.unicode.org/charts/PDF/UFFF0.pdf" target="_blank">this number</a> is &#8220;used to replace a character whose value is unknown or unrepresentable in Unicode&#8221;.

[<img class="alignnone size-medium wp-image-1181" alt="unicode-xss" src="http://www.anotherchris.net/wp-content/uploads/2013/10/unicode-xss-300x55.png" width="300" height="55" />][1]

This step is on by default in Roadkill. It makes for some more bulkier HTML being sent down to the browser, as every character is hex encoded, but also ensures that Roadkill sticks fairly closely to the OWASP recommendations.

The AJAX control kit gets the credit for 99% of the work, and also included a very comprehensive set of unit tests too - 118 in total! The official Microsoft Web Protection library would be better off as a rewrite using the Ajax Control kit's source, and the OWASP AntiSamy project or referencing their recommendations.

 [1]: http://www.anotherchris.net/wp-content/uploads/2013/10/unicode-xss.png