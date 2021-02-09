/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { selectTown } from '../../selectors';
import { useParams, Link } from "react-router-dom";
import { batch, useDispatch, useSelector } from 'react-redux';
import { baseBuildings } from '../../game/buildings';
import { BuildingId } from '../../game/constants';
import { RootState } from '../../store';
import { BuildingResourceDisplay } from '../BuildingResourceDisplay/Requirements';
import { ConstructButton } from '../Buttons';
import "./style.css";
import { selectBuildingLevel } from '../../selectors/selectBuildingLevel';
import { enqueue } from '../../slices/queue';
import { startBuildSomething } from '../../slices/towns';
import { Dispatch } from '@reduxjs/toolkit';

// TODO this is actually HQ

export const BuildingHeader = () => { // TODO new file
  const { townId, buildingId } = useParams<{ townId: string, buildingId: BuildingId }>();
  const { name, description } = baseBuildings[buildingId];
  const level = useSelector((state: RootState) => selectBuildingLevel(state, townId, buildingId))

  return (
    <div className="building-title">
      <h2>{name} (Level {level})</h2>
      {description}
    </div>
  );
};



export const BuildingPage = () => {
  const dispatch = useDispatch();

  const { townId } = useParams<{ townId: string }>();
  const town = useSelector((state: RootState) => selectTown(state, townId))

  const levelUp = (buildingId: BuildingId) => {
    const { queuedLevel } = town.buildings[buildingId]
    const headquarterLevel = town.buildings[BuildingId.Headquarters].level

    const building = baseBuildings[buildingId];

    const constructionTime = building.getBuildTime(queuedLevel, headquarterLevel);

    startConstruction(townId, buildingId, constructionTime);

    console.log("yeet "+townId+" - " + buildingId+" - "+constructionTime);
    // TODO dispatch level up queue shit blah
  };

  const startConstruction = (townId: string, buildingId: BuildingId, constructionTime: number) => {
    dispatch(startBuildSomething({ townId, buildingId }));
    // TODO un-hardcode
    dispatch(enqueue({ townId, buildingId: BuildingId.Headquarters, item: buildingId, duration: constructionTime }));
  };

  const BuildingInfo = ({ buildingId, level = 0 }: { buildingId: BuildingId, level: number }) => {
    const { name } = baseBuildings[buildingId]
    return (
      <div className="building-grid-item">
        <div className="building-info-container">
          <img className="building-info-img" src={`${process.env.PUBLIC_URL}/buildings/${buildingId}.png`} title={name} alt="" />
          <div className="building-info-info">
            {/* <a href="#" className="link">{name}</a> */}
            <Link to={`/town/${townId}/${buildingId}`} className="link">{name}</Link>
            <div className="smoll">{`Level ${level}`}</div>
          </div>
        </div>
      </div>
    );
  }

  const BuildingRequirements = ({ buildingId }: { buildingId: BuildingId }) => (
    // todo pass down the cost or id + level?
    <div className="building-grid-item BuildingRequirements">
      <BuildingResourceDisplay buildingId={buildingId} />
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

  const HeaderElement = ({ text }: { text: string }) => (
    <div className="building-header">{text}</div>
  )

  const BuildingRow = ({ buildingId }: { buildingId: BuildingId }) => {
    const { level, queuedLevel } = town.buildings[buildingId]
    return (
      <>
        <BuildingInfo buildingId={buildingId} level={level} />
        <BuildingRequirements buildingId={buildingId} />
        <BuildingConstruct buildingId={buildingId} queuedLevel={queuedLevel + 1} />
      </>
    );
  }

  const BuildThingy = () => (
    <div className="building-build-wrapper">
      <HeaderElement text="Buildings" />
      <div className="building-header fuck">Requirements</div>
      <HeaderElement text="Construct" />

      <BuildingRow buildingId={BuildingId.Headquarters} />
      <BuildingRow buildingId={BuildingId.TimberCamp} />
      <BuildingRow buildingId={BuildingId.ClayPit} />
      <BuildingRow buildingId={BuildingId.IronMine} />

      <BuildingInfo buildingId={BuildingId.Barracks} level={4} />
      <FullyElement />

      <BuildingInfo buildingId={BuildingId.Stable} level={7} />
      <BuildingRequirements buildingId={BuildingId.Stable} />
      <InactiveElement text="Queue is currently full" />

      <BuildingInfo buildingId={BuildingId.IronMine} level={15} />
      <BuildingRequirements buildingId={BuildingId.IronMine} />
      <InactiveElement text="Resources available in 0:00:09" />

    </div>
  )

  return (
    <div className="building-container">
      {/* <BuildingHeader buildingId={pageBuildingId} level={pageBuildingLevel} /> */}
      <BuildThingy />
    </div>
  )
}
