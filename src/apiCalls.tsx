import { Cocktail } from "./Definitions/RandomCocktail";
import { AllCocktailsDetails } from "./App/App";

const rootUrl = "https://www.thecocktaildb.com/api/json/v1/1";
																										
export const getAllCocktails = async (): Promise<AllCocktailsDetails[]> => {
  const response = await fetch(`${rootUrl}/filter.php?a=Alcoholic`);

  if(response.ok) {
		const data = await response.json();
    return data.drinks;
  } else {
    throw new Error(response.statusText);
  }
};

export const getRandomCocktail = async ():Promise<Cocktail> => {
  const response = await fetch(`${rootUrl}/random.php`);
  
  if(response.ok) {
    const data = await response.json();
    return data.drinks[0];
  } else {
    throw new Error(response.statusText);
  }
}
  
export const getCocktailDetails = async (givenID: string) => {
	const response = await fetch(`${rootUrl}/lookup.php?i=${parseInt(givenID)}`);
  
  if(response.ok) {
    const data = await response.json();
    return data.drinks[0];
  } else {
    throw new Error(response.statusText);
  }
}