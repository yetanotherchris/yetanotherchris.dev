---
Published: 2011-06-01
title: "Three months later in Spruce…"
author: Chris S
excerpt: "Not much has changed on this blog since March, no new posts have appeared. The main reason for this has been, amongst other things, my focus being shifted towards another FOSS project I’ve been doing called Roadkill Wiki. It’s a .NET wiki engine which I wrote to take the place of Screwturn. The primary motivator for this was that Screwturn had fairly poor Windows auth support, and used its own Wiki syntax. Roadkill addresses both of these, supporting Markdown, Media Wiki and Creole syntaxes and allows you to import from a Screwturn database."
layout: post
permalink: /spruce/three-months-later-in-spruce/
dsq_thread_id:
  - 
tags:
  - spruce
---
Not much has changed on this blog since March, no new posts have appeared. The main reason for this has been, amongst other things, my focus being shifted towards another FOSS project I've been doing called Roadkill Wiki. It’s a .NET wiki engine which I wrote to take the place of Screwturn. The primary motivator for this was that Screwturn had fairly poor Windows auth support, and used its own Wiki syntax. Roadkill addresses both of these, supporting Markdown, Media Wiki and Creole syntaxes and allows you to import from a Screwturn database.

<!--more-->

Spruce has had a number of changes of the past months in its repository however. And most recently (today infact) I've implemented attachment support, Excel export, RSS feeds, sorting and paging among other features.

The source code isn't pretty right now, it’s very hacky and gets the job done rather than being anything that is nice to maintain. Once I've added work item linking support, this will change when I plan to remove the reams of repeated code, document it and make it presentable and hopefully something one or two people would contribute to.

The main UI change has been an accordion that drops down with the available filters, a sanity check of the font sizes and cleaner tables. It’s also got some experimental print and mobile (Android and iPhone) support too.

Here’s some screenshots:

[![screenshot][1]][2]  
[![screenshot][3]][4]  
[![screenshot][5]][6]  
[![screenshot][7]][8]

Finally, I've had a fairly steep learning curve in the past months with workitem templates, continuous integration and security in TFS. But more about those in the next post.

 [1]: /wp-content/uploads/2011/06/spruce-new-a.png
 [2]: /wp-content/uploads/2011/06/spruce-new-a.png
 [3]: /wp-content/uploads/2011/06/spruce-new-b.png
 [4]: /wp-content/uploads/2011/06/spruce-new-b.png
 [5]: /wp-content/uploads/2011/06/spruce-new-c.png
 [6]: /wp-content/uploads/2011/06/spruce-new-c.png
 [7]: /wp-content/uploads/2011/06/spruce-new-d.png
 [8]: /wp-content/uploads/2011/06/spruce-new-d.png