import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store';
import { HeadquartersQueueSlots, BuildingId } from '../../game/constants';
import Style from "./style.module.css";

import { baseBuildings } from '../../game/buildings';
import { useParams } from 'react-router-dom';
import { selectBuildingQueue } from '../../selectors';


const ProgressBar = (props: { completionTime: number, duration: number }) => {
  const { completionTime, duration } = props
  const [percent, setPercent] = useState(0)

  const fillerStyles = {
    width: `${percent}%`,
  };

  useEffect(() => {
    const x = setTimeout(() => {
      setPercent(100 - Math.round((completionTime - (Date.now() + 1000)) / duration * 100))
    }, 1000);
    return () => {
      clearInterval(x)
    }
  }, [completionTime, duration, percent])
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
  // TODO make this update by itself?

  return (
    <div className={Style.wrapper}>
      Queue
      {
        buildingQueue.map(({ item, level, duration, completionTime }, index) => {
          // TODO uuid key?
          return (
            <div key={completionTime} className={Style.emptyContainer}>
              <div className={Style.queueItemContainer}>
                <div>{`${baseBuildings[item].name} (lvl ${level})`}</div>
                {(index === 0) ? <ProgressBar completionTime={completionTime} duration={duration} /> : <></>}
              </div>
            </div>
          )
        })
      }
      {[...Array(emptySlots)].map((e, index) => <div key={index} className={Style.emptyContainer} />)}
    </div>
  )
};