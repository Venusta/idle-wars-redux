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

  const ProgressBar2 = (props: { percent: number; }) => {
    const { percent } = props;

    const fillerStyles = {
      width: `${percent}%`,
    }

    return (
      <div className="container-2">
        {/* <div>Headquarters (Lvl 21)</div> */}
        <div style={fillerStyles} className="filler-styles-2" ></div>
      </div>
    );
  };

  return (
    <div className="App">
      <Switch>

        {/* Redirect the main page to the headquarters of the starting town for now */}
        <Route exact path="/">
          <Redirect to="/0/buildings/headquarters" />
        </Route>

        <Route exact path="/:townId/recruit">

          <div className="Sidebar-Left">
            <TownLinks />
            <SidebarQueue />
          </div>

          <div>Recruitment for town</div>
        </Route>

        <Route exact path="/:townId/map">

          <div className="Sidebar-Left">
            <SidebarQueue />
          </div>

          <div>Map for town</div>
        </Route>

        {/* Have a page for each building in a town */}
        <Route exact path="/:townId/buildings/:buildingId">

          <div className="Sidebar-Left">
            <TownLinks />
            {`
230 Swordsmen
10 Scouts
20 Light cavalry
1 Paladin
230 Swordsmen
10 Scouts
20 Light cavalry
1 Paladin
» recruit`}
            <SidebarQueue />
          </div>

          <div className="App-Main">
            <div className="App-Header">
              <div className="App-Style-Village">Test village (489|489) K44</div>
              {/* <ResourceDisplay2 /> */}
              <ResourceDisplay />
            </div>
            <Navbar />
            <div className="neu-test">
              {/* <ExampleButton className="neu-both neu-inner" inner="Level 21" />
              <ExampleButton className="neu-both neu-inner2" inner="0:00:09" />
              <ExampleButton className="neu-both neu-inner" inner="Level 15" />
              <ExampleButton className="neu-both neu-inner2" inner="0:01:09" />
              <ExampleButton className="neu-both neu-inner2" inner="2:04:09" /> */}
              <ExampleButton className="neu-both neu-inner3" inner="2:04:09" />
              <ExampleButton className="neu-both neu-inner3" inner="Level 15" />
              <ExampleButton className="neu-both neu-inner3" inner="2:04:09" />
            </div>
            <div className="neu-test">
              <div className="grid-test">
                <div className="grid-cell">testaaaaaaaaa</div>
                <div className="grid-cell">test</div>
                <ExampleButton className="neu-both neu-inner" inner="Level 5" />
                <div className="grid-cell">test</div>
                <div className="grid-cell">test</div>
                <ExampleButton className="neu-both neu-inner" inner="Level 3" />
                <div className="grid-cell">test</div>
                <div className="grid-cell">test</div>
                <ExampleButton className="neu-both neu-inner2" inner="2:04:09" />
                <div className="grid-cell">test</div>
                <div className="grid-cell">test</div>
                <ExampleButton className="neu-both neu-inner2" inner="2:04:09" />
                <div className="grid-cell">test</div>
                <div className="grid-cell">test</div>
                <ExampleButton className="neu-both neu-inner" inner="Level 15" />
                <div className="grid-cell">test</div>
                <div className="grid-cell">test</div>

                <ExampleButton className="neu-both neu-inner2" inner="2:04:09" />
                <div className="grid-cell">test</div>
                <div className="grid-cell">test</div>
                <ExampleButton className="neu-both neu-inner" inner="Level 5" />
                <div className="grid-cell">test</div>
                <div className="grid-cell">test</div>
                <ExampleButton className="neu-both neu-inner2" inner="2:04:09" />

              </div>
            </div>
            <BuildingHeader />
            <BuildingPage />
            {/* <Queue /> */}

            {/* <div className="neu-prog-container">
              <div className="bar" style={{ width: "80%" }}></div>
            </div>
            <div className="neu-prog-container">
              <div className="bar" style={{ width: "50%" }}></div>
            </div>
            <div className="neu-prog-container">
              <div className="bar" style={{ width: "30%" }}></div>
            </div> */}
          </div>
        </Route>

        <Route>
          <h1>404 Not Found</h1>
        </Route>

      </Switch>
      {/* <div className="Sidebar-Right">
        <div className="idks">Headquarters (Lvl 21)</div>
        <ProgressBar2 percent={80} ></ProgressBar2>
        <div className="idks">Timbercamp (Lvl 21)</div>
        <ProgressBar2 percent={20} ></ProgressBar2>
        <div className="idks">Headquarters (Lvl 21)</div>
        <ProgressBar2 percent={100} ></ProgressBar2>
        <div className="idks">Timbercamp (Lvl 21)</div>
        <ProgressBar2 percent={30} ></ProgressBar2>
        <div className="idks">Headquarters (Lvl 21)</div>
        <ProgressBar2 percent={10} ></ProgressBar2>
        <div className="idks">Timbercamp (Lvl 21)</div>
        <ProgressBar2 percent={80} ></ProgressBar2>
        <div className="idks">Headquarters (Lvl 21)</div>
        <ProgressBar2 percent={80} ></ProgressBar2>
        <div className="idks">Timbercamp (Lvl 21)</div>
        <ProgressBar2 percent={80} ></ProgressBar2>
        <div className="idks">Headquarters (Lvl 21)</div>
        <ProgressBar2 percent={40} ></ProgressBar2>
        <div className="idks">Timbercamp (Lvl 21)</div>
        <ProgressBar2 percent={50} ></ProgressBar2>
        <div className="idks">Headquarters (Lvl 21)</div>
        <ProgressBar2 percent={80} ></ProgressBar2>
        <div className="idks">Timbercamp (Lvl 21)</div>
        <ProgressBar2 percent={90} ></ProgressBar2>
        <div className="idks">Headquarters (Lvl 21)</div>
        <ProgressBar2 percent={80} ></ProgressBar2>
        <div className="idks">Timbercamp (Lvl 21)</div>
        <ProgressBar2 percent={20} ></ProgressBar2>
        <div className="idks">Headquarters (Lvl 21)</div>
        <ProgressBar2 percent={30} ></ProgressBar2>
        <div className="idks">Timbercamp (Lvl 21)</div>
        <ProgressBar2 percent={60} ></ProgressBar2>
        <div className="idks">Headquarters (Lvl 21)</div>
        <ProgressBar2 percent={30} ></ProgressBar2>
        <div className="idks">Timbercamp (Lvl 21)</div>
        <ProgressBar2 percent={80} ></ProgressBar2>
      </div> */}

      {/* <Queue /> */}
      {/* <Headquarters /> */}
      {/* <Barracks /> */}
    </div>
  );
}

export default App;
