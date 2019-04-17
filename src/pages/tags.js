import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const PostItem = (node) => {
  const title = node.frontmatter.title || node.fields.slug
  return (
    <div key={node.fields.slug}>
      <h3
        style={{
          marginBottom: rhythm(1 / 4),
        }}
      >
        <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
          {title}
        </Link>
      </h3>
      <small>{node.frontmatter.date}</small>
      <p
        dangerouslySetInnerHTML={{
          __html: node.frontmatter.description || node.excerpt,
        }}
      />
    </div>
  )
}

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    
    var sortedNodes = new Map();
    posts.forEach(post => {
      post.node.fields.tags.forEach(tag => {
        if (!sortedNodes.get(tag))
        {
          sortedNodes.set(tag, new Array());
        }
        sortedNodes.set(tag, post.node);
      });
    });
    let i = 0;
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`c#`, `.net`, `devops`, `docker`]}
        />
        <Bio />
        {sortedNodes.forEach((value, key, map) => 
        {
          <div><h2>{key}</h2></div>
        })}

        <div style={{
            paddingBottom: `40px`
        }}>
          <a href="/archive" >View older posts...</a>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___tags], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            tags
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
