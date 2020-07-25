import React, { ReactElement, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Dashboard from '../Dashboard/Dashboard';
import About from '../About/About';
import AllCocktailsPage from '../AllCocktailsPage/AllCocktailsPage';
import MyCocktails from '../MyCocktails/MyCocktails';
import CocktailDetails from '../CocktailDetails/CocktailDetails';
import './App.scss';

const App: React.SFC = () => {
	const [ username, setUsername ] = useState('');
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ favoriteCocktails, setFavoriteCocktails ] = useState([])
	//store favorite in app
	//do all fetch calls & store info (look into useMemo)
	//b/c child components will unmount & remount continuously but App never unmounts

	//fn that will filter searched input

	return (
		<main>
			<Header 
				loggedIn={loggedIn} 
				setLoggedIn={setLoggedIn}
				setUsername={setUsername}
			/>
			<Switch>
				<Route path="/about" render={() => <About />} />
				<Route path="/cocktails" render={() => <AllCocktailsPage />} />
				<Route path="/my_cocktails" render={() => <MyCocktails />} />
				<Route 
					path="/:id/details" 
					render={({ match }) => {
						const { id } = match.params;
						return <CocktailDetails id={id} />} 
					}
				/>
				<Route path="/random_cocktail" render={() => 
					<Dashboard 
						username={username}
					/>} 
				/>
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
