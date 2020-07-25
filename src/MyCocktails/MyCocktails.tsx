import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyCocktails.scss';

interface MyCocktailsProps {
}

const MyCocktails: React.SFC<MyCocktailsProps> = () => {
	const [allCocktails, setAllCocktails] = useState({})

	// NonFunctional code to connect array of cocktails

	return (
		<section className='my-cocktails-container'>
			<section className='btn-container'>
				<Link to='my_cocktails/favorites'><button className='my-c-button'>My Favorites</button></Link>
				<Link to='my_cocktails/logged'><button className='my-c-button'>Logged Drinks</button></Link>
			</section>
		</section>
	)
}

export default MyCocktails;