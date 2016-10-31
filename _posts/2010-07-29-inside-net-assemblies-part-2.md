---
title: Inside .NET Assemblies (part 2)
date: 2010-07-29 00:00:00 Z
permalink: "/net/inside-net-assemblies-part-2/"
tags:
- ".net"
Published: 2010-07-29 00:00:00 Z
author: Chris S
excerpt: The second of a set of reference blog posts covering .NET assemblies + modules,
  structure of a .NET assembly and metadata tables.
layout: post
dsq_thread_id:
- 1083972652
---

[View part 1][1]</li> 

### Basic resource embedding

Embedding images, video, text files and so on into your .NET assembly is incredibly simple in Visual Studio, simply add the file to the project, press F4 and change its Build Action to &#8220;embedded resource&#8221;. It can then be referenced with one line:

<!--more-->

  
<script src="https://gist.github.com/yetanotherchris/4957257.js"></script>

The code above assumes you have a folder called Resources. The reference string for the path is the namespace of your project, then the folder names separated with a dot. Case sensitivity is important for this. You can get all resources in your assembly using the following:

<pre>foreach ( string name in GetType().Assembly.GetManifestResourceNames() )
{
   Console.WriteLine( name );
}
</pre>

Visual Studio hides what it is doing when it embeds resources into the assembly and you probably won't care most of the time. The action it performs isn't hugely complicated, it simply appends the /resource switch to the C# compiler (csc) like so:

<pre>csc /target:exe /resource:image.gif Program.cs
</pre>

You append a /resource switch for each resource:

<pre>csc /target:exe /resource:image.gif /resource:image2.gif Program.cs
</pre>

#### Where are the resources stored in the assembly?

All of the resources are stored in either the #US or the #blob heaps which were described above. Each stream has a start and offset in its header which allows the CLR to retrieve each resource quickly. You can view assembly resources quickly by using .NET reflector or CFF explorer, the links are at the end of the article. 

### Localization, Satellite assemblies, .resource files and .resx files

For those special occasions where you want your application or class library to have resources that are specific to a culture, for example labels on a Windows or ASP.NET form that vary based on language, you will create a set of satellite assemblies that are loaded by the CLRdepending on the current culture. 

Localization is made a lot simpler by Visual Studio as all the command line and folder creation is automated. To add a new culture to your project, use Add->New Item&#8230; Select the General item in the tree, and &#8216;Resource file'. You must then name the file in the format

<pre>&lt;Namespace&gt;.&lt;Classname&gt;.&lt;Culture-code&gt;
</pre>

So it might be MyNamespace.Program.fr.resx (case sensitivity is important). The culture codes are available at [MSDN online][2]. 

Once you have added this, you can add strings or other resources via the gui. It can also be done manually by editing the .resx file if you prefer, the schema is fairly simple (it looks long as the XSD is embedded in the top of each file). You will need to store any binary as base64 in the format. 

Compiling your project will produce the following in the debug/bin folder: 

> YourProject.dll   
> fr/YourProject.dll 

What Visual Studio actually does to turn the MyNamespace.Program.fr.resx file in your project to the output folder is: 

<pre>resgen MyNamespace.Program.fr.resx
csc /t:library /out:MyNamespace.dll /resource:MyNamespace.Program.fr.resources
md fr
xcopy MyNamespace.dll fr
del MyNamespace.dll
csc /t:exe /out:MyNamespace.exe Program.cs
</pre>

