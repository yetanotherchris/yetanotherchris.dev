---
title: ".NET Formatting Strings Reference"
date: 2010-02-17 00:00:00 Z
permalink: "/net/net-formatting-strings-reference/"
tags:
- ".net"
Published: 2010-02-17 00:00:00 Z
author: Chris S
excerpt: This post is aimed at being a reference and a code-by-example guide to format
  strings in C# (and .NET), plus delving a little deeper into custom formatting strings
  and what goes on internally
layout: post
dsq_thread_id:
- 1079942386
---

This post is aimed at being a reference and a code-by-example guide to format strings in C# (and .NET), plus delving a little deeper into custom formatting strings and what goes on internally. It assumes you already know what they are, if you don't then there's links at the end for getting started.

### Types of formatting strings

The .NET framework contains 4 types of formatting: DateTime formatting, Enum formatting, number formatting and the composite formatting that all the previous 3 can use.

More on string formatting [here][1].

<!--more-->

Enumeration formatting is straight forward:

<pre>Console.WriteLine("{0:g}", DateTimeKind.Utc); // general
Console.WriteLine("{0:f}", DateTimeKind.Utc); // string
Console.WriteLine("{0:d}", DateTimeKind.Utc); // integer
Console.WriteLine("{0:x}", DateTimeKind.Utc); // hex
</pre>

One enumeration you can see different values of &#8216;d' for is a value from the DayOfWeek enumeration (per culture). The G formatter is required by all IFormattable classes (more on this below).

String.format vs ToString() (composite formatting and non-composite)  
There's two ways to produce a number, composite or plain formatted string in C#. The first is used by Console.WriteLine, string.Format,StringBuilder.AppendFormat, TextWriter.WriteLine and comes in the format:

<pre>Console.WriteLine("{0} {1} {2}",100,200,3000);

Output:
100 200 3000
</pre>

This is straightforward and I won't bother explaining the curly brackets. If you want to append a format to it, you use a colon then the format:

<pre>Console.WriteLine("{0:X} {1:N1} {2:#,#}",100,200,3000);

Output:
64 200.0 3,000
</pre>

You can also specify how &#8220;wide&#8221; your output will be, this is done with a comma after the index (this must be longer than the output). For example:  
Console.WriteLine(&#8220;(amount):{0,30:C}&#8221;, 1123.27);

<pre>Output:
(amount):                     £1,123.27
Console.WriteLine("{0,-30:C}(amount)", 1123.27);

Output
£1,123.27                     (amount)
</pre>

This will make the output string 30 in length which includes the length of the output.

The alternative way round of formatting is to use ToString() on the number, Enum or DateTime and pass in the format, minus the argument index and width:

<pre>int n = 3000;
n.ToString("#,#");

Output:
3,000
</pre>

I will be using the previous type of formatting (composite) for the rest of the article via Console.WriteLine as it's less verbose and easier to follow for examples.

### 0 and # digit placement holders

There's two ways of holding digits in format strings: # and 0. Each 0 in your string is replaced by a digit, or with a zero if no digit exists in that place meaning you can pad a number with zeros if necesssary. It doesn't do a &#8220;substring&#8221; on the number though, so using 0000 on 12345 won't output 1234 or 2345.

The same applies for #, except if the number isn't there it does nothing. The most commonest way you'll use the two format tokens is

<pre>#
#,#
#.#
00,0
0.00
</pre>

When used with decimal places, zero based rounding is performed as described below.

### . ; and , format strings

The &#8216;.' token is used for decimal precision. Without it nothing after the decimal place is outputted. For example

<pre>double n = 0.12345;
Console.WriteLine("{0:#}", n);
Console.WriteLine("{0:0}", n);

Output
(blank line)
0</pre>

One important thing to take note of is if the number is zero, # doesn't display it. So if you're expecting zeros use the &#8216;0' placeholder.

The &#8220;,&#8221; is used for specifying you want a thousand seperator. It can also be used if you want to divide your number by 1000, this is done by putting a comma before the decimal place. The comma is used for a friendly more readable display of numbers which the thousand seperator accomodates (such as currencies).

The &#8220;;&#8221; token is straight forward, it allows you to specify twoseperate formatting styles based on whether the number is negative, or positive/zero. The format is

  * positive;negative

For example

<pre>double neg = -1000.123;
double pos = 1000.123;
double z = 0;

Console.WriteLine("{0:A)0.00;B)#.##}", pos);
Console.WriteLine("{0:A)0.00;B)#.##}", z);
Console.WriteLine("{0:A)0.00#;B)#.##}", neg);
Console.ReadLine();

Output
A)1000.12
A)0.00
B)1000.12
</pre>

