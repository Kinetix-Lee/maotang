import { observable, action } from "mobx"
import { BaseStore, getOrCreateStore } from "next-mobx-wrapper"

let articles = []

class Store extends BaseStore {
  @observable menu = require("../public/static/config/mao.tang.json").menu

  @observable articlePage = 1

  @observable loadCount = 0

  @observable articleList = []

  @observable articles = []

  @action getArticleList(page = 1, is_private = false) {
    if (!this.articles.length) this.getStaticInfo()
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
    if (!is_private) {
      this.articlePage = page /* 将页码更改也保存起来 */
      this.loadCount++
    }
    return this.articleList
  }

  @action getStaticInfo() {
    if (!this.articleList.length) {
      articles = require("../public/static/article/list.json") || []
      this.articles = articles
    }
  }

  @action getArticleDetail(id) {
    this.getStaticInfo()
    const articleList = this.articles.slice()
    let detail =
      articleList.find(item => item && item.id && item.id == id) || null
    return detail
      ? Object.assign(
          {
            id: "",
            title: "",
            time: "",
            brief: "",
            via: "",
            update: "",
            repo: "",
            category: ""
          },
          detail
        )
      : detail
  }
}

export const getMainStore = getOrCreateStore("mainStore", Store)
