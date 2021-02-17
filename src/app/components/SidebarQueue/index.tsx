import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store';
import { HeadquartersQueueSlots, BuildingId } from '../../game/constants';
import Style from "./style.module.css";

import { baseBuildings } from '../../game/buildings';
import { useParams } from 'react-router-dom';
import { selectBuildingQueue } from '../../selectors';


const ProgressBar = (props: { percent: number }) => {
  const { percent } = props;
  const fillerStyles = {
    width: `${percent}%`,
  };
  return (
    <div className={Style.progressBar}>
      <div style={fillerStyles} className={Style.progressBarFill} />
    </div>
  );
};

export const SidebarQueue = () => {
  const { townId } = useParams<{ townId: string }>();
  const buildingQueue = useSelector((state: RootState) => selectBuildingQueue(state, townId, BuildingId.Headquarters))

  const emptySlots = HeadquartersQueueSlots - buildingQueue.length
  // TODO store queued level in the queueItem

  return (
    <div className={Style.wrapper}>
      Queue
      {
        buildingQueue.map(({ item, duration, completionTime }, index) => {
          const progress = 100 - Math.round((completionTime - Date.now()) / duration * 100);
          // TODO uuid key?
          return (
            <div key={completionTime} className={Style.emptyContainer}>
              <div className={Style.queueItemContainer}>
                <div>{`${baseBuildings[item].name} (lvl 21)`}</div>
                {(index === 0) ? <ProgressBar percent={progress} /> : <></>}
              </div>
            </div>
          )
        })
      }
      {[...Array(emptySlots)].map((e, index) => <div key={index} className={Style.emptyContainer} />)}
    </div>
  )
};