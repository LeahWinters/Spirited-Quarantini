import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRandomCocktail } from '../apiCalls';
import './Dashboard.scss';

export interface DashboardProps {
	username: string
}

export interface Cocktail {
	idDrink: string,
	strDrink: string,
	strInstructions: string,
	strDrinkThumb: string
}

const Dashboard: React.SFC<DashboardProps> = (props) => {
	const [randomCocktail, setRandomCocktail] = useState<Cocktail>({idDrink: '', strDrink: '', strInstructions: '', strDrinkThumb: ''});
	const [error, setError] = useState<string>('');

	const getCocktail = async () => {
		try {
			const data: Cocktail = await getRandomCocktail();
			setRandomCocktail(data);
		} catch (error) {
			setError(error.message);
		}
	}

	useEffect(() => {getCocktail()}, [])

	console.log(randomCocktail.strDrink, 'rando')
	return (
		<section className='cocktail-OTD-wrapper'>
			<p className='welcome-msg'>Welcome {props.username}!</p>
			<p className='COTD-title'>Cocktail of the Day</p>
			{error && <div>{error}</div>}
			<section className='cocktail-OTD'>
				<h3>{randomCocktail.strDrink}</h3>
				<img className='COTD-img' src={`${randomCocktail.strDrinkThumb}`} alt={`${randomCocktail.strDrink}`} /> 
				<button className='details-btn'>More details</button>
			</section>
		</section>
	)
}

export default Dashboard;