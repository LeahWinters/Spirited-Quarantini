import React, { ReactElement, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login/Login';
import './App.css';


function App(): ReactElement {
  const [username, setUsername] = useState<string>();

  return (
    <main>
      <Switch>
        <Route 
          path='/' 
          render={() => (
            <Login userName={username}/>
          )}
        />
        
      </Switch>
    </main>
  )
}

export default App;
