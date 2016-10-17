# Notes

This is my resume using [JsonResume](http://www.jsonresume.org).

The theme is based off https://github.com/eddywashere/resume. I added some JSON schema additions that mean I can't publish this is as a JsonResume theme:

- Added `"positions": []` to `"work"`. There's still a discussion going on about it but I needed it for promotions, and it includes dates of titles.
- Added `"alternativeResume"` to basics (optional). I put this in so I can link to different resume that lists some of my core beliefs/philosophy in software.
- Added profile icons to the template for Twitter, Github and possibly Linkedin.
- Removed the about section from the template, let the work section do the talking!
- Removed the phone number from the template, your phone will turn into a call center for recruitment agents.
- Skills are at the top of the template. When reading CVs to hire my preference is to see a Github repository, the skills section and then experience. The other information you can get from chatting to the candidate.

As the schema has changed, I've stuck to just transforming the JSON using Handlebar and writing the HTML to disk instead of the Resume NPM package.