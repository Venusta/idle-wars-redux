/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, Link } from "react-router-dom";
import './App.css';
import { BuildingHeader, BuildingPage } from './app/components/BarracksRemake';
import { Headquarters } from './app/components/Headquarters';
import { Queue } from './app/components/Queue';
import { ResourceDisplay } from './app/components/ResourceDisplay/ResourceDisplay';
import { updateQueue } from './app/game/queue';
import { handleResourceGeneration } from './app/game/resources/generation';
import { store } from './app/store';

function App() {
  const towns = store.getState().towns;
  const townLinks = Object.entries(towns).map(([id, town]) => {
    return (<Link key={id} to={`/town/${id}/headquarters`}>{town.name}</Link>)
  });

  const [timestamp, setTimestamp] = useState(Date.now());

  useEffect(() => {
    const x = setInterval(() => {
      updateQueue(); // not this
      handleResourceGeneration(); // not this
      console.log("Updated");      
    }, 10000);
    return () => {
      clearInterval(x);
    }
  }, []);
  console.log("PLEASE DON'T RE-RENDER");

  return (
    <div className="App">
      {/* <div className="App-Title">Idle Wars!</div> */}
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
          <div className="App-Main">
          <div className="App-Header">
            <div className="App-Style-Village">Test village (489|489) K44</div>
            <ResourceDisplay />
          </div>
            <BuildingHeader />
            <BuildingPage />
          </div>
        </Route>

        <Route>
          <h1>404 Not Found</h1>
        </Route>

      </Switch>
      <div className="Sidebar-Right">
        
        {`        
All
250 Spear fighters
230 Swordsmen
10 Scouts
20 Light cavalry
1 Paladin
» recruit`}
      </div>

      {/* <Queue /> */}
      {/* <Headquarters /> */}
      {/* <Barracks /> */}
    </div>
  );
}

export default App;
