import React from "react"
import ArticleItem from "./ArticleItem"
import { observer, inject } from "mobx-react"
import { getRandomKey } from "../../public/static/js/tools"

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
              <ArticleItem
                id={item.id}
                time={item.time}
                title={item.title}
                key={getRandomKey()}
              />
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "10rem 0" }}>
              Less is more
            </div>
          )}
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.mainStore.getArticleList()
  }
}

export default ArticleList
