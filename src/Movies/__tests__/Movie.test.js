import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import { MemoryRouter } from "react-router-dom";
import Movie, { POSTER_PATH } from "../Movie";

// clean up dom
afterEach(() => {
  cleanup();

  //mockClear => reset the mock spy stuff
  console.error.mockClear();
});

//mock console.error

//this must be reset after a test otherwise the spy counter will keep counting and the "toHaveBeenCalled" tests will give unexpected results
console.error = jest.fn();

//test movie component with no movie
test("<Movie />", () => {
  //using render without setting it to a variable
  render(<Movie />);

  //expect an error to exist
  // toBeCalled() ~ toHaveBeenCalled()
  //expect(console.error).toBeCalled();
  expect(console.error).toHaveBeenCalledTimes(1);
});

//use mocked data instead of hitting an api endpoint
const movie = {
  id: "hi",
  title: "testing",
  poster_path: "blahblah.jpg",
};

//test movie component with a movie loaded into it
test("<Movie /> with movie", () => {
  //using render without setting it to a variable
  const { debug, getByTestId } = render(
    <MemoryRouter>
      <Movie movie={movie} />
    </MemoryRouter>
  );

  //debug();

  //expect an error to exist
  // toBeCalled() ~ toHaveBeenCalled()
  //negative assertion
  expect(console.error).not.toBeCalled();
  //expect(console.error).not.toHaveBeenCalledTimes(1);

  //ask yourself - what are the implementation details? What are the things that make this what it is? Dont just test that react is doing its job. Test that stuff is doing what the user expects it to do
  //getAttribute('href') => relative href vs .href => full url
  //movie component is primarily a link => primary functionality is that it links where we want to link
  expect(getByTestId("movie-link").getAttribute("href")).toBe("/" + movie.id);
  expect(getByTestId("movie-image").getAttribute("src")).toBe(
    POSTER_PATH + movie.poster_path
  );

  //what is the most important about a component? test that.
});
