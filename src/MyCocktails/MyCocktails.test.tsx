import React from "react";
import MyCocktails from "./MyCocktails";
import "@testing-library/jest-dom";
import {
  render,
  fireEvent,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe.skip("MyCocktails", () => {
  it("should have two buttons displayed", () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <MyCocktails />
      </MemoryRouter>
    );

    const favButton = getByLabelText("favorites");
    const loggedButton = getByLabelText("logged-drinks");

    expect(favButton).toBeInTheDocument();
    expect(loggedButton).toBeInTheDocument();
  });

});
