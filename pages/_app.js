import App, { Container } from "next/app"
import React from "react"
import * as getStores from "../store"
import { Provider, useStaticRendering } from "mobx-react"
import { withMobx } from "next-mobx-wrapper"
import { configure } from "mobx"
import { isNight } from "../public/static/js/tools"
import Head from "next/head"
import "../public/static/style/main.less"
import { site as SITE } from "../public/static/config/maotang.json"
import { BackTop } from "antd"

const isServer = !process.browser

configure({ enforceActions: "observed" })
useStaticRendering(isServer) // NOT `true` value

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

    pageProps.router = router

    return { pageProps }
  }

  render() {
    let { Component, pageProps, store } = this.props
    return (
      <Provider {...store}>
        <div className={"container " + this.state.theme}>
          <Head>
            <title>{SITE.title}</title>
            <meta
              name="description"
              itemprop="description"
              content={SITE.description}
            />
            <meta name="keywords" content={SITE.keywords} />
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1.0,maximum-scale=1.0, user-scalable=0"
            />
          </Head>
          <script src="https://cdn.bootcss.com/wow/1.1.2/wow.min.js"></script>
          <script src="https://img.meek3n.cn/cdn/pace.min.js"></script>
          <script src="https://cdn.bootcss.com/highlight.js/9.15.10/highlight.min.js"></script>
          <link
            href="https://cdn.bootcss.com/animate.css/3.7.2/animate.css"
            rel="stylesheet"
          ></link>
          <Component {...this.props} />
        </div>
        <img
          src="https://ia.51.la/go1?id=20672713&pvFlag=1"
          style={{ opacity: "0", position: "fixed", zIndex: "-2" }}
        ></img>
        <BackTop />
      </Provider>
    )
  }
}

export default withMobx(getStores)(MyApp)
