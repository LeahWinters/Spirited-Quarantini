import React from "react";
import AllCocktailsPage from "./AllCocktailsPage";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getAllCocktails } from "../apiCalls";
import { mocked } from "ts-jest/utils";
jest.mock("../apiCalls");

describe("AllCocktailsPage", () => {
  mocked(getAllCocktails).mockImplementation(() =>
  Promise.resolve( {drinks: [{
    strDrink: '57 Chevy with a White License Plate',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg',
    idDrink: '14029'
    }]
  })
);

  it("should show a list of cocktails someone can make", async () => {
    const { getAllByAltText } = render(
      <MemoryRouter>
        <AllCocktailsPage />
      </MemoryRouter>
    );

    const cocktail = await waitFor(() => getAllByAltText('57 Chevy with a White License Plate'));
    expect(cocktail.length).toEqual(1);
    expect(cocktail[0]).toBeInTheDocument();
  });

  it("should display a drink card", async () => {
    const { getByText, getByRole, getByAltText } = render(
      <MemoryRouter>
        <AllCocktailsPage />
      </MemoryRouter>
    );

    const drinkName = await waitFor(() => getByText('57 Chevy with a White License Plate'))
    const drinkImg = await waitFor(() => getByAltText('57 Chevy with a White License Plate'))
    const button = await waitFor(() => getByRole('button', {name: 'Make Me!'}))
    
    expect(drinkName).toBeInTheDocument();
    expect(drinkImg).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  })
})