import React, { useEffect } from 'react';
import './App.css';
import { BuildingTable } from './app/components/BuildingTable';
import { Headquarters } from './app/components/Headquarters';
import { ResourceDisplay } from './app/components/ResourceDisplay/ResourceDisplay';
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
      <Headquarters />
      <BuildingTable />
    </div>
  );
}

export default App;
