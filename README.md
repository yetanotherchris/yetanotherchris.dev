[![Netlify Status](https://api.netlify.com/api/v1/badges/cefb24ca-2b3e-46c1-943c-12628b3b5fa9/deploy-status)](https://app.netlify.com/sites/reverent-hermann-a67e2d/deploys)

# yetanotherchris.dev
The [Gatsby](https://www.gatsbyjs.org) and markdown source for my blog, http://yetanotherchris.dev (also anotherchris.net redirects there and probably will for the next 5 years)

### Working locally

1. Install Node JS
1. `npm install -g yarn`
1. `yarn install`
1. `yarn global add gatsby-cli`
1. Check the command `gatsby` works. If you're on Windows and it doesn't, [try this](https://gist.github.com/yetanotherchris/1e339bd72d4698f70e2c3a02b04fc1c8)
1. `gatsby build` or `gatsby develop`

Images reside in the `static` folder, markdown in the `content/blog` folder. The template has a few 
foibles, such as its assets folder being in two place which I'm yet to figure out.

The resume source is in `/resume` and the skimmed down version can be found in the `static` folder. The 
resume doesn't work in Gatsby's develop mode due to a known bug with 2.0.
