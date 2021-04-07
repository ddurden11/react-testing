import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
  getByText,
} from "react-testing-library";
import { MemoryRouter } from "react-router-dom";

import MoviesList from "../MoviesList";

//mock fetch method of window global using jest-fetch-mock package
global.fetch = require("jest-fetch-mock");

// clean up dom
afterEach(() => {
  cleanup();
});

const movies = {
  success: true,
  results: [
    {
      id: "1",
      title: "movie1",
      poster_path: "test1.jpg",
      release_date: "1234",
      overview: "this is a movie1",
    },
    {
      id: "2",
      title: "movie2",
      poster_path: "test2.jpg",
      release_date: "12345",
      overview: "this is a movie2",
    },
    {
      id: "3",
      title: "movie3",
      poster_path: "test3.jpg",
      release_date: "123456",
      overview: "this is a movie3",
    },
  ],
};

const movie = movies.results[0];

test("<MovieList />", async () => {
  fetch.mockResponseOnce(JSON.stringify(movies));

  const {
    debug,
    getByTestId,
    getByText,
    getByAltText,
    queryByTestId,
    getAllByTestId,
  } = render(
    <MemoryRouter>
      <MoviesList />
    </MemoryRouter>
  );

  // the component should be in a loading state before the data is loaded
  //using getBy because it should be there
  expect(getByTestId("loading")).toBeTruthy();

  await waitForElement(() => getByTestId("movie-link"));

  //using queryBy because it should not be there
  expect(queryByTestId("loading")).toBeFalsy();

  //in this case we dont need to do a whole lot of tests because we tested more thoroughly inside of movie.test
  //expect that a deeply nested component has rendered therefore component has showed up
  expect(getByTestId("movie-link").getAttribute("href")).toBe("/" + movie.id);

  //console.log(getAllByTestId("movie-link").length);
  //make sure all the data is there
  expect(getAllByTestId("movie-link").length).toBe(movies.results.length);

  //   movies.results.forEach((movie) => {
  //     expect(getByAltText(movie.title)).toBeTruthy();
  //   });

  //debug();
});

test("<MovieList /> api fail", async () => {
  movies.success = false;
  fetch.mockResponseOnce(JSON.stringify(movies));

  const {
    debug,
    getByTestId,
    getByText,
    getByAltText,
    queryByTestId,
    getAllByTestId,
  } = render(
    <MemoryRouter>
      <MoviesList />
    </MemoryRouter>
  );

  // the component should be in a loading state before the data is loaded
  //using getBy because it should be there
  expect(getByTestId("loading")).toBeTruthy();
});
