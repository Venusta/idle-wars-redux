import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { baseBuildings } from '../../game/buildings';
import { RootState } from '../../store';
import Style from "./style.module.css";
import { useParams } from 'react-router-dom';
import { BuildingQueueId, BuildingId } from '../../game/constants';


export const Queue = () => {
  const { townId } = useParams<{ townId: string }>();

  const queue = useSelector((state: RootState) => state.queue)

  const buildingQueueId = BuildingQueueId.Headquarters;

  const buildingQueue = queue[townId][buildingQueueId]

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
    return buildingQueue.map(({ item, duration, completionTime }, index) => {
      return (
        <>
          <div className={Style.ffs}>{baseBuildings[item].name}</div>
          <div className={Style.ffs}>{index === 0 ? formatDate(Math.max(completionTime - date, 0)) : formatDate(duration)}</div>
          <div className={Style.ffs}>{new Date(completionTime).toISOString().substr(11, 8)}</div>
          <div className={Style.cancel}>X</div>
        </>
      )
    });
  }

  return (
    <div className={Style.container}>
      <div className={Style.header}>Construction</div>
      <div className={Style.header}>Duration</div>
      <div className={Style.header}>Completion</div>
      <div className={Style.header}></div>
      {renderQueue()}
    </div>
  )
}