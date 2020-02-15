import React from "react"

class Bottom extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div className="block bottom-bar">
          <footer>© 2020 Meeken</footer>
        </div>
        <style jsx>{`
          footer {
            cursor: default;
            user-select: none;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
          }
          .bottom-bar {
            margin: 2rem 0 2rem 0;
          }
        `}</style>
      </div>
    )
  }
}

export default Bottom
