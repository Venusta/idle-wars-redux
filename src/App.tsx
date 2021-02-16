/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { Redirect, Route, Switch, Link } from "react-router-dom";
import './App.css';
import { BuildingPage } from './app/components/BarracksRemake';
import { Headquarters } from './app/components/Headquarters';
import { Queue } from './app/components/Queue';
import { ResourceDisplay } from './app/components/ResourceDisplay/ResourceDisplay';
import { updateQueue } from './app/game/queue';
import { store } from './app/store';
import { incrementAllTownsResources } from './app/slices/towns';
import { useDispatch } from 'react-redux';
import { Navbar } from './app/components/Navbar';
import { SidebarQueue } from './app/components/SidebarQueue';
import { BuildingHeader } from './app/components/BuildingHeader';

function App() {
  const dispatch = useDispatch()
  const towns = store.getState().towns;
  const TownLinks = () => (
    <>
      {Object.entries(towns).map(([id, town]) => {
        return (<Link key={id} to={`/${id}/buildings/headquarters`}>{town.name}</Link>);
      })}
    </>
  );

  // useEffect(() => {
  //   const x = setInterval(() => {
  //     updateQueue(); // not this
  //     dispatch(incrementAllTownsResources()); // not this
  //     console.log("Updated");
  //   }, 1000);
  //   return () => {
  //     clearInterval(x);
  //   }
  // }, []);
  console.log("PLEASE DON'T RE-RENDER");


  const ExampleButton = ({ className, inner }: { className: string, inner: string }) => {
    return <div className={className}>{inner}</div>
  }

  return (
    <div className="App">
      <Switch>

        {/* Redirect the main page to the headquarters of the starting town for now */}
        <Route exact path="/">
          <Redirect to="/0/buildings/headquarters" />
        </Route>

        <Route exact path="/:townId/recruit">
          <div>Recruitment for town</div>
        </Route>

        <Route exact path="/:townId/map">
          <div>Map for town</div>
        </Route>

        {/* Have a page for each building in a town */}
        <Route exact path="/:townId/buildings/:buildingId">
          <div className="App-Main">
            <div className="App-Header">
              <div className="App-Style-Village">Test village (489|489) K44</div>
              <ResourceDisplay />
            </div>
            <Navbar />
            <BuildingHeader />
            <div className="queueContainer">
              <BuildingPage />
              <SidebarQueue />
            </div>
          </div>
        </Route>

        <Route>
          <h1>404 Not Found</h1>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
