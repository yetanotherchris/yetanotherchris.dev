---
title: Upgrading an MVC StructureMap 2 app to StructureMap 4
date: 2015-12-01 00:00:00 Z
tags:
- roadkill-wiki
- structuremap
- mvc
- turtles-all-the-way-down
Published: 2015-11-11 00:00:00 Z
layout: post
description: A well-known scientist (some say it was Bertrand Russell) once gave a public
  lecture on astronomy. He described how the earth orbits around the sun and how the
  sun, in turn, orbits around the center of a vast collection of stars called our
  galaxy. At the end of the lecture, a little old lady at the back of the room got
  up and said...
---

> A well-known scientist (some say it was Bertrand Russell) once gave a public lecture on astronomy. He described how the earth orbits around the sun and how the sun, in turn, orbits around the center of a vast collection of stars called our galaxy. At the end of the lecture, a little old lady at the back of the room got up and said: "What you have told us is rubbish. The world is really a flat plate supported on the back of a giant tortoise." The scientist gave a superior smile before replying, "What is the tortoise standing on?" "You're very clever, young man, very clever," said the old lady. "But it's turtles all the way down!"

(Wikipedia)[https://en.wikipedia.org/wiki/Turtles_all_the_way_down]

Roadkill uses dependency injection (like most use cases) to facilitate testing, but also for its plugin architecture: custom repositories, custom security, and page plugins. StructureMap is my favoured DI as it's the oldest and in my view easiest one to use.

As part of the work I'm doing to ready Roadkill for the big leap to ASP.NET 5 next year, and the promises it brings of Linux deployments and self hosting, I've been moving core bits of technology over. This has included moving from Webgrease to Node and Grunt (a post on how I did should appear here soon), SASS, OWIN, JSON configs instead of web.configs and the current behemoth of moving to StructureMap 3.

### Goodbye HybridHttpOrThreadLocalScoped()
If you're not familiar with DI object creation types, [http://structuremap.github.io/object-lifecycle/supported-lifecycles/](there's essentially 4 types), all with slightly different names depending on your choice of DI.

StructureMap 4 controversally removed its web implementation from the core framework and made its `ObjectFactory` class obselete, which was the main entry point for getting new instances of objects. With these changes Roadkill's upgrade path has been a very slow one, pretty much a whole re-write of the DI namespace. Although this wasn't really a bad thing as it had a lot of clumsy code in there.


### StructureMap.MVC5
There is a Nuget package called StructureMap.MVC5 which helps out with quite a few of the upgrade issues, by providing some legacy support in a new StructureMap.Web namespace. Once installing the package, you are given a number of auto-generated files, which I simplified down to:


#### The startup class. 

This is your "composite root" where all of the StructureMap setup is done at application start. Annoyingly OWIN's startup method is too late in the lifecycle to hook up StructureMap, so the StructureMap.MVC5 package uses WebActivatorEx a  hack to work around the short comings:

		[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(StructureMapStartup), "Start")]
		[assembly: ApplicationShutdownMethod(typeof(StructureMapStartup), "End")]

WebActivatorEx uses magical MVC assembly-level attributes ([details here](http://stackoverflow.com/questions/5812596/what-does-webactivator-do)) to run the IoC/DI setup at start.

If you thought IoC in MVC would be easy, you were wrong. My start method does a ridiculous amount of wire up, just to get the wire up working:

- Creates a new Registry class caslled RoadkillRegistry
- Creates a new IContainer and specifies that it should use a RoadkillRegistry
- Creates a new StructureMapServiceLocator class
- Creates a new StructureMapHttpModule 
- Use Microsoft MVC's DependencyResolver.SetResolver so it can register the default Service Locator we're using
- Use Microsoft MVC's DynamicModuleUtility.RegisterModule to register the HttpModule, presumably to deal with HTTP lifetimes.
- ...there's even more which I'll list below.

I renamed most of these classes as I found the default names provided by the StructureMap.MVC project confusing. They were also created as if they were designer files, with no formatting at all. This isn't the case however, they're bootstrap files that you will need to modify unless you are doing the absolute basics of creating new Repositories->Service->Controller style dependencies.

##### The Registry class
StructureMap 3 now gives a base class that you inherit from and implement all of your instance setup inside. This includes the same techniques as 2, using scanning of assemblys and configuring of lifetime types for objects.

##### The ServiceLocator implementation
Microsoft have now removed some complexity by creating a standardized interface for Service Locators. Service Locators are the root class that you get all your objects from. You implement `ServiceLocatorImplBase` and `IDependencyResolver` which calls back into StructureMap's `IContainer` to get its instances (you feed the `IContainer` in via the constructor).

##### The IHttpModule class
This just creates a new container on each new HTTP request, and disposes when the request ends.

###We're not done yet...

It's funny that an application that does do a great deal more than put text onto a webpage and allow uploads of images has this amount of complexity. I started questioning why Roadkill does all of this during the upgrade process and would forgive anyone who read the source code for thinking "WTF, it's just a wiki app".

The truth is the complexity is not from the patterns Roadkill uses, but rather than the miles of hurdles you have to jump through to get the existing ASP.NET (4) framework to work with dependency injection. This is the next part which is where it gets ugly.


#### So you want to use dependency injected attributes, eh?
Roadkill uses custom implementations of the `[Authorize]` attributes, which was done to try to make it stay inline with the MVC framework's patterns. The alternative would have been to use an AOP tool such as PostSharp, this would've meant doing a similar attribute-based system although without the DI setup the MVC attributes need.

To have custom MVC attribute classes that get dependencies injected into them, you need to create a class that implements `FilterAttributeFilterProvider`. You then call `GlobalConfiguration.Configuration.Services.Add` with this class.

Obviously having a standard service locator for all your classes is something Microsoft forgot to do until now, and to make things a little worst they also seem to have had a communication break down between the WebAPI team and the MVC team. We've been promised this will be fixed in the coming DNX release but for now it means you also have to implement `System.Web.Http.Filters.IFilterProvider`.

Yes, two implementations just to create attributes and each one has its own version of `FilterInfo` that holds details of the filter.

#### Even more service locators
There 2 more custom service locators we have to setup. WebApi has its own service locator (why wasn't an interface in the .NET framework from version 4?!), you registry this using `GlobalConfiguration.Configuration.DependencyResolver = ...`. 

Finally if you have Models that using data annotations and model binding, you need to use something along the lines of:

	ModelBinders.Binders.Add(typeof(UserViewModel), new UserViewModelModelBinder());
	ModelBinders.Binders.Add(typeof(SettingsViewModel), new SettingsViewModelBinder());


Where `UserViewModelModelBinder` is a class thats gets an instance of `UserViewModel` from the StructureMap container.


### Conclusion
Putting aside my rants about the complete lack of communication between two teams in Microsoft that created this complete mess and MVC's IoC containers (shared by the Structuremap author Jeremy Miller too I think), it looks like a lot of this code will need to be re-written next year when Microsoft unify WebAPI and MVC into one framework.