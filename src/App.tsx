/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { Redirect, Route, Switch, Link } from "react-router-dom";
import './App.css';
import { Headquarters } from './app/components/Headquarters';
import { ResourceDisplay } from './app/components/ResourceDisplay/ResourceDisplay';
import { updateQueue } from './app/game/queue';
import { store } from './app/store';
import { incrementAllTownsResources } from './app/slices/towns';
import { useDispatch } from 'react-redux';
import { Navbar } from './app/components/Navbar';
import { SidebarQueue } from './app/components/SidebarQueue';
import { BuildingHeader } from './app/components/BuildingHeader';
import { VillageTitle } from './app/components/VillageTitle';
import { QueueOld } from './app/components/QueueOld';
import { ConstructButton, HeaderNavButton } from './app/components/Buttons';
import { BattleReport } from './app/components/BattleReport';

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

  const handleClick = () => {
    console.log("hi");

  }

  interface MainContainerProps {
    children?: JSX.Element | JSX.Element[];
  }

  const MainContainer = ({ children }: MainContainerProps) => {
    return (
      <>
        <div className="header">
          <HeaderNavButton linkTo={"/0/buildings/headquarters"} text="Home" />
          <HeaderNavButton linkTo={"/0/villages"} text="Villages" />
          <HeaderNavButton linkTo={"/0/map"} text="Map" />
          <HeaderNavButton linkTo={"/0/reports"} text="Reports" />
          <HeaderNavButton linkTo={"/0/reports"} text="Settings" />
        </div>
        <div className={"App-Main"}>
          {/* <QueueOld /> */}
          <div className="App-Header">
            <VillageTitle />
            <ResourceDisplay />
          </div>
          <Navbar />
          {children}
        </div>
      </>
    )
  };

  return (
    <div className="App">
      <Switch>

        {/* Redirect the main page to the headquarters of the starting town for now */}
        <Route exact path="/">
          <Redirect to="/0/buildings/headquarters" />
        </Route>

        <Route exact path="/:townId/reports">
          <MainContainer>
            <BattleReport />
          </MainContainer>
        </Route>

        <Route exact path="/:townId/villages">
          <MainContainer>
            <div>Villages for town</div>
          </MainContainer>
        </Route>

        <Route exact path="/:townId/recruit">
          <MainContainer>
            <div>Recruitment for town</div>
          </MainContainer>
        </Route>

        <Route exact path="/:townId/map">
          <MainContainer>
            <div>Map for town</div>
          </MainContainer>

        </Route>

        {/* Have a page for each building in a town */}
        <Route exact path="/:townId/buildings/:buildingId">
          <MainContainer>
            <BuildingHeader />
            <div className="queueContainer">
              <Headquarters />
              <SidebarQueue />
            </div>
          </MainContainer>
        </Route>

        <Route>
          <h1>404 Not Found</h1>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
