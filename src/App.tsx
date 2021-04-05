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
import LeoSprintGame from './Components/Leo-Sprint/LeoSprintGame';
import TextBook from './Components/TextBook/TextBook';
import Register from './pages/Register';
import Login from './pages/Login';

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
        <Route path="/games/sprint">
          <LeoSprintGame />
        </Route>
        <Route path="/textbook">
          <TextBook />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
