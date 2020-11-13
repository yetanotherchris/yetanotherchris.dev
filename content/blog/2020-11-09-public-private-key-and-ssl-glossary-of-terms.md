---
title: "Public key crytography glossary of terms for .NET Core developers"
author: Chris S
date: 2020-11-09 08:00:00 +0000
tags: ["ssl", "security", "public-private-key"]
permalink: "/security/public-private-key-glossary-of-terms"
excerpt: "A small glossary of terms for public key crytography including PFX, PCKS, cert and pem files."
---

[1]: /security/public-private-key-in-netcore-by-example/
[2]: https://tools.ietf.org/html/rfc2313
[3]: https://en.wikipedia.org/wiki/PKCS
[4]: /coming-shortly
[5]: https://en.wikipedia.org/wiki/PKCS_12#Relationship_to_PFX_file_format
[6]: https://serverfault.com/questions/9708/what-is-a-pem-file-and-how-does-it-differ-from-other-openssl-generated-key-file

*Big disclaimer: I'm by no means an expert in Cryptography. All these definitions are my own, rewritten from Wikipedia, Stackoverflow and other sources across the internet, geared towards .NET Core usage. If you spot any glaring errors please contact me via Github.*

## Public key cryptography

It might be a little ambitious to summarise this in one paragraph, but it's essentially about generating two keys: a public and private key. You keep your private key safe. You distribute your public key, and another person (or you) can encrypt a file or message with it, and then send you the encrypted text or file. You then decrypt this with your private key. 

[There is also data signing and verification][1]

## PKCS
Public Key Cryptography Standards. These are crytopgraphy standards, with the first versions being [in the 90s from RSA][2], but strangely not starting with PKCS#1. If you look on wikipedia, quite a few of them have been abandonded and the ordering is a bit unusual. The important ones for .NET Core are PKCS#1 (private RSA key), PKCS#8 (the default private key format openssl outputs as), and PCKS#12 (the PFX file format standard)

[Wikipedia's PKCS article][3]

## .PFX file/PFX file format
A binary file format, `.pfx` being the file extension. This was originally Microsoft's own certificate format, that then became a standard via PKCS#12. 

If you're a .NET developer you will find, at some time your life, exporting or importing one of these on Windows - they're very Windows centric - possibly alongside IIS.

[How to convert PFX to PEM files and use the PEM files in .NET Core][4]
[Wikipedia link][5]

## .cert, cer, .crt, .pem, .key files
These are all the same file format, plain text files that contain a public or private key certificate in X509 format, or both. They typically have a header, a footer to match:

```
-----BEGIN CERTIFICATE-----
(base64'd cert here)
```

For private keys:

```
-----BEGIN PRIVATE KEY-----
(base64'd cert here)
```

or 

```
-----BEGIN RSA PRIVATE KEY-----
(base64'd cert here)
```

`.key` files will typically only contain the private key.

You might find yourself combining many of these when dealing with SSL authority chains, or just combining a public and private key. .NET Core 3.0 doesn't support loading them in this format, but will in .NET Core 5.

[There are quite a few other file types I've left out...][6]
