/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { useParams } from 'react-router-dom';
import { BuildingId } from '../../game/constants';
import { BuildingHeader } from '../BuildingHeader';
import { Headquarters } from '../Headquarters';
import { SidebarQueue } from '../SidebarQueue';
import "./style.css";

export const BuildingPage = () => {
  const { buildingId } = useParams<{ townId: string, buildingId: BuildingId }>();

  switch (buildingId) {
    case BuildingId.Headquarters:
      return (
        <>
          <BuildingHeader />
          <div className="queueContainer">
            <Headquarters />
            <SidebarQueue />
          </div>
        </>
      )

    case BuildingId.Barracks:
      return (
        <>
          <BuildingHeader />
        </>
      )

    default:
      return (
        <>
          <BuildingHeader />
        </>
      )
  }
};
