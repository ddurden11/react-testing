import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";

import Counter from "./Counter";

//function that runs after every single test
//unmount everything from the dom => give tests a clean slate
afterEach(cleanup);

//mocking modules
// jest.mock("./add", () => ({
//   add: jest.fn(),
// }));

// changing implementation:
// add.mockImplementation(() => 30)

// spy
// add.toHaveBeenCalledTimes(1)

test("<Counter />", () => {
  //render(<Counter />)

  //can destructure wrapper here to avoid having to write more code
  //const wrapper = render(<Counter />);
  const { debug, getByTestId, g } = render(<Counter />);

  //output dom nodes in console
  //wrapper.debug();

  //debug();

  //get dom node and print dom node
  // this is great because you can interact with the dom node like you would in regular javascript
  //console.log(wrapper.getByText("0").textContent);

  //expect(wrapper.getByText("0").tagName).toBe("BUTTON");

  //can also use querySelector
  //console.log(document.querySelector("button").textContent);

  //expect(document.querySelector("button").tagName).toBe("BUTTON");

  //before destructuring wrapper
  //   expect(wrapper.getByTestId("counter-button").tagName).toBe("BUTTON");
  //   expect(wrapper.getByTestId("counter-button").textContent).toBe("0");

  //after destructuring wrapper

  //using test ids
  //counter button is a button
  //expect(getByTestId("counter-button").tagName).toBe("BUTTON");

  //counter button starts at 0
  //expect(getByTestId("counter-button").textContent).toBe("0");

  const counterButton = getByTestId("counter-button");

  expect(counterButton.tagName).toBe("BUTTON");
  expect(counterButton.textContent).toBe("0");

  //fireEvent allows us to interact with a dom node by performing an event
  fireEvent.click(counterButton);
  expect(counterButton.textContent).toBe("1");

  fireEvent.click(counterButton);
  expect(counterButton.textContent).toBe("2");
});
