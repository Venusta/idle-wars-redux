import Style from "./cssTestStyle.module.css"
import { Switch, Route, Redirect } from 'react-router-dom'
import { ResourceDisplay } from './app/components/ResourceDisplay'
import { Navbar } from './app/components/Navbar'
import { BuildingHeader } from './app/components/BuildingHeader'
import { Headquarters } from './app/components/Headquarters'
import { SidebarQueue } from './app/components/SidebarQueue'

export const TestApp = () => {

  return (
    <div className={Style.testApp}>
      <Switch>

        <Route exact path="/">
          <Redirect to="/0/buildings/headquarters" />
        </Route>

        <Route exact path="/:townId/buildings/:buildingId">
          <div className={Style.main}>
            <div className={Style.mainHeader}>
              <div className={Style.mainHeaderVilInfo}>Test village (489|489) K44</div>
              <ResourceDisplay />
            </div>
            <Navbar />
            <BuildingHeader />
            <div className={Style.queueContainer}>
              <Headquarters />
              <SidebarQueue />
            </div>
          </div>

        </Route>

        <Route>
          <h1>404 Not Found</h1>
        </Route>

      </Switch>
    </div>
  )
}