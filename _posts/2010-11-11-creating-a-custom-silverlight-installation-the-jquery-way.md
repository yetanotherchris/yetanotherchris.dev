---
Published: 2010-11-11
title: "Creating a custom silverlight installation the jQuery way"
author: Chris S
excerpt: "The default Silverlight installation and upgrade experience is fairly jarring compared to its counter-part Flash. If you target version 4.0 of Silverlight and the user has 3.0 installed, they will receive an ugly and annoying modal dialog forcing them to upgrade..."
layout: post
permalink: /silverlight/creating-a-custom-silverlight-installation-the-jquery-way/
dsq_thread_id:
  - 1085006559
tags:
  - silverlight
---
The default Silverlight installation and upgrade experience is fairly jarring compared to its counter-part Flash. If you target version 4.0 of Silverlight and the user has 3.0 installed, they will receive an ugly and annoying modal dialog forcing them to upgrade.

If they don't have Silverlight installed, they simply get a big button that leads them into Microsoft's corporatey and fairly none-consumer friendly Silverlight page.

<!--more-->

As well as the unfriendly installation, the upgrade path is fairly unintuitive too, atleast in regards to the HTML tags. The <param name=&#8221;autoupgrade&#8221; /> parameter is there to allow you to handle upgrading yourself, however what the [Silverlight FAQ][1] fails to tell you is if you set this parameter to false, you must handle the upgrade and installation using the Silverlight Javascript API.

[There is a whitepaper][2] and Microsoft do recommend creating your own installation process. It makes your app look more professional doing this way - the example below has taken this example, fixed the typo in the code, given it a sprinkle of jQuery and updated it for Version 4.

You may get upgrade problems (which I got going from Silverlight 3) where onUpgradeRequired is not being called, and instead onSilverlightError gets called with:

> Error: Unhandled Error in Silverlight   
> Application Code: 8001   
> Category: InitializeError   
> Message: 8001   
> An error has occurred. 

The solution I found to this was to stick the following at the top of the onSilverlightError function:

<pre>if (args.ErrorCode.toString().indexOf("8001") &gt; -1)
{
	showState("#upgrade-start");
	return;
}
</pre>

This may also occur with a 8002 error if the user hasn't restarted the browser after an upgrade.

If you want to test with old versions of Silverlight, it's best to use a Windows XP VM image, and download versions 1-4 from [oldapps.com][3].

The entire solution including the XAP and JS files [can be downloaded here][4].

<script src="https://gist.github.com/yetanotherchris/4960078.js"></script>

 [1]: http://www.silverlight.net/learn/quickstarts/silverlight-install-and-upgrade-experience/#resolvingproblems
 [2]: http://www.microsoft.com/downloads/en/details.aspx?displaylang=en&FamilyID=961e96e8-9a7f-4b70-947a-97f0973cb38c
 [3]: http://www.oldapps.com/silverlight.php
 [4]: /wp-content/uploads/2013/02/SilverlightInstallationExperience.zip