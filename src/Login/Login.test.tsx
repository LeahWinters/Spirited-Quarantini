import React from 'react';
import Login from './Login';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
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
    const over21Button = getByLabelText('over-21-button');
    const under21Button = getByLabelText('under-21-button');

    expect(loginMsg).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(over21Button).toBeInTheDocument();
    expect(under21Button).toBeInTheDocument();
  });

  it('buttons should be disabled if input is empty', () => {
    const mockVerifyUser = jest.fn()
    const { getByLabelText } = render(
      <MemoryRouter>
        <Login
          username={''}
          setUsername={''}
          loggedIn={false}
          setLoggedIn={false}
        />
      </MemoryRouter>
    );

    const over21Button = getByLabelText('over-21-button');

    fireEvent.click(over21Button);

    expect(mockVerifyUser).toHaveBeenCalledTimes(0);
  })

})