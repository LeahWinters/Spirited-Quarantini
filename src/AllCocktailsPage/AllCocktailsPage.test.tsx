import React from "react";
import AllCocktailsPage from "./AllCocktailsPage";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getAllCocktails } from "../apiCalls";
import { cocktailList } from '../test-data';
import { mocked } from "ts-jest/utils";
import { debug } from "console";
jest.mock("../apiCalls");

describe("AllCocktailsPage", () => {
//   mocked(getAllCocktails).mockImplementation(() =>
//   Promise.resolve( { [{
//     strDrink: '57 Chevy with a White License Plate',
//     strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg',
//     idDrink: '14029'
//     }]
//   })
// );

  it("should show a list of cocktails someone can make", async () => {
    const { getAllByAltText } = render(
      <MemoryRouter>
        <AllCocktailsPage givenCocktails={cocktailList} error={''} />
      </MemoryRouter>
    );

    const cocktail = await waitFor(() => getAllByAltText('Arctic Fish'));
    expect(cocktail.length).toEqual(1);
    expect(cocktail[0]).toBeInTheDocument();
  });

  it("should display all drink cards", async () => {
    const { getByText, getAllByText, getByAltText } = render(
      <MemoryRouter>
        <AllCocktailsPage givenCocktails={cocktailList} error={''} />
      </MemoryRouter>
    );

    const drinkName = await waitFor(() => getByText('Arctic Fish'));
    const drinkImg = await waitFor(() => getByAltText('Arctic Fish'));
    const allBtns = await waitFor(() => getAllByText('Make Me'));

		expect(drinkName).toBeInTheDocument();
    expect(drinkImg).toBeInTheDocument();
    expect(allBtns.length).toEqual(2);
	});
	
	it("if the server drops, an error message should display for the user", () => {
    const { getByText } = render(
      <MemoryRouter>
        <AllCocktailsPage givenCocktails={cocktailList} error={'Error'} />
      </MemoryRouter>
		);
		
		const errorMsg = getByText("404: No cocktails found");

		expect(errorMsg).toBeInTheDocument();
	});
	
	it("if a user has no favorites, but is on the view favorites page, a message will display", () => {
    const { getByText } = render(
      <MemoryRouter>
        <AllCocktailsPage givenCocktails={[]} error={''} />
      </MemoryRouter>
		);
		
		const errorMsg = getByText("No cocktails saved in this category.");

		expect(errorMsg).toBeInTheDocument();
	});
})