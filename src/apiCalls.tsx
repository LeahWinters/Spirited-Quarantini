const rootUrl = "https://www.thecocktaildb.com/api/json/v1/1";

//random cocktail: https://www.thecocktaildb.com/api/json/v1/1/random.php

//lookup by id: https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007


export const getRandomCocktail = async () => {
	const response = await fetch(`${rootUrl}/random.php`);
	const data = await response.json();


  return data.drinks[0];
  // if (response.ok) {
  //   return await response.json();
  // } else {
  //   throw new Error({...response})
  // }
}


//show all alcoholic drinks: https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic