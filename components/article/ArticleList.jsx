import React from "react"
import { observer, inject } from "mobx-react"
import { getRandomKey, formatDate } from "../../public/static/js/tools"
import Link from "next/link"

let currentList = []

@inject("mainStore")
@observer
class ArticleList extends React.Component {
  state = {
    articleList: [],
    currentPage: 1,
    isChange: false
  }

  constructor(props) {
    super(props)
  }

  render() {
    if (
      currentList &&
      currentList.length > 0 &&
      this.props.mainStore.loadCount == 1
    ) {
      return (
        <div className="wrapper">
          <div className="block article-list">
            {currentList.map(item => (
              <div
                key={getRandomKey()}
                className="article-item wow fadeIn animated"
              >
                <Link href={{ pathname: "/article?id=" + item.id }}>
                  <a>{item.title}</a>
                </Link>
                <div className="brief">
                  {new Date(item.time.replace(/-/g, "/"))
                    .toLocaleDateString()
                    .replace(/-/g, "/")
                    .split("/")
                    .map(item => (item.length == 1 ? "0" + item : item))
                    .join("/")}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    } else {
      return (
        <div className="wrapper">
          <div className="block article-list">
            {this.props.mainStore.articleList.map(item => (
              <div
                key={getRandomKey()}
                className="article-item wow fadeIn animated"
              >
                <Link href={"/blog/" + item.id}>
                  <a>{item.title}</a>
                </Link>
                <div className="brief">
                  {new Date(item.time.replace(/-/g, "/"))
                    .toLocaleDateString()
                    .replace(/-/g, "/")
                    .split("/")
                    .map(item => (item.length == 1 ? "0" + item : item))
                    .join("/")}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    // return (
    //   <div className="wrapper">
    //     <div className="block article-list">
    //       {currentList && currentList.length > 0
    //         ? currentList.map(item => (
    //             <div
    //               key={getRandomKey()}
    //               className="article-item wow fadeIn animated"
    //             >
    //               <Link href={{ pathname: "/av/" + item.id }}>
    //                 <a>{item.title}</a>
    //               </Link>
    //               <div className="brief">{item.time}</div>
    //             </div>
    //           ))
    //         : this.props.mainStore.articleList.map(item => (
    //             <div
    //               key={getRandomKey()}
    //               className="article-item wow fadeIn animated"
    //             >
    //               <Link href={{ pathname: "/av/" + item.id }}>
    //                 <a>{item.title}</a>
    //               </Link>
    //               <div className="brief">{item.time}</div>
    //             </div>
    //           ))}
    //       {/* {currentList.map(item => {
    //         return <div>{item.time}</div>
    //       })} */}
    //     </div>
    //   </div>
  }

  componentWillMount() {
    this.setState({
      currentPage: this.props.mainStore.articlePage
    })
    currentList = this.props.mainStore.getArticleList(this.props.propsPage)
  }

  componentDidMount() {
    this.setState({
      isChange: false,
      currentPage: this.props.propsPage
    })
  }

  componentWillUpdate() {
    if (this.props.propsPage - this.state.currentPage !== 0) {
      this.setState({
        isChange: true,
        currentPage: this.props.propsPage,
        articleList: this.props.mainStore.articleList
      })
    }
  }
}

export default ArticleList
