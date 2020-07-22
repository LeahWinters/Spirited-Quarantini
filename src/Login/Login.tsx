import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';

export interface LoginProps {
	username: string;
	setUsername: Function;
	loggedIn: boolean;
	setLoggedIn: Function;
} //generic ready if we need to safe type any props passed in

const Login: React.SFC<LoginProps> = (props) => {	
	const verifyUser = () => {
		props.setUsername('')
		props.setLoggedIn(!props.loggedIn);
	};

	const denyUser = (event: any) => {
		//display message for minors
	};

	const buttonsEnabled = props.username.trim() !== '';

	return (
		<section className='login-wrapper'>
			<p className='subtitle'>Learn how to be your own bartender!</p>
			<form className='login-form'>
				<p className='login-msg'>You must be 21 or older to use this site. Please enter your name and continue if this applies.</p>
				<section className="form-input">
					<input
						type="name"
						aria-label="name-input"
						className="input"
						placeholder="username"
						name="username"
						value={props.username}
						onChange={(event) => props.setUsername(event.target.value)}
						required
					/>
				</section>

				<section className='login-btns'>
					<Link to="/dashboard">
						<button 	
							onClick={(event) => verifyUser()} 
							className="submit-login-btn" 
							aria-label="submit-button"
							type="button"
							disabled={!buttonsEnabled}
						>
							I'm 21+
						</button>
					</Link>

					<button 
						onClick={(event) => denyUser(event)} 
						className="submit-login-btn" 
						aria-label="submit-button"
						type="button"
						disabled={!buttonsEnabled}
						>
						I'm under 21
					</button>
				</section>
			</form>
		</section>
	);
};

export default Login;
