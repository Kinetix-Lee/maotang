import React from "react"
import { observer, inject } from "mobx-react"
import Link from "next/link"

@inject("mainStore")
@observer
class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav className="nav-bar">
        <div className="wrapper nav">
          <div className="nav-title">
            <Link href="/">
              <a>猫汤</a>
            </Link>
          </div>
          <ul className="nav-list">
            {this.props.mainStore.menu.map(item => {
              return (
                <li key={item.href}>
                  <Link href={item.href}>
                    <a>{item.context}</a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavBar
