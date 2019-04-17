import React from "react"
import TagLink from "./TagLink"

class TagList extends React.Component {
  render() {
    const { tags } = this.props;

    if (!tags)
    {
      return "";
    }

    return tags.forEach(tag => {
      <TagLink tag={tag} />
    });
  }
}

export default TagList