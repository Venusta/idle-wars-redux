import React, { useEffect } from 'react';
import './App.css';
import { Barracks } from './app/components/Barracks';
import { Headquarters } from './app/components/Headquarters';
import { Queue } from './app/components/Queue';
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
      <Queue />
      <Headquarters />
      <Barracks />
    </div>
  );
}

export default App;
