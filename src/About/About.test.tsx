import React from "react";
import About from "./About";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("About", () => {
  it("Should display about info with a picture", () => {
    const { getByText, getByAltText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const aboutInfo = getByText("Spirited Quarantini was created by a team of four women who got tired of having the same boring cocktails every zoom happy hour. We wanted to help others learn how to bartend from the comfort of their own home. There are over 100 recipes to learn how to make delicious, beautiful, and refreshing alcoholic beverages with confidence. Happy mixing!");
    const aboutImg = getByAltText("")
    expect(aboutInfo).toBeInTheDocument();
  })
})