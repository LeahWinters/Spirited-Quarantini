import React, { useState, useEffect } from 'react';
import { getAllCocktails } from '../apiCalls';
// import './MyCocktails.scss';


interface MyCocktailsProps {
}

const MyCocktails: React.SFC<MyCocktailsProps> = () => {
	const [allCocktails, setAllCocktails] = useState({})

	// NonFunctional code to connect array of cocktails
	// const displayingAllCocktails = async () => {
	// 	try {
	// 		const data: any = await getAllCocktails();
	// 		setAllCocktails(data)
	// 	} catch (error) {

	// 	}
	// }

	return (
		<div>MY COCKTAILS PAGE</div>
	)
}

export default MyCocktails;