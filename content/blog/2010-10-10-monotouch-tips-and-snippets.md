---
title: Monotouch tips and snippets
date: 2010-10-10 00:00:00 Z
permalink: "/monotouch/monotouch-tips-and-snippets/"
tags:
- monotouch
Published: 2010-10-10 00:00:00 Z
author: Chris S
description: This page is full of discoveries and snippets I'm accruing as I slowly learn
  my way around Monotouch. Originally my plan was to write objective-C, but just as
  I had finished my first Objective-C book I heard Monotouch presentation at a Devdays
  conference...
layout: post
dsq_thread_id:
- 
---

[Sample code on Bitbucket][1]

This page is full of discoveries and snippets I'm accruing as I slowly learn my way around Monotouch. [Originally my plan was to write objective-C][2], but just as I had finished my first Objective-C book I heard Monotouch presentation at a Devdays conference.

**Please note, many of the performance or speed related tips on this page are based around Monotouch 2.x and may no longer be relevant.**

<a name="monotouchxmldocs"></a>

<!--more-->

### Monotouch XML documentation for Visual Studio

If you want to use Monotouch in Visual Studio, and want intellisense then stick [this XML file][3] in the same folder that your monotouch DLLs are.

It was generated and converted to XML format (Mono uses a different format for storing XML documentation in) using Monotouch 2, however most core classes are covered.

<a name="dimensions"></a>

### Available space/dimensions for the view

The graphics below are based on a solution file that writes the View.Bounds property to the screen.  
The bottom bar with &#8220;title&#8221; is a UIToolBar, the plain black is a UITabBar. 

![Bounds][4]![Bounds 2][5]![Bounds 3][6]  
![Bounds 4][7]![Bounds 5][8]![Bounds 6][9]![Bounds 7][10]

<a name="ekevent"></a>

### Adding and querying calendar events with the event kit (EK*_*)

The example below is a small snippet based on the source of Flashback. It shows querying and adding calendar events

<pre>public void CalendarEvents()
{
	EKEventStore store = new EKEventStore();
	EKCalendar calendar = store.DefaultCalendarForNewEvents;
	// Query the event
	if (calendar != null)
	{
		// Searches for every event in the next year
		NSPredicate predicate = store.PredicateForEvents(NSDate.Now,DateTime.Now.AddDays(360),new EKCalendar[] {calendar});
		store.EnumerateEvents(predicate, delegate(EKEvent currentEvent, ref bool stop)
		{
			// Perform your check for an event type
		});
		
		// Add a new event
		EKEvent newEvent = EKEvent.FromStore(store);
		newEvent.Title = "Lunch at McDonalds";
		newEvent.Calendar = calendar;
		newEvent.StartDate = DateTime.Now.Today;
		newEvent.EndDate = DateTime.Now.Today.AddDays(1);
		newEvent.Availability = EKEventAvailability.Free;
		store.SaveEvent(newEvent, EKSpan.ThisEvent, new IntPtr());
	}
}
</pre>

### Mocking the UI in Visual Studio

It's possibly to imitate the iPhone UI in Visual Studio using a cut up screenshot from the iPhone Simulator and some panels. Below shows how this can be down - it's a mostly pointless exercise but can help to quickly layout views and get the coordinates if you working without XIBs. The project source for this [can be found here][11].

![iPhone winforms][12]

### Setting the application icon

Monodevelop for Monotouch makes this as easy as it is in Visual Studio, instead of the more convoluted way in XCode. Simply open the project properties:

![Application icon][13]

The icons are automatically round-cornered by Cocoa, and should be a 57&#215;57 png file.

### Using selectors/the selector object and fading a view out

The snippet below is an example of registering your own custom selector, and also shows a method of fading out the current view into a new one, which could be used on a splashscreen. I got the selector code with the help of [this question][14] from stackoverflow.com

<pre>public override void ViewDidAppear(bool animated)
{
	base.ViewDidAppear (animated);
	// _imageView,_label,_activityView are all created in ViewDidLoad
	// Fade out view - you may need to put this inside its own thread
	UIView.BeginAnimations(null);
	UIView.SetAnimationDuration(0.5);
	UIView.SetAnimationTransition(UIViewAnimationTransition.None,_imageView,true);
	UIView.SetAnimationDelegate(this);
	UIView.SetAnimationDidStopSelector(new Selector("fadeOutDidFinish"));
	_imageView.Alpha = 0;
	_label.Alpha = 0;
	_activityView.Alpha = 0;
	UIView.CommitAnimations();
}

[Export("fadeOutDidFinish")]
public void FadeOutDidFinish()
{
	MyController newController = new MyController();
	View = newController.View;
}
</pre>

