import { RandomCocktail } from "./Definitions/RandomCocktail";
import { AllCocktailsDetails } from "./AllCocktailsPage/AllCocktailsPage";

const rootUrl = "https://www.thecocktaildb.com/api/json/v1/1";

export interface ResponseInfo {
  type: string,
  url: string,
  redirected: boolean,
  status: number,
  ok: boolean
}

//random cocktail: https://www.thecocktaildb.com/api/json/v1/1/random.php

//lookup by id: https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

//Add AlcoholicCocktail[] to definitions
export const getAllCocktails = async (): Promise<AllCocktailsDetails> => {
  const response: any = await fetch(`${rootUrl}/filter.php?a=Alcoholi`);
  // console.log(response, 'response')

  if(response.ok) {
    return await response.json()
  } else {
    throw new Error({ ...response })
  }
};

export const getRandomCocktail = async ():Promise<RandomCocktail> => {
	const response = await fetch(`${rootUrl}/random.php`);
  const data = await response.json();
  return data.drinks[0]
}
  
//lookup by id: https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
export const getCocktailDetails = async (givenID: string) => {
	console.log('tried')
	const response = await fetch(`${rootUrl}/lookup.php?i=${parseInt(givenID)}`);
	const data = await response.json();
	console.log(data.drinks[0]);
	return data.drinks[0];
}