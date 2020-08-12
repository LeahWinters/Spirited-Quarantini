import React from "react";
import Dashboard from "./Dashboard";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getRandomCocktail } from "../apiCalls";
import { cocktailInfo } from '../test-data';
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

  it("should let the user know the cocktailInfo of the day", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <Dashboard randomCocktail={cocktailInfo} error={''} />
      </MemoryRouter>
    );

    const dailyCocktail = getByText("Cocktail of the Day");
    expect(dailyCocktail).toBeInTheDocument();
  });

  it("should display a drink name of the day", async () => {
    const { getByText, getByAltText } = render(
      <MemoryRouter>
        <Dashboard randomCocktail={cocktailInfo} error={''} />
      </MemoryRouter>
    );

    const drinkName = await waitFor(() => getByText('Arctic Fish'));
    
    expect(drinkName).toBeInTheDocument();
  });

  it("should display a drink image of the day", async () => {
    const { getByText, getByAltText } = render(
      <MemoryRouter>
        <Dashboard randomCocktail={cocktailInfo} error={''} />
      </MemoryRouter>
    );

    const drinkImg = await waitFor(() => getByAltText('Arctic Fish'));
    
    expect(drinkImg).toBeInTheDocument();
  });

  it("should display the drink card button", async () => {
    const { getByText, getByAltText } = render(
      <MemoryRouter>
        <Dashboard randomCocktail={cocktailInfo} error={''} />
      </MemoryRouter>
    );

    const button = await waitFor(() => getByText('Make Me'));
    
    expect(button).toBeInTheDocument();    
	});
	
	it("if the server drops, an error message should display for the user", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Dashboard randomCocktail={cocktailInfo} error={'Error'} />
      </MemoryRouter>
		);
		
		const errorMsg = getByText("404: No cocktail found");

    expect(errorMsg).toBeInTheDocument();
	});
});