### Animating a View transition using UIView.BeginAnimations and CATransition

There's two ways of performing a view transition animation: using the inbuilt UIView static methods, which limit you to a set of 4 animation styles (see the Apple docs). Below demonstrates using this with a UINavigationController, swap in the View you're display if your not using a UINavigationController:

<pre>// Make sure you push before the animations, or the Title doesn't animate
var controller = new MyController();
NavigationController.PushViewController(controller, false);
UIView.BeginAnimations(null,IntPtr.Zero);
UIView.SetAnimationDuration(1); UIView.SetAnimationTransition(UIViewAnimationTransition.FlipFromLeft,NavigationController.View,true);
UIView.CommitAnimations();
</pre>

The alternative is using CATransition, which gives you more flexibility. You are still limited to 4 types of animation, however there are infact more - but these are undocumented and probably won't make it onto the appstore if you use them (the @ indicates it's undocumented):

  * kCATransitionFade
  * kCATransitionPush
  * kCATransitionMoveIn
  * kCATransitionReveal
  * @&#8221;suckEffect&#8221;
  * @&#8221;spewEffect&#8221;
  * @&#8221;genieEffect&#8221;
  * @&#8221;unGenieEffect&#8221;
  * @&#8221;rippleEffect&#8221;
  * @&#8221;twist&#8221;
  * @&#8221;tubey&#8221;
  * @&#8221;swirl&#8221;
  * @&#8221;charminUltra&#8221;
  * @&#8221;zoomyIn&#8221;
  * @&#8221;zoomyOut&#8221; 

And the code is fairly similar. I haven't figured out how to set the timing effect yet.

<pre>CATransition transition = new CATransition();
transition.Duration = 1;
transition.Type = "zoomyOut";
NavigationController.View.Layer.AddAnimation(transition,"mykey");
var controller = new MyController();
NavigationController.PushViewController(controller, false);
</pre>

### Gradient background on a UIButton / emulating UIGlassButton

UIGlassButton is an undocumented subclass of UIButton which is used throughout the iPhone, for example the &#8220;cancel&#8221; button when you power off the iPhone. It is possible to create an instance of this using Monotouch using new Class(&#8220;UIClass&#8221;) and copying some objective-C examples around, however if you app does this it will be rejected in the appstore.

The solution is to use a graphic background, and make it stretchable. Below is how to achieve this, and one graphic solution as a transparent PNG. It doesn't have the same bevelling as the Apple buttons but does work on any background. 

![UIGlassButton template][15] 

<pre>UIImage image = UIImage.FromFile("glassbutton.png");
image = loginImage.StretchableImage(9,0);

UIButton button = new UIButton(new RectangleF(0, 0, 250, 37));
button.SetBackgroundImage(image,UIControlState.Normal);
button.BackgroundColor = UIColor.Clear;
button.Font = UIFont.BoldSystemFontOfSize(20);
button.SetTitle("Cancel",UIControlState.Normal);
</pre>

An example:

![UIGlassButton example][16]

**Update**: <a href="http://www.twitter.com/martinbowling" target="_blank">Martin Bowling</a> has a much neater solution with [this][17] glass button image generator (required Monotouch trial or full), which dumps the button as a transparent PNG with its title straight to a file: 

### UIAlertView example

The UIAlertView is the alert() or MessageBox.Show of the Cocoa world. It's nice and flexible like the new modals you were given in Vista, and straight forward to use:

<pre>using MonoTouch.UIKit;
void ShowAlert()
{
	UIAlertView alert = new UIAlertView();
	alert.Title = "Are you sure?";
	alert.AddButton("Ok");
	alert.AddButton("Maybe");
	alert.AddButton("No");
	alert.Message = "This could explode the moon";
	alert.Delegate = new MyAlertViewDelegate();
	alert.Show();
}

public class MyAlertViewDelegate : UIAlertViewDelegate
{
	public override void Clicked (UIAlertView alertview, int buttonIndex)
	{
		// Don't call base or you'll get:
		// Unhandled Exception: MonoTouch.Foundation.You_Should_Not_Call_base_In_This_Method
	}
	public override void Canceled (UIAlertView alertView)
	{
		// Don't call base or you'll get:
		// Unhandled Exception: MonoTouch.Foundation.You_Should_Not_Call_base_In_This_Method
	}
}
</pre>

### Getting the bundle path

When Monotouch deploys your application for debugging, it will create a directory in

..Application Support/iPhone Simulator/User/Applications/{Guid}/

This is your application's base directory. Everything is stored in a bundle, a type of zip file with all the resources and the app in. [This monotouch page][18] has all the information you need on the various directories in your application's root directory. To access this you can to it with:

