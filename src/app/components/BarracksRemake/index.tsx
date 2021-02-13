/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { selectTown, selectBuildingLevel, selectBuildingQueue } from '../../selectors';
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { baseBuildings } from '../../game/buildings';
import { BuildingId, BuildingQueueId, HeadquartersQueueSlots } from '../../game/constants';
import { RootState } from '../../store';
import { BuildingResourceDisplay } from '../BuildingResourceDisplay/Requirements';
import { ConstructButton } from '../Buttons';
import "./style.css";
import { enqueue } from '../../slices/queue';
import { startBuildSomething } from '../../slices/towns';
import { InactiveButton } from '../Buttons/InactiveButton';
import { calculateTimeUntilResources, isBuildingId, isBuildingQueueId } from '../../game/utility';
import { ProductionBuilding } from '../../game/model/productionBuilding';

// TODO this is actually HQ

export const BuildingHeader = () => { // TODO new file
  const { townId, buildingId } = useParams<{ townId: string, buildingId: BuildingId }>();
  const { name, description } = baseBuildings[buildingId];
  const level = useSelector((state: RootState) => selectBuildingLevel(state, townId, buildingId));

  return (
    <div className="building-title">
      <h2>{name} (Level {level})</h2>
      {description}
    </div>
  );
};



export const BuildingPage = () => {
  const dispatch = useDispatch();

  const { townId, buildingId: pageBuildingId } = useParams<{ townId: string, buildingId: BuildingId }>();
  const town = useSelector((state: RootState) => selectTown(state, townId))
  const headquarterLevel = town.buildings[BuildingId.Headquarters].level;

  const levelUp = (buildingId: BuildingId) => {
    const buildingData = baseBuildings[buildingId];
    const { queuedLevel } = town.buildings[buildingId];
    const constructionTime = buildingData.getBuildTime(queuedLevel, headquarterLevel);

    startConstruction(townId, buildingId, constructionTime);

    console.log("yeet " + townId + " - " + buildingId + " - " + constructionTime);
    // TODO dispatch level up queue shit blah
  };

  const startConstruction = (townId: string, toBeConstructedBuildingId: BuildingId, constructionTime: number) => {
    if (isBuildingQueueId(pageBuildingId)) {
      dispatch(startBuildSomething({ townId, buildingId: toBeConstructedBuildingId }));
      dispatch(enqueue({ townId, buildingId: pageBuildingId, item: toBeConstructedBuildingId, duration: constructionTime }));
    }
  };

  const BuildingInfo = ({ buildingId, level = 0 }: { buildingId: BuildingId, level: number }) => {
    const { name } = baseBuildings[buildingId]
    return (
      <div className="building-grid-item start-first">
        <div className="building-info-container">
          <img className="building-info-img" src={`${process.env.PUBLIC_URL}/buildings/${buildingId}.png`} title={name} alt="" />
          <div className="building-info-info">
            <Link to={`/town/${townId}/${buildingId}`} className="link">{name}</Link>
            <div className="smoll">{`Level ${level}`}</div>
          </div>
        </div>
      </div>
    );
  }

  const BuildingRequirements = ({ buildingId, townId }: { buildingId: BuildingId, townId: string }) => (
    <div className="building-grid-item BuildingRequirements">
      <BuildingResourceDisplay buildingId={buildingId} townId={townId} />
    </div>
  )

  const BuildingConstruct = ({ buildingId, queuedLevel }: { buildingId: BuildingId, queuedLevel: number }) => {
    return (
      <div className="building-grid-item third-column">
        <ConstructButton text={`Level ${queuedLevel}`} handleClick={() => levelUp(buildingId)} />
      </div>
    );
  }

  const FullyElement = () => (
    <div className="building-grid-item fully-constructed">Building fully constructed</div>
  )

  const InactiveElement = ({ text }: { text: string }) => (
    <div className="building-grid-item inactive">{text}</div>
  )

  const InactiveBut = ({ text }: { text: string }) => (
    <div className="building-grid-item third-column">
      <InactiveButton text={text} />
    </div>
  )

  const HeaderElement = ({ text }: { text: string }) => (
    <div className="building-header">{text}</div>
  )

  const BuildingRow = ({ buildingId }: { buildingId: BuildingId }) => {
    const queue = useSelector((state: RootState) => selectBuildingQueue(state, townId, BuildingQueueId.Headquarters));
    const { level, queuedLevel } = town.buildings[buildingId];
    const buildingData = baseBuildings[buildingId];

    if (queuedLevel >= buildingData.maxLevel) {
      return (
        <>
          <BuildingInfo buildingId={buildingId} level={level} />
          <FullyElement />
        </>
      );
    };

    if (queue.length >= HeadquartersQueueSlots) {
      return (
        <>
          <BuildingInfo buildingId={buildingId} level={level} />
          <BuildingRequirements buildingId={buildingId} townId={townId} />
          <InactiveBut text="Queue full" />
        </>
      );
    };

    const cost = baseBuildings[buildingId].getCost(queuedLevel);
    const timeUntil = calculateTimeUntilResources(town, cost);

    if (timeUntil > 0) {
      return (
        <>
          <BuildingInfo buildingId={buildingId} level={level} />
          <BuildingRequirements buildingId={buildingId} townId={townId} />
          <InactiveBut text={new Date(timeUntil * 1000).toISOString().substr(11, 8)} />
        </>
      );
    };

    return (
      <>
        <BuildingInfo buildingId={buildingId} level={level} />
        <BuildingRequirements buildingId={buildingId} townId={townId} />
        <BuildingConstruct buildingId={buildingId} queuedLevel={queuedLevel + 1} />
      </>
    );
  }

  const RenderTable = () => {
    const buildingData = baseBuildings[pageBuildingId];
    let tableRows;

    if (buildingData instanceof ProductionBuilding) {
      // Iterate over all the things this building can create and add them to the table
      tableRows = buildingData.creates.map((id) => {
        if (isBuildingId(id)) {
          return <BuildingRow buildingId={id} />;
        };
        return <></>; // TODO implement a different table row for units?
      });

      return (
        <div className="building-build-wrapper">
          <HeaderElement text="Buildings" />
          <div className="building-header fuck">Requirements</div>
          <HeaderElement text="Construct" />
          {tableRows}
        </div>
      )
    };
    return (<></>)
  };

  return (
    <div className="building-container">
      <RenderTable />
    </div>
  )
}
