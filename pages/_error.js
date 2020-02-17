import React from "react"
import { Button } from "antd"
import Router from "next/router"

export default class Error extends React.Component {
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
        <p>
          {/* {JSON.stringify(this.props)} */}
          {this.props.pageProps.statusCode
            ? `An error ${this.props.pageProps.statusCode} occurred on server`
            : "An error occurred on client"}
        </p>

        <Button style={{ marginTop: "4px" }} onClick={this.handleBack2Home}>
          返回首页
        </Button>
      </div>
    )
  }
}
