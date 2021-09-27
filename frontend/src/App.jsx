import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AllNewsPage from './pages/AllNewsPage';
import Header from './components/Header';

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={AllNewsPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
