import React from "react"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"

const PostsListCard = ({ frontmatter, fields, excerpt }) => {
  const title = frontmatter.title || fields.slug

  return (
    <div key={fields.slug}>
      <h3
        style={{
          marginBottom: rhythm(1 / 4),
        }}
      >
        <Link style={{ boxShadow: `none` }} to={fields.slug}>
          {title}
        </Link>
      </h3>
      <small>{frontmatter.date}</small>
      <p
        dangerouslySetInnerHTML={{
          __html: frontmatter.description || excerpt,
        }}
      />
    </div>
  )
}

export default PostsListCard