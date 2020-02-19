import React from "react"
import NavBar from "../components/NavBar"
import ArticleContent from "../components/article/ArticleContent"
import Bottom from "../components/Bottom"
import { parseUrl } from "../public/static/js/tools"

class Article extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const $route = parseUrl("https://maotang.mew" + this.props.router.asPath)
    const urlId =
      ($route.query && $route.query.id !== undefined && $route.query.id) ||
      ($route.path &&
        $route.path.includes("av/") &&
        $route.path.replace("av/", "")) ||
      404

    return (
      <div className="App">
        <NavBar />
        <ArticleContent id={urlId} />
        <Bottom show={!!urlId} />
      </div>
    )
  }

  // componentDidMount() {
  //   const $route = parseUrl(window.location.href)
  //   const id =
  //     ($route.query && $route.query.id !== undefined && $route.query.id) ||
  //     ($route.path &&
  //       $route.path.includes("av/") &&
  //       $route.path.replace("av/", "")) ||
  //     0
  //   this.setState({
  //     id
  //   })
  // }
}

export default Article
