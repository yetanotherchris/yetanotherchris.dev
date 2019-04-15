---
title: Starting on Spruce's irony-powered search parser
date: 2011-02-14 00:00:00 Z
permalink: "/spruce/starting-on-spruces-irony-powered-search-parser/"
tags:
- irony.net
- spruce
Published: 2011-02-14 00:00:00 Z
author: Chris S
excerpt: After a few months off to eat a lot of food, I’m returning to do more dev
  work on Spruce. Picking up where I left off, the first “subsystem” I’m focusing
  on is the search. The UI and search I have in mind is fairly simple, but also powerful.
  I’m aiming to keep it google-esque in its search results and allow you to search
  the important fields of a work item, plus its core fields.
layout: post
dsq_thread_id:
- 1092330052
---

After a few months off to eat a lot of food, I’m returning to do more dev work on Spruce.

Picking up where I left off, the first &#8220;subsystem&#8221; I’m focusing on is the search. The UI and search I have in mind is fairly simple, but also powerful. I’m aiming to keep it google-esque in its search results and allow you to search the important fields of a work item, plus its core fields.

The header for the front end has a search box in the top right, which will support all of the search syntax. This then leads onto a search page which will give a few more tips. The search syntax I have in mind is:

<!--more-->

> start:&#8221;last month&#8221; end:&#8221;yesterday&#8221; project:amazing-project 

These are google style field searches (much like site:yahoo.com in a google search). Any free text not given in this format is assumed to search the title, and possibly the body too although I’m not sure what performance issues this will have so it may become a field search.

The quick and dirty solution to parse the search syntax for this would be a collection of regexs. However I’m keen to use a more form CS approach where I’m given a parse tree as I mentioned in the last post. I’m in the middle of specifying the grammar in BNF which will be translated to C# syntax using the Irony framework.

Having tinkled with Irony for a few hours I’m really impressed with its power, and don’t seem to be alone in that respect as it’s got 2,000 downloads of the latest alpha build. It’s quite short on documentation which the author is aware of, but does have a lot of example projects bundled with it.

What’s more it comes with a Google query to SQL syntax grammar with already made, along with a host of others like Wiki syntax and Python. From my experiments it’s really simple to get going, you declare a grammar and then give it some text to parse. The code below is some rough and ready example code that I wrote to try parsing Markdown syntax, inspired by the fact nobody has written one yet, and the Markdown syntax (a simplified Wiki format) is used for the biggest programmer site out there, Stackoverflow and a plugin I wrote a while back for N2CMS. The only parsers out there are regex based as far as I know.

The example below only caters for italic and bold but others (except perhaps images and links) would be trivial to add.

<pre>[Language("Markdown","1.0","Grammar for the markdown syntax")]
public class MarkdownGrammar : Grammar
{
	public MarkdownGrammar()
	{
		//  ::= ...
		var text = new WikiTextTerminal("text") { EscapeChar = '~' };
		var lineBreak = new WikiTagTerminal("lineBreak", WikiTermType.Element, @"\\", string.Empty) { OpenHtmlTag = "
		\n" };
		
		//   ::= "*"   "*"
		var italic = new WikiTagTerminal("italic", WikiTermType.Format, "*", "em");
		
		//   ::= "*" "*"  "*" "*"
		var bold = new WikiTagTerminal("bold", WikiTermType.Format, "**", "strong");
		var wikiElement = new NonTerminal("wikiElement");
		var wikiText = new NonTerminal("wikiText");
		wikiElement.Rule = text | lineBreak | italic | bold | NewLine;
		wikiText.Rule = MakeStarRule(wikiText, wikiElement);
		this.Root = wikiText;
		this.WhitespaceChars = string.Empty;
		MarkTransient(wikiElement);
		
		//We need to clear punctuation flag on NewLine, so it is not removed from parse tree
		NewLine.SetFlag(TermFlags.IsPunctuation, false);
		this.LanguageFlags |= LanguageFlags.CreateAst;
	}
}
</pre>

This example piggy backs on the prebuilt wiki Terminals from the Wiki grammar. Using it is straightforward as shown below. The state machine to tell what tag you’re inside is a nice simple mechanism borrowed from the Irony examples – a dictionary with a value of true/false for each Token:

<pre>private static Dictionary _flags = new Dictionary();
static void Main(string[] args)
{
	MarkdownGrammar grammar = new MarkdownGrammar();
	ScriptInterpreter interpreter = new ScriptInterpreter(grammar);
	Parser parser = new Parser(grammar);
	ParseTree tree = interpreter.Parser.Parse("hello this is *ch**r**is*");
	StringBuilder builder = new StringBuilder();

	foreach (Token token in tree.Tokens)
	{
		var t = token.Terminal as WikiTerminalBase;
		if (t != null)
		{
			if (t.TermType == WikiTermType.Format)
			{
				builder.Append(ProcessFormatTag(token));
			}
			else
			{
				builder.Append(token.ValueString);
			}
		}
	}

	Console.Read();
}

private static string ProcessFormatTag(Token token)
{
	var term = token.Terminal as WikiTerminalBase;
	bool value;
	bool isOn = _flags.TryGetValue(term, out value) && value;
	_flags[term] = !isOn;

	if (isOn)
		return term.CloseHtmlTag;
	else
		return term.OpenHtmlTag;
}
</pre>

Obviously this is for markdown syntax and not the search grammar however I thought I’d blog a small example of how easy Irony is to use a parsing engine. It does require reading up on BNF (Backus-Naur Form) on wikipedia (read the [EBNF][1] page first as it is a good intro) but as an alternative to regexes for formal DSLs it’s rather good.

The next Spruce post will feature some of the BNF definition I have in mind for the searching.

**Irony-related links**

  * [Irony on codeplex][2]
  * [Wikibooks documentation for Irony][3] – also check out the 3 codeproject articles athough they’re slightly out of sync with the api now.

 [1]: http://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_Form
 [2]: http://irony.codeplex.com/
 [3]: http://en.wikibooks.org/wiki/Irony_-_Language_Implementation_Kit