---
title: "How to fix yarn global add command not found on Windows"
author: Chris S
date: 2020-11-04 08:00:00 +0000
tags: ["nodejs", "yarn", "npm"]
permalink: "/nodejs/fix-yarn-global-add-command-not-found-on-Windows"
excerpt: "Fixing the yarn global add command not working on Windows properly, where a command not found error occurs after trying to run the command you've added globally."
---
[1]: https://gist.github.com/yetanotherchris/1e339bd72d4698f70e2c3a02b04fc1c8

If you try to run `yarn global add gatsby` **on Windows** and then try to run `gatsby` you might get an error message "command not found". This is because the yarn bin folder isn't in your user's `$PATH` environmental variable. 

There's an easy fix for it in Powershell, I've also put it in [this gist][1].

```bash
$yarnPath = & yarn global bin
$path = [System.Environment]::GetEnvironmentVariable("PATH", [System.EnvironmentVariableTarget]::User)
[System.Environment]::SetEnvironmentVariable("PATH", "$path;$yarnPath", [System.EnvironmentVariableTarget]::User)

# Your yarn path should appear at the end of the path now
[System.Environment]::GetEnvironmentVariable("PATH", [System.EnvironmentVariableTarget]::User)

# Try a global command, for example gatsby. If you're using Visual Studio Code, you'll need to restart the IDE
gatsby
```