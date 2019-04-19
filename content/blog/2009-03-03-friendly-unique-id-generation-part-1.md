---
title: Friendly Unique Id Generation Part 1
date: 2009-03-03 00:00:00 Z
permalink: "/csharp/friendly-unique-id-generation-part-1/"
tags:
- csharp
- url-generation
Published: 2009-03-03 00:00:00 Z
author: Chris S
description: The first of two blog posts about generating url-friendly alternatives to
  the guid.
layout: post
dsq_thread_id:
- 1074152177
---

  * **Part 1** 
      * [Base 64][1]
      * [Guid][2]
  * **Part 2** 
      * [Numeric][3]
      * [Alphanumeric][4]
      * [Host][5]
      * [Time][6]
      * [Ticks][7]
      * [MD5][8]
      * [Pronounceable password][9]
      * [Base62][10]

URL shortening:

  * [Tinyurl][11]
  * <http://tinyarro.ws/>
  * <http://is.gd>
  * <http://bit.ly>
  * <http://snurl.com>

<!--more-->

### Introduction

One of the commonest ways of sticking a unique identifier (UID) to a querystring in the .NET web world (or even classic ASP) is through Microsoft's famous globally unique identifier, or guid. So you may see some kind of url like:

> userdetails.aspx?id={1234-1234-1234-1234}

Where the 1234 parts are hex versions of the guid, which is just a unique 16 byte number. These are used for two purposes, the first is that they generally map to the primary key of the database table being used, for example the Id column of Users will be a guid. The second reason is that they aren't guessable. So userdetails.aspx?id=3 makes you realise you could get user ID 2's details by just changing the url. A guid avoids tedious security checks to get around this.

You get variations on guids (Guids are just implementations of version 4 of the [UUID format][12]) in PHP with its unique id function, and Java/J2EE has similar too. But why is it when you look at youtube you don't get this extremely long hex number at the end of its urls? For example

> youtube.com/?v=123123

Or another example, tinyurl.com. This has urls similar to

> tinyurl.com/3rtIee

These are unique ids, but in integer format and not guids. This prompted to me to write this article and the accompanying code. I basically wanted to see how many different ways I could create a unique readable or semi-readable id. The id could be used anywhere that a code is needed: a url, a registeration email, or maybe a passcode given out on paper.

**The most popular use of the small URL websites is on twitter and in magazines**, for obvious reasons - space is limited. This article isn't just concentrating on those services, but general alternatives however un-realistic they are.

### Clashes

First, before I go through each of the methods I came up with, a short bit information on clashes.

How unique are the IDs generated in the methods below (except for the Guid one)? This of course depends on the method, but most depend on random number generation and the current time in some way.

All of the methods below except for the guid and base 62 method rely on the database table having a key column to store the id in. So an example table definition might be:

`<br />
Id Int<br />
Key Varchar(32)<br />
Url Varchar(256)<br />
`

The key column would be indexed, or maybe even the primary key. The downside to this versus the guid/base 62 method is that you would have to check to see if the key already exists before adding it and any value. So all but the guid and base 62 method rely on an insert check into the database. You could probably take the risk and skip this with the tickcount method, or depending on how many urls you want to store, do the same with the others.

But in summary any key clashes are worked around via a database select statement before insertion.

Full output of all unique id generation types

<pre>Base64:         pzikpg==
Number:         37-82
Alpha:          huj9
Host:           32fb1dfe
Time:           22ba
Ticks:          8cb46e251f0f610
MD5:            7cbae8cd41a9d13892c8feb8e435c5e
Guid:           26aa1880-1e2d-426d-8dd6-3dda7a4b8a49
Base62:         4gfFC3
</pre>

<a name="base64"></a>

### Base 64

This method gets 4 random numbers, puts them in a 4 byte array and then base64's the array. The clash rate is

> P(A AND B AND C AND D) = P(A) x P(B) x P(C) x P(D)  
> = 1/255 x 1/255 x 1/255 x 1/255  
> = 0.004 x 0.004 x 0.004 x 0.004  
> = 0.000000000256  
> = 1 / 0.000000000256  
> = 1 / 3,906,250,000 

The id is nice and short and fairly easy to read out. You always get &#8220;==&#8221; at the end of a base64'd string, as it's needed for padding (a good explanation can be found here).

#### Example output

> cEPypg==

#### Source

`gist:yetanotherchris/4746446`  
<a name="guid"></a>

### Guid

This just produces a guid in string format. It's not really viable for the ids we're trying to produce unless you want something globally unique. But in reality, you probably don't need your id to be globally unique unless it really is a large scale application, or you want to make use of SQL Server's guid support which almost certainly has its indexes and PK lookups optimised for guids along with plain old identity ints.

#### Example output

> 6c1f05c7-6e8b-4a36-b180-2544d81ebb43

#### Source

<pre>public static string GuidToString()
{
    return Guid.NewGuid().ToString();
}
</pre>

 [1]: #base64
 [2]: #guid
 [3]: /csharp/friendly-unique-id-generation-part-2#numeric
 [4]: /csharp/friendly-unique-id-generation-part-2#alphanumeric
 [5]: /csharp/friendly-unique-id-generation-part-2#host
 [6]: /csharp/friendly-unique-id-generation-part-2#time
 [7]: /csharp/friendly-unique-id-generation-part-2#ticks
 [8]: /csharp/friendly-unique-id-generation-part-2#md5
 [9]: /csharp/friendly-unique-id-generation-part-2#password
 [10]: /csharp/friendly-unique-id-generation-part-2#base62
 [11]: http://tinyurl.com
 [12]: http://en.wikipedia.org/wiki/UUID#Version_4_.28random.29