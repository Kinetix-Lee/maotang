import { observable, action } from "mobx"
import { BaseStore, getOrCreateStore } from "next-mobx-wrapper"

let articles = []

class Store extends BaseStore {
  @observable menu = [
    {
      href: "/",
      context: "首页"
    },
    {
      href: "/archives",
      context: "归档"
    },
    {
      href: "/search",
      context: "搜索"
    },
    {
      href: "/about",
      context: "关于"
    }
  ]

  @observable articlePage = 1

  @observable loadCount = 0

  @observable articleList = []

  @observable articles = []

  @action getArticleList(page = 1) {
    if (!this.articles.length) this.getStaticInfo()
    this.articlePage = page /* 将页码更改也保存起来 */
    let article = (this.articles || []).slice(),
      result = []
    for (let i = 0; i < article.length; i += 10) {
      result.push(article.slice(i, i + 10))
    }
    if (result[page - 1]) {
      this.articleList = result[page - 1]
    } else {
      this.articleList = []
    }
    this.loadCount++
    return this.articleList
  }

  @action getStaticInfo() {
    if (!this.articleList.length) {
      articles = require("../public/static/article/title.json") || []
      this.articles = articles
    }
    // return this.getArticleList()
  }
}

export const getMainStore = getOrCreateStore("mainStore", Store)