Environment.CurrentDirectory

and also available in:

NSBundle.MainBundle.ResourcePath

But CurrentDirectory is the better option. So for a build action &#8216;content', you set your Sqlite connection string to:

<pre>var connection = string.Format("Data Source={0}/my.db;Version=3;",Environment.CurrentDirectory);
</pre>

**Only resources in your main application will be copied to the bundle. Referenced projects with content build actions are ignored.**

### Enabling the return key to hide the a keyboard with ResignFirstResponder

Here's an example of adding support for a standard keyboard on a textfield, and making sure the return key hides the keyboard.

<pre>private UITextField _textField;
public override void ViewDidLoad()
{
	_textField = new UITextField();
	_textField.Text = "King Alfonso III";
	_textField.Bounds = bounds;
	_textField.Placeholder = "Username";
	_textField.ShouldReturn = delegate
	{
		_textField.ResignFirstResponder();
		return true;
	};
	
	View.AddSubview(_textField);
}
</pre>

If you are submitted a form with a button, make sure you resign all the textfields responders in the button click, to avoid getting responder errors.

<pre>public void ButtonClick(object sender, EventArgs e)
{
	_textField.ResignFirstResponder();
	// All other textboxes
	// Other button logic
}
</pre>

### A Modal dialog helper

The class below displays a basic modal dialog with an &#8220;OK&#8221; button - where no response is necessary, for example if there is no internet connection you would want to warn about this. It also demonstrates a simple Yes/No.

<pre>public class ModalDialog
{
	public static void Alert(string title,string message)
	{
		UIAlertView alert = new UIAlertView();
		alert.Title = title;
		alert.AddButton("Ok");
		alert.Message = message;
		alert.Show();
	}
	
	public static void AskYesNo(string title,string message)
	{
		UIAlertView alert = new UIAlertView();
		alert.Title = title;
		alert.AddButton("Yes");
		alert.AddButton("No");
		alert.Message = message;
		alert.Delegate = new MyAlertViewDelegate();
		alert.Show();
	}
	
	public class MyAlertViewDelegate : UIAlertViewDelegate
	{
		public override void Clicked (UIAlertView alertview, int buttonIndex)
		{
		// Don't call base or you'll get:
		// Unhandled Exception: MonoTouch.Foundation.You_Should_Not_Call_base_In_This_Method
		}

		public override void Canceled (UIAlertView alertView)
		{
		// Don't call base or you'll get:
		// Unhandled Exception: MonoTouch.Foundation.You_Should_Not_Call_base_In_This_Method
		}
	}
}
</pre>

### Using a monotouch project in Visual Studio 2008/2010

**Update**   
There's now this [Github][19] project to automate going between Visual Studio and Monodevelop.

The steps below assume you have a shared drive that you keep your Monotouch/Monodevelop project files on. It can become tedious performing these steps each time you switch between Mac and PC. So a program to sync the two would be useful. ManniAT [has written one][20] that does a one-way convert. I've written a very simplistic one also. The download is a Visual Studio Project file:

![Monodevelop to visual studio][21]

[Download][22]

**1.**   
First of all, copy all your monotouch assemblies from your Mac to a path on your windows machine (or a shared drive). My preferred easy to remember location is C:windowsmonotouch.

**2.**   
Backup your monotouch csproj file 

**3.**   
Edit it in notepad++ or similar. Change this line:

> <ProjectGuid>{95D28B03-E797-42C2-B5C6-B19D8C3D6670}</ProjectGuid> 

to

> <ProjectGuid>{25B16A36-324E-4DB2-BCE9-85DF33504CD3}</ProjectGuid> 

*(This new GUID is a standard console application.)*

**4.**   
Remove the <ProjectTypeGuids> line

**5.**   
Change all <Page Include=&#8221;(Name).xib&#8221; /> to <None Include=&#8221;(Name).xib&#8221; />. This allows you to compile the project, otherwise VS thinks the XIB is a XAML style file.

**6.**   
Add a project references folder to point to your monotouch folder in the project properties pane. You can't add the dlls to the GAC as they're not strongly signed. Visual Studio stores this folder in a &#8220;.csproj.user&#8221; file. Unfortunately you have to do this for every project you have.

**7.**   
**For Visual Studio 2010:**   
Change the <Project ToolsVersion=&#8221;3.5&#8243;..> at the top of the .csproj file to <Project ToolsVersion=&#8221;4.0&#8243;>.

The project file infact still works with Visual Studio 2008 with ToolsVersion=&#8221;4.0&#8243; as long as there is no solution file. Visual Studio looks for a solution file in the parent directory to figure out what version the project is.

