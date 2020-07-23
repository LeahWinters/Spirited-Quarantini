const rootUrl = "https://www.thecocktaildb.com/api/json/v1/1";
import { RandomCocktail } from './Definitions/RandomCocktail'

//random cocktail: https://www.thecocktaildb.com/api/json/v1/1/random.php

//lookup by id: https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007


export const getRandomCocktail = async ():Promise<RandomCocktail> => {
	const response = await fetch(`${rootUrl}/random.php`);
  const data = await response.json();

  return data.drinks[0]
}

//Add AlcoholicCocktail[] to definitions 
export const getAllCocktails = async () => {
  const response = await fetch(`${rootUrl}/filter.php?a=Alcoholic`);
  const data = await response.json();
  return data
}

//show all alcoholic drinks: https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic