import React from 'react';
import Header from './Header';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {
  it('Should only display the title of the application when user is not logged in', () => {
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

  it('Should display the title, a search bar, and multiple buttons when a user is logged in', () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Header 
          loggedIn={true} 
          setLoggedIn={true}
        />
      </MemoryRouter>
    );

    const title = getByText('Spirited Quarantini');
    const searchBar = getByPlaceholderText('search cocktails...');
    const aboutBtn = getByText('About');
    const cocktailsBtn = getByText('Cocktails');
    const myCocktailsBtn = getByText('My Cocktails');
    const logoutBtn = getByText('Logout');

    expect(title).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
    expect(aboutBtn).toBeInTheDocument();
    expect(cocktailsBtn).toBeInTheDocument();
    expect(myCocktailsBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });
})