import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRandomCocktail } from '../apiCalls';
import './Dashboard.scss';

export interface DashboardProps {

}

export interface Cocktail {
	idDrink: string,
	strDrink: string,
	strInstructions: string
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

	return (
		<div>Cocktail of the day</div>
	)
}

export default Dashboard;