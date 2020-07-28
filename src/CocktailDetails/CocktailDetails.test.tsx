import React from "react";
import CocktailDetails from "./CocktailDetails";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getCocktailDetails } from "../apiCalls";
import { cocktail } from "../test-data";
import { mocked } from "ts-jest/utils";
jest.mock("../apiCalls");

describe("CocktailDetails", () => {
  mocked(getCocktailDetails).mockImplementation(() =>
    Promise.resolve({
      idDrink: "11007",
      strDrink: "Margarita",
      strInstructions:
        "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
      strDrinkThumb:
				"https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",		
      strIngredient1: "Vodka",
// strIngredient2
// "Grape soda"
// strIngredient3
// "Orange juice"
// strIngredient4
// "Ice"
// strIngredient5
// "Candy"
strMeasure1:"1/3 part "
// strMeasure2
// "1/3 part "
// strMeasure3
// "1/3 part "
// strMeasure4
// "lots "
// strMeasure5
// "1 dash "

    })
  );

  it("Should display the fetched cocktail title", async () => {
    const mockToggle = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <CocktailDetails
          id={"11007"}
          favCocktails={[]}
          setFavCocktails={Function}
          toggleUserInteraction={mockToggle}
          madeCocktails={[]}
          setMadeCocktails={Function}
        />
      </MemoryRouter>
    );

    const detailTitle = await waitFor(() => getByText("Margarita"));

    expect(detailTitle).toBeInTheDocument();
  });

  it("Should display the fetched cocktail image", async () => {
    const mockToggle = jest.fn();
    const { getByAltText } = render(
      <MemoryRouter>
        <CocktailDetails
          id={"11007"}
          favCocktails={[]}
          setFavCocktails={Function}
          toggleUserInteraction={mockToggle}
          madeCocktails={[]}
          setMadeCocktails={Function}
        />
      </MemoryRouter>
    );

    const detailImage = await waitFor(() => getByAltText("Margarita"));

    expect(detailImage).toBeInTheDocument();
  });

  it("Should display the fetched cocktail instructions", async () => {
    const mockToggle = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <CocktailDetails
          id={"11007"}
          favCocktails={[]}
          setFavCocktails={Function}
          toggleUserInteraction={mockToggle}
          madeCocktails={[]}
          setMadeCocktails={Function}
        />
      </MemoryRouter>
    );

    const detailInstructions = await waitFor(() =>
      getByText(
        "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass."
      )
    );

    expect(detailInstructions).toBeInTheDocument();
  });

  it("Should display the fetched cocktail ingredients matched with their measure", async () => {
    const mockToggle = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <CocktailDetails
          id={"14622"}
          favCocktails={[]}
          setFavCocktails={Function}
          toggleUserInteraction={mockToggle}
          madeCocktails={[]}
          setMadeCocktails={Function}
        />
      </MemoryRouter>
    );

    const ingredient1 = await waitFor(() => getByText("Vodka"));
    const ingredient2 = await waitFor(() => getByText("1/3 part"));
    // const ingredient2 = await waitFor(() => getByText("Grape soda 1/3 part"));
    // const ingredient3 = await waitFor(() => getByText("Orange juice 1/3 part"));
    // const ingredient4 = await waitFor(() => getByText("Ice lots"));
    // const ingredient5 = await waitFor(() => getByText("Candy 1 dash"));

    expect(ingredient1).toBeInTheDocument();
    expect(ingredient2).toBeInTheDocument();
    // expect(ingredient2).toBeInTheDocument();
    // expect(ingredient3).toBeInTheDocument();
    // expect(ingredient4).toBeInTheDocument();
    // expect(ingredient5).toBeInTheDocument();
  });
});
