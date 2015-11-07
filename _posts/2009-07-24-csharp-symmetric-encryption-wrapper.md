---
Published: 2009-07-24
title: "C# Symmetric encryption wrapper"
author: Chris S
excerpt: "The original class for this post can be found at codeproject.com. This class is a tidied up version (and disposes more aggressively)."
layout: post
permalink: /csharp/csharp-symmetric-encryption-wrapper/
dsq_thread_id:
  - 1077462888
tags:
  - 'c#'
  - encryption
---
The original class for this post can be found at [codeproject.com][1]. This class is a tidied up version (and disposes more aggressively). You may get issues with the GetLegalIV portion of the code, particularly with triple DES. This is because it pads the IV with spaces, and is not compatible with other implementations of the algorithm, such as the Perl one. The class uses UTF8.

<!--more-->

  
<script src="https://gist.github.com/yetanotherchris/4756647.js"></script>

 [1]: http://www.codeproject.com/dotnet/encryption_decryption.asp