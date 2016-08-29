---
Published: 2016-08-29T13:50:00.000Z
title: Fixing .NET Core package restore problems
author: Chris S
layout: post
tags:
  - .net-core
  - nuget
---
I had this problem today where a `dotnet restore` was failing on a Linux CI server, but working on my Windows 10 dev machine. The error was:

> Unable to resolve 'System.Runtime.Serialization.Formatters (&gt;= 4.0.0-rc4-24217-03)' for '.NETCoreApp,Version=v1.0'.

It turns out I had this package in `C:\Users\MyUsername\.nuget\packages` so it restored locally, but on the internet the package isn't at nuget.org. How did I get it originally? That was a mystery that luckily another project in the solution solved by accident.

A lot of the .NET Core nuget packages are hosted on myget.org until they're ready to be fed over to nuget.org. The solution is to add a `nuget.config` file to your project, with this:


    <configuration>
      <packageSources>
        <add key="nuget.org" value="https://api.nuget.org/v3/index.json" protocolVersion="3" />
        <add key="dotnet-core" value="https://dotnet.myget.org/F/dotnet-core/api/v3/index.json" />
      </packageSources>
    </configuration>


One hour of my life wasted to save you 1 hour! The myget feed is currently on [dotnet.myget.org](https://dotnet.myget.org/feed/dotnet-core/package/nuget/System.Runtime.Serialization.Formatters/4.0.0-rc4-24217-03)
