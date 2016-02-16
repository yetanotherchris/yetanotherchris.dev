---
title: Powershell - the good parts
layout: post
shortpost: true
tags:
  - powershell
---

I've been using Powershell on a daily basis for about 2 years now, mostly with Chocolatey and provisioning servers (the devops movement). Whilst it's a huge improvement over batch files (anything is)  and VBS, it is has foibles. 

Infact it has so many foibles I would put it firmly in the languages-with-very-strange-design-decisions category reserved for [Javascript](https://www.google.co.uk/search?q=javascript+the+good+parts) and [Perl](http://stackoverflow.com/questions/1995113/strangest-language-feature/1996314#1996314):

- The "number 1" stinker: the `.ps1` and `.psm1` file extensions. Did they think Powershell was only going to have one version?
- The same applies for the profile folder, it lived until recently inside Powershell1. Oh and there's also [6 different profile locations](https://blogs.technet.microsoft.com/heyscriptingguy/2012/05/21/understanding-the-six-powershell-profiles/).
- `$true` and `$false` as constants
- `$HOME` vs `~` vs `$env:HOME` ([explaination here](http://www.beefycode.com/post/The-Difference-Between-~-and-%24home.aspx))
- Error handling. Do we `try {} catch`, `-ErrorAction`, `$ErrorActionPreference`, `2>&1`, `$LastExistCode`? I know there is a distinct difference between the four but it doesn't make it any less nutty.
- Help docs. If I want help on a cmdlet I have to use `get-help invoke-webrequest` or the shortcut `man wget`, not just `-help`
- ...which leads onto unix shortcuts. They're not unix shortcuts as they're different commands with completely different syntaxes. For example wget, curl, ls.
- Functions. You declare them with brackets, you call them without.

These are more minor quibbles:

- Inconsistently with semi colons at the end of the lines.
- Casting is a complete beast.
- String lookups/replacements are also not nice if you're not familiar with the .NET framework.
- No easy way to log output, even with the transcript commands.
- A separate metadata file for modules - why not just use YAML (frontmatter) at the top or bottom of the file?
- `-eq -neq -gt`. But there is actually a design decision behind this that makes sense, based on dash command line argument seperator and  having to maintain the > as a pipe.

That sounds like a damning critique but really the only two features that get annoying on a daily basis are the error handling and the help. The shortcomings are in some ways countered by the good parts:

- Really easy to pickup if you're from a .NET background.
- A familar Perl/PHP-like syntax for the variables and comments.
- You can use the .NET framework fairly easily: `C:\>[System.DateTime]::Now` (there's a shortcut: `get-date`)
- You can alias commands easily
- Modules are easy to write.
- The CLI intellisense in Windows 10 is nice.
- The language is updated regularly, it's not left to fester like batch.
- Chocolately and Boxstarter simplify a large portion of what you do.

If you need to write infrastructure as code for Windows you're a bit stuck as the alternatives to Powershell aren't any better, they either lack the libraries Powershell has, or need to be compiled and aren't familiar to cross-platform sys-ops. So for now I'm happy with Powershell but do enjoy a good British moan at it every so often.
