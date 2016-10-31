---
title: How to Write a Spelling Corrector in C#
date: 2013-04-05 00:00:00 Z
permalink: "/csharp/how-to-write-a-spelling-corrector-in-csharp/"
tags:
- c#
Published: 2013-04-05 00:00:00 Z
author: Chris S
layout: post
dsq_thread_id:
- 4207230276
---

[Github repository - feel free to send improvements](https://github.com/yetanotherchris/SpellingCorrector/)

<a href="http://norvig.com/spell-correct.html" target="_blank">Peter Norvig's spelling corrector</a> is fairly famous in nerd-circles as it describes the first steps in creating a Google-style spelling corrector that will take something like &#8220;Speling&#8221;, recognise its closest word and reply &#8220;Did you mean Spelling?&#8221;.

His original is a few years old now, and only 21 lines of compact Python. Below is my attempt to convert it to C#. There are already some links to C# conversions on Peter Norvig's page, however I wanted one that was closer to C# and didn't rely on a 3rd party library for collection helpers, as Frederic Torres's does. The other C# version was a 404 last time I looked.

<!--more-->

Hopefully there's no obvious errors, but feel free to reply if there are - I am a Python newbie and got a lot of help from the Java conversion and trawling through a few Python tutorials on its powerful-but-hard-to-read (but admittedly really concise) set syntax, and also with the help of Simon my colleague pointing out some glaring errors. I haven't gone for brevity, as it's 140+ lines of code, nor efficiency. Peter Norvig describes some speed ups you can perform on the original page, and one obvious one is to use a standard dictionary file and store this in a <a href="https://www.google.co.uk/search?q=bloom+filter+c%23" target="_blank">Bloom filter</a>, with the trained words stored in the same dictionary format, looking through the bloom filter as a second measure.

<a href="http://norvig.com/big.txt" target="_blank">The dictionary big.txt can be found here.</a>

<script src="https://gist.github.com/yetanotherchris/5321749.js"></script>  
<script src="https://gist.github.com/yetanotherchris/5321758.js"></script>