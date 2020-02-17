import React, { Component } from "react";

//help function which displays 'help' info to user
export default class Help extends Component {
  render() {
    return (
      <div className="popUp">
        <div className="popup\_inner">
          <p>{this.props.text}</p>
          <button onClick={this.props.closePopup}>Close</button>
        </div>
      </div>
    );
  }
}
