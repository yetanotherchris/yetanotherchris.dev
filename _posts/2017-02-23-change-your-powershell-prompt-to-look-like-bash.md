---
Published: 2017-02-23
title: Change your Powershell prompt to look like bash
author: Chris S
layout: post
shortpost: true
tags:
  - powershell
  - bash
---
The script below changes your [Powershell prompt](https://msdn.microsoft.com/en-us/powershell/reference/3.0/microsoft.powershell.core/about/about_prompts) to look a bit more like a Bash one. Update your `~Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1` file to add the code below. If you aren't using [poshgit](https://github.com/dahlbyk/posh-git/wiki/Customizing-Your-PowerShell-Prompt) then remove the `Import-Module` and `Write-VcsStatus` lines.

    Import-Module 'C:\tools\poshgit\dahlbyk-posh-git-7d93c81\src\posh-git.psd1'
    function prompt {
        # Shorten the path
        $path = $ExecutionContext.SessionState.Path.CurrentLocation.Path
        $path = $path.Replace($HOME, "~") 

        Write-Host "$path" -ForegroundColor Green -NoNewline
        Write-VcsStatus
        Write-Host ""
        
        "$('$' * ($nestedPromptLevel + 1)) "
    }
    

Your Powershell command prompt will now look something like this:    

    ~\Documents\Code\Github\yetanotherchris.github.io\_posts [master ≡]
    $ echo "hello world"
