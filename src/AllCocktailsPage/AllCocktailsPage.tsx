import React, { useState, useEffect } from "react";
import { getAllCocktails } from "../apiCalls";
import CocktailCard from '../CocktailCard/CocktailCard';
import './AllCocktailsPage.scss';

export interface AllCocktailsDetails {
  drinks: [
    {
      strDrink: string;
      strDrinkThumb: string;
      idDrink: string;
    }
  ];
}

const AllCocktailsPage: React.SFC = () => {
  const [allCocktails, setAllCocktails] = useState<AllCocktailsDetails>({
    drinks: [{
			strDrink: 'string',
      strDrinkThumb: 'string',
      idDrink: 'string'
		}]
  });

  const [error, setError] = useState<string>("");

  const displayAllCocktails = async (): Promise<any> => {
    try {
      const data: AllCocktailsDetails = await getAllCocktails();
      return setAllCocktails(data);
    } catch (error) {
      setError(error.message);
    }
	};

  useEffect(() => {
    displayAllCocktails();
  }, []);

  const cocktailsArray = Object.values(allCocktails.drinks);
  
  const cocktailCards = cocktailsArray.map(cocktail => {
    return (
      <CocktailCard 
        strDrink={cocktail.strDrink}
        strDrinkThumb={cocktail.strDrinkThumb}
				idDrink={cocktail.idDrink}
				key={cocktail.idDrink}
      />
    );
  });

	return <section className="all-cocktails-container">
      {cocktailCards}
		</section>;
	

};

export default AllCocktailsPage;