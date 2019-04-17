import React from "react"

const TagLink = ({ tag }) => {

  return (
    <a href={`/Tags/${tag}`}>{tag}</a> 
  )
}

export default TagLink