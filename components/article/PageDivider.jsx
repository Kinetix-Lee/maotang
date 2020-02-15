import React from "react"
import { Pagination } from "antd"
import { observer, inject } from "mobx-react"

@inject("mainStore")
@observer
class PageDivider extends React.Component {
  state = {
    current: 1,
    pageSize: 10,
    isXsWindow: 1
  }

  constructor(props) {
    super(props)
  }

  onChange = e => {
    // if (e.current) {
    //   this.setState({
    //     current: e.current
    //   })
    //   this.props.router.push("/page/" + e.current)
    // }
  }

  componentWillReceiveProps() {
    if (
      this.props.router &&
      this.props.router.action &&
      this.props.router.action === "PUSH" &&
      this.props.router.location.pathname
    ) {
      let page = this.props.router.location.pathname
      if (typeof page == "string") {
        page = page.replace("/page/", "")
      }
      if (page >= 1) {
        this.getUrlPage(page * 1)
      }
    }
  }

  getUrlPage = page => {
    this.setState({
      current: page
    })
    this.props.mainStore.getArticleList(page)
  }

  render() {
    return (
      <div className="wrapper">
        <div
          className={
            "block page-divider " +
            (this.state.isXsWindow ? " small-divider" : "")
          }
        >
          <Pagination
            size={this.state.isXsWindow ? "small" : ""}
            defaultCurrent={6}
            total={500}
          />
        </div>

        <style jsx>{`
          .page-divider {
            margin: 2rem 0;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            filter: grayscale(100%) !important;
            filter: #282c32 !important;

            user-select: none !important;
          }

          .zent-btn {
            background-color: inherit !important;
          }

          .container.light .zent-btn-primary {
            border: none !important;
            font-weight: bold;
          }

          .container.dark .page-divider {
            opacity: 0.6;
          }
        `}</style>
      </div>
    )
  }

  componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let page = this.props.match.params.id

      if (page >= 1) {
        this.getUrlPage(page * 1)
      }
    }

    // this.setState({
    //   isXsWindow: window.innerWidth <= 768 ? 1 : 0
    // })
  }
}

export default PageDivider
