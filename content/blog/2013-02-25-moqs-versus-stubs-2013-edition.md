---
title: Moqs versus Stubs (2013 edition)
date: 2013-02-25 00:00:00 Z
permalink: "/csharp/moqs-versus-stubs-2013-edition/"
tags:
- csharp
- roadkill-wiki
- testing
Published: 2013-02-25 00:00:00 Z
author: Chris S
layout: post
---

This is an age old debate which I'll chirp in with my opinion. According to Gojko Adzic there's two types of TDD people in the world: classic stubbers and the new(ish)-school Moqers (or Mockito in the Java world). MOQ is an amazing tool, but consider the following test code:

<pre>_mockRepository = new Mock&lt;IRepository>();
_mockRepository.Setup(x => x.GetPageById(It.IsAny&lt;int&gt;())).Returns&lt;int&gt;(x => _pageList.FirstOrDefault(p => p.Id == x));
_mockRepository.Setup(x => x.FindPagesContainingTag(It.IsAny&lt;string>())).Returns&lt;string&gt;(x => _pageList.Where(p => p.Tags.ToLower().Contains(x.ToLower())));
</pre>

Eeek. Is that easy to read? Does FindPagesContainingTag return a string? No, an IEnumerable of Page objects. Compare this to a stub implementation (the classical way of mocking) of the IRepository:

<pre>public class RepositoryStub : IRepository
{
    public IEnumerable&lt;Page&gt;FindPagesContainingTag(string tag)
    {
        return _pageList.Where(p => p.Tags.ToLower().Contains(tag.Tolower()));
    }
}
</pre>

The other problem I have with the Moq example is you essentially have the stub class's source in your [Setup] method most of the time. The advice Bob Martin gives for tests is they're meant to be very easy to read for the next author, there should be no confusion at all. It's fairly clear Moq doesn't promote this, or at least not the messy way I write the mocks. So I'm probably in the classical camp, but is there no half-way house for the two in .NET?