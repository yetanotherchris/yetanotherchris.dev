---
title: C# Bit manipulation by example (part 2)
date: 2011-02-02 00:00:00 Z
permalink: "/csharp/csharp-bit-manipulation-by-example-part-2/"
tags:
- bit-manipulation
- csharp
Published: 2011-02-02 00:00:00 Z
author: Chris S
description: The second part of a two-part blog series looking at bit manipulation in
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


### Using the Flags() Attribute

    // The Flags attribute is used for parsing of the enum and its string representation,
    // and is not actually necessary for the bit operations
    [Flags]
    enum Rights
    {
        None = 0,       // 0000 0000
        ReadFile = 1,   // 0000 0001
        ModifyFile = 2, // 0000 0010
        WriteFile = 4,  // 0000 0100
        ReadDir = 8,    // 0000 1000
        All = ReadFile | ModifyFile | WriteFile | ReadDir
    }

    static void FLAGS()
    {
        // Using OR - adding values
        // rights  = 0000 0001 (ReadFile)
        // a       = 0000 0010 (ModifyFile)
        // b       = 0000 0100 (WriteFile)
        // rights  = 0000 0111 = 7
        Rights rights = Rights.ReadFile;
        rights |= Rights.ModifyFile;
        rights |= Rights.WriteFile;
        WL("|= {0}",rights);
        
        // Using AND
        // rights  = 0000 0111
        // a       = 0000 0010 (ModifyFile)
        // rights  = 0000 0010 = 2
        rights &= Rights.ModifyFile;
        WL("&= {0}",rights);
        
        // Using XOR - removing a single value
        // rights  = 0000 0111
        // a       = 0000 0010 (ModifyFile)
        // rights  = 0000 0101 = 5
        rights = InitRights();
        rights ^= Rights.ModifyFile;
        
        WL("^= {0}",rights);
        // Using ~ - removing multiple flags
        // rights  = 0011 1111
        // a       = 1111 1001 ~(ModifyFile | WriteFile)
        rights = Rights.All;
        rights &= ~(Rights.ModifyFile | Rights.WriteFile);
        WL("~ {0}",rights);
        
        // Testing if it contains a value
        // rights  = 0000 0110
        // test    = 0000 1000
        // displays None
        rights = Rights.WriteFile | Rights.ModifyFile;
        Rights test = rights & Rights.ReadDir;
        WL("Contains Rights.ReadDir: {0}",test == Rights.ReadDir);
        
        // Testing if it contains value 1 or value 2
        // rights  = 0000 1110
        // test    = 0000 0000
        // displays None
        rights = InitRights();
        if ((rights & Rights.ReadFile) == Rights.ReadFile)
        WL("If test: contains ReadFile");
        if ((rights & Rights.ModifyFile) == Rights.ModifyFile)
        WL("If test: contains ModifyFile");
    }

    static Rights InitRights()
    {
        return Rights.ReadFile | Rights.ModifyFile | Rights.WriteFile;
    }


### Left shifting: <<

    static void SHIFTLEFT()
    {
        // 42   = 0010 1010
        // << 2 = 1010 1000 = 168
        int val = 42;
        val = val << 2;
        WL("{0}",val);
        
        // Pushing beyond 8 bits
        // 42   = 0000 0000 0010 1010
        // << 4 = 0000 0010 1010 0000 = 672 (512 + 128 + 32)
        val = 42;
        val = val << 4;
        WL("{0}",val);
    }


### Right shifting: >>

    static void SHIFTRIGHT()
    {
        // 42   = 0010 1010
        // >> 2 = 0000 1010 = 10)
        int val = 42;
        val = val >> 2;
        WL("{0}",val);
        
        //  42   = 0010 1010
        // inverted using 1s complement
        //  -42  = 1101 0101
        //  -42  = 1101 0110 (2s complement: add 1)
        //  105  = 0110 1001
        // -105  = 1001 0111
        //  120,000 = 0000 0000 0000 0001 1101 0100 1100 0000
        // -120,000 = 1111 1111 1111 1110 0010 1011 0011 1111 (1s)
        //            1111 1111 1111 1110 0010 1011 0100 0000 (2s - added 1)
        // 42      = 0010 1010
        // -42     = 1101 0110
        // -42 >> 2 = 0011 0101
        // -42 >> 2 = 1111 0101 (it pads the zeros to the left with 1s)
        val = -42;
        val = val >> 2;
        WL("{0}",val);
    }


### Bit shifting with a negative number

The well written JavaRanch article below has 2 good examples of bit shifting with negative numbers. Here's a practical example

    static void NEGATIVESHIFT()
    {
        // Using 256 as 42 doesn't have enough bits (it right shifts to 0)
        //
        // 256   = 0000 0001 0000 0000
        // -6    = 0000 0000 1111 1010 With shifting, this is promoted to an int, using the last 5 bits
        //       = 0000 0000 0001 1010 (2 + 8 + 16 = 26)
        //       = 0000 0000 0000 0000 (Zero as its shifting 26 bits to the right)
        int val = 256 >> -6;
        WL("{0}",val);
    }


### Reference

  * [An alternative, good C# reference][3]
  * [A very well written readable article (for Java but relevant), not dry wikiprose][4]
  * [Wikipedia article on Endianess][5]
  * [Stackoverflow question on bitwise shifting][6]

 [1]: /csharp/csharp-bit-manipulation-by-example-part-1/
 [2]: http://www.sliver.com/dotnet/SnippetCompiler/
 [3]: http://www.blackwasp.co.uk/CSharpLogicalBitwiseOps.aspx
 [4]: http://www.javaranch.com/journal/200406/ScjpTipLine-BitShifting.html
 [5]: http://en.wikipedia.org/wiki/Endian
 [6]: http://stackoverflow.com/questions/791328/how-does-bitwise-complement-operator-works
