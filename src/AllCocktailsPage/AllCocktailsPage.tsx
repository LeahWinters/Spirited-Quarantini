import React, { useState, useEffect } from "react";
import { getAllCocktails } from '../apiCalls'


export interface AllCocktails {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
}

const AllCocktailsPage: React.SFC = () => {
  const [allCocktails, setAllCocktails] = useState<AllCocktails>({
    strDrink: "",
    strDrinkThumb: "",
    idDrink: "",
	});
	const [ error, setError ]= useState<string>('')

	const displayAllCocktails = async ():Promise<any> => {
		try {
			const data: AllCocktails = await getAllCocktails();
			setAllCocktails(data)
		} catch (error) {
			setError(error.message)
		}
	}

	useEffect(() => {getAllCocktails()}, [])

  return <div>ALL COCKTAILS PAGE</div>;
};

export default AllCocktailsPage;

// "drinks": [
// 	{
// 		"strDrink": "'57 Chevy with a White License Plate",
// 		"strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg",
// 		"idDrink": "14029"
// }
