---
title: "Converting PFX to PEM files in .NET Core"
author: Chris S
date: 2020-11-14 08:00:00 +0000
tags: ["net-core", "security", "public-private-key"]
permalink: "/net-core/converting-pfx-to-pem-in-dotnet-core"
excerpt: "How to convert your the PFX files you generated on Windows into PEM files, and then use these in .NET core. This includes PFX files that are password protected."
---

[1]: /security/public-private-key-glossary-of-terms
[2]: /security/public-private-key-in-netcore-by-example
[3]: https://en.wikipedia.org/wiki/PKCS_12#Relationship_to_PFX_file_format
[4]: https://sectigostore.com/blog/ecdsa-vs-rsa-everything-you-need-to-know/

*Before reading this post, it's worth reading the post I did on [public private key glossary of terms][1] and [public private key by example in .NET Core][2] if you're unsure about the various formats this post describes.*

## Overview

If you want to convert a horrible [Windows-style .PFX certificate][3] (quite often found as certs in or around IIS), and then use it in .NET core, you'd be mistaken for thinking this would be straight forward. Sadly in .NET Core, there's still quite a lot of research involved in doing this, to avoid getting corrupted ANS data errors.

The crux of the problem is that in .NET Core 3.0, the `X509Certificate2` and `X509Certificate` classes can handle the public key side of things quite well, but don't handle private key-format loading. So if you try to use the `X509Certificate2` class to load the private key, you will get data errors.

Similarly, the `RSA` class you end up using to load the private key (or `ECDSA` class) hasn't got the ability to parse the header and footer of a PEM file. This is why there is a lot of trial and error involved in getting it to work which this blog post should save you from having to do.

*Good news in .NET Core 5.0: you can use the `X509Certificate2` to load a single PEM file that's been converted from a PFX file (which contains the public and private key in one single PEM file).*

## Step 1: openssl command line

The first step to getting your PFX file into [the better PEM format][3] is to convert it into two keys: a public and private key. The private key is the password, in PEM format so that needs to be kept safe.

```bash
# Create a public key, strip out the bag attributes
openssl pkcs12 -in pfx-certificate.pfx -nokeys -nodes | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' > public.pem

# Create the private key (PKCS8, the openssl default), strip out the bag attributes
openssl pkcs12 -in pfx-certificate.pfx -nocerts -nodes | sed -ne '/-BEGIN PRIVATE KEY-/,/-END PRIVATE KEY-/p' > private.pem

# Optional: you could also create the private key as PKCS1- old RSA format
openssl pkcs12 -in pfx-certificate.pfx -nodes -nocerts | openssl rsa -out private.key

# .NET Core 5.0 only: you can convert to a single PEM file
openssl pkcs12 -in pfx-certificate.pfx -nodes -out both.pem
```

You can create a test PFX certificate with the following commands:

```bash
# Create self signed certs and export as PFX to "pfx-certificate.pfx"
openssl req -x509 -sha256 -days 365 -newkey rsa:4096 -keyout pfx-private.key -out pfx-certificate.crt  

openssl pkcs12 -export -out pfx-certificate.pfx -inkey pfx-private.key -in pfx-certificate.crt
```

## Step 2: using the PEM files in .NET Core

Before continuing, you should find out which Algorithm your PFX file uses. Typically this will be RSA, but it could also be ECDSA. You can find out the algorithm by opening the PFX certificate in Windows cert manager and looking at its properties:

![pfx algos](/assets/2020/pfx-algo.png)

If the algorithm is RSA or ECSDA you can load the key in .NET Core. ECSDA is the successor to DSA and is newer than RSA, using elliptic curves - which I won't pretend I know they work - rather than RSA's factorials, which means it has the same security with shorter keys. There's more information on the difference between the two [here][4].

```csharp
// dotnet add package System.Security.Cryptography.Algorithms
// 
// With help from https://github.com/dotnet/runtime/issues/19581#issuecomment-581147166
private static X509Certificate2 CombinePublicAndPrivateCerts()
{
    byte[] publicPemBytes = File.ReadAllBytes("public.pem");

    // Always dispose of X509Certificate2 objects or they will fill your disk space up.
    // Only X509Certificate2 will work with the openssl exporting.
    using var publicX509 = new X509Certificate2(publicPemBytes);

    var privateKeyText = File.ReadAllText("private.pem");
    var privateKeyBlocks = privateKeyText.Split("-", StringSplitOptions.RemoveEmptyEntries);
    var privateKeyBytes = Convert.FromBase64String(privateKeyBlocks[1]);
    
    using RSA rsa = RSA.Create();
    if (privateKeyBlocks[0] == "BEGIN PRIVATE KEY")
    {
        rsa.ImportPkcs8PrivateKey(privateKeyBytes, out _);
    }
    else if (privateKeyBlocks[0] == "BEGIN RSA PRIVATE KEY")
    {
        rsa.ImportRSAPrivateKey(privateKeyBytes, out _);
    }

    var keyPair = publicX509.CopyWithPrivateKey(rsa);
    return publicX509;

    // You can also convert TO pfx, not that you will want to:
    // return new X509Certificate2(keyPair.Export(X509ContentType.Pfx));
}
```

You can then test it out with a simple encryption of plain text:

```csharp
static void Main(string[] args)
{
    string text = "hello world";
    var pem = X509Certificate2.CreateFromPemFile("both.pem");
    
    // For .NET Core 3.0:
    // var pem = CombinePublicAndPrivateCerts();

    var rsa = pem.GetRSAPublicKey();

    byte[] encrypted = rsa.Encrypt(System.Text.Encoding.Default.GetBytes(text), RSAEncryptionPadding.Pkcs1);
    string output = Convert.ToBase64String(encrypted);
    
    System.Console.WriteLine(output);
}
```