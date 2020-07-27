import React from 'react';
import CocktailDetails from './CocktailDetails';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getCocktailDetails } from "../apiCalls";
import { cocktail } from '../test-data';
import { mocked } from  'ts-jest/utils'
jest.mock('../apiCalls');

describe('CocktailDetails', () => {
	mocked(getCocktailDetails).mockImplementation(() => 
		Promise.resolve({
			idDrink: "11007",
			strDrink: "Margarita",
			strInstructions: "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
			strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
		})
	);

	it('Should display the fetched cocktail title', async () => {
		const { getByText } = render(
			<MemoryRouter>
				<CocktailDetails id={'11007'} />
			</MemoryRouter>
		);

		const detailTitle = await waitFor(() => getByText('Margarita'));

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
				<CocktailDetails id={'14622'}, favCockTails:string={''} />
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