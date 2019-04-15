---
title: From Wordpress to Wyam
date: 2015-11-01 00:00:00 Z
tags:
- Wyam
- Jekyll
- Wordpress
- news
Published: 2015-11-01 00:00:00 Z
layout: post
excerpt: Converting this blog from Wordpress to the Jekyll-like .NET tool, Wyam.
---

Every few years I get bored of the technology that powers this blog and move to something new and interesting (to me), something that promises to make the blog experience easier and more productive. Over the years it's followed the latest fashions, albeit usually a year behind, which has seen runtime server side languages, CMSs and hosted blog platforms. The chronology has roughly been:

- ASP and ASP .NET (with site badges!)
- Umbraco (easier editing)
- N2 (more programmer friendly)
- Square space (nice looking, easier backups)
- WordPress (cheaper)

And this year's new technology is even more futuristic and groundbreaking: static HTML (wait a minute....). With it come the benefits:

- Faster site
- Easier to change templates/no php
- Cheaper (I don't need 1gb ram to stop WordPress and mysql dying)

It's also worth mentioning no .NET CMS or .NET blog works with mono well, or is still active (infact I couldn't find a .NET blog engine that suited my fairly basic needs) and I don't like spending £30 a month for Windows hosting.

### Jykall, Markdown, front matter   
One of Github's killer features is it's ability to generate a website for you from a handful of Markdown files you store in Git. The tool they use to do this is the Ruby based Jekyll, a static HTML generator. 

After finding a WordPress plugin to export to Markdown my plan was to run Jekyll with a custom template and move away from WordPress which had been cumbersome to make design changes on. I soon discovered Jekyll was going to put me back in the same position that WordPress had me in (but with Ruby) - lots of effort discovering the foibles of another framework and not much gain. So began my search into "what blog engine should I use" with the thought crossing my mind that maybe I should write my own.

### Wyam  
Somehow I stumbled across Wyam, possibly through Stack overflow or a even Google, an actively committed-to static HTML generator project. Author David Glick has created a .NET/Razor tool that works like Jekyll but is written in C# and is naturally a match for my daily skill set.

Wyam works using .cshtml files, Roslyn and its own C# based config file that works in a similar way to Owin by making use of Document pipelines.

It is a bit tricky to use at first, as all compilation goes through the tool, meaning you miss out on the Visual Studio integration you get use to with MVC projects. It's open source though and Dave is a really helpful guy, obviously still passionate about the project.

You feed it your Markdown, and it gives you a list if IDocuments to use in your view, each one containing the converted Markdown and a set of metadata taken from the YAML header in the Markdown file (known as front matter).

### Flat file database   
I've got around 160 posts on this blog, with a fair amount of text. Wyam blazes through this and you end up with a folder of HTML files in about 10 seconds.

For single user blogs it's perfect, you recompile, FTP the files and it's done. It's made me realise that for small amounts of content, databases are generally overkill, even with the metadata (title, publish date) being stored in the .md files.

You don't get instant posting or publishing but my blog posts are so infrequent it doesn't matter.

My next step now is to put the Markdown and layouts/config files on Github, as the HTML source is open anyway.

The learning curve for Wyam is around 3-4 days and it does have a particular way of doing things (debugging issues is a bit painful) but it's worth a look.

### Footnote about speed and cost  
I'm using Ubuntu and Apache ($5 a month) on DigitalOcean which with just 500mb ram flys by.

I have been lucky in web development as my roots are in Apache which along with PHP enabled me to see how easy it can be (.conf versus IIS convoluted XML hell). PHP 3 had its place too in teaching me the HTTP protocol, or at least it did at version 3.

After creating a new site in Apache in about 3 minutes,  I downloaded and enabled Google's page speed mod, which promised to set my pagespeed score in the 90s. Sadly it's only 86 and an embarrassing 69 on mobile, even with the pagespeed mod's on the fly PNG crushing, caching and script/css minification.

It turns out that using all of Bootstrap upsets Google a bit (I'm only using a small portion above the fold), but their analytics, adverts and Stack overflow flair also marks me down.

So the original goal of having a fast site is achieved, at least in my mind, but not to Google. I'm sure a bit of CSS extraction will sort that out though.

Wyam can be found on [Github](https://github.com/Wyamio/Wyam). The source to this blog van be found [here](https://github.com/yetanotherchris/AnotherChris-Wyam).