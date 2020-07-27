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
	const [randomCocktail, setRandomCocktail] = useState<Cocktail>({idDrink: '', strDrink: '', strInstructions: '', strDrinkThumb: ''});  
	const [favCocktails, setFavCocktails] = useState<string[]>([]);
	const [madeCocktails, setMadeCocktails] = useState<string[]>([]);
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
      setError(error.message);
    }
  };

	const getCocktail = async ():Promise<void> => {
		try {
			const data: Cocktail = await getRandomCocktail();
			return setRandomCocktail(data);
		} catch (error) {
			setError(error.message);
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
	
	// const findResults = (searchValue: string) => {
	// 	let searchResults = allCocktails.filter(cocktail => {
	// 		return cocktail.strDrink.toLowerCase().includes(searchValue.toLowerCase())
	// 	});

	// 	setFilteredResults(searchResults);
	// }

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
		//get array of all cocktails w/ ingred's
		//map over the array to bundle all ingred's together (w/ .splice)
		//then filter over that array
		//newArr.filter(c => c.ingredients.includes(keyword))

		const foundCs = allCocktails.filter(cocktail => {
			debugger;

			const bundledIngreds = [
				cocktail.strIngredient1, cocktail.strIngredient2, cocktail.strIngredient3, 
				cocktail.strIngredient4, cocktail.strIngredient5, cocktail.strIngredient6, 
				cocktail.strIngredient7, cocktail.strIngredient8, cocktail.strIngredient9, 
				cocktail.strIngredient10, cocktail.strIngredient11, cocktail.strIngredient12, 
				cocktail.strIngredient13, cocktail.strIngredient14, cocktail.strIngredient15
			];

			let found = [] as Object[];
			console.log(bundledIngreds[0])

			bundledIngreds.forEach(ingred => {
				if (ingred !== null && ingred !== undefined) {
					if (ingred.toLowerCase() === keyword.toLowerCase()) {
						found.push(cocktail);
					}
				}
			});
			return found;
		})

		return foundCs;
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
					path="/about" 
					render={() => <About />} 
				/>
        <Route
          path="/cocktails"
          render={() => (
						<AllCocktailsPage 
							givenCocktails={allCocktails} 
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
						/>
					)} 
				/>
				<Route 
					path="/my_cocktails/logged" 
					render={() => (
						<AllCocktailsPage 
							givenCocktails={findCocktailObj(madeCocktails)} 
						/>
					)} 
				/>
        <Route
          path="/:id/details"
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
          path="/random_cocktail"
          render={() => (
						<Dashboard 
							username={username} 
							randomCocktail={randomCocktail} 
						/>
					)}
        />
				<Route 
					path="/results"
					render={() => (
						<AllCocktailsPage 
							givenCocktails={filteredResults}
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
