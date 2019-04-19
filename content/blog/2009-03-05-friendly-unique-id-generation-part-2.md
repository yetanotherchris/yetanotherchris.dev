---
title: Friendly Unique Id Generation part 2
date: 2009-03-05 00:00:00 Z
permalink: "/csharp/friendly-unique-id-generation-part-2/"
tags:
- csharp
- url-generation
Published: 2009-03-05 00:00:00 Z
author: Chris S
description: The second of two blog posts about generating url-friendly alternatives to
  the guid.
layout: post
dsq_thread_id:
- 4207230375
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

<!--more-->

<a name="numeric"></a>

### 2 random numbers

This displays the id in the format xx-xx. It's easy to read out but is limited to 1/255 x 1/255 = 1/65025 before you get a clash. 

#### Example output

> 19-109

#### Source

`gist:yetanotherchris/4746620`

<a name="alphanumeric"></a>

### Alphanumerical

This generates a 4 alpha-numerical id, each character is based on a random number between 1 and 36 (10 digits, 26 lowercase letters) which is then used to grab the corresponding index from the character array. 

It's not practical for anything except a small set of items - the random numbers are being generated in a loop for a start, which is not a good idea plus the probability of a clash is high:

> = 1/36 x 1/36 x 1/36 x 1/36   
> = 1/1,679,616

But in reality higher as it's at the mercy of the random number generator in a loop. 

#### Example output

> v5m0

#### Source

`gist:yetanotherchris/4746625`

<a name="host"></a>

### URL hashcode

This is targetted specifically at the id generation ala Tinyurl.com. It uses the .NET built in GetHashCode() method on the string version of the url. The resulting number is then displayed in hex format to make it shorter. 

This will never suffer from clashes but will produce an id that is longer than the base 62 solution. 

#### Example output

> 32fb1dfe

#### Source

`gist:yetanotherchris/4746641`

<a name="time"></a>

### Time hashcode

This takes the current seconds and milliseconds, and displays them as two hex values side by side. It's relatively safe for uniqueness except for very large amounts of concurrent ids being generated, which obviously these id methods aren't aimed at solving. It suffers from having a possibility of a clash from 2 times on the same day. 

#### Example output

> 22ba

#### Source

`gist:yetanotherchris/4746643`

<a name="ticks"></a>

### Ticks hashcode

This uses the DateTime.Now.Ticks property, which is &#8220;the number of 100-nanosecond intervals that have elapsed since 12:00:00 midnight, January 1, 0001&#8221;. It will therefore always be unique, unless the id is generated in a threaded scenario. 

The output is fairly long and not memorable even in its hex format. 

### Example output

> 8cb46e251f0f610

#### Source

`gist:yetanotherchris/4746646`

<a name="md5"></a>

### MD5

This generates 16 random numbers (from 1-255), MD5's the output and then displays it as hexadecimal. This could be shortened to less random numbers, or only take a smaller segment of the MD5 output. MD5 will always produce 32 characters though.

#### Example output

> 7cbae8cd41a9d13892c8feb8e435c5e

#### Source

`gist:yetanotherchris/4746664`

<a name="password"></a>

### Prounceable password

This is taken from the prounceable password generator. With a random number suffixed to the end you're unlikely to get many clashes, although I don't really have any figures of the chances. The good thing about this method is the key is easily memorable and fairly short. 

#### Example output

> quoua10

#### Source

The source can be found in the C# snippets section. 

<a name="base62"></a>

### Base 62

This is the best solution of the lot, and the one tinyurl uses. It isn't obvious (and wasn't obvious to me) unless you know about base 62. I had been under the impression that tinyurl, and youtube had been using some kind of key generation for the urls, but was 100% sure. I posed the question on Stackoverflow.com here and got the base 62 answer. 

Base 62 is simply 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvw much like base 16 but extended further to include the entire english alphabet in lower and upper case. The uppercase go first, which coincides with ascii values being uppercase before lowercase (65 is &#8216;A' not &#8216;a'). 

It describes large numbers in a lot fewer characters making the URLs a lot neater and easier to link to actually say. So you would simply base 62 your primary key id (an integer) and use that for your URLs. You would then reverse this to lookup the id in the database. The character display gets shorter in base 62 once it gets over 100. 

Much like the traditional &#8220;userdetails.asp?id=10&#8221;, it's not a secure way of ensuring someone won't try id 11,12, base 62'ing it first. So it's useful for public sites like tinyurl and youtube but not so hot for password resetting tokens or other urls. 

The source below is not my own ingenious creation but is taken from Paw Jershsuage's base calculator for converting between bases. I've commented what Paw does as it's such a simple and elogant solution to the problem it's worth explaining. 

Jeff Keys has written a [Base62 class][11] which encapsulates Base62 as a value type.

#### Example output:

> 4gfFC3

#### Source

`gist:yetanotherchris/4746671`

If there's any errors with the math(s) please get in touch.

 [1]: /csharp/friendly-unique-id-generation-part-1#base64
 [2]: /csharp/friendly-unique-id-generation-part-1#guid
 [3]: #numeric
 [4]: #alphanumeric
 [5]: #host
 [6]: #time
 [7]: #ticks
 [8]: #md5
 [9]: #password
 [10]: #base62
 [11]: http://www.sliver.com/dotnet/Base62/