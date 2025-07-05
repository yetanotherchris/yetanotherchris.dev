---
title: "C# and web 'vibe coding' in 2025"
author: Chris S
date: 2025-07-04 08:00:00 +0000
tags: ["ai", "llm", "vibe-coding"]
permalink: "/ai/vibe-coding-2025"
excerpt: "Andrej Karpathy coined Vibe Coding in 2025, this is my experience of LLM-assisted coding to date."
---

Over the past 5 months I've been busy with Claude and Open AI's Codex, doing what [Andrej Karpathy](https://www.youtube.com/watch?v=7xTGNNLPyMI) coined ["vibe coding"](https://www.youtube.com/watch?v=LCEmiRjPEtQ) (*he was a founder at Open AI and ex-Director of AI at Tesla*).

His definition is more about messing around and being creative: the creative side I've definitely been doing but I've wanted working software at the end of it.  

I've been really impressed by the experience so far, there's clearly been big progress since last year and I suspect Open AI is using Codex to build its own tools, or at least the UIs.

Claude and ChatGPT have stood out with:

- Answering documentation questions - it's so much faster to ask a question than having to comb through Kubernetes docs.
- Writing code when provided with a detailed specification, written by a different LLM.
- Explaining and writing regexes, scripts, infrastructure-as-code.
- Creating unit tests and performance tests and providing test data.
- Converting between programming languages *(Go's text-template example below)*
- Cleaning code up to a use language standards, which I can see is trained from trusted repos on Github e.g. [dotnet](https://github.com/dotnet)
- Refactoring scripts and data inside them.
- Quickly writing throw away tools that would be easy to write, but time consuming and tedious.
- *Not code related:* doing academic-like research using references and citations. I can see this having a huge knock-on effect by speeding up research in academia.

I've also tried actual 'vibe-coding' in Roblox (with my daughter) using each LLM, including the Roblox Studio AI. This hasn't been so great which I suspect comes from poor quality training data, possibly from buggy snippets on the Roblox forums.

It's only from writing this post that I realise exactly how much I've done with Claude, ChatGPT and Grok in the past 6 months:

### SurveyJS, Academic-search website, multi-LLM academic research
I'm currently studying for a Psychology degree, and I've employed (is that the right term?!) Grok and Claude, and sometimes ChatGPT to create [SurveyJS formatted Psychology questionnaires](https://yetanotherchris.github.io/Psychology-Notes/questionnaires-list/), based off PDFs. The **NEO-PI/Big5** is the most accessible one to try.

I managed to get Claude to write an entire [Google-scholar type search using the **CrossRef API**](https://yetanotherchris.github.io/Psychology-Notes/academic-search/), better than Google Scholar in my view. The API is very well documented but nevertheless, it's impressive how much Claude managed to do with only a few changes myself.

Using Claude again, I had it generate a Bootstrap based website that renders markdown answers from LLMs to a Psychology question I pose, one per LLM. This I very un-originally called [Ask Llamas](https://yetanotherchris.github.io/Psychology-Notes/ask-llamas/) 

### C# Bookmark search tool

I wrote a command line tool, which GitHub named [tiny city](https://github.com/yetanotherchris/tiny-city) which searches your Chrome/Edge/Brave bookmarks for a phrase, also allowing for bookmarks stored in markdown files.

I wrote the bulk of the code but Copilot performed **"fill-in-the-middle"**,  also generating the auto-updating code for me, and the scoop code. It took a lot of trial and error with the versioning but Claude helped a fair bit.

### Porting Go's text-template library to C#
This is where I became a little bit scared of the power of coding agents.  

Open AI's **Codex** (web) had been released a week before, so I gave it the goal of converting [**Go's text-template**](https://pkg.go.dev/text/template#pkg-overview) package - a library often used to replace tokens in YML templates, e.g. `{{ myvariable }}`.

It took my initial prompt in a literal way to begin with, and converted the Go code straight into C#, creating a mess of code. This is where some knowledge of the domain can change the coding agent from being stuck making a mess, to something you wish intellisense did decades ago. In my case I'd had some experience with language parsers such as [Irony.NET](https://github.com/daxnet/irony), [GoldParser](/spruce/spruce-from-irony-net-to-goldparser/) and [**Antlr**](https://github.com/antlr/antlr4).

In the past I had tried and failed to create a Markdown ANTLR grammar for Roadkill Wiki, realising LL(*) parsers can't really handle Markdown. 

However for Go's text template it seemed like  perfect use of ANTLR. So I let Claude create a grammar file for me, and fed that into Codex to build its text-template C# parsing code. I eventually let Codex re-create the Grammar (and a lexer file), slowly implementing the package one piece of functionality at a time.

This seems to be how you get the best out of Copilot, Codex and Claude. It might sound obvious, but iterate slowly over the problem, giving it a small piece of functionality each time, much like a task in a Scrum story.

99% of the time, it knew exactly what to do and produced high quality code. It writes and runs the code in a container, creating the PR for you ready to merge. 

It managed to:

- **Convert SprintF** to C# and create unit tests for this.
- Slowly implement every feature of text-template including built-in functions, pipelines, subtemplates, for loops.
- **Write performance tests** to compare "my" text-template port with other templating libraries such as Handlebars.net
- Continually update the README without me prompting.
- Write the Github action to publish to Nuget.

Where it did need nudging was with the test coverage. I used Claude to generate a large specification document for this, and fed it into Codex (see the Gist in the repo).

### A few others

I also used Codex to write Python import scripts for Openweb-UI chats, and the beginnings of an agent I called [**consensus**](https://github.com/yetanotherchris/consensus) which intends to perform a kind of basic Bayesian inference between LLMs. So you ask a question, detail which LLM models to use, and they will argue with each other to reach a consensus albeit in a linear chain right now.

### Apocalypse now

**My mind was blown by Codex** and I immediately warned fellow developers we're going to find a lot fewer jobs available in the future from this technology. The reaction I got to this was largely a collective shrug. 

My excitement is admittedly hard to believe if you've used Copilot or seen LLMs flail around trying to figure out what you meant and not really understanding the code it is writing.

Codex seemed very different to this though, and Grok and Claude at times too. I have a feeling it might be writing itself in some way and the wheels have been set in motion for a huge shift in software engineering. I'm also in no doubt there's a 1000 other coding slop projects that have failed, that could prove me wrong.

And no — this post definitely wasn't written by AI. Let me know if you'd like to learn more about Codex.