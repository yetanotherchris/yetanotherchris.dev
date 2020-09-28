---
title: "Learn OAuth, the hard way"
author: Chris S
date: 2020-09-28 08:00:00 +0000
tags: ["oauth", "security", "roadkill-wiki"]
permalink: "/oauth/learn-oauth-the-hard-way/"
excerpt: "The mess of OAuth 2.0 is being compacted and simplified in OAuth 2.1, a new Aaron Parecki video explains the mess really well, also helping resolve a year old Roadkill Wiki struggle."
---

[0]: https://github.com/roadkillwiki/roadkill_new
[1]: https://tools.ietf.org/html/rfc6749
[2]: https://auth0.com/blog/everything-you-wanted-to-know-about-oauth-2-but-were-too-afraid-to-ask/
[3]: https://www.youtube.com/watch?v=AU0TIOZhGqs
[4]: https://github.com/roadkillwiki/roadkill_new/blob/master/src/Roadkill.Api/Authorization/README.md
[5]: https://learning.oreilly.com/library/view/oauth-2-in/9781617293276/
[6]: https://www.youtube.com/watch?v=996OiexHze0
[7]: https://www.youtube.com/watch?v=BdKmZ7mPNns
[10]: https://oauth2simplified.com/
[11]: https://youtu.be/AwCt2-EHYik
[12]: https://youtu.be/CPbvxxslDTU
[13]: https://tools.ietf.org/html/draft-parecki-oauth-v2-1-03

For the past month I've been trying to level up my OAuth 2.0 knowledge for free, via the RFCs (that didn't last long), Auth0.com and Youtube. I've been trying to upgrade [Roadkill Wiki][0], my pet .NET Core Wiki, to use OAuth for almost 2 years now and realised I only know a corner of the OAuth spec, largely because of the SPA nature of Roadkill v3.

These are the resources I've rifled through - the videos are decent, but over simplify OAuth when really I needed the gritty detail summarised, and preferably with some nice graphics and cartoons:

- [OAuth 2.0 RFC - good luck reading that!][1]
- [Auth0's everything you wanted to know about OAuth 2.0][2]
- [Refresh tokens with ASP.NET Core's OAuth 2.0][3]
- [My own docs on ASP.NET Core Authorization, Authentication, JWT and custom implementation of refresh tokens][4]
- [OAuth 2 in Action][5]
- [OAuth 2.0 and OpenID Connect (in plain English) - YouTube][6]
- [OAuth and OpenID Connect for Microservices - YouTube][7]
- [OAuth 2.0 overview][12]
- Various Udemy and Linkedin Courses

### OAuth 2.0 simplified

Sometimes the universe can throw something at you in such a timely way, you might mistake it for a glitch in the matrix. This is the case with OAuth 2.1 and [www.oauth2simplified.com][10]. 

The area of OAuth 2.0 I've been using with Roadkill Wiki: JWTs for OpenId Connect/role claims and Refresh tokens, was just one part of the OAuth 2.0 story. I knew there was a browser flow but didn't realise it was a separate thing - thinking it all just "OAuth".

OAuth 2.1 [recently became a draft][13], the draft expiring in Jan 2021, which Aaron Parecki explains really well in [this Youtube video][11]. I would in fact say it's the best video to explain OAuth 2.0 in a compact and concise, importantly not dumbing down or stretching metaphors for the subject. His OAuth 2.0 simplified book goes even further explaining exactly why the RFC is scrappy. OAuth 2.1 reduces the complexity of OAuth into something manageable. 

### Roadkill, OAuth and IdentityServer 4.0

I started converting Roadkill Wiki to use OAuth 2.0 when Identity Server 3.0 was still around. Its license back then (from what I recall) looked quite restrictive if I ever wanted to take Roadkill down a free/commercial path, offering a hosted version of it.

Since then IdentityServer 4.0 has been released with a lot more permissive Apache license. But at the time I took the decision to write the OIDC (Open ID Connect) claims lookup portion of Roadkill myself, along with refresh tokens. I need roles in the wiki, for example Editor and Admin, so couldn't just use the Authorization flow of OAuth 2.0.

I didn't really understand that I was using an extension on top of OAuth 2.0, called OpenId Connect. Nor did I know I was using one particularly flow - the refresh token flow. If you watch Aaron Parecki's video he explains this all.

### Conclusion

So the conclusion to all of this is, apart from Skilling up, is I'm going to explore (and probably will be) switching to IdentityServer 4.0 I'm Roadkill v3. I'm using the built in ASP.NET OAuth extensions and my own refresh token implementation, the latter feeling a little over complicated and liable to be high maintenance. I'm just hoping I can convert the roles code across easily, and then benefit from all the /.well-known/ urls and offering people 3rd party authorization servers easily.
