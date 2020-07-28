import React from "react";
import About from "./About";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("About", () => {
  it("Should display about info with a picture", async () => {
    const { getByText, getByAltText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const aboutInfo = (() => getByText("Margarita"));

    expect(detailTitle).toBeInTheDocument();
  })
})