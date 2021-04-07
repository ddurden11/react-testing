import React from "react";
import { render, cleanup, fireEvent, getByText } from "react-testing-library";
import NewMovie from "../NewMovie";

// clean up dom
afterEach(cleanup);

//react-testing-library defaults to full on render vs shallow rendering
//no shallow rendering with RTL

test("<NewMovie />", () => {
  //getByTestId => should be there, break if isnt
  //queryBy => maybe its there, is it here or not?
  const { getByTestId, debug, queryByTestId, container, getByText } = render(
    <NewMovie />
  );

  //container can be destructured and can access first child, etc.
  //console.log(container.firstChild);

  expect(getByTestId("page-title").textContent).toBe("New Movie");
  expect(queryByTestId("movie-form")).toBeTruthy();

  //generate snapshot, or test against an existing snapshot
  expect(container.firstChild).toMatchSnapshot();

  // fireEvent.click(getByText("Submit"));

  // debug();
});
