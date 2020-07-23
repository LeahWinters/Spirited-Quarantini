import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { getCocktailDetails, getRandomCocktail } from "../apiCalls";
import { act } from 'react-dom/test-utils';
jest.mock('../apiCalls');

describe('App', () => {
	getCocktailDetails.mockResolvedValue(() => {
		return {
			dateModified: "2016-08-31 19:39:41",
			idDrink: "14622",
			strAlcoholic: "Alcoholic",
			strCategory: "Punch / Party Drink",
			strCreativeCommonsConfirmed: "No",
			strDrink: "Arctic Fish",
			strDrinkAlternate: null,
			strDrinkDE: null,
			strDrinkES: null,
			strDrinkFR: null,
			'strDrinkThumb': "https://www.thecocktaildb.com/images/media/drink/ttsvwy1472668781.jpg",
			'strDrinkZH-HANS': null,
			'strDrinkZH-HANT': null,
			strGlass: "Beer pilsner",
			strIBA: null,
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
			strInstructions: "Fill glass with ice and fish, add vodka, grape soda and orange juice. DO NOT STIR!!!!! Serve well chilled.",
			strInstructionsDE: "Das Glas mit Eis und Fisch füllen, Wodka, Traubensaft und Orangensaft hinzufügen. NICHT UMRÜHREN. Gut gekühlt servieren.",
			strInstructionsES: null,
			strInstructionsFR: null,
			'strInstructionsZH-HANS': null,
			'strInstructionsZH-HANT': null,
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
			strTags: null,
			strVideo: null
		}
	});

	getRandomCocktail.mockResolvedValue(() => {
		return {
			dateModified: "2016-08-31 19:39:41",
			idDrink: "14622",
			strAlcoholic: "Alcoholic",
			strCategory: "Punch / Party Drink",
			strCreativeCommonsConfirmed: "No",
			strDrink: "Arctic Fish",
			strDrinkAlternate: null,
			strDrinkDE: null,
			strDrinkES: null,
			strDrinkFR: null,
			'strDrinkThumb': "https://www.thecocktaildb.com/images/media/drink/ttsvwy1472668781.jpg",
			'strDrinkZH-HANS': null,
			'strDrinkZH-HANT': null,
			strGlass: "Beer pilsner",
			strIBA: null,
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
			strInstructions: "Fill glass with ice and fish, add vodka, grape soda and orange juice. DO NOT STIR!!!!! Serve well chilled.",
			strInstructionsDE: "Das Glas mit Eis und Fisch füllen, Wodka, Traubensaft und Orangensaft hinzufügen. NICHT UMRÜHREN. Gut gekühlt servieren.",
			strInstructionsES: null,
			strInstructionsFR: null,
			'strInstructionsZH-HANS': null,
			'strInstructionsZH-HANT': null,
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
			strTags: null,
			strVideo: null
		}
	});

	it('Renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it('Should be able to login, then be directed to the Dashboard', async () => {
		const { getByLabelText, getByText, getByPlaceholderText, debug } = render(<MemoryRouter><App /></MemoryRouter>);

		const nameInput = getByPlaceholderText('username');
		const submitBtn = getByLabelText('over-21-button');

		act(() => {
			fireEvent.change(nameInput, {target: {value: 'GG'}});
			fireEvent.click(submitBtn);
		})

		const dashboardTitle = getByText('Cocktail of the Day');
		const welcomeMsg = getByText('Welcome GG!');

		expect(dashboardTitle).toBeInTheDocument();
		expect(welcomeMsg).toBeInTheDocument();
	});

	it('From the Dashboard, if Details button is clicked, user should be directed to the CocktailDetails page', async () => {
		const { getByLabelText, getByText, getByPlaceholderText, debug } = render(<MemoryRouter><App /></MemoryRouter>);
		
		const nameInput = getByPlaceholderText('username');
		const submitBtn = getByLabelText('over-21-button');

		act(() => {
			fireEvent.change(nameInput, {target: {value: 'GG'}});
			fireEvent.click(submitBtn);
		})

		const detailsBtn = await waitFor(() => getByLabelText('details-button'));
	
		act(() => {
			fireEvent.click(detailsBtn);
		})

		const detailsInstructions = await waitFor(() => getByText('Fill glass with ice and fish, add vodka, grape soda and orange juice. DO NOT STIR!!!!! Serve well chilled.'));

		expect(detailsInstructions).toBeInTheDocument();
	});
})