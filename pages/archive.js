import React from "react"
import NavBar from "../components/NavBar"
import AlertBar from "../components/AlertBar"
import Bottom from "../components/Bottom"
import Head from "next/head"
import { site as SITE } from "../public/static/config/mao.tang.json"
import ArchiveContainer from "../components/archive/ArchiveContainer"

import { observer, inject } from "mobx-react"

@inject("mainStore")
@observer
class Archive extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const list = this.props.mainStore.getArchiveList()
    return (
      <div className="App main-page">
        <Head>
          <title>{`归档 - ${SITE.title}`}</title>
        </Head>
        <NavBar />
        <AlertBar info="归档" />
        <ArchiveContainer list={list} />
        <div className="block page-divider"></div>
        <Bottom show={true} />
      </div>
    )
  }
}

export default Archive
