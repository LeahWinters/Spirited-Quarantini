import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
	loggedIn: boolean
}

const Header: React.SFC<HeaderProps> = props => {

	return (
		<header>
			<Link to='/'>
				<h1>Spirited Quarantini</h1>
			</Link>

			{props.loggedIn && 
				<div>
					<form className='search-bar'>
						<input
							type="text"
							name="search"
							placeholder="search..."
							className="header-search"
							// value={searchInput}
							// onChange={(e) => updateSearchInput(e.target.value)}
							aria-label="search"
						/>
						<Link to='/results'>
							<button className="header-search-button">
								Search
							</button>
						</Link>
					</form>

					<Link to='/about'>
						<h1>About</h1>
					</Link>
					<Link to='/cocktails'>
						<h1>Cocktails</h1>
					</Link>
					<Link to='/my_cocktails'>
						<h1>My Cocktails</h1>
					</Link>
				</div>
			}

		</header>
	)
}

export default Header;