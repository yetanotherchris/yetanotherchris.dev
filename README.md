# anotherchris.net
The [Gatsby](https://www.gatsbyjs.org) and markdown source for my blog, www.anotherchris.net

### Working locally

1. Install Node JS
2. `npm install`
3. `install -g gatsby-cli`
4. `gatsby build` or `gatsby develop`

Images reside in the `static` folder, markdown in the `content/blog` folder. The template has a few 
foibles, such as its assets folder being in two place which I'm yet to figure out.

The resume source is in `/resume` and the skimmed down version can be found in the `static` folder. The 
resume doesn't work in Gatsby's develop mode due to a known bug with 2.0.