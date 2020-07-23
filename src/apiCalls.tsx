import { RandomCocktail } from './Definitions/RandomCocktail'
const rootUrl = "https://www.thecocktaildb.com/api/json/v1/1";

export const getRandomCocktail = async ():Promise< { [key: string]: string }> => {
	const response = await fetch(`${rootUrl}/random.php`);
  const data = await response.json();
	
  return data.drinks[0]
}

//show all alcoholic drinks: https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic
//Add AlcoholicCocktail[] to definitions 
export const getAllCocktails = async () => {
	const response = await fetch(`${rootUrl}/filter.php?a=Alcoholic`);
  const data = await response.json();
  return data
}

//lookup by id: https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
export const getCocktailDetails = async (givenID: string) => {
	console.log('tried')
	const response = await fetch(`${rootUrl}/lookup.php?i=${parseInt(givenID)}`);
	const data = await response.json();
	return data.drinks[0];
}
