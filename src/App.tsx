import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Header from './Components/Header/Header';
import HomePage from './Components/HomePage/HomePage';
import Footer from './Components/Footer/Footer';
import OwnGameChooseLevel from './Components/OwnGame/OwnGameChooseLevel/OwnGameChooseLevel';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/games/translator">
          <OwnGameChooseLevel />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
