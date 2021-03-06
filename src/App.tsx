import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { Headquarters } from "./app/components/Headquarters";
import { ResourceDisplay } from "./app/components/ResourceDisplay";
import { Navbar } from "./app/components/Navbar";
import { SidebarQueue } from "./app/components/SidebarQueue";
import { BuildingHeader } from "./app/components/BuildingHeader";
import { VillageTitle } from "./app/components/VillageTitle";
import { HeaderNavButton } from "./app/components/Buttons";
import { BattleReport } from "./app/components/BattleReport";
import { simulateBattle } from "./app/game/combat/simulator";
import { UnitId } from "./app/game/constants";
import { active } from "./app/slices/misc";
import { gameTick } from "./app/game/gameTick";
import { Barracks } from "./app/components/Barracks";
import { Overview } from "./app/components/Overview";
import { useStateSelector } from "./app/components/hooks";
import { useAppDispatch } from "./app/store";
import { WorldMap } from "./app/components/WorldMap";

interface MainContainerProps {
  children?: JSX.Element | JSX.Element[];
}

const MainContainer = ({ children }: MainContainerProps) => (
  <>
    <div className="header-wrapper">
      <div className="ahhh">
        <VillageTitle />
      </div>
      <div className="header">
        <HeaderNavButton linkTo="/0/buildings/headquarters" text="Home" />
        {/* <HeaderNavButton linkTo={"/0/villages"} text="Villages" /> */}
        <HeaderNavButton linkTo="/0/overview" text="Overview" />
        <HeaderNavButton linkTo="/0/reports" text="Reports" />
        <HeaderNavButton linkTo="/0/map" text="Map" />
        <HeaderNavButton linkTo="/0/reports" text="Settings" />
      </div>
    </div>
    <div className="content-overflow">
      <div className="content-wrapper">
        <div className="content-body">
          <div className="content-header">
            {/* <VillageTitle /> */}
            <ResourceDisplay />
          </div>
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  </>
);

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const running = useStateSelector((state) => state.misc.running);

  useEffect(() => {
    if (running) {
      console.log("Already active timer running, if it's not fix me");
      return;
    }

    const attackers = {
      [UnitId.SpearFighter]: 10,
      [UnitId.Swordsman]: 1234,
      [UnitId.Axeman]: 500,
    };

    const defenders = {
      [UnitId.SpearFighter]: 10,
      [UnitId.Swordsman]: 500,
      [UnitId.Archer]: 400,
    };

    console.log(simulateBattle(attackers, defenders));

    gameTick();
    console.log("LOADED GAME TICK RUN ONCE PLS");
    dispatch(active());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  console.log("PLEASE DON'T RE-RENDER");

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

        <Route exact path="/:townId/overview">
          <MainContainer>
            <div>Overview</div>
            <Overview />
          </MainContainer>
        </Route>

        <Route exact path="/:townId/recruit">
          <MainContainer>
            <div>Recruitment for town</div>
          </MainContainer>
        </Route>

        <Route exact path="/:townId/map">
          <MainContainer>
            <WorldMap />
          </MainContainer>
        </Route>

        {/* Have a page for each building in a town */}
        <Route exact path="/:townId/buildings/:buildingId">
          <MainContainer>
            {/* Always show the building header component and switch main content based on building id */}
            <BuildingHeader />
            <Switch>

              <Route exact path="/:townId/buildings/headquarters">
                <div className="queueContainer">
                  <Headquarters />
                  <SidebarQueue />
                </div>
              </Route>

              <Route exact path="/:townId/buildings/barracks">
                <Barracks />
              </Route>

            </Switch>
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
