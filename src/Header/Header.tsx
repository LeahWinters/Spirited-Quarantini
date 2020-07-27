import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { isParenthesizedExpression } from 'typescript';

interface HeaderProps {
	loggedIn: boolean;
	setLoggedIn: Function;
	setUsername: Function;
	findResults: Function
	username: string;
}

const Header: React.SFC<HeaderProps> = props => {
	//state w/ input value
	const [searchInput, setSearchInput] = useState('');
	
	const logoutUser = () => {
		props.setLoggedIn(false);
		props.setUsername('')
	}

  const buttonsEnabled = searchInput.trim() !== "";
	
	const search = () => {
		props.findResults(searchInput);
		setSearchInput('');
	}

	return (
		<header>
			{!props.loggedIn && 
				<Link to='/'>
					<h1 className='app-title'>Spirited Quarantini</h1>
				</Link>
			}

			{props.loggedIn && 
				<div className='user-header'>
					<Link to='/cocktails'>
						<h1 className='app-title'>Spirited Quarantini</h1>
					</Link>
					<h3 className='welcome-message'>Welcome, {props.username}</h3>
					<form className='search-bar'>
						<input
							type="text"
							name="search"
							placeholder="search cocktails..."
							className="header-search"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
							aria-label="search"
						/>
						<Link to='/results'>
							<button 
								className="header-search-button" 
								onClick={() => search()}
								type="button"
								disabled={!buttonsEnabled}
							>
								Search
							</button>
						</Link>
					</form>

				<section className='navlinks'>
					<Link to='/about'>
						<h3 className='navlink-title'>About</h3>
					</Link>
					<Link to='/random_cocktail'>
						<h3 className='navlink-title'>Cocktail of the Day</h3>
					</Link>
					<Link to='/my_cocktails'>
						<h3 className='navlink-title'>My Cocktails</h3>
					</Link>
					<Link to='/'>
						<button
							onClick={logoutUser}
							className='logout-btn'
						>
							Logout
						</button>
					</Link>
				</section>
				</div>
			}

		</header>
	)
}

export default Header;