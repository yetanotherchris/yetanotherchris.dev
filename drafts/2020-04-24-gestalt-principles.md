---
title: Applying the Gestalt Principles to your code
author: Chris S
date: 2019-04-24 13:00:00 +0000
tags:
- code-quality
- gestalt-principles
- clean-code
permalink: "/clean-code/gestalt-principles/"
excerpt: "The Gestalt Principles list 6 visual principles about how we visually perceive objects. Can these principles be applied to source code to make it easier to read?"
---

It's one of the most repeated phrases in software, but is also quite easy to forget - you spend more time reading code than you do writing it. According to the idiom, it's about 90% of your time reading it, and 10% writing it.

This is the basis of clean code and the movements around it. One set of principals that I read briefly many years ago, and have since been unable to find the article, tie the Gestalt Principles in with writing code. In the absence of that article, I'm going to try to put them together here.

### Keeping source code easy to read
Back in 2013 [I wrote][1] about measuring the code quality in Roadkill using various metrics. This included cyclomatic-complexity, object-oriented metrics (coupling, lack of cohesive methods, number of children) which were being measured by NDepend, but are also available to view via tools like Sonarqube.

These are your quality gates, which you can use to ensure code is not complicated over-time, closing the gate if it is and restricting new releases going out.

Below these formal code metrics that sit inside the continuous integration/delivery systems are tools like [Stylecop][2], and Roslyn based formatters such as `dotnet format` and [Editorconfig][3] which will clean your code as you go or inside the IDE.

Then one layer below the tooling is the philosophy of clean code itself, championed by Bob Martin ([watch his videos they're amazing][4]) and [software craftsmanship][5].

But what about the visual appearance of the code itself?

### Gestalt principles

The Gestalt principles concern themselves with how we visually perceive groups of objects.
There is a good introduction to Gestalt pyschology and Gestalt principles on [verywellmind][6]. [Wikipedia][7] also summarises it fairly well:

> ...(the) principles exist because the mind has an innate disposition to perceive patterns in the stimulus based on certain rules. These principles are organized into five categories: Proximity, Similarity, Continuity, Closure, and Connectedness.

I'll go through five of the six principles and how I think they apply to source code, using Roadkill for examples.

#### 1. Similarity

Similar things tend to appear grouped together



#### 2. Good form/Pragnaz

You see the olympic symbol as a set of circles rather than lots of curves.

#### 3. Proximity

Things that are nearer each other, appear to be grouped together to the eye.
This is the most relevant law for coding.

#### 4. Closure

Things are grouped together if they appear to form a whole.

#### 5. Continuation

An intersection of two objects, such as a coat of arms, appears to the eye as one single object.


We skipped the Common Region law as it related to movement.


[1]: /roadkill-wiki/measuring-the-quality-of-code-in-roadkill/
[2]: https://github.com/StyleCop/StyleCop
[3]: https://editorconfig.org
[4]: https://cleancoders.com/videos
[5]: http://manifesto.softwarecraftsmanship.org
[6]: https://www.verywellmind.com/gestalt-laws-of-perceptual-organization-2795835
[7]: https://en.wikipedia.org/wiki/Principles_of_grouping