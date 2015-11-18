---
title: Creating a Chocolately package for Chromedriver 
Published: 2015-11-11
layout: post
excerpt: "My first Chocolatey package: creating the chromedriver-latest Chocolatey package that grabs the latest Chomedriver and installs it."
tags:
  - Chocolatey
  - Chromedriver
  - selenium
---
Chocolatey, our new Windows apt-get has now finally reached a stage where it is widely accepted (they get about 25m downloads a month) and thanks to its Kickstarter campaign, stable and close to a version 1 release.

It works using nuget in the background, but instead of using `install-package xyz` you would use `choco install firefox`.

The biggest problem Chocolatey faces right now is package rot - packages that are out of date in its repository. For example MongoDB is still at version 2 and doesn't install correctly as a service. The same applies for Redis, and also Chromedriver. For Chromedriver this is frustrating, as Chromedriver updates almost monthly to try to catch up with Chrome's versions, and typically the old versions of Chromedriver will stop working once Chrome updates itself.

The Chocolatey contributors are aware of this, and are working on a package verifier, however in the meantime I need a way to install Chromedriver in one line rather than 30 lines of hard to maintain Powershell.

### chromedriver-latest
My solution was to embark on writing my first Chocolatey package, "chromedriver-latest" - just to add confusion to the Chocolatey repository there are now 3 separate packages. The one I have created will always get the latest Chromedriver however, and unlike other software installers such as MongoDB, Chromedriver is useless unless you have the latest version. Infact it should really be auto-updating but the chances of that happening are fairly slim.

### Creating a Chocolatey package
The docs for creating a new package are good, everything is clear and you get a nice bootstrap template by running `choco new MyPackageName`.

This generates the .nuspec file for you, and two powershell files. Knowledge of Powershell helps a lot, but the 2 scripts having a long set of examples to get you going.

Once you have written your installer and updated the .nuspec file, you can run install on it which will create the package, for example `choco install .\myfolder`. You can then try to install this package, or just push it to Chocolatey.org using `choco push`.

The package hasn't yet been improved so it's not listed publicly, however it is available using `choco install chromedriver-latest -version 1.0.1`.

The source can be found on [Github](https://github.com/yetanotherchris/Choco-chromedriver-latest)
