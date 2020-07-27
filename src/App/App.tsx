import React, { ReactElement, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Dashboard from '../Dashboard/Dashboard';
import About from '../About/About';
import AllCocktailsPage from '../AllCocktailsPage/AllCocktailsPage';
import MyCocktails from '../MyCocktails/MyCocktails';
import CocktailDetails from '../CocktailDetails/CocktailDetails';
import { getAllCocktails, getRandomCocktail } from "../apiCalls";
import { Cocktail } from '../Definitions/RandomCocktail'
import './App.scss';

export interface AllCocktailsDetails {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
}

const App: React.SFC = () => {
	const [ username, setUsername ] = useState('');
	const [ loggedIn, setLoggedIn ] = useState(false);
	const [ allCocktails, setAllCocktails ] = useState<AllCocktailsDetails[]>([
		{
			strDrink: '',
			strDrinkThumb: '',
			idDrink: ''
		}
	]);
	const [ allCError, setAllCError ] = useState('');
	const [randomCocktail, setRandomCocktail] = useState<Cocktail>({idDrink: '', strDrink: '', strInstructions: '', strDrinkThumb: ''});  
	const [randomCError, setRandomCError] = useState('');
	const [favCocktails, setFavCocktails] = useState<string[]>([]);
	const [madeCocktails, setMadeCocktails] = useState<string[]>([]);
	const [filteredResults, setFilteredResults] = useState<AllCocktailsDetails[]>([
		{
			strDrink: '',
			strDrinkThumb: '',
			idDrink: ''
		}
	]);
  // const [error, setError] = useState("");

  // API Calls
  const fetchAllCocktails = async (): Promise<any> => {
    try {
      const data: AllCocktailsDetails[] = await getAllCocktails();
      return setAllCocktails(data);
    } catch (error) {
      setAllCError(error.toString());
    }
  };

	const getCocktail = async ():Promise<any> => {
		try {
			const data: Cocktail = await getRandomCocktail();
			setRandomCocktail(data);
		} catch (error) {
			setRandomCError(error.toString());
		}
	};

	useEffect(() => {getCocktail()}, []);
	useEffect(() => {fetchAllCocktails()});

	// Functions
	const findResults = (searchValue: string) => {
		let searchResults: any = [{
			strDrink: "",
			strDrinkThumb: "",
			idDrink: "",
		}];
		allCocktails.forEach(cocktail => {
			if (cocktail.strDrink.toLowerCase().includes(searchValue.toLowerCase())) {
				searchResults.push(cocktail);
			} 
		});
		setFilteredResults(searchResults.splice(1));
	}
  
	const toggleUserInteraction = (idList: string[], drinkId: string, setTheState: Function): any => {
			if (!idList.includes(drinkId)) {
				setTheState([...idList, drinkId]);
			} else {
				setTheState(idList.filter(cocktail => cocktail !== drinkId))
			}
		}
	
	const findCocktailObj = (givenArray: string[]) => { 
		return givenArray.map((c) => {
			return allCocktails.find(cocktail => cocktail.idDrink === c) as Object;
		}) as AllCocktailsDetails[];
	};

  return (
    <main>
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
				setUsername={setUsername}
				findResults={findResults}
      />

      <Switch>

				<Route
					path="/cocktails/:id"
					render={({ match }) => {
						const { id } = match.params;
						return (
							<CocktailDetails 
								id={id} 
								favCocktails={favCocktails} 
								setFavCocktails={setFavCocktails}
								toggleUserInteraction={toggleUserInteraction}
								madeCocktails={madeCocktails}
								setMadeCocktails={setMadeCocktails}
							/>
						);
					}}
				/>
				<Route 
					path="/about" 
					render={() => <About />} 
				/>
        <Route
          path="/cocktails"
          render={() => (
						<AllCocktailsPage 
							givenCocktails={allCocktails} 
							error={allCError}
						/>
					)}
        />
				<Route 
					exact 
					path="/my_cocktails" 
					render={() => <MyCocktails />} 
				/>
				<Route 
					path="/my_cocktails/favorites" 
					render={() => (
						<AllCocktailsPage 
							givenCocktails={findCocktailObj(favCocktails)} 
							error={allCError}
						/>
					)} 
				/>
				<Route 
					path="/my_cocktails/logged" 
					render={() => (
						<AllCocktailsPage 
							givenCocktails={findCocktailObj(madeCocktails)} 
							error={allCError}
						/>
					)} 
				/>
        <Route
          path="/random_cocktail"
          render={() => (
						<Dashboard 
							randomCocktail={randomCocktail} 
							error={randomCError}
						/>
					)}
        />
				<Route 
					path="/results"
					render={() => (
						<AllCocktailsPage 
							givenCocktails={filteredResults} 
							error={allCError}
						/>
					)}
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
