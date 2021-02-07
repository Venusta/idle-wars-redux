import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { baseBuildings } from '../../game/buildings';
import { BuildingId } from '../../game/constants';
import { isBuildingId } from '../../game/utility';
import { RootState } from '../../store';

export const Queue = () => {
  const queue = useSelector((state: RootState) => state.queue)

  const townId = "0";
  const buildingId = BuildingId.Headquarters;

  const buildingQueue = queue[townId][buildingId]

  const [date, setDate] = useState(Date.now());

  // every second setDate(Date.now())

  useEffect(() => { // TODO use global timer later
    const x = setInterval(() => {
      setDate(Date.now());
    }, 1000);
    return () => {
      clearInterval(x);
    }
  }, [date]);

  // buildingQueue?.forEach((queueItem) => {
  //   console.log(`Item queued in headquarters: ${baseBuildings[queueItem.item as BuildingId].name} Completed at: ${queueItem.completionTime}`)
  // });
  
  const formatDate = (seconds: number) => new Date(seconds).toISOString().substr(11, 8)

  const renderQueue = () => {
    return buildingQueue?.map(({ item, duration, completionTime }, index) => {
      if (isBuildingId(item)) {
        return (
        <tr key={completionTime}>
          <td>{baseBuildings[item].name}</td>
          <td>{index === 0 ? formatDate(Math.max(completionTime - date, 0)) : formatDate(duration)}</td> 
          <td>{new Date(completionTime).toISOString()}</td>
          <td><button onClick={() => {}}>Cancel</button></td>    
        </tr>
        )
      } else {
        console.error(`${item} was not a valid building id.`);
        return <div />;
      }
    });
  }

  return (
    <table >
      <tbody>
          <tr>
            <th>Construction</th>
            <th>Duration</th>
            <th>Completion</th>
            <th>Cancellation</th>
          </tr>
        {renderQueue()}
      </tbody>
    </ table>
  )
}