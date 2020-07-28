import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { getCocktailDetails, getRandomCocktail, getAllCocktails } from "../apiCalls";
import { act } from 'react-dom/test-utils';
import { cocktailList, detailCocktailList } from '../test-data';
import { mocked } from "ts-jest/utils";
import { doesNotMatch } from 'assert';
jest.mock('../apiCalls');

describe('App', () => {
	mocked(getAllCocktails).mockImplementation(() =>
  	Promise.resolve(cocktailList)
	);

	mocked(getCocktailDetails).mockImplementation(() => 
		Promise.resolve(detailCocktailList)
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
		const { getByLabelText, getByText, getByPlaceholderText, getAllByText, debug } = render(
			<MemoryRouter><App /></MemoryRouter>
		);

		const nameInput = getByPlaceholderText('username');
		const submitBtn = getByLabelText('over-21-button');

		// act(() => {
			fireEvent.change(nameInput, {target: {value: 'GG'}});
			fireEvent.click(submitBtn);
		// });

		const cocktailTitle = await waitFor(() => getByText('A Splash of Nash'));
    const allBtns = await waitFor(() => getAllByText('Make Me'));

		expect(cocktailTitle).toBeInTheDocument();
		expect(allBtns.length).toEqual(2);

	});

	// it.skip('From the homepage, if Details button is clicked, user should be directed to the CocktailDetails page', async () => {
	// 	const { getByLabelText, getByText, getByPlaceholderText, getAllByText, debug } = render(<MemoryRouter><App /></MemoryRouter>);
		
	// 	const nameInput = getByPlaceholderText('username');
	// 	const submitBtn = getByLabelText('over-21-button');

	// 	act(() => {
	// 		fireEvent.change(nameInput, {target: {value: 'GG'}});
	// 		fireEvent.click(submitBtn);
	// 	})

	// 	const detailsBtn = await waitFor(() => getAllByText('Make Me'));
	
	// 	act(() => {
	// 		fireEvent.click(detailsBtn[0]);
	// 	})
	// 	debug();

	// 	const detailsInstructions = await waitFor(() => getByText('Fill glass with ice and fish, add vodka, grape soda and orange juice. DO NOT STIR!!!!! Serve well chilled.'));
	// 	expect(detailsInstructions).toBeInTheDocument();
	// });

	afterAll(async done => {

		done();
	})
})