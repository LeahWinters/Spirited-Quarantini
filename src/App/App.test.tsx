import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { getCocktailDetails, getRandomCocktail, getAllCocktails } from "../apiCalls";
import { act } from 'react-dom/test-utils';
import { cocktailList } from '../test-data';
import { mocked } from "ts-jest/utils";
jest.mock('../apiCalls');

describe('App', () => {
	mocked(getAllCocktails).mockImplementation(() =>
  	Promise.resolve(cocktailList)
	);

	mocked(getCocktailDetails).mockImplementation(() => 
		Promise.resolve([
			{
				"idDrink": "14622",
				"strDrink": "Arctic Fish",
				"strDrinkAlternate": null,
				"strDrinkES": null,
				"strDrinkDE": null,
				"strDrinkFR": null,
				"strDrinkZH-HANS": null,
				"strDrinkZH-HANT": null,
				"strTags": null,
				"strVideo": null,
				"strCategory": "Punch / Party Drink",
				"strIBA": null,
				"strAlcoholic": "Alcoholic",
				"strGlass": "Beer pilsner",
				"strInstructions": "Fill glass with ice and fish, add vodka, grape soda and orange juice. DO NOT STIR!!!!! Serve well chilled.",
				"strInstructionsES": null,
				"strInstructionsDE": "Das Glas mit Eis und Fisch füllen, Wodka, Traubensaft und Orangensaft hinzufügen. NICHT UMRÜHREN. Gut gekühlt servieren.",
				"strInstructionsFR": null,
				"strInstructionsZH-HANS": null,
				"strInstructionsZH-HANT": null,
				"strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/ttsvwy1472668781.jpg",
				"strIngredient1": "Vodka",
				"strIngredient2": "Grape soda",
				"strIngredient3": "Orange juice",
				"strIngredient4": "Ice",
				"strIngredient5": "Candy",
				"strIngredient6": null,
				"strIngredient7": null,
				"strIngredient8": null,
				"strIngredient9": null,
				"strIngredient10": null,
				"strIngredient11": null,
				"strIngredient12": null,
				"strIngredient13": null,
				"strIngredient14": null,
				"strIngredient15": null,
				"strMeasure1": "1/3 part ",
				"strMeasure2": "1/3 part ",
				"strMeasure3": "1/3 part ",
				"strMeasure4": "lots ",
				"strMeasure5": "1 dash ",
				"strMeasure6": null,
				"strMeasure7": null,
				"strMeasure8": null,
				"strMeasure9": null,
				"strMeasure10": null,
				"strMeasure11": null,
				"strMeasure12": null,
				"strMeasure13": null,
				"strMeasure14": null,
				"strMeasure15": null,
				"strCreativeCommonsConfirmed": "No",
				"dateModified": "2016-08-31 19:39:41"
			},
			{
				"idDrink": "14564",
				"strDrink": "A Splash of Nash",
				"strDrinkAlternate": null,
				"strDrinkES": null,
				"strDrinkDE": null,
				"strDrinkFR": null,
				"strDrinkZH-HANS": null,
				"strDrinkZH-HANT": null,
				"strTags": null,
				"strVideo": null,
				"strCategory": "Shot",
				"strIBA": null,
				"strAlcoholic": "Alcoholic",
				"strGlass": "Highball glass",
				"strInstructions": "Drop shot glass with banana & melon liquers into a 9 oz hi- ball glass containing soda water and cranberry juice. Drink in one shot.",
				"strInstructionsES": null,
				"strInstructionsDE": "Lassen Sie das Schnapsglas mit Bananen- und Melonenliköre in ein 27 cl. Hi-Ball Glas mit Sodawasser und Preiselbeersaft fallen. Trinken Sie in einem Zug.",
				"strInstructionsFR": null,
				"strInstructionsZH-HANS": null,
				"strInstructionsZH-HANT": null,
				"strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/rsvtrr1472668201.jpg",
				"strIngredient1": "Cranberry juice",
				"strIngredient2": "Soda water",
				"strIngredient3": "Midori melon liqueur",
				"strIngredient4": "Creme de Banane",
				"strIngredient5": null,
				"strIngredient6": null,
				"strIngredient7": null,
				"strIngredient8": null,
				"strIngredient9": null,
				"strIngredient10": null,
				"strIngredient11": null,
				"strIngredient12": null,
				"strIngredient13": null,
				"strIngredient14": null,
				"strIngredient15": null,
				"strMeasure1": "2 oz ",
				"strMeasure2": "2 oz ",
				"strMeasure3": "0.5 oz ",
				"strMeasure4": "0.5 oz ",
				"strMeasure5": null,
				"strMeasure6": null,
				"strMeasure7": null,
				"strMeasure8": null,
				"strMeasure9": null,
				"strMeasure10": null,
				"strMeasure11": null,
				"strMeasure12": null,
				"strMeasure13": null,
				"strMeasure14": null,
				"strMeasure15": null,
				"strCreativeCommonsConfirmed": "No",
				"dateModified": "2016-08-31 19:30:01"
			}
		])
	)

	// getRandomCocktail.mockResolvedValue(() => {
	// 	return cocktail;
	// });

	it('Renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it('Should be able to login, then be directed to the All Cocktails Page', async () => {
		const { getByLabelText, getByText, getByPlaceholderText, getAllByText, debug } = render(<MemoryRouter><App /></MemoryRouter>);

		const nameInput = getByPlaceholderText('username');
		const submitBtn = getByLabelText('over-21-button');

		act(() => {
			fireEvent.change(nameInput, {target: {value: 'GG'}});
			fireEvent.click(submitBtn);
		});
		debug();
		const cocktailTitle = await waitFor(() => getByText('A Splash of Nash'));
    const allBtns = await waitFor(() => getAllByText('Make Me'));

		expect(cocktailTitle).toBeInTheDocument();
    expect(allBtns.length).toEqual(2);
	});

	it.skip('From the homepage, if Details button is clicked, user should be directed to the CocktailDetails page', async () => {
		const { getByLabelText, getByText, getByPlaceholderText, getAllByText, debug } = render(<MemoryRouter><App /></MemoryRouter>);
		
		const nameInput = getByPlaceholderText('username');
		const submitBtn = getByLabelText('over-21-button');

		act(() => {
			fireEvent.change(nameInput, {target: {value: 'GG'}});
			fireEvent.click(submitBtn);
		})

		const detailsBtn = await waitFor(() => getAllByText('Make Me'));
	
		act(() => {
			fireEvent.click(detailsBtn[0]);
		})
		debug();

		const detailsInstructions = await waitFor(() => getByText('Fill glass with ice and fish, add vodka, grape soda and orange juice. DO NOT STIR!!!!! Serve well chilled.'));
		expect(detailsInstructions).toBeInTheDocument();
	});
})