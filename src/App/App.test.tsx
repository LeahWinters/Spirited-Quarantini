import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
// import { cocktailList, detailCocktailList, sampleCocktail } from '../test-data';
import { getCocktailDetails, getRandomCocktail, getAllCocktails } from "../apiCalls";
import { act } from 'react-dom/test-utils';
import { mocked } from "ts-jest/utils";
jest.mock('../apiCalls');

describe.skip('App', () => {
	beforeEach(() => {
		mocked(getAllCocktails).mockImplementation(() =>
			Promise.resolve([
				{
					idDrink: "14622",
					strDrink: "Arctic Fish",
					strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/ttsvwy1472668781.jpg",
				}
			])
		);

		mocked(getCocktailDetails).mockImplementation(() => 
			Promise.resolve({
				idDrink: "14622",
				strDrink: "Arctic Fish",
				strDrinkAlternate: null,
				strDrinkES: null,
				strDrinkDE: null,
				strDrinkFR: null,
				"strDrinkZH-HANS": null,
				"strDrinkZH-HANT": null,
				strTags: null,
				strVideo: null,
				strCategory: "Punch / Party Drink",
				strIBA: null,
				strAlcoholic: "Alcoholic",
				strGlass: "Beer pilsner",
				strInstructions: "Fill glass with ice and fish, add vodka, grape soda and orange juice. DO NOT STIR!!!!! Serve well chilled.",
				strInstructionsES: null,
				strInstructionsDE: "Das Glas mit Eis und Fisch füllen, Wodka, Traubensaft und Orangensaft hinzufügen. NICHT UMRÜHREN. Gut gekühlt servieren.",
				strInstructionsFR: null,
				"strInstructionsZH-HANS": null,
				"strInstructionsZH-HANT": null,
				strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/ttsvwy1472668781.jpg",
				strIngredient1: "Vodka",
				strIngredient2: "Grape soda",
				strIngredient3: "Orange juice",
				strIngredient4: "Ice",
				strIngredient5: "Candy",
				strIngredient6: null,
				strIngredient7: null,
				strIngredient8: null,
				strIngredient9: null,
				strIngredient10: null,
				strIngredient11: null,
				strIngredient12: null,
				strIngredient13: null,
				strIngredient14: null,
				strIngredient15: null,
				strMeasure1: "1/3 part ",
				strMeasure2: "1/3 part ",
				strMeasure3: "1/3 part ",
				strMeasure4: "lots ",
				strMeasure5: "1 dash ",
				strMeasure6: null,
				strMeasure7: null,
				strMeasure8: null,
				strMeasure9: null,
				strMeasure10: null,
				strMeasure11: null,
				strMeasure12: null,
				strMeasure13: null,
				strMeasure14: null,
				strMeasure15: null,
				strCreativeCommonsConfirmed: "No",
				dateModified: "2016-08-31 19:39:41"
			})
		);

		mocked(getRandomCocktail).mockImplementation(() => 
			Promise.resolve({
				idDrink: "11007",
				strDrink: "Margarita",
				strInstructions:
					"Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
				strDrinkThumb:
					"https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
				strIngredient1: "Vodka",
				strIngredient2: "Grape soda",
				strIngredient3: "Orange juice",
				strIngredient4: "Ice",
				strIngredient5: "Candy",
				strMeasure1: "1/3 part ",
				strMeasure2: "1/3 part ",
				strMeasure3: "1/3 part ",
				strMeasure4: "lots ",
				strMeasure5: "1 dash ",
			})
		);
	})

	it('Renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it('Should be able to login, then be directed to the All Cocktails Page', async () => {
		const { getByLabelText, getByText, getByPlaceholderText, getAllByText } = render(
			<MemoryRouter><App /></MemoryRouter>
		);
		
		await waitFor(() => expect(getAllCocktails).toHaveBeenCalled())

		const nameInput = getByPlaceholderText('username');
		const submitBtn = getByLabelText('over-21-button');
		
		fireEvent.change(nameInput, {target: {value: 'GG'}});
		fireEvent.click(submitBtn);

		const cocktailTitle = await waitFor(() => getByText('Arctic Fish'))
    const detailBtn = await waitFor(() => getByLabelText('details-button'));

		expect(cocktailTitle).toBeInTheDocument();
		expect(detailBtn).toBeInTheDocument();
	});

	it.skip('From the homepage, if Details button is clicked, user should be directed to the CocktailDetails page', async () => {
		const { getByLabelText, getByText, getByPlaceholderText, debug } = render(
			<MemoryRouter><App /></MemoryRouter>
		);
		
		const nameInput = getByPlaceholderText('username');
		const submitBtn = getByLabelText('over-21-button');

		fireEvent.change(nameInput, {target: {value: 'GG'}});
		fireEvent.click(submitBtn);

		const detailsBtn = await waitFor(() => getByText('Make Me'));

		fireEvent.click(detailsBtn);

		debug();

		const detailsInstructions = await waitFor(() => getByText('Fill glass with ice and fish, add vodka, grape soda and orange juice. DO NOT STIR!!!!! Serve well chilled.'));
		expect(detailsInstructions).toBeInTheDocument();
	});
})