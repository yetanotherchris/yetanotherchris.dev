---
title: UdpTraceListener - a UDP TraceListener compatible with log4net/log4j
date: 2013-03-13 00:00:00 Z
permalink: "/log4net/udptracelistener-a-udp-tracelistener-compatible-with-log4netlog4j/"
tags:
- log4net
- roadkill-wiki
- tracelistener
Published: 2013-03-13 00:00:00 Z
author: Chris S
layout: post
---

This class is a TraceListener implementation that uses the log4j XML format and sends the XML to a UDP socket. This means you can configure a trace listener to send all your logs to something like [http://log2console.codeplex.com.][1]. There is also [Harvester][2] which has a TraceListener implementation for streaming over a network.

[<img src="http://www.anotherchris.net/wp-content/uploads/2013/03/udptracelistener-300x200.png" alt="udptracelistener" width="300" height="200" class="alignnone size-medium wp-image-1066" />][3]

<!--more-->

Just configure a new UDP receiver in log4console and they messages will start to stream through. This works nicely with LightSpeed, where you can configure it to send its SQL statements to a TraceListener.

Feel free to include the source wherever you need it, it's under an MIT licence.

<script src="https://gist.github.com/yetanotherchris/5155969.js"></script>  
<script src="https://gist.github.com/yetanotherchris/5155964.js"></script>

 [1]: http://log2console.codeplex.com "http://log2console.codeplex.com."
 [2]: http://cbaxter.github.com/Harvester/ "Harvester"
 [3]: http://www.anotherchris.net/wp-content/uploads/2013/03/udptracelistener.png