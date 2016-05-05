---
published: false
Published: 2016-05-05T00:00:00.000Z
author: Chris S
layout: post
tags: 
  - "c#"
  - testing
  - "unit-tests"
shortpost: true
title: "C# Unit test generator"
---
One of the biggest ommisions in the TDD literature is the concept of code first vs test first. Both are valid in TDD but the discussion doesn't seem to surface very often, possibly because it's a more advanced topic.

Both are valid ways of doing TDD, and after many years of doing both I think I've finally settled on a few good ways to decide which method to employ:

###Test first:
- You're writing business or safety critical code
- You are experimenting with an API etc. that you don't know how to use.
- You are pairing with someone
- Like most of us, you find writing tests later very monotonous work
- You're doing a presentation on TDD

###Code first
- You're writing a proof if concept, or small home project
- You haven't fleshed out the API you're writing yet, or unsure dof it's design
- You're writing code that is so basic, such as deserialization of a config file, or breaks the system in such an obvious way, tests can be added later
- You're on your own and demotivated

With the code first approach I'm not advocating lowering your test coverage - you would still have the tests in there before you 'ship'. 