import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostsList from "../components/PostsList"

const CategoryTemplate = ({ location, pageContext, data }) => {
  const { tag } = pageContext
  return (
    <Layout location={location} title={`Blog posts with tag "${tag}"`}>
      <div className="tag-container">
        <SEO title={`Posts with tag "${tag}"`} />
          <PostsList postEdges={data.allMarkdownRemark.edges} />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      filter: { fields: { tags: { in: [$tag] } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            tags
          }
          excerpt
          timeToRead
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`

export default CategoryTemplate