import React from "react"
const _ = require("lodash")

const TagLink = ({ tag }) => {

  return (
    <a href={`/tags/${_.kebabCase(tag)}/`}>{tag}</a> 
  )
}

export default TagLink