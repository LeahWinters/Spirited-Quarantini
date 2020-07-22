import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {

}

const Header: React.SFC<HeaderProps> = props => {

	return (
		<header>
			<Link to='/'>
				<h1>Spirited Quarantini</h1>
			</Link>
			<Link to='/about'>
				<h1>About</h1>
			</Link>
			<Link to='/cocktails'>
				<h1>Cocktails</h1>
			</Link>
			<Link to='/my_cocktails'>
				<h1>My Cocktails</h1>
			</Link>
		</header>
	)
}

export default Header;