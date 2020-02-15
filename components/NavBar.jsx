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
            <span>猫汤</span>
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
        <style jsx="true">{`
          nav.nav-bar {
            width: 100%;
            border-bottom: 1px;
            padding: 4em;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            user-select: none;
          }

          .nav {
            width: 100%;
            margin: 0 auto;
            max-width: 1200px;
          }

          .nav-title {
            font-size: 2rem;
            text-align: center;
          }

          ul.nav-list {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            line-height: 4rem;
          }

          ul.nav-list li {
            margin: 0 0.5rem;
          }
        `}</style>
      </nav>
      // <div>nmsl</div>
    )
  }
}

export default NavBar
