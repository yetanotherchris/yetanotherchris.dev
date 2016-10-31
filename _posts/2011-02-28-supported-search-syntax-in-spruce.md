---
title: Supported search syntax in Spruce
date: 2011-02-28 00:00:00 Z
permalink: "/spruce/supported-search-syntax-in-spruce/"
tags:
- spruce
Published: 2011-02-28 00:00:00 Z
author: Chris S
excerpt: For anyone reading the blog you may be wondering and be slightly bemused
  as to why there’s so many blog posts and yet such a painstaking pace to the source
  code checkins. The main reason for this is I want to save myself the slightly boring
  documenting task (that many open source projects neglect) that will come later by
  doing it in small chunks now. The plan is to to use these blog posts as the core
  material for the documentation and also explain some of the design decisions.
layout: post
dsq_thread_id:
- 1092436322
---

For anyone reading the blog you may be wondering and be slightly bemused as to why there’s so many (Spruce) blog posts and yet such a painstaking pace to the (Spruce) source code checkins. The main reason for this is I want to save myself the slightly boring documenting task (that many open source projects neglect) that will come later by doing it in small chunks now. The plan is to to use these blog posts as the core material for the documentation and also explain some of the design decisions.

So without further ado, the supported search syntax for Spruce. It’s best explained with examples:

<!--more-->

**Title search**

Example: 

> problem uploaded images

All words without qualifiers are assumed to search the title field of the work item. As the title is usually a sentence and brief summary, the words will be joined together to form a phrase rather than AND’d, so by default (unlike Google) there is no need to enter quotes for the exact phrase. A title search on its own will translate into a WIQL Contains() query.

Quoted strings are also supported too, but will basically perform the same WIQL query.

**Description**

> description:previous  
> description:&#8221;version 2.0&#8243; 

All other fields except the title have to be explicitly set using the familiar Google syntax of fieldname:value. The description field, for now, is the only field that allows multi-word searches to be wrapped inside quotes.

**Project**

> project:amazingsoft 

This limits the search to the specific project. By default the search uses the current project that is selected in the navigation on the site to search with.

**State**

> state:active 

This finds all work items with one of the valid TFS states, which are active, resolved, closed.

**Type**

> type:tasks 

This filters the search to either tasks or bugs. If this is removed, all work items types are searched.

(The fields below may need to support quoted strings like the description field in future).

**Area**

> area:release2.1 

This searches the area-path field of a work item.

**Iteration**

> iteration:5 

This searches the iteration-path field of a work item.

**Created by**

> created-by:chris 

This searches for work items created by the person’s login name.

**Resolved by**

> resolved-by:chris 

This searches for work items resolved by the person’s login name.

**Created on**

> created-on:today   
> created-on:yesterday   
> created-on:last-week   
> created-on:01/01/2011   
> created-on:last-month 

This supports a number of friendly strings, plus dates in the format DD-MM-YYYY dd/mm/yyyy (or month first depending on on the locale of the TFS server).

**Update:supported date formats**   
Along with these friendly formats, ASOF will be supported too.

> today   
> yesterday   
> this week   
> last week   
> last month   
> this month   
> last year   
> dd-mm-yyyy (or mm-dd-yyyy)   
> dd/mm/yyyy (or dd-mm-yyyy) 

**Resolved on**

> resolved-on:today 

(The same format as created on)

Searching also supports exclusion of title keywords using “-”, for example: “upload bug -version2? and also OR for the title: "“upload bug OR version2?. These don’t support quoted strings yet but may do in future."

If something doesn’t match then there will be a debug option to view the WIQL that the search is producing (WIQL reference).

For now, if any of the syntax is incorrect in the search it will take the keywords up until the broken token and use them. Future versions may have more useful feedback for incorrect searches, I’m not sure yet. Another feature I’d like to add would be some kind of indexing so that popular searches can return as “Did you mean ‘version 2.0 bugs’”.