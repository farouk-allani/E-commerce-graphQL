import React, { Component } from "react";
import "./Popup.css";

export class Popup extends Component {
  render() {
    return this.props.trigger ? (
      <div className="popup-inner">{this.props.children}</div>
    ) : (
      ""
    );
  }
}

export default Popup;
