/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { selectTown, selectBuildingQueue } from '../../selectors';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { baseBuildings } from '../../game/buildings';
import { BuildingId, HeadquartersQueueSlots } from '../../game/constants';
import { RootState } from '../../store';
import { BuildingResourceDisplay } from './BuildingResourceDisplay';
import { ConstructButton } from '../Buttons';
import { enqueue } from '../../slices/queue';
import { startBuildSomething } from '../../slices/towns';
import { InactiveButton } from '../Buttons/';
import { calculateTimeUntilResources } from '../../game/utility';
import { BuildingInfo } from './BuildingInfo';
import Style from "./style.module.css";

export const Headquarters = () => {
  const dispatch = useDispatch();

  const { townId } = useParams<{ townId: string }>();
  const town = useSelector((state: RootState) => selectTown(state, townId))
  const headquarterLevel = town.buildings[BuildingId.Headquarters].level;
  const hqId = BuildingId.Headquarters

  const startConstruction = (townId: string, buildingId: BuildingId) => {
    const buildingData = baseBuildings[buildingId];
    const { queuedLevel } = town.buildings[buildingId];
    const constructionTime = buildingData.getBuildTime(queuedLevel, headquarterLevel);

    dispatch(startBuildSomething({ townId, buildingId }));
    dispatch(enqueue({ townId, buildingId: hqId, item: buildingId, duration: constructionTime }));
  };

  const BuildingConstruct = ({ buildingId, queuedLevel }: { buildingId: BuildingId, queuedLevel: number }) => {
    return (
      <div className={Style["building-grid-item"]}>
        <ConstructButton text={`Level ${queuedLevel}`} handleClick={() => startConstruction(townId, buildingId)} />
      </div>
    );
  }

  const InactiveBut = ({ text }: { text: string }) => (
    <div className={Style["building-grid-item"]}>
      <InactiveButton text={text} />
    </div>
  )

  const BuildingRow = ({ buildingId }: { buildingId: BuildingId }) => {
    const queue = useSelector((state: RootState) => selectBuildingQueue(state, townId, BuildingId.Headquarters));
    const { level, queuedLevel } = town.buildings[buildingId];
    const buildingData = baseBuildings[buildingId];

    const row = [
      <BuildingInfo key={buildingId+"info"} buildingId={buildingId} level={level} />,
    ]

    if (queuedLevel >= buildingData.maxLevel) {
      row.push(<div key={buildingId+"full-cons"}className={Style["fully-constructed"]}>Building fully constructed</div>)
      return (<>{row}</>);
    };

    row.push(<BuildingResourceDisplay key={buildingId+"Dis"} buildingId={buildingId} townId={townId} />)

    if (queue.length >= HeadquartersQueueSlots) {
      row.push(<InactiveBut key={buildingId+"queue-full"} text="Queue full" />)
      return (<>{row}</>);
    };

    const cost = baseBuildings[buildingId].getCost(queuedLevel);
    const timeUntil = calculateTimeUntilResources(town, cost); // TODO NOT ENTIRE TOWN OBJECT

    if (timeUntil > 0) {
      row.push(<InactiveBut key={buildingId+"time"} text={new Date(timeUntil * 1000).toISOString().substr(11, 8)} />)
      return (<>{row}</>);
    };

    row.push(<BuildingConstruct key={buildingId+"cons"} buildingId={buildingId} queuedLevel={queuedLevel + 1} />)
    return (<>{row}</>);
  }

  return (
    <div className={Style.wrapper}>
      <div className={Style.columnHeader}>Buildings</div>
      <div className={`${Style.columnHeader} ${Style.columnRequirements}`}>Requirements</div>
      <div className={Style.columnHeader}>Construct</div>
      {baseBuildings[hqId].creates.map((id, index) => <BuildingRow key={id + index} buildingId={id} />)}
    </div>
  )
};
