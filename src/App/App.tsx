import React, { ReactElement, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../Login/Login";
import Header from "../Header/Header";
import Dashboard from "../Dashboard/Dashboard";
import About from "../About/About";
import AllCocktailsPage from "../AllCocktailsPage/AllCocktailsPage";
import MyCocktails from "../MyCocktails/MyCocktails";
import CocktailDetails from "../CocktailDetails/CocktailDetails";
import { getAllCocktails } from "../apiCalls";
import "./App.scss";

export interface AllCocktailsDetails {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
}

const App: React.SFC = () => {
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [allCocktails, setAllCocktails] = useState<AllCocktailsDetails[]>([
    { strDrink: "", strDrinkThumb: "", idDrink: "" },
  ]);
	const [favCocktails, setFavCocktails] = useState<string[]>([]);
	const [madeCocktails, setMadeCocktails] = useState<string[]>([]);
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

  useEffect(() => {
    fetchAllCocktails();
  }, []);

  // Functions
  
  const toggleFavorites = (drinkID: string): any => {
    if (!favCocktails.includes(drinkID)) {
     setFavCocktails([...favCocktails, drinkID]);
    } else
    setFavCocktails(favCocktails.filter((cocktail) => cocktail !== drinkID));
	};
	
	const toggleMadeCocktails = (drinkID: string): any => {
		if (!madeCocktails.includes(drinkID)) {
			setMadeCocktails([...madeCocktails, drinkID]);
		} else {
			setMadeCocktails(madeCocktails.filter(cocktail => cocktail !== drinkID))
		}
	}

  return (
    <main>
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setUsername={setUsername}
      />drinkId
      <Switch>
        <Route path="/about" render={() => <About />} />
        <Route
          path="/cocktails"
          render={() => <AllCocktailsPage allCocktails={allCocktails} />}
        />
        <Route path="/my_cocktails" render={() => <MyCocktails />} />
        <Route
          path="/:id/details"
          render={({ match }) => {
            const { id } = match.params;
            return (
							<CocktailDetails 
								id={id} 
								toggleFavorites={toggleFavorites} 
								favCocktails={favCocktails} 
								toggleMadeCocktails={toggleMadeCocktails} 
								madeCocktails={madeCocktails}
							/>
            );
          }}
        />
        <Route
          path="/random_cocktail"
          render={() => <Dashboard username={username} />}
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
