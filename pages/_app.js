import App, { Container } from "next/app"
import React from "react"
import * as getStores from "../store"
import { Provider, useStaticRendering } from "mobx-react"
import { withMobx } from "next-mobx-wrapper"
import { configure } from "mobx"
import "../public/static/style/main.less"

const isServer = !process.browser

configure({ enforceActions: "observed" })
useStaticRendering(isServer) // NOT `true` value

function isNight() {
  //return new Date().getHours() >= 18 || new Date().getHours() <= 6
  return false
}

class MyApp extends App {
  state = {
    theme: isNight() ? "dark" : "light"
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        theme: isNight() ? "dark" : "light"
      })
    }, 1000)
  }

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    let { Component, pageProps, store } = this.props
    return (
      <Provider {...store}>
        <div className={"container " + this.state.theme}>
          <script src="https://cdn.bootcss.com/wow/1.1.2/wow.min.js"></script>
          <link
            href="https://cdn.bootcss.com/animate.css/3.7.2/animate.css"
            rel="stylesheet"
          ></link>
          <Component {...this.props} />
        </div>
      </Provider>
    )
  }
}

export default withMobx(getStores)(MyApp)
