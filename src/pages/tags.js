import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class PostItem extends React.Component {
  render() {
    let node = this.props.node;
    const title = node.frontmatter.title || node.fields.slug
    var desc = node.frontmatter.excerpt || node.frontmatter.description;

    if (!desc || desc.length === 0)
    {
      desc = node.excerpt;
    }

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
            __html: desc
          }}
        />
      </div>
    )
  }
}

class TagGroup extends React.Component {
  render() {
    let groupedNodes = this.props.groupedNodes;
    let tagKey = this.props.tagKey;

    var nodes = groupedNodes.get(tagKey);
    var htmlArray = nodes.map(node => 
    {
        return <PostItem node={node} />
    });

    return (
      <div key={tagKey}>
          <h2 style={{borderBottom: `1px solid #aaa`}}>{tagKey.toUpperCase()}</h2>
          {htmlArray}
      </div>
    )
  }
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

        var existingArray = sortedNodes.get(tag);
        existingArray.push(post.node);
        sortedNodes.set(tag, existingArray);
      });
    });

    let tagKeys = Array.from(sortedNodes, ([key, value]) => {
        return key;
    });

    tagKeys = tagKeys.sort(function(a,b){
        return a.localeCompare(b);
    })

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All tags"
          keywords={[`c#`, `.net`, `devops`, `docker`]}
        />
        <Bio />
        {tagKeys.map(tagKey => 
        {
          return <TagGroup tagKey={tagKey} groupedNodes={sortedNodes} />
        })}

        <div style={{
            paddingBottom: `40px`
        }}>
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
      sort: { fields: [frontmatter___date], order: DESC }
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
