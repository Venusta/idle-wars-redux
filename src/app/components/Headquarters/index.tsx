/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useParams } from "react-router-dom";
import {
  selectBuildingQueue, selectBuildings, selectResources, selectRps,
} from "../../selectors";
import { baseBuildings } from "../../game/buildings";
import { BuildingId, BuildingIdType, HeadquartersQueueSlots } from "../../game/constants";
import { useAppDispatch } from "../../store";
import { BuildingResourceDisplay } from "./BuildingResourceDisplay";
import { ConstructButton, InactiveButton } from "../Buttons";
import { startBuildSomething } from "../../slices/towns";

import { BuildingInfo } from "./BuildingInfo";
import Style from "./style.module.css";
import { calculateTimeUntilResources } from "../../util/calculateTimeUntilResources";
import { useStateSelector } from "../hooks";

export const Headquarters = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { townId } = useParams<{ townId: string }>();
  const hqId = BuildingId.Headquarters;

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const startConstruction = (townId: string, buildingId: BuildingIdType) => {
    dispatch(startBuildSomething({ townId, buildingId, queueBuildingId: hqId }));
  };

  const BuildingConstruct = ({ buildingId, queuedLevel }: { buildingId: BuildingIdType, queuedLevel: number }) => (
    <div className={Style["building-grid-item"]}>
      <ConstructButton handleClick={() => startConstruction(townId, buildingId)} text={`Level ${queuedLevel}`} />
    </div>
  );

  const InactiveBut = ({ text }: { text: string }) => (
    <div className={Style["building-grid-item"]}>
      <InactiveButton text={text} />
    </div>
  );

  const BuildingRow = ({ buildingId }: { buildingId: BuildingIdType }) => {
    const queue = useStateSelector((state) => selectBuildingQueue(state, townId, BuildingId.Headquarters));
    const buildings = useStateSelector((state) => selectBuildings(state, townId));
    const resources = useStateSelector((state) => selectResources(state, townId));
    const rps = useStateSelector((state) => selectRps(state, townId));
    const { level, queuedLevel } = buildings.id[buildingId];
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
      const label = (timeUntil === Infinity || timeUntil === -Infinity) ? "Forever" : new Date(timeUntil * 1000).toISOString().substr(11, 8);

      row.push(<InactiveBut key={`${buildingId}time`} text={label} />);
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
