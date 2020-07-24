import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRandomCocktail } from '../apiCalls';
import './Dashboard.scss';
import { RandomCocktail } from '../Definitions/RandomCocktail'
import {RouteComponentProps, withRouter} from "react-router-dom"

export interface DashboardProps {
	username: string
}


const Dashboard: React.SFC<DashboardProps> = (props, {history}: RouteComponentProps) => {
	const [randomCocktail, setRandomCocktail] = useState<RandomCocktail>({idDrink: '', strDrink: '', strInstructions: '', strDrinkThumb: ''});
	const [error, setError] = useState<string>('');


	const getCocktail = async ():Promise<any> => {
		try {
			const data: RandomCocktail = await getRandomCocktail();
			setRandomCocktail(data)
			history.push('/');
		} catch (error) {
			setError(error.message);
		}
	}

	useEffect(() => {getCocktail()}, [])

	// const removeNulls = (info: RandomCocktail): RandomCocktail => {
  // 	const drinkDetails = {idDrink: '', strDrink: '', strInstructions: '', strDrinkThumb: ''};
  //   Object.keys(info).forEach((detail: any) => {
  //     if (info[detail]!== null) { 
  //       drinkDetails[detail] = info[detail]; 
  //     }
  //   });
  //   return drinkDetails;
  // }

	return (
		<section className='cocktail-OTD-wrapper'>
			<p className='welcome-msg'>Welcome {props.username}!</p>
			<p className='COTD-title'>Cocktail of the Day</p>
			{error && <div>{error}</div>}
			<section className='cocktail-OTD'>
				<h3>{randomCocktail.strDrink}</h3>
				<img className='COTD-img' src={`${randomCocktail.strDrinkThumb}`} alt={`${randomCocktail.strDrink}`} /> 
				<Link to={`/${randomCocktail.idDrink}/details`}><button className='details-btn' aria-label='details-button'>More details</button></Link>
			</section>
		</section>
	)
}

export default withRouter(Dashboard);