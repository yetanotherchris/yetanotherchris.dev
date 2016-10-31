---
title: Installing Windows 7 from a USB stick
date: 2011-04-04 00:00:00 Z
permalink: "/misc/installing-windows-7-from-a-usb-stick/"
tags:
- misc
Published: 2011-04-04 00:00:00 Z
author: Chris S
layout: post
dsq_thread_id:
- 
---

**Update:** There is now [this][1] Microsoft tool to do this for you.

This is borrowed from [Dennis Chung's page][2] about the same title. I've adapted it slightly.

<!--more-->

  1. Diskpart
  2. List volume
  3. Select Volume 5 (Replace 5 with number reflecting your USB Drive)
  4. clean
  5. create partition primary
  6. active
  7. format fs=fat32 quick
  8. assign

Mount the ISO using [Virtual Clone Drive][3]. Then copy all the files from the newly mounted disk to the USB stick.

I've tried this out with a Sandisk Cruzer and had no problems (except a minor issue with a raid driver crashing).

 [1]: http://www.microsoftstore.com/store/msusa/html/pbPage.Help_Win7_usbdvd_dwnTool
 [2]: http://edge.technet.com/Media/Installing-Win7-using-a-USB-Stick/
 [3]: http://www.slysoft.com/en/virtual-clonedrive.html