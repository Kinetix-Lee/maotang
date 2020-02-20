import React from "react"
import { Button } from "antd"
import Router from "next/router"
import Error from "next/error"

export default class ErrorPage extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  handleBack2Home = () => {
    Router.push("/")
  }

  render() {
    return (
      <div class="error-page">
        <Error statusCode={this.props.errcode || this.props.pageProps.statusCode || 666} />

        <Button style={{ marginTop: "-10rem" }} onClick={this.handleBack2Home}>
          返回首页
        </Button>
      </div>
    )
  }
}
