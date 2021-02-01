import React from 'react';
import './App.css';
import { BuildingTable } from './app/components/BuildingTable';
import { ResourceDisplay } from './app/components/ResourceDisplay/ResourceDisplay';
import { updateQueue } from './app/game/queue';

function App() {
  updateQueue();
  return (
    <div className="App">
      <ResourceDisplay />
      <BuildingTable />
    </div>
  );
}

export default App;