One thing you can do with Visual Studio 2010 is upgrade the projects to client profile 4.0, and remove System.dll from your Windows monotouch folder - it will default to the one in the GAC for the profile. Just be weary not to use .NET 4.0 features such as named parameters, dynamic and code contracts. Also the line

> <TargetFrameworkVersion>v4.0</TargetFrameworkVersion> 

needs to be changed back to

> <TargetFrameworkVersion>v3.5</TargetFrameworkVersion> 

to work correctly in MonoDevelop.

### Monotouch documentation inside Visual Studio

Once you've got your Monotouch projects working in Visual Studio you will want to benefit from inline documentation (tooltips) for your intellisense. Mono has its own XML format for its assemblies, so you can't simply copy across the XML files to get documentation working in Visual Studio. I would distribute the Visual Studio XML file, however this is copyrighted by Apple. The Mono XML files are generated when Monotouch is installed to get around this. To convert to the Visual Studio format just follow the steps below:

  * Copy the XML folder from your Mac to your windows hard drive: &#8220;C:monodocs&#8221; 
  * Edit the index.xml file in &#8220;c:monodocsenindex.xml&#8221;
  * Remove the <Type Name="CFRange"> line (there's no docs for it so it errors), and also AlphaAttribute
  * Save the file
  * Install Mono for windows (or you can perform the steps below on your mac in your /Developer/Monotouch folder)
  * Open a command line to &#8220;C:Program FilesMono-2.6.1bin&#8221;
  * Type mdoc export-msxdoc &#8220;C:/monodocs/en&#8221; into the console (see [here][23] for more details.)  
    -\` C:Program FilesMono-2.6.1bin will now have three new xml files:
    
      * monotouch.xml
      * NamespaceSummaries.xml
      * OpenTK.xml

  * Copy monotouch.xml and the others to your lib folder, or wherever you reference monotouch.dll from.

Visual Studio should now have inline comments as tooltips.

### Monotouch SqliteParameter and guids

If you read the [SqliteParameter documentation][24] you will notice lots of red documentation missing links. If you've used Open Source products much this is fairly standard (even though for Monotouch you are paying hundreds of dollars for the product). My own viewpoint on it is why bother making something open source if you can't be bothered to write the docs, all but a dozen developers usually care about your finally crafted [3GL][25] code unless you write in detail what you've done. 

That's a separate rant however, and actually the Monotouch code is well documented, it's mainly the root Mono code that isn't.

For Mono.Data.SqliteParameter you are required to enter a DbType for your paramater. SqliteParameter is the best way of performing inserts, updates or queries that require unparsed field types - mostly strings.

After examining the source to Mono.Data.Sqlite I discovered that VARCHAR, TEXT maps to the String DbType. And for Guid I was getting some strange data being entered for my INSERTS using DbType.Guid. I managed to get around this problem by using a String instead and using Guid.ToString().

One other gotcha will be if you try to return an int from a count() statement. This actually returns a long, so assuming it's an int will cause a casting exception.

### Saving user settings in Monotouch using NSUserDefaults

There's a few ways you can save your user settings on the iPhone, but the fastest way is using the NSUserDefaults object.

This writes to a file in your app bundle called info.plist which is a file Monotouch automatically generates for you. NSUserDefaults has a lot of useful helper methods already built in, as well as synchronisation between what it has and what you have, and a facility for defaults.

It's based on using a Dictionary with a key and value, but isn't restricted to one type - there's SetInt, SetString. Below is a small example of writing a Settings class.

<pre>public class Settings
{
	public static string Name { get;set; }
	public static int MagicNumber { get;set; }

	public static void Read()
	{
		Name = NSUserDefaults.StandardUserDefaults.StringForKey("name");
		MagicNumber = NSUserDefaults.StandardUserDefaults.IntForKey("magicnumber");
	}

	public static void Write()
	{
		NSUserDefaults.StandardUserDefaults.SetString(Name,"name");
		NSUserDefaults.StandardUserDefaults.SetInt(MagicNumber,"magicnumber");
		NSUserDefaults.StandardUserDefaults.Synchronize();
	}
}
</pre>

And inside your AppDelegate class:

<pre>public override bool FinishedLaunching (UIApplication app, NSDictionary options)
{
	// If you have defined a view, add it here:
	// window.AddSubview (navigationController.View);
	Settings.Read();
	window.MakeKeyAndVisible ();
	return true;
}
public override void WillTerminate (UIApplication application)
{
	Settings.Write();
}
</pre>

### The famous object file format invalid or unsuitable error in Monotouch

If you're using [this guide][26] to sign your app with a provisioning license (adhoc) you can get an &#8216;object file format invalid or unsuitable' error for [lots of different reasons][27].

The most obvious one is you've entered the entire bundle identifier, instead of just the &#8220;com.mysite.iphonapp&#8221; part.

But one issue I got for 5 hours of repeated building (3 minutes a build on Mac Mini) and tinkering with every project setting was my assembly name.

If your assembly name has a dot in the name it won't sign.For example &#8220;MyApp.UI&#8221; will not work. I also make sure it's explicitly set in the project configuration.

Another useful thing to help out is the &#8220;Build Output&#8221; window from the view menu. If it's not on my default, enable it to see the build taking place as the progress bar often stalls at &#8216;Compiling to native code'.

### Getting around &#8220;background-attachment:fixed&#8221; in mobile Safari on the iPhone

Because of the way the viewport is scaled and drawn in the mobile version of Safari, you aren't able to use the CSS &#8220;background-attachment: fixed&#8221; style to keep the background image in a fixed place. The way around this is to use a UIImageView behind a UIWebView and set the webview to opaque, shown below:

<pre>UIImageView imageView = new UIImageView();
imageView.Image = UIImage.FromFile("backgroundimage.png");
imageView.Frame = new RectangleF(0,0,320,480);
View.AddSubview(imageView);

UIWebView webView = new UIWebView();
webView.BackgroundColor = UIColor.Clear;
webView.Opaque = false;
webView.Frame = new RectangleF(0, 0, 320, 480);
webView.LoadHtmlString("&lt;html&gt;your html&lt;/html&gt;", new NSUrl("/"));

View.AddSubview(webView);
View.BringSubviewToFront(webView);
</pre>

### Redirecting links to Safari in a UIWebView

This fairly straight forward to do using the Delegate property the UIWebView gives you.

<pre>public override void ViewDidLoad ()
{
	var webView = new UIWebView();
	webView.Delegate = new WebDelegate();
	View.AddSubview(webView);
}
/// &lt;summary&gt;
/// Handles all links clicked in the webview, and directs them to Safari.
/// &lt;/summary&gt;
public class WebDelegate : UIWebViewDelegate
{
	public override bool ShouldStartLoad (UIWebView webView, NSUrlRequest request, UIWebViewNavigationType navigationType)
	{
		if (navigationType == UIWebViewNavigationType.LinkClicked)
		{
			UIApplication.SharedApplication.OpenUrl(request.Url);
			return false;
		}
		else
		{
			return true;
		}
	}
}
</pre>

### Hyperlink UIButton or underlined text in a UIButton

This snippet is taken from an Objective-C source on Stackoverflow.com. It can serve as an equivalent to the hyperlink button or link button as you'd find in ASP.NET/Winforms/WPF.

<pre>public class UnderlineButton : UIButton
{
	public override void Draw (RectangleF rect)
	{
		base.Draw (rect);
		// Red underline
		CGContext context = UIGraphics.GetCurrentContext();
		context.SetRGBFillColor(0xFF,0xFF,0,1);
		context.SetLineWidth(1);
		context.MoveTo(0,rect.Height -5);
		context.AddLineToPoint(rect.Width,rect.Height -5);
		context.StrokePath();
	}
}
</pre>

### Hiding the tab bar in a UITabBarController

This can be achieved by adding two methods to your parent TabBarController:

<pre>public void ShowTabBar()
{
	// SubView1 is the TabBar
	View.Subviews[1].Hidden = false;
}

public void HideTabBar()
{
	View.Subviews[1].Hidden = true;
}
</pre>

The first subview is the view it's displaying, the second is the tabbar itself. You may need to alter the index for this based on your app.

And then inside your controllers, you can show or hide the bar:

<pre>public override void ViewDidAppear (bool animated)
{
	// Renable the bottom tab bar
	base.ViewDidAppear (animated);

	// tabBarController is passed in using 'this' in the ctor
	_tabBarController.ShowTabBar();
}

public override void ViewDidLoad ()
{
	base.ViewDidLoad ();

	// tabBarController is passed in using 'this' in the ctor
	_tabBarController.HideTabBar();
}
</pre>

The major issue with hiding your tabbar is your view is limited in height to the where the tabbar would be. So if you want to replace it with a toolbar, a toolbar is not as high (30px) which means you have to force a taller toolbar. At this height it looks wrong and probably won't meet the Apple HIG anyway.

<a name="viewdidload"></a>

### ViewDidLoad vs ViewDidAppear vs ViewWillAppear

[This question][28] asks the difference between the three overriden methods in classes that derive from UIViewController. Eduardo Scoz gives this nice concise answer which I'm &#8220;re-printing&#8221; here:

  * **ViewDidLoad** - Whenever I'm adding controls to a view that should appear together with the view, right away, I put it in the ViewDidLoad method. Basically this method is called whenever the view was loaded into memory. So for example, if my view is a form with 3 labels, I would add the labels here; the view will never exist without those forms.

  * **ViewWillAppear**: I use ViewWillAppear usually just to update the data on the form. So, for the example above, I would use this to actually load the data from my domain into the form. Creation of UIViews is fairly expensive, and you should avoid as much as possible doing that on the ViewWillAppear method, becuase when this gets called, it means that the iPhone is already ready to show the UIView to the user, and anything heavy you do here will impact performance in a very visible manner (like animations being delayed, etc).

  * **ViewDidAppear**: Finally, I use the ViewDidAppear to start off new threads to things that would take a long time to execute, like for example doing a webservice call to get extra data for the form above.The good thing is that because the view already exists and is being displayed to the user, you can show a nice &#8220;Waiting&#8221; message to the user while you get the data. 

There are other tricks you can use, though. Lets say you want a UILabel to &#8220;fly&#8221; into the form after the form is loaded. In that case, I would add the label to the form in the ViewDidLoad but with a Frame outside of the view area, and then in the ViewDidAppear I would do the animation to fly it back into view.

### Checking for an internet connection with a timed out Reachability

[Miguel De Icaza's port of Apple's Reachability class][29] allows you to check for various states of your iPhone's connection. Apple's original Reachability and subsequently the API Miguel's port is calling is [quite well known to be badly implemented][30] (Miguel has said this himself on the monotouch forums).

One problem I frequently get with the Reachability class is it can hang on the device when trying to get the WWAN status (internet connection on 3G). A solution to this is to make the call inside a thread, and join it after 2 seconds. The code below demonstrates doing this.

Update: I've discovered since writing this that calling Reachability.InternetConnectionStatus() != NetworkStatus.NotReachable; yields the result a lot faster. Also having the device connected via USB and using Wifi has caused some unpredictable results.

<pre>/// &lt;summary&gt;
/// Returns true if the device has an internet connection.
/// &lt;/summary&gt;
public bool IsOnline()
{
	ReachabilityStatus status = new ReachabilityStatus();
	Thread thread = new Thread(ThreadedIsOnline);
	thread.IsBackground = true;
	thread.Start(status);
	bool terminated = thread.Join(2000);
	return terminated && status.IsOnline;
}

private void ThreadedIsOnline(object state)
{
	using (NSAutoreleasePool pool = new NSAutoreleasePool())
	{
		((ReachabilityStatus)state).IsOnline = Reachability.RemoteHostStatus() != NetworkStatus.NotReachable;
	}
}

private class ReachabilityStatus
{
	public bool IsOnline;
}
</pre>

<a name="startuptime"></a>

### Masking the startup time of Monotouch

When you build a Monotouch application with a provisioning license (whether for the appstore or not), the startup time is generally around 1-2 seconds. The Monotouch team are working on this, however as a stop gap solution a splash screen prevents your users seeing the black screen while it loads, and instead the splash screen launches instantly.

This is easy to do, you just put a 320&#215;480 pixel PNG file in the root of your project directory, and call it Default.png (the name is case sensitive). Change the build method of the file to &#8220;Content&#8221; and this the graphic will then appear instantly, while the application loads.

*One thing to note, as pointed out by [Geoff Norton][31] - the startup time depends on what your application is doing. Monotouch can in some cases be faster than an objective-C equivalent.*

<a name="sqliteperformance"></a>

### SQlite performance in Monotouch

Using NHibernate, ASP.NET, SQL Server and servers with specs that make the iPhone tremble I've discovered the hard way a few SQLite speed up tips.

#### Don't use Guid primary keys.

It's the advice for every DBMS however in SQLite you really do see a massive difference. My app went from 6 seconds loading to 0.8 when I removed the Guid primary key.

#### Add an artificial integer autoincrement primary key

If the sort order of your table isn't important, and you are using Guids for the ids, it's worth adding [an integer primary key][32]. Your data is then ordered by an integer (rather than it guessing a column), which are fast in SQlite.

#### Lazy load data

1500 DateTime parses take around 200ms to create in Monotouch on the iPhone - compare that to a standard dual core desktop PC where I got around 8ms. So if you have large amounts of data it's a big bottleneck. The load times are a lot slower for non-integer values such as DateTimes and Strings. Storing DateTimes as ticks and an INTEGER column may increase this slightly, however for Strings I found lazy loading decreased the response times quite dramatically.

#### Don't use joins

This is a mantra repeated in other articles about SQLite performance. 

#### Cache your data

As you Lazy Load, keep your objects in memory with a simple Cache system. Providing you aren't storing the kind of data that will give your app an out of memory warning, the time it takes to run out of memory from caching SQLite data will almost always be longer than the time the user spends using the app.

The cache doesn't need to be complicated, something simple like Cache<T> which holds a list of your data.

#### Consider a different datastore for static data

If you have data that isn't user generated, and is readonly, I found it's a lot faster to simply serialize the objects with a binary formatter rather than using SQLite. The obvious setback with this is finding an easy way to edit the data quickly, as SQLite has a number of good manager tools such as [SQLitebrowser][33] (Java, cross-platform and lightweight).

### Transparent background with a UIWebView

I take none of the credit for the code below, it's simply a conversion of the Objective-C from [this blog post][34]. This example sets the background color of the view the striped gray appearance you get with UITableViews.

<pre>public override void ViewDidLoad()
{
	View.BackgroundColor = UIColor.GroupTableViewBackgroundColor;
	_webView = new UIWebView();
	_webView.Frame = new RectangleF(0, 0, 320, 480);
	_webView.LoadHtmlString("&lt;html&gt;&lt;body style='background-color:transparent'&gt;test&lt;/body&gt;&lt;/html&gt;', new NSUrl("/"));
	_webView.BackgroundColor = UIColor.Clear;
	_webView.Opaque = false;
}
</pre>

### Modal loading UIView dialog

On the iPhone there is an example of a modal &#8220;loading&#8221; dialog when you set the wallpaper from one of your images. There are a few examples of doing this in objective-C around, however an easier solution is simply subclass UIAlertView as shown below. Note that the measurements are fairly esoteric in the example, and may need adjusting if you have a lot more or less text.

![UIAlertView loading screen][35]

<pre>/// &lt;summary&gt;
/// Solution taken from: http://iphonedevelopertips.com/user-interface/uialertview-without-buttons-please-wait-dialog.html
/// &lt;/summary&gt;
public class LoadingView : UIAlertView
{
	private UIActivityIndicatorView _activityView;
	public void Show(string title)
	{
		Title = title;
		Show();
		// Spinner - add after Show() or we have no Bounds.
		_activityView = new UIActivityIndicatorView(UIActivityIndicatorViewStyle.WhiteLarge);
		_activityView.Frame = new RectangleF((Bounds.Width / 2) - 15, Bounds.Height - 50, 30, 30);
		_activityView.StartAnimating();
		AddSubview(_activityView);
	}
	public void Hide()
	{
		DismissWithClickedButtonIndex(0, true);
	}
}
</pre>

### Converting to or from a DateTime to NSDate

This isn't my code, but saved from a pastie.org post:

<pre>public static DateTime NSDateToDateTime(MonoTouch.Foundation.NSDate date)
{
	return (new DateTime(2001,1,1,0,0,0)).AddSeconds(date.SecondsSinceReferenceDate);
}

public static MonoTouch.Foundation.NSDate DateTimeToNSDate(DateTime date)
{
	return MonoTouch.Foundation.NSDate.FromTimeIntervalSinceReferenceDate((date-(new DateTime(2001,1,1,0,0,0))).TotalSeconds);
}
</pre>

### Using a Windows keyboard on Mac OS X

As a Windows .NET developer I use Windows and Visual Studio 99% of the time. I also use a British keyboard. One of the frustrations of moving to Mac OS X and not having an Apple keyboard is the key mappings.

Fortunately with a Microsoft keyboard it's quite easy to get the keyboard to behave like a Windows keyboard. It involves 4 steps:

  1. Download the Microsoft keyboard software for Mac OS X and install it.
  2. As a British keyboard user - set your keyboard to &#8220;British - Microsoft&#8221;. This will fix your @, &#8221; and other keys.
  3. Change your CTRL and Win keys around in the keyboard modifiers menu in the system preferences. CTRL+S, O now do what you're used to, along with CTRL+Z/C/P.
  4. Add a key bindings file to sort out the HOME/END keys which go to the top of the page by default. [This blog post][36] tells you how to do, it's just a matter of creating a textfile:

~/Library/KeyBindings/DefaultKeyBinding.dict

Add the following to the file, and restart and any applications you want to use the key bindings in:

<pre>{
"\UF72C"  = "pageUp:";
"\UF72D"  = "pageDown:";
"\UF729"  = "moveToBeginningOfLine:";
"\UF72B"  = "moveToEndOfLine:";
"$\UF729" = "moveToBeginningOfLineAndModifySelection:";
"$\UF72B" = "moveToEndOfLineAndModifySelection:";
}
</pre>

Not all keys will be correct - for example you'll need to use CTRL+TAB to &#8216;alt tab' around, but it's close enough.

### Resources

Below is a small list of sites that have lots of info on Monotouch

  * [Alex York's blog][37]
  * [Craig Dunn's blog][38]
  * [ChrisNtr's site][39]
  * [Mike Bluestein's blog][40]
  * [codesnack screencasts][41]
  * [Monotouch.info][42]
  * [Monotouch's current bug list][43]
  * [The monotouch.net runtime forum][44]
  * [Stackoverflow][45]
  * [Delicious][46]

As the Monotouch library matches Cocoatouch down to the classname, you can often just look for what you're after in Objective-C/X-Code and translate it.

 [1]: http://www.bitbucket.org/yetanotherchris/monotouch-samples/src/
 [2]: /csharp/objective-c-by-example-for-a-csharp-developer
 [3]: /assets/2013/02/monotouchxmldocs.zip
 [4]: /assets/2010/10/iphonebounds1.png
 [5]: /assets/2010/10/iphonebounds2.png
 [6]: /assets/2010/10/iphonebounds3.png
 [7]: /assets/2010/10/iphonebounds4.png
 [8]: /assets/2010/10/iphonebounds5.png
 [9]: /assets/2010/10/iphonebounds6.png
 [10]: /assets/2010/10/iphonebounds7.png
 [11]: http://bitbucket.org/mrshrinkray/monotouch-samples/src/tip/iPhoneMockup/
 [12]: /assets/2010/10/uinavigationwinforms.png
 [13]: /assets/2010/10/Monotouch-Icon.png
 [14]: http://stackoverflow.com/questions/1470356/how-can-i-animate-a-uibutton-alpha-property-with-monotouch/1475384#1475384
 [15]: /assets/2010/10/uiglassbutton-template.png
 [16]: /assets/2010/10/uiglassbutton-example.png
 [17]: http://monotouch.info/MonoTouch-Sample-UIGlassButton-PNG-Generator
 [18]: http://wiki.monotouch.net/HowTo/Files/HowTo:_Store_Files
 [19]: https://github.com/follesoe/VSMonoTouch
 [20]: http://manniat.pp-p.net/blog/post/2009/11/18/MonoTouch-in-Visual-Studio.aspx
 [21]: /assets/2010/10/monodevelopconverter.png
 [22]: /assets/2013/02/MonotouchProjectConverter.zip
 [23]: http://www.mono-project.com/Generating_Documentation#Converting_Monodoc_format_XML_into_inline_XML_documentation
 [24]: http://www.go-mono.com/docs/index.aspx?link=T:Mono.Data.SqliteClient.SqliteParameter/*
 [25]: http://en.wikipedia.org/wiki/Third-generation_programming_language
 [26]: http://monotouch.net/Documentation/Building_for_Distribution
 [27]: http://www.iphonedevsdk.com/forum/iphone-sdk-development/5429-codesign-verification-nightmare.html
 [28]: http://stackoverflow.com/questions/2280423/do-i-programatically-add-subviews-in-viewdidappear-viewdidload-viewwillappear
 [29]: https://github.com/xamarin/monotouch-samples/blob/master/ReachabilitySample/reachability.cs
 [30]: http://blog.ddg.com/?p=24
 [31]: http://twitter.com/kangamono
 [32]: http://www.sqlite.org/faq.html#q1
 [33]: http://ostatic.com/sqlitebrowser
 [34]: http://blog.evandavey.com/2009/02/how-to-make-uiwebview-transparent.html
 [35]: /assets/2010/10/uiloadingview.png
 [36]: http://www.starryhope.com/tech/2006/mac-os-x-home-and-end-keys/
 [37]: http://www.alexyork.net/blog/post/UINavigationController-with-MonoTouch-Building-a-simple-RSS-reader-Part-1.aspx
 [38]: http://conceptdev.blogspot.com/2009/10/monotouch-sans-interface-builder.html
 [39]: http://monotouchexamples.com/
 [40]: http://mikebluestein.wordpress.com/
 [41]: http://www.codesnack.com/storage/screencasts/uitabbarcontroller/part2/index.html
 [42]: http://www.Monotouch.info
 [43]: http://tinyurl.com/monotouchbugs
 [44]: http://forums.monotouch.net/yaf_topics2_Runtime.aspx
 [45]: http://stackoverflow.com/questions/tagged/monotouch
 [46]: http://www.delicious.com/monotouch