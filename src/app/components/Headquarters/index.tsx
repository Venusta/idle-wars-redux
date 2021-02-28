/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectBuildingQueue, selectBuildings, selectResources, selectRps,
} from "../../selectors";
import { baseBuildings } from "../../game/buildings";
import { BuildingId, HeadquartersQueueSlots } from "../../game/constants";
import { RootState, useAppDispatch } from "../../store";
import { BuildingResourceDisplay } from "./BuildingResourceDisplay";
import { ConstructButton, InactiveButton } from "../Buttons";
import { startBuildSomething } from "../../slices/towns";

import { calculateTimeUntilResources } from "../../game/utility";
import { BuildingInfo } from "./BuildingInfo";
import Style from "./style.module.css";

export const Headquarters = () => {
  const dispatch = useAppDispatch();
  const { townId } = useParams<{ townId: string }>();
  const hqId = BuildingId.Headquarters;

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const startConstruction = (townId: string, buildingId: BuildingId) => {
    dispatch(startBuildSomething({ townId, buildingId, queueBuildingId: hqId }));
  };

  const BuildingConstruct = ({ buildingId, queuedLevel }: { buildingId: BuildingId, queuedLevel: number }) => (
    <div className={Style["building-grid-item"]}>
      <ConstructButton text={`Level ${queuedLevel}`} handleClick={() => startConstruction(townId, buildingId)} />
    </div>
  );

  const InactiveBut = ({ text }: { text: string }) => (
    <div className={Style["building-grid-item"]}>
      <InactiveButton text={text} />
    </div>
  );

  const BuildingRow = ({ buildingId }: { buildingId: BuildingId }) => {
    const queue = useSelector((state: RootState) => selectBuildingQueue(state, townId, BuildingId.Headquarters));
    const buildings = useSelector((state: RootState) => selectBuildings(state, townId));
    const resources = useSelector((state: RootState) => selectResources(state, townId));
    const rps = useSelector((state: RootState) => selectRps(state, townId));
    const { level, queuedLevel } = buildings[buildingId];
    const buildingData = baseBuildings[buildingId];

    const row = [
      <BuildingInfo key={`${buildingId}info`} buildingId={buildingId} level={level} />,
    ];

    if (queuedLevel >= buildingData.maxLevel) {
      row.push(<div key={`${buildingId}full-cons`} className={Style["fully-constructed"]}>Building fully constructed</div>);
      return (<>{row}</>);
    }

    row.push(<BuildingResourceDisplay key={`${buildingId}Dis`} buildingId={buildingId} townId={townId} />);

    if (queue.length >= HeadquartersQueueSlots) {
      row.push(<InactiveBut key={`${buildingId}queue-full`} text="Queue full" />);
      return (<>{row}</>);
    }

    const cost = baseBuildings[buildingId].getCost(queuedLevel);
    const timeUntil = calculateTimeUntilResources(resources, rps, cost);

    if (timeUntil > 0) {
      row.push(<InactiveBut key={`${buildingId}time`} text={new Date(timeUntil * 1000).toISOString().substr(11, 8)} />);
      return (<>{row}</>);
    }

    row.push(<BuildingConstruct key={`${buildingId}cons`} buildingId={buildingId} queuedLevel={queuedLevel + 1} />);
    return (<>{row}</>);
  };

  return (
    <div className={Style.wrapper}>
      <div className={Style.columnHeader}>Buildings</div>
      <div className={`${Style.columnHeader} ${Style.columnRequirements}`}>Requirements</div>
      <div className={Style.columnHeader}>Construct</div>
      {baseBuildings[hqId].creates.map((id, index) => <BuildingRow key={`${id} + ${index}`} buildingId={id} />)}
    </div>
  );
};
