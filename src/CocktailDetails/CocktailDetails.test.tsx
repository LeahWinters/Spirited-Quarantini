import React from 'react';
import CocktailDetails from './CocktailDetails';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getCocktailDetails } from "../apiCalls";

jest.mock('../apiCalls');

describe('CocktailDetails', () => {
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

	it('Should display the fetched cocktail title', async () => {
		const { getByText } = render(
			<MemoryRouter>
				<CocktailDetails id={'14622'} />
			</MemoryRouter>
		);

		const detailTitle = await waitFor(() => getByText('Arctic Fish'));

		expect(detailTitle).toBeInTheDocument();
	});

	it('Should display the fetched cocktail image', async () => {
		const { getByAltText } = render(
			<MemoryRouter>
				<CocktailDetails id={'14622'} />
			</MemoryRouter>
		);

		const detailImage = await waitFor(() => getByAltText('Arctic Fish'));

		expect(detailImage).toBeInTheDocument();
	});

	it('Should display the fetched cocktail instructions', async () => {
		const { getByText } = render(
			<MemoryRouter>
				<CocktailDetails id={'14622'} />
			</MemoryRouter>
		);

		const detailInstructions = await waitFor(() => getByText('Fill glass with ice and fish, add vodka, grape soda and orange juice. DO NOT STIR!!!!! Serve well chilled.'));

		expect(detailInstructions).toBeInTheDocument();
	});

	it('Should display the fetched cocktail ingredients matched with their measure', async () => {
		const { getByText } = render(
			<MemoryRouter>
				<CocktailDetails id={'14622'} />
			</MemoryRouter>
		);

		const ingredient1 = await waitFor(() => getByText('Vodka 1/3 part'));
		const ingredient2 = await waitFor(() => getByText('Grape soda 1/3 part'));
		const ingredient3 = await waitFor(() => getByText('Orange juice 1/3 part'));
		const ingredient4 = await waitFor(() => getByText('Ice lots'));
		const ingredient5 = await waitFor(() => getByText('Candy 1 dash'));

		expect(ingredient1).toBeInTheDocument();
		expect(ingredient2).toBeInTheDocument();
		expect(ingredient3).toBeInTheDocument();
		expect(ingredient4).toBeInTheDocument();
		expect(ingredient5).toBeInTheDocument();
	});
})