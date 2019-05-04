import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const PopularPosts = () => {

    const data = useStaticQuery(graphql`query PopularPostsQuery {
      allMarkdownRemark(
        filter: { frontmatter: { popularpost: { eq: true } } }
        sort: { fields: [frontmatter___title], order: DESC }
        limit: 3
      ) {
        edges {
          node {
            frontmatter {
              title
              permalink
            }
          }
        }
      }
    }`);

    return (
      <div style={{
          margin: 0
        }}>
        <h5
          style={{
            margin: 0,
            marginBottom: `0.5rem`
          }}>Popular posts</h5>
        <ul 
          style={{
            marginBottom: 0
          }}>
          {data.allMarkdownRemark.edges.map((item) => {
            let node = item.node;
            let key = `popular-${node.frontmatter.permalink}`;

            return (
              <li
                key={key}
                style={{
                  marginLeft: `2rem`,
                  marginBottom: 0
                }}>
                <small><a href={node.frontmatter.permalink}>{node.frontmatter.title}</a></small>
              </li>
            )
          })}
        </ul>
      </div>
    )
}

export default PopularPosts