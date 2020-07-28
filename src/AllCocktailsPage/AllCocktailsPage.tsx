import React, { useState, useEffect, useRef } from "react";
import { AllCocktailsDetails } from '../App/App';
import CocktailCard from '../CocktailCard/CocktailCard';
import { Cocktail } from '../Definitions/RandomCocktail'
import './AllCocktailsPage.scss';

export interface AllCocktailsProps {
	givenCocktails: AllCocktailsDetails[] | Cocktail[];
	error: string;
}

const AllCocktailsPage: React.SFC<AllCocktailsProps> = (props) => {
  const [givenCocktails, setGivenCocktails] = useState(props.givenCocktails);

	useEffect(() => {setGivenCocktails(props.givenCocktails)}, [props]);

  const cocktailCards = Object.values(givenCocktails).map((cocktail, i) => {
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
			{props.error && 
				<div className='error-msg'>404: No cocktails found</div>
			}
      {!props.error && cocktailCards}
      {!props.error && !cocktailCards.length && <h3 className="no-found-cocktails">No cocktails saved in this category.</h3>}
		</section>
	)
};

export default AllCocktailsPage;