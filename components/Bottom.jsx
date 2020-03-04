import React from "react"
import { observer, inject } from "mobx-react"

@inject("mainStore")
@observer
class Bottom extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="wrapper">
        <div
          className={
            "block bottom-bar " +
            (this.props.show ||
            (this.props.mainStore.articleList &&
              this.props.mainStore.articleList.length > 0)
              ? "wow fadeIn animated"
              : "")
          }
        >
          <footer>
            <a href="https://meek3n.cn">© 2020 Meeken</a>
          </footer>
        </div>
      </div>
    )
  }
}

export default Bottom
