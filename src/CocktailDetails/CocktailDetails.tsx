import React, { useState, useEffect } from 'react';
import { getCocktailDetails } from '../apiCalls';
import { RandomCocktail } from '../Definitions/RandomCocktail'

export interface CocktailDetailsProps {
	id: string;
}

const CocktailDetails: React.FC<CocktailDetailsProps> = (props) => {
	const [cocktailInfo, setCocktailInfo] = useState<RandomCocktail>({idDrink: '', strDrink: '', strInstructions: '', strDrinkThumb: ''})
	const [error, setError] = useState<string>('');

	const getCocktail = async ():Promise<any> => {
		try {
			const data: RandomCocktail = await getCocktailDetails(props.id);
			setCocktailInfo(data);
			console.log(data);
		} catch (error) {
		setError(error.message);
		}
	}

	useEffect(() => {getCocktail()}, []);

	return (
		<section className='cocktail-OTD'>
			<h3>{cocktailInfo.strDrink}</h3>
			<h3>{cocktailInfo.strGlass}</h3>
			<img className='COTD-img' src={`${cocktailInfo.strDrinkThumb}`} alt={`${cocktailInfo.strDrink}`} /> 
		</section>	
	)
}

export default CocktailDetails;