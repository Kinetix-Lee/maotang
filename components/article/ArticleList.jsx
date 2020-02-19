import React from "react"
import { observer, inject } from "mobx-react"
import { getRandomKey } from "../../public/static/js/tools"
import Link from "next/link"

@inject("mainStore")
@observer
class ArticleList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="wrapper">
        <div className="block article-list">
          {this.props.mainStore.articleList &&
          this.props.mainStore.articleList.length > 0 ? (
            this.props.mainStore.articleList.map(item => (
              <div
                key={getRandomKey()}
                className="article-item wow fadeIn animated"
              >
                <Link href={{ pathname: "/av/" + item.id }}>
                  {/* query: { id: item.id } */}
                  <a>{item.title}</a>
                </Link>
                <div className="brief">{item.time}</div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "10rem 0" }}></div>
          )}
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.mainStore.getStaticInfo()
    // this.props.mainStore.getArticleList()
  }
}

export default ArticleList
