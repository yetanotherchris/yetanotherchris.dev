---
title: Unit test naming conventions  
Published: 2015-11-04
layout: post
excerpt: Choosing a naming convention for unit tests method names.
tags:
  - c#
  - testing
  - unit-tests
---
###What's in a name? 
Uncle Bob has written on this topic at great length in his books x and y. He has some great tips on naming methods, but unless they've been updated, he doesn't go into great detail about unit test names beyond the guidelines that they should be at the level of production code, and immediately readable.

I recently had a discussion on unit test names with a few of the deep thinker devs and we decided upon a method naming convention. Which one would you choose?

	[Test]
	ShouldGetAllUsersByAge()
	{
	}

	[Test]
	Should_Get_All_Users_By_Age()
	{
	}

	[Test]
	should_get_all_users_by_age()
	{
	}

Hopefully you picked number 3, as this is the one we picked. The reasoning behind the choice was:

- It's the closest we'll get to an English sentence without using spaces.
- It's lowercase which reduces the cognitive load of reading.
- Pascal case is a lot harder to read.
- It uses given when then (or would do in more complex examples, infact they all do).

The other key component to the method name code convention is that it should read like a sentence, so spare no characters in its name, including prounouns such as "a". This is of course provided its length is within the width boundaries of the screen, which are now about 1500px of the 1920px most devs get, generally quite a few more than 80 characters.

The other conventions we stick to are fairly well observed:

- Arrange the test using given, when, then or arrange, act, assert.
- Don't stick lots of setup in the test (<10 lines), move it out into another method with a meaningful name. Use the Gestalt of principal to group these methods up - more on that in a future post.
- Test only one or two things, but don't be dogmatic. If you're testing object properties don't have one test per property - test them all together unless they really do something special individually.

There is also my own preference:

- Unit tests: Prefix the test with the method you're testing. Integration and acceptance tests may span multiple methods so this is often redundant for those.

With these few simple rules you'll be surprised how much easier your tests are to read. It's also worth spending the time to update old tests, as when you return back to them or your new tests in 6 months or a year's time, you and others will thank your former tidy self.