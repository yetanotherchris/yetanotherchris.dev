---
Published: 2009-10-12
title: "LDAP/Active directory tree in C#"
author: Chris S
layout: post
permalink: /csharp/ldapactive-directory-tree-in-csharp/
dsq_thread_id:
  - 1077665771
tags:
  - 'c#'
  - winforms
---
[Download][1]

This winforms application from 2004 shows the basics of querying an Active Directory and LDAP server, including OpenLDAP, Netscape/Sun ONE, IBM ldap servers. The application is designed to work generically with LDAP rather than use the .NET Active Directory specific classes (which make the job a whole lot easier).

<!--more-->

It includes browsing of the LDAP server and an Integar8 conversion routine for Active Directory (the COM datatype used for storing the last login date in Active Directory). An interop'd version of ActiveDs.dll is included

 [1]: /wp-content/uploads/2013/02/ldapexample.zip
