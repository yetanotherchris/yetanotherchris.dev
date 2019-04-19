import React from "react"

const TagLink = ({ tag }) => {

  return (
    <a href={`/tags/${tag}`}>{tag}</a> 
  )
}

export default TagLink