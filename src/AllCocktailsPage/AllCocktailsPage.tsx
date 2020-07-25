import React, { useState, useEffect } from "react";
import { AllCocktailsDetails } from '../App/App';
import { getAllCocktails } from "../apiCalls";
import CocktailCard from '../CocktailCard/CocktailCard';
import './AllCocktailsPage.scss';

export interface AllCocktailsProps {
  allCocktails: AllCocktailsDetails[];
}

const AllCocktailsPage: React.SFC<AllCocktailsProps> = (props) => {
  const [allCocktails, setAllCocktails] = useState(props.allCocktails);

  const [error, setError] = useState<string>("");

  const cocktailsArray = Object.values(allCocktails);
  
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

	return (
		<section className="all-cocktails-container">
      {cocktailCards}
		</section>
	)
};

export default AllCocktailsPage;