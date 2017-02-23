---
title: C# Bit manipulation by example (part 2)
date: 2011-02-02 00:00:00 Z
permalink: "/csharp/csharp-bit-manipulation-by-example-part-2/"
tags:
- bit-manipulation
- c#
Published: 2011-02-02 00:00:00 Z
author: Chris S
excerpt: The second part of a two-part blog series looking at bit manipulation in
  C#.
layout: post
dsq_thread_id:
- 1093154059
---

The [previous post][1] explained:

  * Counting and arithmetic in base 2,8,10,16 (binary, octal and decimal,hexadecimal), 
  * Sign magnitude
  * 1/2s complement (how integers are stored) and floating point storage
  * Least and most significant bits, Endian formats.
  * The point of hex displays

<!--more-->

It's probably worth reading if some of the above is unclear before going through the examples. The examples below have capitalised method names to make it clearer what is happening (i.e. the operations are in caps).

The WL() method is just the [Snippet Compiler's][2] wrapper for Console.WriteLine

### AND Operator: &

This it the operator you'll use most often as it's used for comparisons. It will give you the mask value, if the value your checking contains the mask. This is in comparison to the | (OR) operator, which gives you the value back rather than the mask. So OR checks if either value is true, whilst AND checks if both values are true.

    static void AND()
    {
        // If the mask value is 1, and the value is 1, it sets it to 1
        // If the mask value is 1, and the value is 0, it keeps that 0
        // If the mask value is 0, the value is set to 0 regardless
        // 42   = 0010 1010
        // 36   = 0010 0100
        //
        // val  = 0010 0000 = 32
        int val = 42 & 36;
        WL("{0}",val);
    }


### OR Operator: |

    static void OR()
    {
        // If the mask value is 0, the original is returned
        // If the mask value is 1, 1 is returned (i.e. true || false == true)
        // 42   = 0010 1010
        // 36   = 0010 0100
        //
        // val  = 0010 1110 = 46
        int val = 42 | 36;
        WL("{0}",val);
    }


### XOR Operator: ^

    static void XOR()
    {
        // Sets the bit only if 1 of the values is true, not both
        // 42   = 0010 1010
        // 36   = 0010 0100
        //
        // val  = 0000 1110 = 14
        int val = 42 ^ 36;
        WL("{0}",val);
    }


### OR Equals: |=

    static void OREQUALS()
    {
        // Shorthand or alternative syntax for the OR mask,
        // saves doing "val = val | 36".
        int val = 42;
        val |= 36;
        WL("{0}",val);
    }


### AND Equals: &=

    static void ANDEQUALS()
    {
        // Shorthand or alternative syntax for the AND mask
        int val = 42;
        val &= 36;
        WL("{0}",val);
    }


### XOR Equals: ^=

    static void XOREQUALS()
    {
        // Shorthand or alternative syntax for the XOR mask
        int val = 42;
        val ^= 36;
        WL("{0}",val);
    }


### NOT Operator: ~

    static void NOT()
    {
        // 42   = 0000 0000 0010 1010
        //
        // Result:
        // -43  = 1111 1111 1101 0101
        //
        // Inverts the bits of 42, see the other article
        // of how this works with 2s complement (you basically
        // invert the bits and add 1)
        int val = 42;
        val = ~42;
        WL("{0}",val);
    }
