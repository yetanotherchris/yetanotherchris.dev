---
title: Inside .NET assemblies (part 1)
date: 2010-07-12 00:00:00 Z
permalink: "/net/inside-net-assemblies-part-1/"
tags:
- ".net"
- assemblies
Published: 2010-07-12 00:00:00 Z
author: Chris S
description: The first of a set of reference blog posts covering .NET assemblies + modules,
  structure of a .NET assembly and metadata tables.
layout: post
dsq_thread_id:
- 114209863
---

[View part 2][1]

This post (in two parts) covers the following topics:

  * Assemblies + Modules
  * Appdomains and isolation (soon)
  * Structure of a .NET assembly - Metadata tables
  * Assembly manifest information
  * XML configuration files and versioning swapping/probing.

<!--more-->

First of all some (possibly patronising) definitions of some acronyms. You can find the formal definitions at: [ECMA][2].

### Definitions of .NET acronyms

#### ILAsm

The language all .NET languages are compiled into, sometimes call &#8216;bytecode', it is a form of assembly language or low level language.

#### CIL

Common Intermediate Language, the same as ILasm. This is how it is referred to in the ECMA specification.

#### MSIL

Microsoft Intermediate Language. Wikipedia says this is an older (beta) name for CIL, although pages within MSDN still refer to it as this (such as MSIL dissambler).

#### CLI

Common Language Infrastructure. A ECMA and ISO specification that describes the format of the executable code (IL) and the environment this runs within.

#### CLS

Common Language Specification. This is a set of rules that any .NET language has to stick to in order to promote interopability with other .NET languages. For example:

> CLS Rule 41: Attributes shall be of type System.Attribute, or a type inheriting from it.

#### CTS

Common Type System. This is the definition of types that a CLS languages should adhere to. If you create a new .NET language you would have to stick to this specification in order that you produce assemblies that are interopable with other languages.

#### CLR

Common Language Runtime. This is the environment running your .NET application, the virtual machine. The CLR is implemented as a COM server and has all of the baggage involved in this. It's possible to create your own application to host the CLR, there's various books out there on how to do this.

#### JIT

Just in Time compilation. This is the process the CLR employs to turn IL operations into something the processor can understand, or native operations. The name comes from the fact this transformation occurs when a method is first run. There's a lot of literature out there about JIT performance and ngen (native image generation, where the native code is produced for the entire assembly rather than the first time each method is called). Some good places that include general .NET performance tips are:

