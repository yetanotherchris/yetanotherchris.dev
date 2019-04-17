---
title: Using Google maps with C#
date: 2010-03-16 00:00:00 Z
permalink: "/csharp/using-google-maps-with-csharp/"
tags:
- csharp
Published: 2010-03-16 00:00:00 Z
author: Chris S
description: How to parse a website and then plot a set of addresses onto an embedded
  google map using C#.
layout: post
dsq_thread_id:
- 1083142154
---

[Download example solution][1]

This example/download was made to retrieve all UK postcodes from a webpage you give, and then plot them onto google maps. It was made to make up for the shortcomings of some sites that don't plot onto maps, or those that do but only individually. 

<!--more-->

The version on this page uses the Recaptcha library to attempt to stop any abuse of the service. It does both UK and US codes, plus if you have a regex for your own country it can use that. The US zip code regex hasn't been rigidly tested so any improvements will be welcomed.

The code contains a small wrapper class to represent a single postcode and its longitude and latitude, and another class for downloading the webpage and grabbing all codes. I chose not to extend it beyond that although you could probably go a lot further with the KML parser. The longitude and latitude are stored as simple strings along with the response code.

Full information on the google maps API is found [here][2]. I had a problem that seems quite common with the KML node having a namespace, which I got around with the namespace manager and prefixing in the xpath (thanks to Men Mcevoy's example). None of the nodes underneath the root use the namespace prefix which throws the parser into a fit.

Remember to change the google maps key to your own inside GoogleMapsGeoLookup.cs. The key is available for free at the google maps api site.

The snippet below shows the KML/Geocode lookup and XML parsing.

## Example

**Update:** Unfortunately the example is no longer available.

 [1]: /assets/2013/02/gmapspostcodeexample.zip
 [2]: http://www.google.com/apis/maps/documentation/reference.html
