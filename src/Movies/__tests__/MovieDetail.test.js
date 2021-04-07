import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
} from "react-testing-library";

import MovieDetail from "../MovieDetail";
import { POSTER_PATH } from "../Movie";

//mock fetch method of window global using jest-fetch-mock package
global.fetch = require("jest-fetch-mock");

// clean up dom
afterEach(() => {
  cleanup();
});

const match = {
  params: {
    id: "test",
  },
};

console.error = jest.fn();

//make test less fragile
const movie = {
  id: "hi",
  title: "test!",
  poster_path: "test.jpg",
  release_date: "1234",
  overview: "this is a movie",
};

test("<MovieDetail />", async () => {
  //BEFORE USING AYSNC UTILITY

  //set up fake response for fetch mock using imported library
  //   fetch.mockResponseOnce(
  //     JSON.stringify({
  //       movie: {
  //         id: "hi",
  //         title: "test!",
  //       },
  //     })
  //   );
  //   const { debug } = render(<MovieDetail match={match} />);

  //   //movie details wont show up in debug because fetch is async in nature. more stuff needs to be done to handle it
  //   debug();

  // AFTER USING ASYNC UTILITY

  //make sure data for fake fetch is the same shape as component is expecting
  //   fetch.mockResponseOnce(
  //     JSON.stringify({
  //       id: "hi",
  //       title: "test!",
  //     })
  //   );

  //make test less fragile
  fetch.mockResponseOnce(JSON.stringify(movie));
  const { debug, getByText, getByTestId } = render(
    <MovieDetail match={match} />
  );

  //trying this will result in error since it wont be able to find the title
  //getbytestid throws an error if item not found
  //const movieTitle = getByTestId('movie-title')

  //waitForElement can be used to wait for an async request to finish
  //   await waitForElement(() => getByText("test!"));
  await waitForElement(() => getByTestId("movie-title"));

  //   expect(getByTestId("movie-title").textContent).toBe("test!");

  //make test less brittle - whatever data is passed into mock fetch, is what the data should be. Vs using a string you think it will be
  expect(getByTestId("movie-title").textContent).toBe(movie.title);
  expect(getByTestId("movie-image").getAttribute("alt")).toBe(movie.title);
  expect(getByTestId("movie-image").getAttribute("src")).toBe(
    POSTER_PATH + movie.poster_path
  );
  expect(getByTestId("movie-date").textContent).toBe(movie.release_date);
  expect(getByTestId("movie-overview").textContent).toBe(movie.overview);
  //debug();
});
