import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { getCocktailDetails, getRandomCocktail } from "../apiCalls";
import { act } from 'react-dom/test-utils';
import { cocktail } from '../test-data';
jest.mock('../apiCalls');

describe('App', () => {
	getCocktailDetails.mockResolvedValue(() => {
		return cocktail;
	});

	getRandomCocktail.mockResolvedValue(() => {
		return cocktail;
	});

	it('Renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it('Should be able to login, then be directed to the All Cocktails Page', async () => {

		const { getByLabelText, getByText, getByPlaceholderText, debug } = render(<MemoryRouter><App /></MemoryRouter>);

		const nameInput = getByPlaceholderText('username');
		const submitBtn = getByLabelText('over-21-button');

		act(() => {
			fireEvent.change(nameInput, {target: {value: 'GG'}});
			fireEvent.click(submitBtn);
		})

		// const cocktailTitle = getByText('110 in the shade');
		// const makeMeBtn = getByText('Make Me');

		await waitFor(() => {
			const cocktailTitle = getByText('110 in the shade');
			const makeMeBtn = getByText('Make Me');
			expect(cocktailTitle).toBeInTheDocument();
			expect(makeMeBtn).toBeInTheDocument();
		});

		// look into mocking out the correct url is being called when successfully logging in

		// const cocktailTitle = await waitFor(() => getByText('110 in the shade'));
		// const makeMeBtn = await waitFor(() => getByText('Make Me'));

		// expect(cocktailTitle).toBeInTheDocument();
		// expect(makeMeBtn).toBeInTheDocument();
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