import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";

export interface LoginProps {
  username: string;
  setUsername: Function;
  loggedIn: boolean;
  setLoggedIn: Function;
}

const Login: React.SFC<LoginProps> = (props) => {
	const [is21, setIs21] = useState<boolean>(true);

  const verifyUser = () => {
    props.setLoggedIn(!props.loggedIn);
  };

  const buttonsEnabled = props.username.trim() !== "";

  return (
    <section className="login-wrapper">
      <p className="subtitle">Learn how to be your own bartender!</p>
      <form className="login-form">
        <p className="login-msg">
          You must be 21 or older to use this site. Please enter your name and
          continue if this applies.
        </p>
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

        <section className="login-btns">
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
            onClick={(event) => setIs21(false)}
            className="submit-login-btn"
            aria-label="submit-button"
            type="button"
            disabled={!buttonsEnabled}
          >
            I'm under 21
          </button>
        </section>

				{!is21 && <div className='minor-msg'>Sorry, come back in a few years</div>}
      </form>
    </section>
  );
};

export default Login;
