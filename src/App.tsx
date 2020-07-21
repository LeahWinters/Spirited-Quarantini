import React, { ReactElement, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

// import Login from './Login/Login';

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       username: "",
//       error: ""
//     }
//   }
//   render() {
//     <main>
//       <Login />
//     </main>
//   };
// }

function App(): ReactElement {
  const [username, setUsername] = useState<string>();

  return (
    <main>
      <Switch>
        <Route path='/' />
        <div>
          {username}
        </div>
      </Switch>
    </main>
  )
}

export default App;
