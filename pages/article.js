import React from "react"
import NavBar from "../components/NavBar"
import ArticleContent from "../components/article/ArticleContent"
import Bottom from "../components/Bottom"
import { parseUrl } from "../public/static/js/tools"
import Head from "next/head"
import { site as SITE } from "../public/static/config/maotang.json"
import ErrorPage from "./_error"

class Article extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const $route = parseUrl("https://maotang.mew" + this.props.router.asPath)
    const urlId =
      ($route.query && $route.query.id !== undefined && $route.query.id) ||
      ($route.path &&
        $route.path.includes("blog/") &&
        $route.path.replace("blog/", "")) ||
      404

    const detail = this.props.store.mainStore.getArticleDetail(urlId)

    if (!detail) {
      return <ErrorPage errcode={404} />
    }

    return (
      <div className="App">
        <Head>
          <title>{`${detail.title} - ${SITE.title}`}</title>
        </Head>
        <NavBar />
        <ArticleContent id={urlId} />
        <Bottom show={!!urlId} />
      </div>
    )
  }
}

export default Article
