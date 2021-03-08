/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HeadquartersQueueSlots, BuildingId } from "../../game/constants";
import Style from "./style.module.css";

import { baseBuildings } from "../../game/buildings";
import { selectBuildingQueue } from "../../selectors";
import { useMemoSelector } from "../hooks";

const ProgressBar = (props: { completionTime: number, duration: number }) => {
  const { completionTime, duration } = props;
  const [percent, setPercent] = useState(0);

  const fillerStyles = {
    width: `${percent}%`,
  };

  useEffect(() => {
    const x = setTimeout(() => {
      setPercent(100 - Math.round((completionTime - ((Date.now() + 1000) / duration) * 100)));
    }, 1000);
    return () => {
      clearInterval(x);
    };
  }, [completionTime, duration, percent]);
  return (
    <div className={Style.progressBar}>
      <div style={fillerStyles} className={Style.progressBarFill} />
    </div>
  );
};

export const SidebarQueue = (): JSX.Element => {
  const { townId } = useParams<{ townId: string }>();
  const buildingQueue = useMemoSelector((state) => selectBuildingQueue(state, townId, BuildingId.Headquarters));
  const emptySlots = HeadquartersQueueSlots - buildingQueue.length;
  // TODO make this update by itself?

  // TODO uuid key?
  return (
    <div className={Style.wrapper}>
      Queue
      {
        buildingQueue.map(({
          building: item, level, duration, completionTime,
        }, index) => (
          <div key={completionTime} className={Style.emptyContainer}>
            <div className={Style.queueItemContainer}>
              <div>{`${baseBuildings[item].name} (lvl ${level})`}</div>
              {(index === 0) ? <ProgressBar completionTime={completionTime} duration={duration} /> : <></>}
            </div>
          </div>
        ))
      }
      {[...Array(emptySlots)].map((e, index) => <div key={index} className={Style.emptyContainer} />)}
    </div>
  );
};
