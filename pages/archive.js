import React from "react"
import NavBar from "../components/NavBar"
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
      <div className="App">
        <Head>
          <title>{`归档 - ${SITE.title}`}</title>
        </Head>
        <NavBar />
        <ArchiveContainer list={list} />
        <Bottom show={true} />
      </div>
    )
  }
}

export default Archive
