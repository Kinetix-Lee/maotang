为回馈社区和热爱的兽人文化，我开发了一个能收集毛茸茸小动物图片的 npm 包。

<!--more-->

---

## Furazy

一个毛茸茸图片爬虫。

[![][1]](https://www.npmjs.com/package/furazy)
[![][2]](https://github.com/Meeken1998/furazy-spider)

<!-- [在 runkit 中调试](https://npm.runkit.com/furazy) / [查看 NPM](https://www.npmjs.com/package/furazy) / [查看 Github](https://github.com/Meeken1998/furazy-spider/issues) -->

### 文档

### 在 Node.js 中使用

##### 安装

```bash
$ npm install furazy --save
```

##### 引入

```js
// es5
const Furazy = require("furazy")
// es6及以上
import Furazy from "furazy"
```

##### API

|     | 方法                 | 说明                 | 异步 | 支持版本 sites                                                            | Version |
| --- | -------------------- | -------------------- | ---- | ------------------------------------------------------------------------- | ------- |
| 1   | Furazy.canIUse()     | 检查你的网络环境     | 是   | e621.net, e926.net, furaffinity.com, furry.booru.org, myreadingmanga.info | v0.1.9  |
| 2   | Furazy.searchImage() | 关键词查找图片       | 是   | e621.net, e926.net, furaffinity.com, furry.booru.org                      | v0.1.6  |
| 3   | Furazy.searchComic() | 关键词查找漫画       | Y    | myreadingmanga.info                                                       | v0.1.0  |
| 4   | Furazy.getComic()    | 通过漫画地址下载漫画 | Y    | myreadingmanga.info                                                       | v0.1.0  |

##### 使用

```js
const Furry = new Furazy()

/*
 * Furazy 的所有请求均为异步操作，可用 .then() 或 await 获取结果
 * All requests in Furazy are asynchronous, u can use .then() or await to get results.
 */
const searchIt = async () => {
  // Search furry pictures
  let searchResult = await Furry.searchImage(
    "eevee", //[String]name (search keywords)
    0,       //[Int]type, 0: e621.net，1: fa, 2: e926.net
    1,       //[Int]page
    1        //[Int]limit
  )
  console.log(searchResult)

  // Search doujins
  let mrm = await Furry.searchComic(
    "pokemon", //[String]name (search keywords)
    0,         //[Int]sort
    1,         //[Int]page
  console.log(mrm)

  // View doujins (only for myreadingmanga.info now)
  let comic = await Furry.getComic(
    "your_comic_url" //[String]commicUrl
  )
  console.log(comic)
}

searchIt()
```

##### 结果示例（一张图片）

```json
[
  {
    "title": "2019 ambiguous_gender bodily_fluids digital_drawing_(artwork) digital_media_(artwork) dragon dragonite drooling duo eevee feral hiore hi_res imminent_vore larger_pred licking licking_lips macro mammal nintendo oral_vore pokémon pokémon_(species) saliva simple_background size_difference slightly_chubby soft_vore tongue tongue_out video_games vore white_background",
    "preview": "https://static1.e621.net/data/preview/65/e2/65e289e2e05ed9a004d9e18fefda2962.jpg",
    "image": "https://static1.e621.net/data/65/e2/65e289e2e05ed9a004d9e18fefda2962.png",
    "author": "hiore",
    "author_url": "https://www.pixiv.net/en/artworks/77983470, https://i.pximg.net/img-original/img/2019/11/25/03/37/25/77983470_p2.png, https://www.pixiv.net/member.php?id=45363288, https://twitter.com/D0Sd0ou3fm1R1rB/status/1196483299465519105"
  }
]
```

### 在 Python 中

正在开发，你也可以开发一个 python 版 (ｏ ´∀ ｀ｏ)

### 找到我

- Github [@Meeken1998](https://github.com/Meeken1998)
- 博客 [@meek3n.cn](https://meek3n.cn)

### 协议

MIT

[1]: https://img.shields.io/npm/v/furazy.svg
[2]: https://img.shields.io/github/license/meeken1998/furazy-spider

---

-EOF-
