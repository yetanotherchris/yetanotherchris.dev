---
title: "SSL and Public private key (PEM/X509) cryptography by example in .NET Core"
author: Chris S
date: 2020-11-05 08:00:00 +0000
tags: ["net-core", "security", "public-private-key", "rsa", "ssl"]
permalink: "/net-core/ssl-public-private-key-in-netcore-by-example"
excerpt: "Examples in C# of how to load PEM,CER files in .NET Core to encrypt, decrypt, sign and verify your data"
---
[0]: https://gist.github.com/yetanotherchris/d8330dd6f541f85903a9bdd5dd13bb1f
[1]: /net-core/converting-pfx-to-pem-in-dotnet-core
[2]: https://www.youtube.com/watch?v=AQDCe585Lnc
[3]: https://damienbod.com/2020/08/19/symmetric-and-asymmetric-encryption-in-net-core/
[4]: https://slproweb.com/products/Win32OpenSSL.html
[5]: https://github.com/dotnet/runtime/issues/23749

## Introduction

This post illustrates examples of the two uses of public key cryptography in .NET Core:

- Encrypting and decrypting data.
- Signing and verifying data.
- Loading two `.pem` SSL certificates into Kestrel.

A full C# console app example [is available on this Gist][0]

### Notes
  
- *If you have a PFX file, I've written [a separate blog post][1] about converting your PFX file to the X509 (.`pem`, .`cert` etc.) format used in these examples.*
- *These examples are for RSA key pairs, you should be able to convert them to ECDSA easily though, with `ECDSA.Create()`.*
- *The examples all use a simple bit of text, but this could easily be a file by using `byte[] textBytes = File.ReadAllBytes(...)`*
- *`.crt`, `.pem`, `.key` files are all the same format, usually a text format*
- *The padding when encrypting and decrypting needs to be the same format*.
- *[This video explains asymmetrical encryption well][2]*
- *[This blog post has a few other C# examples][3]*
- *`openssl` is a command line tool. Windows users can find it [here][4], or alternatively just install the Linux subsystem and then get Ubuntu on the Windows Store, and `cd /mnt/c/Users/yourusername`.*

## Encrypting and decrypting data

### Overview

> I want to send you a file or some text but I only want you to be able to see it, so I therefore need it to be encrypted.   
> 
> First, you generate a public and private key pair, as two .PEM files. 
>
```bash
$ openssl req -x509 -sha256 -days 365 -newkey rsa:4096 -nodes -keyout private.pem -out public.pem
```
>
> You keep your private key very safe.
> 
> You send me your public key file: `public.pem` (sometimes the naming convention in examples is `certificate.pem`). 

### Encrypting

I encrypt my file (in the example below it's a text file) using your public key. I then send you the output of this, which is a base-64'd string.

```csharp
private static string Encrypt(string text)
{
    byte[] publicPemBytes = File.ReadAllBytes("public.pem");
    using var publicX509 = new X509Certificate2(publicPemBytes);
    var rsa = publicX509.GetRSAPublicKey();

    byte[] encrypted = rsa.Encrypt(System.Text.Encoding.Default.GetBytes(text), RSAEncryptionPadding.Pkcs1);
    return Convert.ToBase64String(encrypted);
}
```

### Decrypting

You can then decrypt the base64'd string I sent you using your private key, and you will see the file or message in its original, un-encrypted form:

```csharp
private static string Decrypt(string base64Text)
{
    using X509Certificate2 certificate = CombinePublicAndPrivateCerts();
    var rsa = certificate.GetRSAPrivateKey();

    byte[] textBytes = Convert.FromBase64String(base64Text);
    byte[] decrypted = rsa.Decrypt(textBytes, RSAEncryptionPadding.Pkcs1);
    return System.Text.Encoding.Default.GetString(decrypted);
}
```

## Signing and Verifying (digital signatures)

### Overview

There is another use of public key cryptography. Here's my attempt to explain it:

> I want to send your something, say a text file (or maybe a PDF), and you really want to be sure that I created this text file and therefore that it was me that sent it to you. 
>
> I generate a public-private key pair:  
> 
```bash
$ openssl req -x509 -sha256 -days 365 -newkey rsa:4096 -keyout private.pem -out public.pem
```
> I keep my private key very safe.
>
> I send you my public key: `public.pem` file (sometimes the naming convention in examples is `certificate.pem`). 


### Signing

I sign my text file (in this example it's a string as the `text` parameter). I then send you my text file *and* this base-64'd output.

As mentioned above, it's easy to read in a binary file too - just use `byte[] fileBytes = File.ReadAllBytes(..)` instead.

```csharp
private static string SignWithPrivateKey(string text)
{
    var privateKeyText = File.ReadAllText("private.pem");
    var privateKeyBlocks = privateKeyText.Split("-", StringSplitOptions.RemoveEmptyEntries);
    var privateKeyBytes = Convert.FromBase64String(privateKeyBlocks[1]);
    
    using RSA rsa = RSA.Create();
    rsa.ImportEncryptedPkcs8PrivateKey("your-secret-password", privateKeyBytes, out _);

    byte[] fileBytes = System.Text.Encoding.Default.GetBytes(text);
    byte[] signature = rsa.SignData(fileBytes, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
    return Convert.ToBase64String(signature);
}
```

### Verifying

You can make sure the text file I sent you is the same one that I created, using:

1. The text file I sent you (`plainText` in the example below, but could be a file using `byte[]`).
1. The public key I sent you - `public.pem` file.
1. The base64'd verification string I sent you.

```csharp
private static bool VerifySignature(string plainText, string base64Signature)
{
    byte[] publicPemBytes = File.ReadAllBytes("public.pem");
    using var publicX509 = new X509Certificate2(publicPemBytes);
    var rsa = publicX509.GetRSAPublicKey();

    byte[] dataBytes = System.Text.Encoding.Default.GetBytes(plainText);
    byte[] signatureBytes = Convert.FromBase64String(base64Signature);
    return rsa.VerifyData(dataBytes, signatureBytes, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
}
```

## Loading PEM file SSL certificates in Kestrel

Typically, when you want to use an SSL certificate you will receive a single PEM file - the public and private key inside it, maybe the chain of trust certs also inside that PEM file. You might also receive the SSL certificate as a public key and private PEM key too.

On Windows, the certificate loading inside Kestrel assumes you are always using a PFX-format certificate - PKCS12. PEM format files are typically provided to you as PKCS8, so you need to specify this to load PEM files as SSL certificates on Windows.

The workaround is below - [this has been an ongoing issue since .NET Core 1.0][5].

`gist:yetanotherchris/c4568aeb005e191a741294618f977f30`
