import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

interface HeaderProps {
	loggedIn: boolean;
	setLoggedIn: any;
}

const Header: React.SFC<HeaderProps> = props => {

	const logoutUser = () => {
		props.setLoggedIn(false);
	}

	return (
		<header>
			<Link to='/'>
				<h1>Spirited Quarantini</h1>
			</Link>

			{props.loggedIn && 
				<div className='userNavLinks'>
					<form className='search-bar'>
						<input
							type="text"
							name="search"
							placeholder="search cocktails..."
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
					<Link to='/'>
						<button
							onClick={logoutUser}
						>
							Logout
						</button>
					</Link>
				</div>
			}

		</header>
	)
}

export default Header;