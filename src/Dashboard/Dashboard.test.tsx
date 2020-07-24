import React from "react";
import Dashboard from "./Dashboard";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getRandomCocktail } from "../apiCalls";
import { mocked } from "ts-jest/utils";
jest.mock("../apiCalls");

describe("Dashboard", () => {
  mocked(getRandomCocktail).mockImplementation(() =>
  Promise.resolve({
    idDrink: "11007",
    strDrink: "Margarita",
    strInstructions: "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
    strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
  })
);

  it("should show a welcome message", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <Dashboard username={"Temp Name"} />
      </MemoryRouter>
    );

    const welcomeMessage = await waitFor(() => getByText("Welcome Temp Name!"));
    expect(welcomeMessage).toBeInTheDocument();
  });

  it("should let the user know it's the cocktail of the day", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <Dashboard username={"Temp Name"} />
      </MemoryRouter>
    );

    const dailyCocktail = await waitFor(() => getByText("Cocktail of the Day"));
    expect(dailyCocktail).toBeInTheDocument();
  });

  it("should display a drink card", async () => {
    const { getByText, getByRole, getByAltText, container } = render(
      <MemoryRouter>
        <Dashboard username={"Temp Name"} />
      </MemoryRouter>
    );

    const drinkName = await waitFor(() => getByText('Margarita'))
    const drinkImg = await waitFor(() => getByAltText('Margarita'))
    const button = await waitFor(() => getByRole('button', {name: 'More details'}))
    
    expect(drinkName).toBeInTheDocument();
    expect(drinkImg).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
