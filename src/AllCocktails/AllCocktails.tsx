import React, { useState, useEffect } from "react";
import { getAllCocktails } from '../AllCocktails/AllCocktails'


export interface AllCocktails {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
}

const AllCocktails: React.SFC = () => {
  const [allCocktails, setAllCocktails] = useState<AllCocktails>({
    strDrink: "",
    strDrinkThumb: "",
    idDrink: "",
	});
	const [ error, setError ]= useState<string>('')

  return <div>ALL COCKTAILS PAGE</div>;
};

export default AllCocktails;

// "drinks": [
// 	{
// 		"strDrink": "'57 Chevy with a White License Plate",
// 		"strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg",
// 		"idDrink": "14029"
// }
