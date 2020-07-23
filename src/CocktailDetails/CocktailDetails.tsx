import React, { useState, useEffect } from 'react';
import { getCocktailDetails } from '../apiCalls';
import { RandomCocktail } from '../Definitions/RandomCocktail'
import './CocktailDetails.scss';
export interface CocktailDetailsProps {
	id: string;
}

const CocktailDetails: React.FC<CocktailDetailsProps> = (props) => {
	const [cocktailInfo, setCocktailInfo] = useState<RandomCocktail>({idDrink: '', strDrink: '', strInstructions: '', strDrinkThumb: ''})
	const [error, setError] = useState<string>('');

	const getCocktail = async ():Promise<any> => {
		try {
			const data: RandomCocktail = await getCocktailDetails(props.id);
			setCocktailInfo(removeNulls(data));
		} catch (error) {
		setError(error.message);
		}
	}

	const removeNulls = (info: RandomCocktail): RandomCocktail => {
  	const drinkDetails: Partial<RandomCocktail> = {idDrink: '', strDrink: '', strInstructions: '', strDrinkThumb: ''};
		(Object.keys(info) as Array<keyof RandomCocktail>).forEach((detail) => {
      if (info[detail]!== null) { 
        drinkDetails[detail] = info[detail]; 
      }
		});
    return drinkDetails as RandomCocktail;
	}
	
	const displayIngredients = () => {
		const cocktailInfoKeys = Object.keys(cocktailInfo)
		console.log(cocktailInfoKeys, 'display');
		console.log(cocktailInfo, 'info')
	}

	useEffect(() => {getCocktail()}, []);

	return (
		<section className='cocktail-details-wrapper'>
			<section className='cocktail-details-card'>
				<h3>{cocktailInfo.strDrink}</h3>
				<img className='COTD-img' src={`${cocktailInfo.strDrinkThumb}`} alt={`${cocktailInfo.strDrink}`} /> 
				<section className='info-wrapper'>
				<h4>Type:<div>{cocktailInfo.strCategory}, {cocktailInfo.strAlcoholic}</div></h4>
				<h4>Glass:<div>{cocktailInfo.strGlass}</div></h4>
				<h4>Instructions:</h4>
					<p>{cocktailInfo.strInstructions}</p>
				<h4>Ingredients:</h4>
					<p>{cocktailInfo.strIngredient1} {cocktailInfo.strMeasure1}</p>
					<p>{cocktailInfo.strIngredient2} {cocktailInfo.strMeasure2}</p>
					<p>{cocktailInfo.strIngredient3} {cocktailInfo.strMeasure3}</p>
					<p>{cocktailInfo.strIngredient4} {cocktailInfo.strMeasure4}</p>
					<p>{cocktailInfo.strIngredient5} {cocktailInfo.strMeasure5}</p>
					<p>{cocktailInfo.strIngredient6} {cocktailInfo.strMeasure6}</p>
					<p>{cocktailInfo.strIngredient7} {cocktailInfo.strMeasure7}</p>
					<p>{cocktailInfo.strIngredient8} {cocktailInfo.strMeasure8}</p>
					<p>{cocktailInfo.strIngredient9} {cocktailInfo.strMeasure9}</p>
					<p>{cocktailInfo.strIngredient10} {cocktailInfo.strMeasure10}</p>
					<p>{cocktailInfo.strIngredient11} {cocktailInfo.strMeasure11}</p>
					<p>{cocktailInfo.strIngredient12} {cocktailInfo.strMeasure12}</p>
					<p>{cocktailInfo.strIngredient13} {cocktailInfo.strMeasure13}</p>
					<p>{cocktailInfo.strIngredient14} {cocktailInfo.strMeasure14}</p>
					<p>{cocktailInfo.strIngredient15} {cocktailInfo.strMeasure15}</p>
					{displayIngredients()}
				</section>
			</section>
		</section>	
	)
}

export default CocktailDetails;