import React, { ReactElement, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Dashboard from '../Dashboard/Dashboard';
import About from '../About/About';
import AllCocktailsPage from '../AllCocktailsPage/AllCocktailsPage';
import MyCocktails from '../MyCocktails/MyCocktails';
import CocktailDetails from '../CocktailDetails/CocktailDetails';
import { getAllCocktails, getRandomCocktail, getCocktailDetails } from "../apiCalls";
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
	const [ allCocktails, setAllCocktails ] = useState<Cocktail[]>([
		{
			strDrink: '',
			strDrinkThumb: '',
			idDrink: ''
		}
	]);
	const [ allCError, setAllCError ] = useState('');
	const [randomCocktail, setRandomCocktail] = useState<Cocktail>({idDrink: '', strDrink: '', strInstructions: '', strDrinkThumb: ''});  
	const [randomCError, setRandomCError] = useState('');
	const [favCocktails, setFavCocktails] = useState<Cocktail[]>([]);
	const [madeCocktails, setMadeCocktails] = useState<Cocktail[]>([]);
	const [filteredResults, setFilteredResults] = useState<AllCocktailsDetails[]>([
		{
			strDrink: '',
			strDrinkThumb: '',
			idDrink: ''
		}
	]);
  const [error, setError] = useState("");

	useEffect(() => {getCocktail()}, []);
	useEffect(() => {fetchAllCocktails()}, []);
	useEffect(() => {
		updateAllCocktails()
	}, [allCocktails]);

  // API Calls
  const fetchAllCocktails = async (): Promise<any> => {
    try {
      const data: AllCocktailsDetails[] = await getAllCocktails();
			return setAllCocktails(data);
    } catch (error) {
      setAllCError(error.toString());
    }
  };

	const getCocktail = async ():Promise<void> => {
		try {
			const data: Cocktail = await getRandomCocktail();
			return setRandomCocktail(data);
		} catch (error) {
			setRandomCError(error.toString());
		}
	};

	const updateAllCocktails = async ():Promise<void> => {
		try {
			const newCocktails = await Promise.all(
				allCocktails.map(c => getCocktailDetails(c.idDrink))
			);
			setAllCocktails(newCocktails);
		} catch (error) {
			setError(error.message);
		}
	}

	// Functions
	const findResults = (searchValue: string) => {
		const byName = searchByName(searchValue);
		const byIngredient = searchByIngred(searchValue);
		const searchedResults = byName.concat(byIngredient);
		setFilteredResults([...searchedResults]);
	}

	const searchByName = (keyword: string) => {
		return allCocktails.filter(cocktail => {
			return cocktail.strDrink.toLowerCase().includes(keyword.toLowerCase())
		});
	}

	const searchByIngred = (keyword: string) => {
		return allCocktails.filter((cocktail: Cocktail) => {
			const values = Object.values(cocktail);
			let result = values.find((value: string | null) => {
					if (value) return value.toLowerCase() === keyword.toLowerCase();
			})
			if (result) return cocktail;
		});
		// setFilteredResults(searchResults.splice(1));
	}
  
	const toggleUserInteraction = async (idList: Cocktail[], drinkId: string, setTheState: Function): Promise<void> => {
		if (!idList.find(c => c.idDrink === drinkId)) {
				const foundCocktail = await getCocktailDetails(drinkId);
				setTheState([...idList, foundCocktail]);
			} else {
				setTheState(idList.filter(cocktail => cocktail !== drinkId))
			}
		}

  return (
    <main>
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
				setUsername={setUsername}
				findResults={findResults}
				username={username}
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
							givenCocktails={favCocktails} 
							error={allCError}
						/>
					)} 
				/>
				<Route 
					path="/my_cocktails/logged" 
					render={() => (
						<AllCocktailsPage 
							givenCocktails={madeCocktails} 
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
