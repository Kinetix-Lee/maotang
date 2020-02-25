import React from "react"
import { observer, inject } from "mobx-react"
import ArticleList from "../components/article/ArticleList"
import { getRandomKey } from "../public/static/js/tools"

let that, searchValue
@inject("mainStore")
@observer
class SearchBox extends React.Component {
  state = {
    value: "",
    searching: false,
    searchList: null
  }

  constructor(props) {
    super(props)
  }

  render() {
    const tags = this.props.mainStore.getCategoryList()
    searchValue = this.props.router.asPath
      .replace("/search/", "")
      .replace("/search", "")
    if (searchValue) searchValue = decodeURIComponent(searchValue)
    // console.log(this.props.router)
    const list = this.props.mainStore
      .getArticlesByCategory(searchValue || "all")
      .slice()
    return (
      <div className="wrapper">
        <div className="block search-box">
          <input
            id="search"
            className="search-input"
            placeholder="搜索关键词或分类"
            onChange={this.handleChange}
            onKeyUp={this.handleSearch}
          />

          <div className={"search-tags"} data-wow-duration="0.1s">
            {/* (this.state.searching ? "wow fadeOutUp animated" : "") */}
            {tags.map(item => (
              <a
                className="search-tag"
                key={getRandomKey()}
                onClick={() => this.handleAddToInput(item)}
              >
                {item}
              </a>
            ))}
          </div>

          <ArticleList archive={this.state.searchList || list} large={true} />
        </div>
      </div>
    )
  }

  componentDidMount() {
    that = this
    if (searchValue) {
      document.getElementById("search").value = searchValue
    }
  }

  handleAddToInput(value) {
    document.getElementById("search").value = value
    that.handleChange(value)
  }

  handleChange(e) {
    // e.persist()
    const value = typeof e == "string" ? e : e.target.value
    that.setState({
      value: value,
      searching: true,
      searchList: that.props.mainStore.getArticlesByCategory(value).slice()
    })
    let href = window.location.href
    history.pushState({}, "", href.includes("search/") ? e : "/search/" + e)
  }

  handleSearch(e) {
    if (e.keyCode == 13) {
    }
  }
}

export default SearchBox
