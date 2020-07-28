import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.scss';
import { Cocktail } from '../Definitions/RandomCocktail'

export interface DashboardProps {
	randomCocktail: Cocktail;
	error: string;
}

const Dashboard: React.SFC<DashboardProps> = (props) => {
	return (
		<section className='cocktail-OTD-wrapper'>
			<p className='COTD-title'>Cocktail of the Day</p>
			{props.error && <div className='error-msg'>404: No cocktail found</div>}
			{!props.error && 
				<section className='cocktail-OTD'>
					<h3>{props.randomCocktail.strDrink}</h3>
					<img className='COTD-img' src={`${props.randomCocktail.strDrinkThumb}`} alt={`${props.randomCocktail.strDrink}`} /> 
					<Link to={`/cocktails/${props.randomCocktail.idDrink}`}><button className='details-btn' aria-label='details-button'>Make Me</button></Link>
				</section>
			}
		</section>
	)
}

export default Dashboard;