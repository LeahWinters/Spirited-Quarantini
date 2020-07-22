import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRandomCocktail } from '../apiCalls';

export interface DashboardProps {

}

export interface Cocktail {
	idDrink: string,
	strDrink: string,
	strInstructions: string
	//api obj return -- safetype the properties
}

const Dashboard: React.SFC = () => {
	const [randomCocktail, setRandomCocktail] = useState({})

	const getCocktail = async () => {
		try {
			const data: any = await getRandomCocktail();
			setRandomCocktail(data);
		} catch (error) {
				// set up error handling
		}
	}

	useEffect(() => {getCocktail()}, [])

	//api call for random cocktail

	return (
		<div>RANDOM IMG</div>
	)
}

export default Dashboard;