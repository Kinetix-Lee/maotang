import React from "react"
import Head from "next/head"
import Nav from "../components/NavBar"
import ArticleList from "../components/article/ArticleList"
import PageDivider from "../components/article/PageDivider"
import Bottom from "../components/Bottom"

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <ArticleList />
        <PageDivider router={this.props.router} />
        <Bottom />
      </div>
    )
  }
}

export default IndexPage
