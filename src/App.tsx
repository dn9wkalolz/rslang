import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import HomePage from './Components/HomePage/HomePage';
import Footer from './Components/Footer/Footer';
import OwnGameChooseLevel from './Components/OwnGame/OwnGameChooseLevel/OwnGameChooseLevel';
import LeoSprintGame from './Components/Leo-Sprint/LeoSprintGame';
import TextBook from './Components/TextBook/TextBook';
import MyTextBook from './Components/MyTextBook/MyTextBook';
import Register from './pages/Register';
import Login from './pages/Login';
import AudiocallStartScreen from './Components/Audiocall/AudiocallStartScreen/AudiocallStartScreen';
import SavannahChooseLevel from './Components/Savannah/SavannahChooseLevel/SavannahChooseLevel';
import Header from './Components/Header/Header';
import Settings from './Components/Settings/Settings';
import Statistic from './Components/Statistic/Statistic';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <LastLocationProvider>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/games/savannah">
            <SavannahChooseLevel />
          </Route>
          <Route path="/games/translator">
            <OwnGameChooseLevel />
          </Route>
          <Route path="/games/audiocall">
            <AudiocallStartScreen />
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
          <Route path="/vocabulary">
            <MyTextBook />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/statistics">
            <Statistic />
          </Route>
        </Switch>
        <Footer />
      </LastLocationProvider>
    </BrowserRouter>
  );
}

export default App;
