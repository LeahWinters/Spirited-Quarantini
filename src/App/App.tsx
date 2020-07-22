import React, { ReactElement, useEffect, useState } from 'react';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Dashboard from '../Dashboard/Dashboard';
import './App.css';

const App: React.SFC<RouteComponentProps> = () => {
	const [username] = useState<string>('');
	const [loggedIn] = useState<boolean>(false);

  return (
    <main>
			<Header />
      <Switch>
        <Route exact path='/' component={Login} />
				{/* <Route exact path='/' render={() => <Login username={username}/>} /> */}
				<Route path='/dashboard' component={Dashboard} />
      </Switch>
    </main>
  )
}

export default withRouter(App);
