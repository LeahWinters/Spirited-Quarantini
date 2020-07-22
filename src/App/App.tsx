import React, { ReactElement, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Dashboard from '../Dashboard/Dashboard';
import './App.css';

const App: React.SFC = () => {
	const [ username, setUsername ] = useState<string>('');
	const [ loggedIn, setLoggedIn ] = useState<boolean>(false);

	return (
		<main>
			<Header loggedIn={loggedIn} />
			<Switch>
				<Route path="/dashboard" render={() => <Dashboard />} />
				<Route
					path="/"
					render={() => (
						<Login
							username={username}
							setUsername={setUsername}
							loggedIn={loggedIn}
							setLoggedIn={setLoggedIn}
						/>
					)}
				/>
			</Switch>
		</main>
	);
};

export default App;
