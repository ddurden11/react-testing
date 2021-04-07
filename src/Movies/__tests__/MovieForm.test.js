import React from "react";
import { render, cleanup, fireEvent, getByText } from "react-testing-library";
import MovieForm from "../MovieForm";

// clean up dom
afterEach(cleanup);

//make a mock on submit function so you cant test that it has been called => spy
const onSubmit = jest.fn();

// spy => spy on function, find out if it was called
// mock => just a fake function

test("<MovieForm />", () => {
  //getByTestId => should be there, break if isnt
  //queryBy => maybe its there, is it here or not?
  const {
    getByTestId,
    debug,
    queryByTestId,
    container,
    getByText,
    getByLabelText,
  } = render(<MovieForm submitForm={onSubmit} />);

  //container can be destructured and can access first child, etc.
  //console.log(container.firstChild);

  expect(queryByTestId("movie-form")).toBeTruthy();

  //get the input element by targeting the text of the label associated with that input element
  getByLabelText("Text").value = "hello";

  // get the input element and fire a change event, just changing the value as above will not automatically call it
  //fireEvent.change(getByLabelText("Text"));
  fireEvent.change(getByLabelText("Text"), {
    target: { value: "hello" },
  });

  fireEvent.click(getByText("Submit"));

  //submit event was fired once
  expect(onSubmit).toHaveBeenCalledTimes(1);

  //submit event was called with a value of 'hello'
  expect(onSubmit).toHaveBeenCalledWith({
    text: "hello",
  });

  //debug();
});
