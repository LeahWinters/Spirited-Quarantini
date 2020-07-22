import React, { ReactElement, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Dashboard from '../Dashboard/Dashboard';
import About from '../About/About';
import AllCocktails from '../AllCocktails/AllCocktails';
import MyCocktails from '../MyCocktails/MyCocktails';
import './App.scss';


const App: React.SFC = () => {
	const [ username, setUsername ] = useState<string>('');
	const [ loggedIn, setLoggedIn ] = useState<boolean>(false);

	return (
		<main>
			<Header loggedIn={loggedIn} />
			<Switch>
				<Route path="/about" render={() => <About />} />
				<Route path="/cocktails" render={() => <AllCocktails />} />
				<Route path="/my_cocktails" render={() => <MyCocktails />} />
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