As you can see the negative sign isn't added to the output, however using just a plain {0:0.00} format will output the negative sign.

### Commas, decimals - thousand separators accross the globe

Mainland European countries do number formatting differently from the states and the UK. Actually most of the world seems to do things differently which is the main reason for the NumberFormatInfo class in .NET. A lot of Europe uses commas where the US/UK uses dots and visa versa. The comma is known as the thousand seperator, and the dot the decimal place. The map below from Wikipedia shows which countries use dots for the decimal place (in blue) and those that use commas in green.

![Thousand seperator][2]

Countries can also use spaces for thousand separators, full information can be found [here][3]. The formatting token for a decimal place in .NET is &#8216;.' regardless of the culture that the assembly is using, and &#8216;,' for the thousand separator.

#### Number formatting: rounding and decimal places

One of the commonest uses of string formatting with numbers is displaying currencies. There's several different tokens for doing this:

<pre>C
£N
£#,#
double x = 67867987.88666;

Console.WriteLine("{0:C}",x);
Console.WriteLine("£{0:N}", x);
Console.WriteLine("£{0:#,#.###}", x);

Output:
£67,867,987.89
£67,867,987.89
£67,867,987.887
</pre>

The easiest way is the &#8216;C' built in format string, however this is limited in its rounding to 2 dp. The default rounding with format strings is to round to the nearest zero, so anything over .5 goes upwards. This is different from the integer formatting with Math.Round. Math.Round(Decimal) by default will round to the closest whole even number. This can have unusual results if you didn't know this, for example:

<pre>Console.WriteLine(Math.Round(2.5)); // Displays 2
</pre>

