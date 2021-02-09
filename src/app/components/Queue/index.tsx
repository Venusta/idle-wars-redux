import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { baseBuildings } from '../../game/buildings';
import { BuildingId } from '../../game/constants';
import { isBuildingId } from '../../game/utility';
import { RootState } from '../../store';
import Style from "./style.module.css";


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
          <>
            <div>{baseBuildings[item].name}</div>
            <div>{index === 0 ? formatDate(Math.max(completionTime - date, 0)) : formatDate(duration)}</div>
            <div>{new Date(completionTime).toISOString().substr(11, 8)}</div>
            <div><button onClick={() => { }}>x</button></div>
          </>
        )
      } else {
        console.error(`${item} was not a valid building id.`);
        return <div />;
      }
    });
  }

  return (
    <div className={Style.container}>
      <div className={Style.header}>Construction</div>
      <div className={Style.header}>Duration</div>
      <div className={Style.header}>Completion</div>
      <div className={Style.header}>x</div>
      {renderQueue()}
    </div>
  )
}