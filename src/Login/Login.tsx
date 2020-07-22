import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export interface LoginProps {
	username: string;
	setUsername: any;
	loggedIn: boolean;
	setLoggedIn: any;
} //generic ready if we need to safe type any props passed in

const Login: React.SFC<LoginProps> = (props) => {	
	const verifyUser = () => {
		props.setLoggedIn(!props.loggedIn);
	};

	const denyUser = (event: any) => {
		//display message for minors
	};

	return (
		<form>
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

			<Link to="/dashboard">
				<button 	
					onClick={(event) => verifyUser()} 
					className="submit-login-btn" 
					aria-label="submit-button"
					type="button"
				>
					I'm 21+
				</button>
			</Link>

			<button 
				onClick={(event) => denyUser(event)} 
				className="submit-login-btn" 
				aria-label="submit-button"
				type="button"
				>
				I'm under 21
			</button>
		</form>
	);
};

export default Login;
