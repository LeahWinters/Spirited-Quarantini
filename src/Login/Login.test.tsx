import React from 'react';
import Login from './Login';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Login', () => {
  it("User should see a title, a username input, and two buttons when viewing the login page", () => {
    const { getByText, getByPlaceholderText, getByLabelText } = render(
      <MemoryRouter>
        <Login 
          username={'Temp Name'}
          setUsername={'Temp Name'}
          loggedIn={false}
          setLoggedIn={false}
        />
      </MemoryRouter>
    );

    const loginMsg = getByText('Learn how', {exact: false});
    const usernameInput = getByPlaceholderText('username');
    const over21 = getByLabelText('over-21-button');
    const under21 = getByLabelText('under-21-button');

    expect(loginMsg).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(over21).toBeInTheDocument();
    expect(under21).toBeInTheDocument();
  });
})