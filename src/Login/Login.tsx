import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

export interface LoginProps extends RouteComponentProps<any> {
	// username: string
} //generic ready if we need to safe type any props passed in

const Login: React.SFC<LoginProps> = ({history}) => {
	const [username, setUsername] = useState<string>('');


	const verifyUser = (event: any) => {
		// event.preventDefault();
		// history.push(`/dashboard`);
	}

	const denyUser = (event: any) => {

	}

	return (
		<form>
			<section className="form-input">
				<input
					type="name"
					aria-label="name-input"
					className="input"
					placeholder="username"
					name="username"
					value={username}
					onChange={(event) => setUsername(event.target.value)}
					required
				/>
			</section>

			<Link to='/dashboard'><button
				onClick={(event) => verifyUser(event)}
				className="submit-login-btn"
				aria-label="submit-button"
			>
				I'm 21+
      </button></Link>

			<button
				onClick={(event) => denyUser(event)}
				className="submit-login-btn"
				aria-label="submit-button"
			>
				I'm under 21
      </button>
		</form>
	)
}


export default Login;