(if your directory has a long path, you might want to type &#8220;prompt $N:\$G&#8221; to reduce it down).

The resx file - which is just an XML file with your resources in - is transformed into the .resource file format that the C# compiler (or Al.exe) recognises. It's then turned into an assembly and copied to the fr directory. More information on .resource files and resgen.exe can be found at [MSDN online][3]. 

The CLR searches using the culture names for folders, starting at the assembly's base directory, then the culture name. The same applies if the machine that is running the application is different from the base culture of the main assembly. Satellite assemblies are never intended to contain code, just host resources for the culture they represent. You can load a culture manually and use its resource string using the following (assuming you have a string called Label1): 

<pre>CultureInfo ci = new CultureInfo( "Fr" );
ResourceManager resmgr = new ResourceManager(typeof(Program) );
string x = resmgr.GetString( "Label1" );
</pre>

The main assembly that contains your actual code is known as the fallback assembly. If any resource can't be found for the culture being used then it will be taken from this main &#8216;fallback' assembly. You can also change the fallback assembly to represent another culture using the [assembly: AssemblyCulture( &#8220;&#8221; )] attribute, though this isn't recommended. 

### Changing referenced assembly versions

When a C# source file is compiled into an assembly, information is embedded into the metadata header of the assembly with the version and key information of each of the referenced assemblies in the modules. There are situations where you will need to change your own or another assembly so it uses a different version of a referenced assembly. This can be performed inside the app.config/web.config file using the following format: 

<pre>&lt;configuration&gt;
	&lt;runtime&gt;
		&lt;assemblyBinding xmlns="urn:schemas-microsoft-.com:asm.v1"&gt;
			&lt;dependentAssembly&gt;
				&lt;assemblyIdentity name="AnotherAssembly" publicKeyToken="xxx" culture="neutral" /&gt;
				&lt;bindingRedirect oldVersion="1.5.0.0" newVersion="2.0.0.0" /&gt;
			&lt;/dependentAssembly&gt;
		&lt;/assemblyBinding&gt;
	&lt;/runtime&gt;
&lt;/configuration&gt;
</pre>

You can also specify a range of assembly versions using the format 1.5.0.0-1.7.0.0 for the oldversion attribute. Full MSDN information is available [here][4]. 

### Adding search paths for the CLR to look in

By default the CLR will look in the application's base directory for assemblies that it references. Normally all the referenced assemblies are thrown into the same directory as the output assembly, however you can alter your app.config or web.config file so that the CLR looks in other folders. These folders always have to be below the assembly's base directory. The format is: 

<pre>&lt;configuration&gt;
	&lt;runtime&gt;
		&lt;assemblyBinding xmlns="urn:schemas-microsoft-.com:asm.v1"&gt;
			&lt;probing privatePath="lib;moreFiles" /&gt;
		&lt;/assemblyBinding&gt;
	&lt;/runtime&gt;
&lt;/configuration&gt;
</pre>

The above will make the CLR search inside the &#8220;lib&#8221; and &#8220;moreFiles&#8221; folders which should live underneath the assembly's base directory (for example debug/bin/lib and debug/bin/moreFiles). 

### Links

  * [Article about streams and metadata information.][5] 
  * [.NET reflector][6]- a must have tool for viewing inside assemblies and reverse engineering the IL into VB.NET or C#. 
  * [A tool for viewing metadata][7] information in assemblies and other detailed information like PE headers. 

### Bibliography

The following article and books helped a lot with this article, I'd definitely recommend buying the books if you are interested in the insides of .NET and the CLR.

  * [Inside Microsoft .NET IL Assembler][8] - Serge Lidin 
  * [CLR via C#][9] - Jeffrey Richter 
  * [Article about streams and metadata information][5].

 [1]: /net/inside-net-assemblies-part-1/
 [2]: http://msdn.microsoft.com/en-us/library/system.globalization.cultureinfo.aspx
 [3]: http://msdn.microsoft.com/en-us/library/zew6azb7(VS.80).aspx
 [4]: http://msdn.microsoft.com/en-us/library/eftw1fys.aspx
 [5]: http://www.codeproject.com/KB/dotnet/dotnetformat.aspx
 [6]: http://www.aisto.com/roeder/dotnet/
 [7]: http://ntcore.com/exsuite.php
 [8]: http://www.amazon.com/Inside-Microsoft-NET-IL-Assembler/dp/0735615470/
 [9]: http://www.amazon.com/CLR-via-Second-Pro-Developer/dp/0735621632/