The reason behind this is [MidpointRounding][4] is set to ToEven by default on the single parameter version of Round. Specifying a precision or setting MidpointRounding.ToEven will get the standard (or what I'd call standard) behaviour back.

When you're working with currencies it's advisable to use double (Double) instead of floats (Single), unless you're positive the numbers you're dealing with will never go beyond +/-99,999. Floats only allow 7 digits which can cause unpredictable number formatting if you use the # formatter.

Below is some example code of rounding with the # formatter.

`gist:yetanotherchris/4774077`

### Significant figures formatting string

One thing not accomodated in format strings in .NET is significant figures. For example if you have a large number you want to display according to 1,2,3 and so on significant figures: 

> 2,354,856:   
> 1 sf = 2,000,000   
> 2 sf = 2,400,000  
> 3 sf = 2,350,000

No formatting string supports the rounding so it needs a custom formatter to do it, along the lines of:

<pre>public static string SpecialFormat(int v, int sf)
{
	int k = (int)Math.Pow(10, (int)(Math.Log10(v) + 1 - sf));
	int v2 = ((v + k/2) / k) * k;
	return v2.ToString("0,0");
}
</pre>

This only works on integers, credit goes to [Arne Vajhøj][5]

### In built number formats

Source code best illustrates the inbuilt formatting tokens:

`gist:yetanotherchris/4774050`

**Removing pence**

You can format a currency to exclude pence by using ToString(&#8220;C0&#8221;)

### What happens behind the scenes with number formatting

The DateTime class performs all of its formatting inside the FCL source itself via the internal DateTimeFormat class. Number formatting is done however in the CLR source code. All integer and double ToString() methods use the internal Number class, which has various methods for formatting, for example

<pre>[MethodImpl(MethodImplOptions.InternalCall)]
public static extern string FormatSingle(float value, string format, NumberFormatInfo info);
</pre>

The signature points to the method being implemented in the CLR, where it's found under [FormatSingle][6] inside comnumber.cpp. This function then uses [NumberToString][7]. This function is very similar to the DateTime.ToString() method in its logic with the performance bonus of it not requiring any intermediate layer to parse your number format strings.

### DateTime formatting

There are already plenty of DateTime format examples on the web, the two best I've found are in the links below. I'm going to try to condense these down even more and present my ultra thin DateTime formatting reference. It makes the assumption you have used all the DateTime formatting options plenty of times before, and that you live in a country with a western calender (and English day/month names). Here it is:

<pre>// --- Default formats ---
// Tokens:
// dD tT fF gG rsu M Y
// d = short/long [d]ate
// t = short/long [t]ime
// f = short/long [f]ull
// g = short/long [g]eneral or default
// rsu = RFC or ISO format, last 2 are sortable:
// r: Fri, 20 Mar 2009 00:00:00 GMT (RFC1123)
// s: 2009-03-20T00:00:00 (ISO 8601)
// u: 2009-03-20 00:00:00Z (RFC1123)
// M = day & month
// Y = month & year
// --- Custom formats ---
// dd ddd dddd
// 15 Mon Monday
// MM MMM MMMM
// 06 Jun June
// yy yyyy
// 08 2008
// hh HH
// 01 13
// mm
// ss
// f
// ff
// fff
// ffff (etc. for milliseconds)
// tt (AM or PM)
</pre>

### Writing a custom formatter

Implementing your own custom formatting tokens is made fairly straightforward within the .NET framework. All that's involved is implementing two interfaces (one of which is optional): IFormatProvider and IFormattable. The class that implements IFormattableis the one that is doing the actual token parsing. IFormatProvider is intended to be used by the IFormattable class to gain information to help it parse tokens. For example two classes that implement IFormatProvider in the BCL are CultureInfo and DateTimeInfo. These classes get settings from the current locale/culture (which comes from Windows) which can then be used in conjunction with the specific IFormattable class.

<pre>public class FormatProvider : IFormatProvider
{
	public object GetFormat(Type formatType)
	{
		if (formatType is IFormatProvider)
			return this;
		else
			return null;
	}
}
</pre>

As you can see there is one very easy method to implement. This method seems to overlap with the job of Object.GetType, however it is implemented as an interface so that the object can be passed around like this as an interface; the implementing class could also return a different type of class.

The IFormattable implementation is just as simple:

<pre>public string ToString(string format, IFormatProvider formatProvider)
{
	// handle format
}
</pre>

Imagine we've made a very simple User class with two properties: Name, Age. The example below will parse tokens in the following format {0:name} and {0:age}:

`gist:yetanotherchris/4774010`

The example doesn't make use of any IFormatProvider, however a class could be built to implement it, and the ToString method could use this to get regional data, or infact any type of data the class wants to provide. It would need to be tightly-coupled with the IFormatProvider implementing class in order to know what it does, as the IFormatProvider interface doesn't infer any of this information.

And example usage:

<pre>static void Main(string[] args)
{
	User user = new User() { Name = "Chris", Age = 30 };
	Console.WriteLine("Default format: {0}", user.ToString());
	Console.WriteLine("Composite format: {0:name} is {0:age}",user);
	Console.WriteLine("ToString(format): {0}", user.ToString("This user (name) is age"));
	Console.ReadLine();
}

Output:
Default format: 'Chris', age 30
Composite format: Chris is 30
ToString(format): This user (Chris) is 30
</pre>

### Links

  * [FormatSingle BCL source][6] 
  * [NumberToStringFormat CLR source][7]
  * [MSDN documentation on in built number format tokens][8]. 
  * [MSDN documentation on formatting in general][9]. 
  * [MSDN documentation on custom numeric formatting tokens][10]. 
  * [MSDN documentation on DateTime format tokens][11] 
  * [Wikipedia article on decimal/thousand separator][3] 
  * [DateTime and formatting cheat sheet][12]

 [1]: http://msdn.microsoft.com/en-us/library/txafckwd(VS.71).aspx
 [2]: /assets/2010/02/thousandseperator.png
 [3]: http://en.wikipedia.org/wiki/Decimal_separator
 [4]: http://msdn.microsoft.com/en-us/library/system.midpointrounding.aspx
 [5]: http://www.vajhoej.dk/arne/
 [6]: http://www.koders.com/cpp/fid03737280F05F3996789AC863BDE66ACB337C1E9B.aspx?s=FormatSingle#L2020
 [7]: http://www.koders.com/cpp/fid03737280F05F3996789AC863BDE66ACB337C1E9B.aspx?s=NumberToStringFormat#L1457
 [8]: http://msdn.microsoft.com/en-us/library/s8s7t687(VS.80).aspx
 [9]: http://msdn.microsoft.com/en-us/library/26etazsy(VS.80).aspx
 [10]: http://msdn.microsoft.com/en-us/library/0c899ak8(VS.80).aspx
 [11]: http://msdn.microsoft.com/en-us/library/system.globalization.datetimeformatinfo.aspx
 [12]: http://john-sheehan.com/blog/assets/msnet-formatting-strings.pdf