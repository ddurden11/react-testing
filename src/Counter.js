import React, { Component } from "react";

export default class Counter extends Component {
  state = {
    count: 0,
  };

  //parenthesis wrapped around brakcet otherwise will expect another return value

  count = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  render() {
    const { count } = this.state;
    return (
      <div className="counter">
        <button data-testid="counter-button" onClick={this.count}>
          {count}
        </button>
      </div>
    );
  }
}
