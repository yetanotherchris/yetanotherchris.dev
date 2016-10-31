---
title: A brand new Spruce filter UI (that I then made redundant)
date: 2011-06-05 00:00:00 Z
permalink: "/spruce/a-brand-new-spruce-filter-ui-that-i-then-made-redundant/"
tags:
- spruce
Published: 2011-06-05 00:00:00 Z
author: Chris S
excerpt: 'After feedback from both developers and non-developers in my company about
  the current filter UI in Spruce, it was obviously time to ditch it. It was failure
  #2 in my attempt at creating a simpler way of showing TFS''s vast set of work item
  options.'
layout: post
dsq_thread_id:
- 1093152909
---

After feedback from both developers and non-developers in my company about the current filter UI in Spruce, it was obviously time to ditch it. It was failure #2 in my attempt at creating a simpler way of showing TFS’s vast set of work item options.

<!--more-->

My next attempt, which I’m just about to push to Bitbucket, features a set of filters back once again on the right side of the screen. This time I’ve opted to take a leaf from the Unfuddle book and make the projects show in a completely separate page. This makes sense, as changing project isn’t something you do regularly when filtering. The right side is a set of checkboxes and radioboxes that have been turned in buttons thanks to a jQuery UI custom theme. It’s not ideal but I think it’s a lot easier to use.

[![screenshot][1]][2]

*However I’ve also added another feature that makes this a bit redundant*: team or stored queries. These are queries you can save inside Visual Studio, much like views in SQL Server. There’s a new page in Spruce which shows all your queries for the current project. So after a day’s effort on changing the filters I think I may have just wasted all that time!

[![screenshot][3]][4]

All that remains now is to add linked item support, and a history. I’m embarrassingly behind in my original schedule, but a lot of that time has been stolen by Roadkill Wiki, which at the moment I’m half 95% through adding a large new feature set for user signups. Once that is complete Spruce gets my undying attention for a month. And perhaps even a release candidate.

 [1]: /wp-content/uploads/2011/06/sprucenewui.png
 [2]: /wp-content/uploads/2011/06/sprucenewui.png
 [3]: /wp-content/uploads/2011/06/sprucestoredqueries.png
 [4]: /wp-content/uploads/2011/06/sprucestoredqueries.png