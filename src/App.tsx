import React, { useEffect } from 'react';
import { Redirect, Route, Switch, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import './App.css';
import { Barracks } from './app/components/Barracks';
import { BuildingHeader, BuildingPage } from './app/components/BarracksRemake';
import { Headquarters } from './app/components/Headquarters';
import { Queue } from './app/components/Queue';
import { ResourceDisplay } from './app/components/ResourceDisplay/ResourceDisplay';
import { BuildingId } from './app/game/constants';
import { updateQueue } from './app/game/queue';
import { handleResourceGeneration } from './app/game/resources/generation';
import { selectBuildingLevel } from './app/selectors/selectBuildingLevel';
import { store } from './app/store';

function App() {
  const towns = store.getState().towns;
  const townLinks = Object.entries(towns).map(([id, town]) => {
    return (<Link key={id} to={`/town/${id}/headquarters`}>{town.name}</Link>)
  });

  useEffect(() => {
    const x = setInterval(() => {
      updateQueue();
      handleResourceGeneration();
      console.log("Updated");      
    }, 10000);
    return () => {
      clearInterval(x);
    }
  }, []);
  console.log("PLEASE DON'T RE-RENDER");

  return (
    <div className="App">
      <div className="App-Title">Idle Wars!</div>
      <div className="Sidebar-Left">
        {townLinks}
      </div>

      <Switch>

        {/* Redirect the main page to the headquarters of the starting town for now */}
        <Route exact path="/">
          <Redirect to="/town/0/headquarters" />
        </Route>

        {/* Have a page for each building in a town */}
        <Route exact path="/town/:townId/:buildingId">
          <div className="App-Header">
            <div className="App-Style-Village">Test village (489|489) K44</div>
            <ResourceDisplay />
          </div>
          <div className="App-Main">
            <BuildingHeader />
            <BuildingPage />
          </div>
        </Route>

        <Route>
          <h1>404 Not Found</h1>
        </Route>

      </Switch>

      {/* <Queue /> */}
      {/* <Headquarters /> */}
      {/* <Barracks /> */}
    </div>
  );
}

export default App;
