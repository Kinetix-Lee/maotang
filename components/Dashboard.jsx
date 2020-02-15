import React from "react"
import ReactDOM from "react-dom"

class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard-container" draggable ref="dashboard">
        <div className="dashboard-box">
          <div className="dashboard-title"></div>
        </div>
        <style jsx>{`
          .dashboard-container {
            width: 100%;
            max-width: 1024px;
            height: 500px;
            border: 1px solid #0e0d0d;
            overflow: hidden;
            border-radius: 8px;
          }

          .dark .dashboard-container {
            box-shadow: 0px 0px 10px #2f333a;
          }

          .light .dashboard-container {
            box-shadow: 0px 0px 10px #fafafa;
          }

          .dashboard-box {
            width: 100%;
            height: 100%;
            background: #060708d3;
            overflow: hidden;
            border-radius: 6px;
            border-top: 1px solid #77797e;
          }

          .dashboard-title {
            width: 100%;
            height: 36px;
            background-image: linear-gradient(to top, #3e4147, #43474d);
          }
        `}</style>
      </div>
    )
  }
}

export default Dashboard
