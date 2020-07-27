import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.scss';
import { Cocktail } from '../Definitions/RandomCocktail'

export interface DashboardProps {
	username: string;
	randomCocktail: Cocktail
}

const Dashboard: React.SFC<DashboardProps> = (props) => {
	const [randomCocktail, setRandomCocktail] = useState<Cocktail>(props.randomCocktail);
	const [error, setError] = useState<string>('');

	return (
		<section className='cocktail-OTD-wrapper'>
			<p className='COTD-title'>Cocktail of the Day</p>
			{error && <div>{error}</div>}
			<section className='cocktail-OTD'>
				<h3>{randomCocktail.strDrink}</h3>
				<img className='COTD-img' src={`${randomCocktail.strDrinkThumb}`} alt={`${randomCocktail.strDrink}`} /> 
				<Link to={`/${randomCocktail.idDrink}/details`}><button className='details-btn' aria-label='details-button'>Make Me</button></Link>
			</section>
		</section>
	)
}

export default Dashboard;