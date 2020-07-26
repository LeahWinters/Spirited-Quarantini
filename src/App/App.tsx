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
<<<<<<< HEAD
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [allCocktails, setAllCocktails] = useState<AllCocktailsDetails[]>([
    { strDrink: "", strDrinkThumb: "", idDrink: "" },
  ]);
	const [favCocktails, setFavCocktails] = useState<string[]>([]);
	const [madeCocktails, setMadeCocktails] = useState<string[]>([]);
=======
	const [ username, setUsername ] = useState('');
	const [ loggedIn, setLoggedIn ] = useState(false);
	const [ allCocktails, setAllCocktails ] = useState<AllCocktailsDetails[]>([
		{
			strDrink: '',
			strDrinkThumb: '',
			idDrink: ''
		}
	]);
	const [randomCocktail, setRandomCocktail] = useState<Cocktail>({idDrink: '', strDrink: '', strInstructions: '', strDrinkThumb: ''});  
  const [favCocktails, setFavCocktails] = useState<string[]>([]);
>>>>>>> 08461b1053ad5d7c51b6d8363b7c49fdfa153f49
  const [error, setError] = useState("");

  //fn that will filter searched input

  // API Calls
  const fetchAllCocktails = async (): Promise<any> => {
    try {
      const data: AllCocktailsDetails[] = await getAllCocktails();
      return setAllCocktails(data);
    } catch (error) {
      setError(error.message);
    }
  };

	const getCocktail = async ():Promise<any> => {
		try {
			const data: Cocktail = await getRandomCocktail();
			setRandomCocktail(data);
		} catch (error) {
			setError(error.message);
		}
	};

	useEffect(() => {getCocktail()}, []);
	useEffect(() => {fetchAllCocktails()}, []);

  // Functions
<<<<<<< HEAD
  
	const toggleUserInteraction = (idList: string[], drinkId: string, setTheSate: Function): any => {
			if (!idList.includes(drinkId)) {
				setTheSate([...idList, drinkId]);
			} else {
				setTheSate(idList.filter(cocktail => cocktail !== drinkId))
			}
		}
=======
  const toggleFavorites = (drinkID: string): any => {
    if (!favCocktails.includes(drinkID)) {
     setFavCocktails([...favCocktails, drinkID]);
    } else
    setFavCocktails(favCocktails.filter((cocktail) => cocktail !== drinkID));
	};
	
	const findCocktailObj = (givenArray: string[]) => {
		return givenArray.map((c) => {
			return allCocktails.find(cocktail => cocktail.idDrink === c) as Object;
		}) as AllCocktailsDetails[];
	};
>>>>>>> 08461b1053ad5d7c51b6d8363b7c49fdfa153f49

  return (
    <main>
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setUsername={setUsername}
<<<<<<< HEAD
      />drinkId
=======
      />

>>>>>>> 08461b1053ad5d7c51b6d8363b7c49fdfa153f49
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
							givenCocktails={findCocktailObj(favCocktails)} 
							//change argument to logged cocktails when complete
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
<<<<<<< HEAD
								favCocktails={favCocktails} 
								setFavCocktails={setFavCocktails}
								toggleUserInteraction={toggleUserInteraction}
								madeCocktails={madeCocktails}
								setMadeCocktails={setMadeCocktails}
=======
								toggleFavorites={toggleFavorites} 
								favCocktails={favCocktails}
>>>>>>> 08461b1053ad5d7c51b6d8363b7c49fdfa153f49
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
