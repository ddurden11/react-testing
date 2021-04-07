import React, { Component } from "react";
import MovieForm from "./MovieForm";

export default class NewMovie extends Component {
  render() {
    return (
      <div>
        {/* can reuse test ids */}
        <h2 data-testid="page-title">New Movie</h2>
        <MovieForm />
      </div>
    );
  }
}
