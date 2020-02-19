import { observable, action } from "mobx"
import { BaseStore, getOrCreateStore } from "next-mobx-wrapper"

let articles = []

const getStaticInfo = () => {
  articles = require("../public/static/article/index.json") || []
}

getStaticInfo()

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

  @observable articleList = []

  @observable articles = articles

  @action getArticleList(page = 1) {
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
  }
}

export const getMainStore = getOrCreateStore("mainStore", Store)
