import React from "react"
import NavBar from "../components/NavBar"
import ArticleContent from "../components/article/ArticleContent"
import Bottom from "../components/Bottom"
import { parseUrl } from "../public/static/js/tools"

class Article extends React.Component {
  state = {
    id: 0
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <ArticleContent id={this.state.id} />
        <Bottom show={true} />
      </div>
    )
  }

  componentDidMount() {
    const $route = parseUrl(window.location.href)
    const id =
      ($route.query && $route.query.id !== undefined && $route.query.id) ||
      ($route.path &&
        $route.path.includes("av/") &&
        $route.path.replace("av/", "")) ||
      0
    this.setState({
      id
    })
  }
}

export default Article
