import React from "react"
import NavBar from "../components/NavBar"
import Bottom from "../components/Bottom"
import Head from "next/head"
import { site as SITE } from "../public/static/config/mao.tang.json"

import { observer, inject } from "mobx-react"

@inject("mainStore")
@observer
class Category extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <Head>
          <title>{`2020/02 - ${SITE.title}`}</title>
        </Head>
        <NavBar />
        <Bottom show={true} />
      </div>
    )
  }
}

export default Category
