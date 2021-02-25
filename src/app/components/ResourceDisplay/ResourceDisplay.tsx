/* eslint-disable jsx-a11y/alt-text */
import React, { useReducer } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store';
import { selectResources, selectRps, selectPops } from "../../selectors"
import { ResourceId } from '../../game/constants';
import { useParams } from 'react-router-dom';
import Style from "./style.module.css"

function useToggle(initialValue = true) {
  return useReducer((state) => !state, initialValue);
}

export const ResourceDisplay = () => {
  const { townId } = useParams<{ townId: string }>();
  const resources = useSelector((state: RootState) => selectResources(state, townId));
  const { population, maxPopulation } = useSelector((state: RootState) => selectPops(state, townId));
  const rps = useSelector((state: RootState) => selectRps(state, townId));
  const storageCapacity = useSelector((state: RootState) => state.towns[townId].storageCapacity);

  const [display, toggleDisplay] = useToggle();

  const InnerWithIcon = ({ id }: { id: ResourceId }) => {
    return (
      <div className={Style.inner} title={display ? `${rps[id].toFixed(2)}/s` : `${(resources[id]).toFixed(0)}`}>
        <img className={Style.icon} src={`${process.env.PUBLIC_URL}/resources/${id}.png`} />
        <div className={Style.displayText}>{display ? `${(resources[id]).toFixed(0)}` : `${rps[id].toFixed(2)}/s`}</div>
      </div>
    )
  }

  return (
    <div className={Style.wrapper} onClick={toggleDisplay}>
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
