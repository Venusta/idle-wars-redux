/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store';
import { selectTown } from "../../selectors"
import { ResourceId } from '../../game/constants';
import { useParams } from 'react-router-dom';
import Style from "./style.module.css"

export const ResourceDisplay2 = () => {
  const { townId } = useParams<{ townId: string }>();

  const town = useSelector((state: RootState) => selectTown(state, townId))
  const { population, maxPopulation, storageCapacity } = town;

  const InnerWithIcon = ({ id }: { id: ResourceId }): JSX.Element => {
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
      <table className={Style.wrapper}>
        <tr>
          <td>
            <InnerWithIcon id={ResourceId.Timber} />
          </td>
          <td>
            <InnerWithIcon id={ResourceId.Clay} />
          </td>
          <td>
            <InnerWithIcon id={ResourceId.Iron} />
          </td>
          <td>
            <div className={Style.displayText && Style.inner}>{storageCapacity.toFixed(0)}</div>
          </td>
          <td>
            <div className={Style.displayText && Style.inner}>{`${population.toFixed(0)}/${maxPopulation.toFixed(0)}`}</div>
          </td>
        </tr>
      </table>
    )
  }

  return (
    <ResourceDisplay />
  )
}
