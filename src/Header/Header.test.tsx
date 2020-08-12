import React from 'react';
import Header from './Header';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, getByLabelText } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe.skip('Header', () => {
  it('Should only display the title of the application when user is not logged in', () => {
    const { getByText, queryByText, queryByPlaceholderText } = render(
      <MemoryRouter>
        <Header 
          loggedIn={false} 
          setLoggedIn={Function}
          setUsername={Function}
          findResults={Function}
          username={''}
        />
      </MemoryRouter>
    );

    const title = getByText('Spirited Quarantini');
    const about = queryByText('About');
    const welcomeMsg = queryByText('Welcome, Alex');
    const search = queryByPlaceholderText('Welcome, Alex');

    expect(title).toBeInTheDocument();
    expect(about).not.toBeInTheDocument();
    expect(welcomeMsg).not.toBeInTheDocument();
    expect(search).not.toBeInTheDocument();
  });

  it('Should display the title, welocome message, a search bar, and multiple buttons when a user is logged in', () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Header 
          loggedIn={true} 
          setLoggedIn={Function}
          setUsername={Function}
          findResults={Function}
          username={'Alex'}
        />
      </MemoryRouter>
    );

    const title = getByText('Spirited Quarantini');
    const welcomeMsg = getByText('Welcome, Alex');
    const searchBar = getByPlaceholderText('search cocktails...');
    const aboutBtn = getByText('About');
    const cocktailOfTheDayBtn = getByText('Cocktail of the Day');
    const myCocktailsBtn = getByText('My Cocktails');
    const logoutBtn = getByText('Logout');

    expect(title).toBeInTheDocument();
    expect(welcomeMsg).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
    expect(aboutBtn).toBeInTheDocument();
    expect(cocktailOfTheDayBtn).toBeInTheDocument();
    expect(myCocktailsBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  it('User should be able to input a drink into the search when logged in', () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <Header 
          loggedIn={true} 
          setLoggedIn={Function}
          setUsername={Function}
          findResults={Function}
          username={'Alex'}
        />
      </MemoryRouter>
    );

    const searchInput = getByPlaceholderText('search cocktails...')
    fireEvent.change(searchInput, {target: {value: 'margarita'}});
    expect(searchInput).toHaveValue('margarita');
  });

  it('User should be able to search cocktails when logged in', () => {
    const mockSearch = jest.fn();

    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Header 
          loggedIn={true} 
          setLoggedIn={Function}
          setUsername={Function}
          findResults={mockSearch}
          username={'Alex'}
        />
      </MemoryRouter>
    );

    const searchInput = getByPlaceholderText('search cocktails...')
    const searchBtn = getByText('Search');
    fireEvent.change(searchInput, {target: {value: 'margarita'}});
    fireEvent.click(searchBtn);
    expect(mockSearch).toHaveBeenCalledTimes(1);
    expect(searchInput).toHaveValue('');
  });

  it('Should log a user out when the logout button is clicked', () => {
    const mockSetLoggedIn = jest.fn();
    const mockSetUsername = jest.fn();
    const mockFindResults = jest.fn();

    const { getByText, debug } = render(
      <MemoryRouter>
        <Header 
          loggedIn={true} 
          setLoggedIn={mockSetLoggedIn}
          setUsername={mockSetUsername}
          findResults={mockFindResults}
          username={'Alex'}
        />
      </MemoryRouter>
    );

    const logoutBtn = getByText('Logout');
   
    fireEvent.click(logoutBtn);
    expect(mockSetLoggedIn).toHaveBeenCalledWith(false)
    expect(mockSetUsername).toHaveBeenCalledWith("")
  });
})