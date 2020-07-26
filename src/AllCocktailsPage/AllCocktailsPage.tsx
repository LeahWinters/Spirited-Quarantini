import React, { useState, useEffect, useRef } from "react";
import { AllCocktailsDetails } from '../App/App';
import CocktailCard from '../CocktailCard/CocktailCard';
import './AllCocktailsPage.scss';

export interface AllCocktailsProps {
	givenCocktails: AllCocktailsDetails[];
}

const AllCocktailsPage: React.SFC<AllCocktailsProps> = (props) => {
  const [givenCocktails, setGivenCocktails] = useState(props.givenCocktails);
  const [error, setError] = useState<string>("");

	useEffect(() => {
		setGivenCocktails(props.givenCocktails)
	}, [props]);

  const cocktailCards = Object.values(givenCocktails).map(cocktail => {
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
      {!cocktailCards.length && <h3 className="no-found-cocktails">Sorry! No cocktails found.</h3>}
		</section>
	)
};

export default AllCocktailsPage;