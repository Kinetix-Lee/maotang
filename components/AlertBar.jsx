import React from "react"

class AlertBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="wrapper">
        <div className="block alert-bar">
          <h3>{this.props.info}</h3>
        </div>
      </div>
    )
  }
}

export default AlertBar
