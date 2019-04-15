---
title: Using the this keyword with Typescript and a jQuery function
date: 2013-11-23 00:00:00 Z
permalink: "/typescript/using-the-this-keyword-with-typescript-and-a-jquery-function/"
tags:
- typescript
Published: 2013-11-23 00:00:00 Z
author: Chris S
layout: post
dsq_thread_id:
- 4207230149
---

When you write Typescript, you're forced by the compiler to use the &#8220;this&#8221; keyword when you want to access member variables or methods. If they're static, you're forced to use the name of the class (as you usually would in C#, although it's syntactical).

This can cause problems when you bind jQuery button clicks to your own methods, and want to access member variables inside that method, as you are now inside the scope of the jQuery event and no longer your class. It's one of the great &#8216;features' of Javascript that the C# team overcame quite easily with lambdas, and in standard Javascript you usually overcome it by referencing the class instance in a variable named &#8220;that&#8221;, if you're use Douglas Crockford's pattern.

<!--more-->

  
The solution in Typescript is to use their lambda expression syntax to maintain scope, and with it the Typescript compiler uses a _this variable if needed and does it all for you. For example:

<script src="http://gist.github.com/yetanotherchris/7620324.js"></script>

This compiles down to:

<script src="http://gist.github.com/yetanotherchris/7620337.js"></script>