[CLR inside out, performance tips.][3]  
[An MSDN book on performance.][4]  
[Real time managed code.][5]  
[Rico's performance blog has a big set of posts on performance.][6]

### Assemblies and modules

The .NET framework consists of the concepts of modules, assemblies, which both store metadata and manifest information. An assembly can contain multiple modules. Visual C# only ever creates one module which is turned into an assembly by the C# compiler (csc.exe), but an assembly can link many .NET modules together via the assembly linker (al.exe) command line tool. For example each of your source code .cs files could be compiled into a module and linked together to form an assembly - an assembly is just a collection of modules and resources. One of these modules however must contain manifest metadata (see below) information for the assembly to be understood by the CLR.

Try the following out with a simple console application:

<pre>csc /target:module Program.cs</pre>

This produces a file called Program.netmodule. As mentiond You can tie multiple modules together with the Al.exe (assembly linker) tool, Visual Studio of course hides all of this from your by simply compiling all of your source code files into a single module which is then linked inside an assembly (csc.exe does this with the right set of arguments).

You cannot link other assemblies together to form a new assembly with Al.exe, so unless you have the source code for the projects you want to combine together, you are limited to distributing all of the assemblies together. Often with the .NET framework this can mean doing an xcopy of 10s or even hundreds of DLLs for each update.

### Structure of a .NET assembly

This section describes the file format of a .NET assembly on the Windows platform. Having created a new .exe or .dll inside VS.NET you see your file appear inside your bin folder. Opening it in notepad will give out gibberish, or even inside a hexadecimal editor without knowing the structure of the file, you need a tool like ildasm.exe or CFF explorer to make meaning from it. The structure of the assembly is is as follows:

  * PE header
  * CLR header
  * CLR metadata
  * CLR IL code
  * Native data

#### The PE header

This is dealt with in a lot of detail in the book [Inside Microsoft .NET IL Assembler - Serge Lidin][7] if you want more information. The PE header is the portable executable header that all Win32 applications and libraries have, and instructs Windows what to do with the file. With .NET assemblies this loads the CLR which in turn loads the assembly.

#### The CLR header

This contains information such as the .NET version the .exe or assembly was written with, any strong name signature hash, the address (RVA or relative virtual address) in the file that the resources can be found. And most importantly the entry point for the application which is a token pointing to the MethodDef metadata table, or another file. This token is 0 for class libraries.

#### Metadata

This is information about the module that is stored inside several different types of &#8220;streams&#8221;. These streams are typically compressed, with the exception of #~ which can be uncompressed for edit and continue. The streams come in two forms, a heap which is just used for storage, and tables.

#### #blob

Contains binary objects referenced in the metadata (like default values) but not used inside methods. 

#### #string

Contains unicode strings used in the metadata such as class names, method names, field names, but not string literals. This also contains resource strings. 

#### #US

Contains unicode strings. This contains the string literals which are used inside the IL code that the C# compiler produces. 

#### #GUID

Contains all Guids that are referenced in the assembly. 

#### #~

This contains all the metadata tables described below. 

#### #-

This is an uncompressed version of #~. It's uncompressed to support the Visual Studio edit and continue feature.

The number of streams that the module or assembly contain are found in the NumberOfStreams column in the CLR header.

### Metadata tables

Each .NET module contains 44 metadata tables (Module doesn't qualify as one besides being listed below). These are tables that make the assembly &#8220;self-describing&#8221;, the tables contain information about every type in the assembly, every method/event/property/field for the type and the referenced assemblies and types that this assembly uses, along with a lot more auxilary information. The metadata tables are similar to database tables in regards to having a kind of foreign key or parent-child structures between them. The relationship between the tables is done in two ways. The first involves the parent table containing a start point in the child table that the rows start at. For example the TypeDef table contains a column called MethodList that contains a start index number (known as a RID) where all its methods begin from. So for MyClass this might be #5, indicating that at row 5 onwards all the methods for MyClass are listed. 

Along with this, child tables contain a link back to their parent table - for example each row in the MethodDef table contains a link to the type it belongs to in the TypeDef table. The same applies with ParamDef (storing all parameters for a method) and so on. 

The classes are stored with the parent class starting the table, and children being listed underneath parent. This is known as optimised metadata.The list of metadata tables are listed below (taken from ILdasm): 

<pre>0(0): Module
1(0x1): TypeRef
2(0x2): TypeDef
3(0x3): FieldPtr
4(0x4): Field
5(0x5): MethodPtr
6(0x6): Method
7(0x7): ParamPtr
8(0x8): Param
9(0x9): InterfaceImpl
10(0xa): MemberRef
11(0xb): Constant
12(0xc): CustomAttribute
13(0xd): FieldMarshal
14(0xe): DeclSecurity
15(0xf): ClassLayout
16(0x10): FieldLayout
17(0x11): StandAloneSig
18(0x12): EventMap
19(0x13): EventPtr
20(0x14): Event
21(0x15): PropertyMap
22(0x16): PropertyPtr
23(0x17): Property
24(0x18): MethodSemantics
25(0x19): MethodImpl
26(0x1a): ModuleRef
27(0x1b): TypeSpec
28(0x1c): ImplMap
29(0x1d): FieldRVA
30(0x1e): ENCLog
31(0x1f): ENCMap
32(0x20): Assembly
33(0x21): AssemblyProcessor
34(0x22): AssemblyOS
35(0x23): AssemblyRef
36(0x24): AssemblyRefProcessor
37(0x25): AssemblyRefOS
38(0x26): File
39(0x27): ExportedType
40(0x28): ManifestResource
41(0x29): NestedClass
42(0x2a): GenericParam
43(0x2b): MethodSpec
44(0x2c): GenericParamConstraint
</pre>

Detailed descriptions of all these tables can be found in [Inside Microsoft .NET IL Assembler - Serge Lidin][7]. Often your assembly might contain a higher percentage (in size) of metadata than actual IL, particularly if the assembly is small or object heavy (for example with ORMs). You can see this data inside ILDasm via View->Statistics. 

The start point of the tables is the Module table which contains just the name and guid of the module as a single row. After this is the ModuleRef table which contains information about all modules that are referenced by this module (from the same assembly). In the case of VS.NET and its use of csc.exe there aren't multiple files in the assembly, just one module. 

After this is the TypeDef table which contains 6 columns holding the type's name, namespace, its parent (0 for interfaces and Object), the start row for its fields in the FieldDef table, start row for its methods in the MethodDef table. 

The MethodDef table contains 4 columns for name, flags, signature and then the offset (a virtual address/RVA) that the method's IL code can be found inside the IL. 

The other tables continue like this for fields, params, properties and events. 

## Manifest information

Every assembly must contain a manifest metadata table in one of its modules. In the case of VS.NET multiple modules it's always held in the 1 module it produces. The manifest table contains the summary information about the assembly such as its name,version (Major,Minor,Build,Revision such as 1.0.1.1), any public key, a hash of the file and its culture. You will recognise this information if you use VS.NET as it can be set in the AssemblyRef.cs file.

Alongside this information about the assembly is another table that has to be present in atleast one of the assembly's modules. This is the AssemblyRef table. This contains a list to all assemblies that are referenced by the modules in the assembly. The only assembly with an empty AssemblyRef table is the mscorlib.dll assembly that contains the BCL types. The AssemblyRef table contains similar columns to the manifest metadata table that describes the assembly. This includes the referenced assembly's hash, version, public key, name and locale.

 [1]: /net/inside-net-assemblies-part-2/
 [2]: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-335.pdf
 [3]: http://msdn.microsoft.com/en-us/magazine/cc163655.aspx
 [4]: http://msdn.microsoft.com/en-us/library/ms998530.aspx
 [5]: http://blogs.msdn.com/ricom/archive/2006/08/22/713396.aspx
 [6]: http://blogs.msdn.com/ricom/
 [7]: http://www.amazon.com/Inside-Microsoft-NET-IL-Assembler/dp/0735615470/