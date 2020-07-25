import React, { ReactElement, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Dashboard from '../Dashboard/Dashboard';
import About from '../About/About';
import AllCocktailsPage from '../AllCocktailsPage/AllCocktailsPage';
import MyCocktails from '../MyCocktails/MyCocktails';
import CocktailDetails from '../CocktailDetails/CocktailDetails';
import { getAllCocktails } from "../apiCalls";
import './App.scss';

export interface AllCocktailsDetails {
		strDrink: string,
		strDrinkThumb: string,
		idDrink: string
}

const App: React.SFC = () => {
	const [ username, setUsername ] = useState('');
	const [ loggedIn, setLoggedIn ] = useState(false);
	const [ allCocktails, setAllCocktails ] = useState<AllCocktailsDetails[]>([{strDrink: '',
		strDrinkThumb: '',
		idDrink: ''}]);
  const [error, setError] = useState('');

	//store favorite in app
	//fn that will filter searched input

	const fetchAllCocktails = async (): Promise<any> => {
    try {
      const data: AllCocktailsDetails[] = await getAllCocktails();
      return setAllCocktails(data);
    } catch (error) {
      setError(error.message);
    }
	};

	useEffect(() => {fetchAllCocktails()}, []);

	//add to favorites (id);
	// .push ()

	return (
		<main>
			<Header 
				loggedIn={loggedIn} 
				setLoggedIn={setLoggedIn}
				setUsername={setUsername}
			/>
			<Switch>
				<Route path="/about" render={() => <About />} />
				<Route 
					path="/cocktails" 
					render={() => (
						<AllCocktailsPage 
							allCocktails={allCocktails} 
						/>)} 
				/>
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
