import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AllPostsPage from './pages/AllPostsPage';
import UserPage from './pages/User/UserPage';
import Header from './components/Header';

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={AllPostsPage} />
          <Route path="/users/:id" component={UserPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
