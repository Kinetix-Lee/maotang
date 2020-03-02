Super-graphiql 是用 Vue 编写的 GraphQL 文档管理工具。

## Super-graphiql

- **Super-graphiql 是西湖区最优秀的 GraphQL 文档管理工具，支持在线调试。**

- 虽然她是「轮子」，但使用过程中不会有语言障碍和反直觉的体验，尤其适用于需要调试 API 但文档未能及时更新的场景。

- 截止目前，Authing 已有 500 多个 API，并在与日俱增。这个工具会自动读取 GraphQL 的接口列表，并渲染出漂亮的文档。

[![][1]](https://github.com/Authing/super-graphiql)
[![][2]](https://authing.cn/graphiql/)

## 特点

1. 简洁好用，完美实现 [Apollo Client](https://github.com/apollographql/apollo-client-devtools) 功能
2. 完整查看 API 的所有细节
3. 支持 Markdown 文档
4. 支持自定义 `headers`，比如经常用到的 `authorization` 字段
5. 支持设置多个 `GraphQL` 源
6. 支持一键生成 GraphQL 查询语句

![][3]

![][4]

## 使用说明

### 下载

```shell
$ git clone https://github.com/Authing/super-graphiql
$ cd super-graphiql
```

### 安装依赖

```shell
$ yarn #推荐使用 yarn 来安装依赖，也可以用 npm install
```

### 启动

```shell
$ yarn dev
```

### 配置

若要查看或修改 `GraphQL` 源等信息，请找到 `src/apollo/configs.js`。

## 感谢

Super-graphiql 第一版诞生后，很快我也从 [Authing 身份认证云](https://authing.cn) 离开了，非常感谢廖长江（Gihub: @liaochangjiang）继续维护这个调试器。

由于个人原因，这个调试器今后都不会再更新了。

[1]: https://img.shields.io/badge/license-MIT-green
[2]: https://img.shields.io/badge/site-%E6%BC%94%E7%A4%BA-red
[3]: https://img.meek3n.cn/blog/super-gql/01.png
[4]: https://img.meek3n.cn/blog/super-gql/02.png
