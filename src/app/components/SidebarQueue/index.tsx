import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store';
import { BuildingQueueId } from '../../game/constants';
import Style from "./style.module.css";
import { baseBuildings } from '../../game/buildings';
import { useParams } from 'react-router-dom';


const ProgressBar = (props: { percent: number }) => {
  const { percent } = props;
  const fillerStyles = {
    width: `${percent}%`,
  };
  return (<div className={Style.progressBar}>
    <div style={fillerStyles} className={Style.progressBarFill} />
  </div>);
};

export const SidebarQueue = () => {
  const { townId } = useParams<{ townId: string }>();
  const queue = useSelector((state: RootState) => state.queue)
  const buildingQueueId = BuildingQueueId.Headquarters;
  const buildingQueue = queue[townId][buildingQueueId]
  // TODO calc progress %
  // TODO store queued level in the queueItem
  // todo buildingQueueId as a prop

  // const [date, setDate] = useState(Date.now());

  // useEffect(() => { // TODO use global timer later
  //   const x = setInterval(() => {
  //     setDate(Date.now());
  //   }, 1000);
  //   return () => {
  //     clearInterval(x);
  //   }
  // }, [date]);

  return (
    <div className={Style.wrapper}>
      {
        buildingQueue.map(({ item, duration, completionTime }, index) => {
          const progress = 100 - Math.round((completionTime - Date.now()) / duration * 100);
          // TODO uuid key?
          return (
            <div key={completionTime} className={Style.queueItemContainer}>
              <div>{`${baseBuildings[item].name} (lvl 21)`}</div>
              {(index === 0) ? <ProgressBar percent={progress} /> : <></>}
            </div>
          )
        }
        )
      }
    </div>
  )
}