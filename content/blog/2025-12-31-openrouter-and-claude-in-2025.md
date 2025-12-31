---
title: "2025 - 16m tokens used on openrouter and 5+ Claude projects"
author: Chris S
date: 2025-12-031 17:00:00 +0000
tags: ["ai", "llm", "vibe-coding"]
permalink: "/ai/openrouter-and-claude-in-2025"
excerpt: "I used 16m tokens on openrouter in 2025, and created 5+ projects with Claude"
---

The creator of Claude Code, which itself was a hackathon project to begin with, has this month said month that he hasn't committed a single code change in the last 30 days without using Claude. Obviously there's an incentive to saying this. However there's a weird cognitive dissonance going on in software right now, where luddites are stuck in a world where they believe LLMS are just statistical copy and paste engine (regardless of MoE, MCP servers, Caches, Agents and various other improvements) and to be avoided. Perhaps that's a result of using ChatGPT/Grok and CoPilot (Grok is really good with Go incidentally).

The last personal project I wrote that wasn't Claude-first was [tinycity](https://github.com/yetanotherchris/tinycity), I've created about 8+ projects that would've normally taken weeks to write, feeding them a template C# project when they're C#:

- https://github.com/yetanotherchris/consensus
- https://psychology-notes.yetanotherchris.dev/ (All the tools: Javascript + HTML)
- https://github.com/yetanotherchris/openwebui-importer (Python)
- https://github.com/yetanotherchris/crontab
- https://github.com/yetanotherchris/twowords (HTML)
- https://github.com/yetanotherchris/text-template (Go, I nudged it towards ANTLR)
- https://github.com/yetanotherchris/safeincloudviewer
- https://github.com/yetanotherchris/letmein (React upgrade)
- https://github.com/yetanotherchris/ask-llm

I'm hoping LLMS stop padding responses in 2026 to burn output tokens, which are 5x the price of input tokens. Claude has become noticeably less verbose and error-prone in the last 3 months though. At night time and with big contexts, it does run into problems, but overall I think the estimation of 1 year's of work is probably close with my openrouter usage; most of its usage has been with consensus and Openweb UI. 

I think one big advantage in Claude's hybrid-planning mode is knowing where it's going wrong. However if you don't know what it's doing, which a few times I haven't, it can go down a big rabbit hole as it did with Python and ML on an unpublished project, which wasted around 5 evenings. But failing fast might be a big advantage of Claude or Grok coding - being able to trial and error 10x faster.

![openrouter usage][1]

 [1]: /assets/2025/openrouter.png