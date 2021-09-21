import React from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  Switch,
} from 'react-router-dom';

// Style
import './style/App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Overview from './components/Overview';
import LocationRouter from './components/LocationRouter';

function App () {

  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path="/:storeId">
            <LocationRouter />
          </Route>
          <Route path="/" exact>
            <Overview />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  )
}

export default App;