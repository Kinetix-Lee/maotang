import React from "react"
import NavBar from "../components/NavBar"
import ArticleContent from "../components/article/ArticleContent"
import Bottom from "../components/Bottom"

class Article extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <ArticleContent />
        <Bottom />
      </div>
    )
  }
}

export default Article
