import React from 'react'
import Style from "./cssTestStyle.module.css"
import { Switch, Route, Redirect } from 'react-router-dom'
import { ResourceDisplay } from './app/components/ResourceDisplay/ResourceDisplay'
import { Navbar } from './app/components/Navbar'
import { BuildingHeader } from './app/components/BuildingHeader'
import { BuildingPage } from './app/components/BarracksRemake'

export const TestApp = () => {
  return (
    <div className={Style.testApp}>
      <Switch>
        <Route exact path="/">
          <Redirect to="/0/buildings/headquarters" />
        </Route>
        {/* <TownLinks /> */}
        {/* <SidebarQueue /> */}

        <Route exact path="/:townId/buildings/:buildingId">

          {/* <div className={Style.sideBar}> */}
            
            {/* <div className={Style.long}></div> */}
            
            {/* <TownLinks /> */}

            {/* <SidebarQueue /> */}
          {/* </div> */}

          <div className={Style.main}>
            {/* <div className={Style.wide} /> */}
            {/* <div className={Style.long} /> */}

            <div className={Style.mainHeader}>
              <div className={Style.mainHeaderVilInfo}>Test village (489|489) K44</div>
              <ResourceDisplay />
            </div>

            <Navbar />
            <BuildingHeader />
            <BuildingPage />
          </div>

        </Route>

        <Route>
          <h1>404 Not Found</h1>
        </Route>

      </Switch>



    </div>
  )
}