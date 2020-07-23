import React, { useState, useEffect } from "react";
import { getAllCocktails } from "../apiCalls";

export interface AllCocktailsDetails {
  drinks: [
    {
      strDrink: string;
      strDrinkThumb: string;
      idDrink: string;
    }
  ];
}

const AllCocktailsPage: React.SFC = () => {
  const [allCocktails, setAllCocktails] = useState<AllCocktailsDetails>({
    drinks: [{
			strDrink: 'string',
      strDrinkThumb: 'string',
      idDrink: 'string'
		}]
  });
  const [error, setError] = useState<string>("");

  const displayAllCocktails = async (): Promise<any> => {
    try {
      const data: AllCocktailsDetails = await getAllCocktails();
      setAllCocktails(data);
    } catch (error) {
      setError(error.message);
    }
	};

  useEffect(() => {
    displayAllCocktails();
	}, []);

	return <section className="all-cocktails-container">
		
		</section>;
	

};

export default AllCocktailsPage;

// "drinks": [
// 	{
// 		"strDrink": "'57 Chevy with a White License Plate",
// 		"strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg",
// 		"idDrink": "14029"
// }
