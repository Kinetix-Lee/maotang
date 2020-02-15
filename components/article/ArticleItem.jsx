import React from "react"
import Link from "next/link"

function ArticleItem(props) {
  return (
    <div className="article-item wow fadeIn animated">
      <Link href={"/article/"}>
        {/* + props.id */}
        <a>{props.title}</a>
      </Link>
      <div className="brief">{props.time}</div>
    </div>
  )
}

export default ArticleItem
