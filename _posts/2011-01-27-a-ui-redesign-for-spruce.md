---
title: A UI redesign for Spruce
date: 2011-01-27 00:00:00 Z
permalink: "/spruce/a-ui-redesign-for-spruce/"
tags:
- spruce
Published: 2011-01-27 00:00:00 Z
author: Chris S
excerpt: After spending a week with the existing design, and having a sniff around
  the web at project management sites I began to realise the original design was in
  a nutshell, crap and ugly. It was too designery and not functional enough, and most
  importantly contained far too much complication in the form of jQuery dialogs, fancy
  tooltips and pointless fluff.
layout: post
dsq_thread_id:
- 
---

After spending a week with the existing design, and having a sniff around the web at project management sites I began to realise the original design was in a nutshell, crap and ugly. It was too designery and not functional enough, and most importantly contained far too much complication in the form of jQuery dialogs, fancy tooltips and pointless fluff.

<!--more-->

I like those kind of touches, but I think they’re best saved for websites that suit them – websites containing graphical material such as photos, artwork, marketing design agencies and so on.

So I did some hardcore surfing and came up with some inspiration for a new design and theme. I decided the design would stick to 5 main colours, and no javascript dialogs or ajax, atleast for now.

This was the colour scheme I settled on (green like a tree)

![colourscheme][1]

And with that, I made a 30 minute mockup in Photoshop Elements. Spruce now looks like this:

![mockup1][2]  
![mockup2][3]

It was actually really easy to change the design with the MVC setup, all that was required was a slight change to the masterpage. I also took the time to clean out the cobwebs in the CSS and all those javascript libraries that are no longer needed, refactor the controllers, add RSS/CSV buttons up top and come with a dashboard concept for the user that’s logged in – all the information they need about the bugs/tasks that are relevant for them on the home. It’s up on Bitbucket now.

I also took the opportunity to look into parsing a search syntax for my grande plans for the search interface. I have a Windows 7/Google-style grammar in mind for searching, and after some research stumbled upon the C# library Irony. Most people have heard of ANTLR which I also looked into, but it appeared overly complicated for my needs, and I couldn’t figure out how to hand it a simple EBNF (Extended Backus–Naur Form) as a string.

Irony takes the Yacc approach – I didn’t know what that approach was until I’d finished my research – but it turns out you define the grammar in C#, and using some clever operator overloading are able to replicated EBNF’s | and {} syntax. You then get a tree of commands and values, or an Abstract Syntax Tree/AST.

This will be the most interesting part of the project for me, and something I hope to start on next, once the grunt work is complete sometime this week.

 [1]: /wp-content/uploads/2011/01/sprucecolorscheme.png
 [2]: /wp-content/uploads/2011/01/spruce11.png
 [3]: /wp-content/uploads/2011/01/spruce21.png