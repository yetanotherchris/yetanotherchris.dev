---
Published: 2014-11-17
title: "Starting and stopping all IIS sites in Powershell"
author: Chris S
layout: post
permalink: /misc/starting-and-stopping-all-iis-sites-in-powershell/
tags:
  - misc
---
This is just a boring Powershell 4 snippet for starting and stopping IIS websites:

<pre>Import-Module WebAdministration
Get-ChildItem -Path IIS:\Sites | foreach { Stop-WebSite $_.Name; }
Get-ChildItem -Path IIS:\Sites | foreach { Start-WebSite $_.Name; }
</pre>