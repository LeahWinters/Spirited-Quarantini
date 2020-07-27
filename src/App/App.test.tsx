import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { getCocktailDetails, getRandomCocktail, getAllCocktails } from "../apiCalls";
import { act } from 'react-dom/test-utils';
import { cocktail } from '../test-data';
jest.mock('../apiCalls');
import { mocked } from "ts-jest/utils";

describe('App', () => {
	mocked(getAllCocktails).mockImplementation(() =>
  	Promise.resolve([
			{
			"strDrink": "'57 Chevy with a White License Plate",
			"strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg",
			"idDrink": "14029"
			},
			{
			"strDrink": "1-900-FUK-MEUP",
			"strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/uxywyw1468877224.jpg",
			"idDrink": "15395"
			},
			{
			"strDrink": "110 in the shade",
			"strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/xxyywq1454511117.jpg",
			"idDrink": "15423"
		}])
	);

	// getRandomCocktail.mockResolvedValue(() => {
	// 	return cocktail;
	// });

	it('Renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it.skip('Should be able to login, then be directed to the All Cocktails Page', async () => {
		const { getByLabelText, getByText, getByPlaceholderText, debug } = render(<MemoryRouter><App /></MemoryRouter>);

		const nameInput = getByPlaceholderText('username');
		const submitBtn = getByLabelText('over-21-button');

		// act(() => {
		// 	fireEvent.change(nameInput, {target: {value: 'GG'}});
		// 	fireEvent.click(submitBtn);
		// });

		// await waitFor(() => {
		// 	fireEvent.change(nameInput, {target: {value: 'GG'}});
		// 	fireEvent.click(submitBtn);
		// })
		fireEvent.change(nameInput, {target: {value: 'GG'}});
		fireEvent.click(submitBtn);

		const cocktailTitle = await waitFor(() => getByText('110 in the shade'));
		const makeMeBtn = await waitFor(() => getByText('Make Me'));

		expect(cocktailTitle).toBeInTheDocument();
		expect(makeMeBtn).toBeInTheDocument();
	});

	it.skip('From the Dashboard, if Details button is clicked, user should be directed to the CocktailDetails page', async () => {
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