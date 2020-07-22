import React from 'react';
import Header from './Header';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {
  it('Should display the title of the application', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header 
          loggedIn={false} 
          setLoggedIn={false}
        />
      </MemoryRouter>
    );

    const title = getByText('Spirited Quarantini');

    expect(title).toBeInTheDocument();
  });

  it('Should have a search bar and multiple buttons, if logged in', () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Header 
          loggedIn={true} 
          setLoggedIn={true}
        />
      </MemoryRouter>
    );

    const searchBar = getByPlaceholderText('search cocktails...');
    const aboutBtn = getByText('About');
    const cocktailsBtn = getByText('Cocktails');
    const myCocktailsBtn = getByText('My Cocktails');
    const logoutBtn = getByText('Logout');

    expect(searchBar).toBeInTheDocument();
    expect(aboutBtn).toBeInTheDocument();
    expect(cocktailsBtn).toBeInTheDocument();
    expect(myCocktailsBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });
})