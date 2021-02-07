import React, { useEffect } from 'react';
import './App.css';
import { Barracks } from './app/components/Barracks';
import { BuildingPage } from './app/components/BarracksRemake';
import { BuildingResourceDisplay } from './app/components/BuildingResourceDisplay/Requirements';
import { Headquarters } from './app/components/Headquarters';
import { Queue } from './app/components/Queue';
import { ResourceDisplay } from './app/components/ResourceDisplay/ResourceDisplay';
import { BuildingId } from './app/game/constants';
import { updateQueue } from './app/game/queue';

function App() {
  useEffect(() => {
    const x = setInterval(() => {
      updateQueue();
      console.log("Updated");      
    }, 1000);
    return () => {
      clearInterval(x);
    }
  }, []);

  return (
    <div className="App">
      <ResourceDisplay />
      {/* <Queue /> */}
      {/* <Headquarters /> */}
      {/* <Barracks /> */}
      <BuildingPage pageBuildingId={BuildingId.Headquarters}/>
      <BuildingPage pageBuildingId={BuildingId.Barracks}/>
    </div>
  );
}

export default App;
