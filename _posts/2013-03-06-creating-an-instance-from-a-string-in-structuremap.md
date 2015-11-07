---
Published: 2013-03-06
title: "Creating an instance from a string or type name in StructureMap"
author: Chris S
layout: post
permalink: /structuremap/creating-an-instance-from-a-string-in-structuremap/
tags:
  - roadkillwiki
  - structuremap
---
As part of the refactor I'm doing for Roadkill, I'm loading custom types from the config file as default instances, via StructureMap. The types are defined as strings in the config file, and in future more plugins will be loaded this way.

This took me around 4 hours to figure out over the past few days, partly from lots of false leads out there but also missing the blindingly object ObjectFactory.Model property. The way you can achieve it is fairly straightforward in 2.5+. I have a base UserManager type, and a concrete type that implements it.

<pre>ObjectFactory.Initialize(x =&gt;
{
	x.Scan(scanner =&gt;
	{
		scanner.TheCallingAssembly();
		scanner.SingleImplementationsOfInterface();
		scanner.WithDefaultConventions();

		// Plugin UserManagers
		if (Directory.Exists(pluginPath))
			scanner.AssembliesFromPath(pluginPath);
		
		// etc.
	}
});</pre>

<pre>ObjectFactory.Configure(x =&gt;
{
	string pluginName = "Roadkill.SomePlugin.MyCustomUserManager";
	InstanceRef userManagerRef = ObjectFactory.Model.InstancesOf&lt;UserManager&gt;().FirstOrDefault(t =&gt; t.ConcreteType.FullName == pluginName);
	x.For&lt;UserManager&gt;().HybridHttpOrThreadLocalScoped().TheDefault.Is.OfConcreteType(userManagerRef.ConcreteType);
});</pre>

Three things worth noting if you want to do this:

  1. You want to get the InstancesOf and not instances - you don't want it create an instance of you plugin type before everything else is registered.
  2. You may need to perform this inside Configure(), as Initialize scans for types.
  3. An obsolete message shows for TheDefault.Is.OfConcreteType but the method it tells you to use doesn't work with a Type

The full implementation is on [GitHub][1].

 [1]: https://github.com/roadkillwiki/roadkill/blob/master/src/Roadkill.Core/DI/DependencyManager.cs#L266