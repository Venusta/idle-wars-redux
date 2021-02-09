/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store';
import { selectTown } from "../../selectors"
import { ResourceId } from '../../game/constants';
import { useParams } from 'react-router-dom';
import Style from "./style.module.css"

export const ResourceDisplay = () => {
  const { townId } = useParams<{ townId: string }>();

  const town = useSelector((state: RootState) => selectTown(state, townId))
  const { population, maxPopulation, storageCapacity } = town;

  const InnerWithIcon = ({ id }: { id: ResourceId }) => {
    const total = town.resources[id];
    const rps = town.rps[id]
    return (
      <div className={Style.inner}>
        <img className={Style.icon} src={`${process.env.PUBLIC_URL}/resources/${id}.png`} />
        <div className={Style.displayText}>{`${(total).toFixed(0)} (${rps.toFixed(2)}/s)`}</div>
      </div>
    )
  }

  const ResourceDisplay = () => {
    return (
      <div className={Style.wrapper}>
        <InnerWithIcon id={ResourceId.Timber} />
        <InnerWithIcon id={ResourceId.Clay} />
        <InnerWithIcon id={ResourceId.Iron} />

        <div className={Style.inner}>
          <div className={Style.displayText}>{storageCapacity.toFixed(0)}</div>
        </div>
        <div className={Style.inner}>
          <div className={Style.displayText}>{`${population.toFixed(0)}/${maxPopulation.toFixed(0)}`}</div>
        </div>
      </div>
    )
  }

  return (
    <ResourceDisplay />
  )
}
