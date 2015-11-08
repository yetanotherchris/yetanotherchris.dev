---
Published: 2010-05-05
title: "Umbraco hacks for developers"
author: Chris S
excerpt: "A lot of the tips below are relevant for Umbraco 3.0, issues such as the debug builds have been resolved in 4.0"
layout: post
permalink: /umbraco/umbraco-hacks-for-developers-2/
dsq_thread_id:
  - 1083928823
tags:
  - umbraco
---
A lot of the tips here are relevant for Umbraco 3.0, issues such as the debug builds have been resolved in 4.0

<!--more-->

### Sitemap XSLT

The XSL below is the source used for Sitemap on sloppycode.net. It's taken from the Umbraco book, and modified to display the Dublin Core description alongside each page's url.

<script src="https://gist.github.com/yetanotherchris/4956647.js"></script>

### Changing the content type of a document

I've had to do this quite often on sloppycode.net when I realised I've created something as a Textpage (a built in document type) but then need some code highlighting which comes from a different content type.  
I haven't got round to making a tool to do it, but it's simple to do when access to SQL Enterprise Manager/Management Studio.

First of all, backup the content of the document you are going to change. This is important, as changing the content type wipes the content. I don't know why, the developers will know the reason for that. But the bodyText and the properties dissapear. Changing the contentType is straight forward, simply run

<pre>UPDATE cmsContent SET contentType={Your ContentTypeID} WHERE nodeId={Your document ID}</pre>

in SQL Server Management studio. You can get a list of contentTypes from the contentType table. nodeId holds the ID (rather than the pk column).

Once you have done this, publish your document. It will probably show a null reference exception when you click on the node in the editor. This will go once it has been published.

### Moving multiple documents

If you need to move a lot of documents at once to a new parent, it's painful doing it inside the editor. A SQL Script for doing this is below, just change the @oldParentId and @ParentId accordingly. Make sure you backup your database first.

<script src="https://gist.github.com/yetanotherchris/4956634.js"></script>

### Performance issues with Umbraco

Since installing Umbraco and running sloppycode.net on it since December 2006 I've noticed a few ways of making it go faster. Most of them are out of the box with Umbraco, like using the XML cache however there's a few others worth a mention:

#### Truncate your umbracoLog table regularly

The table contains all exceptions and warnings plus a host of other information from the Umbraco system. Most of this you don't need and can clog up the database. The table can grow very large quickly, particularly if you're creating the website for the first time and testing. This image shows an example

![umbraco tables][1]

Before this the site was 500,000 records strong before I noticed. The backups become large too. So simply run truncate on it:

<pre>TRUNCATE TABLE [dbo].umbracoLog</pre>

There's not point saving the deletes to the transcation log with DELETE FROM, as the data is never used by Umbraco except for your information.

#### Make sure tracing and debug is turned off

Find the following lines in your web.config file and make sure the attributes are set to false, it makes a noticeable difference:

<pre>&lt;trace enabled="false" requestLimit="10" pageOutput="false" traceMode="SortByTime" localOnly="true" /&gt;
...
&lt;compilation defaultLanguage="c#" debug="false"&gt;
...
&lt;add key="umbracoDebugMode" value="false" /&gt;
</pre>

### GZip your HTML output

I've written a small HttpModule based on some code by Bart De Smet that's very simple to install. It GZIP's your HTML output, reducing the bandwidth your site uses and page load time. It's aimed at people using shared hosting or pre-IIS 5 servers.

### Changing templates on multiple documents

Like moving lots of documents at once, this is also a pain in the editor. The code below (for version 3.03) does this for you. You'll need to turn it into a webservice and make a calling application to use it.

<script src="https://gist.github.com/yetanotherchris/4956622.js"></script>

### Database schema

This shows the schema of the Umbraco database, imported into Visio and organised so the tables are grouped together.

[<img src='/wp-content/uploads/2010/05/umbraco-schema.gif' alt='umbraco schema' style="width:200px;height:400px;" />][2]

[Download the original Visio file][3]

### Data export

This tool came from having troubles backing up an Umbraco database on gate.com - who didn't allow user backups of SQL databases or remote SSIS packages. The host has now been switched but for users of similar hosts like godaddy.com the tool is useful. Find [it here][4] (it needs Visual Studio to compile it, which you can get for free).

### Links

These links are included to supplement the ones on the Umbraco.org site.

  * V2 docs: http://umbraco.org/media/4d051ed3-63c2-42d6-a6c1-e93a14fc24a8-UmbracoDoc.pdf
  * Old docs: http://old.umbraco.org/frontpage/documentation.aspx
  * [Wikibooks][5]
  * [Official utilities:package][6]

 [1]: /wp-content/uploads/2010/05/umbracotables.gif
 [2]: /wp-content/uploads/2013/02/umbraco-schema.gif
 [3]: /wp-content/uploads/2013/02/umbraco-schema-visio.zip
 [4]: https://bitbucket.org/yetanotherchris/projects/src/cb7e4045a1c24c8fd667075283c9e08c0c72618b/Umbraco.DataExport/?at=default
 [5]: http://en.wikibooks.org/wiki/Umbraco
 [6]: http://our.umbraco.org/projects/website-utilities