import React from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store';
import { selectPops } from "../../selectors"
import { ResourceId } from '../../game/constants';
import { useParams } from 'react-router-dom';
import Style from "./style.module.css"
import { toggleResourceDisplay } from '../../slices/misc';
import { SingleResource } from './SingleResource';

export const ResourceDisplay = () => {
  const { townId } = useParams<{ townId: string }>();
  const dispatch = useAppDispatch();
  const { population, maxPopulation } = useSelector((state: RootState) => selectPops(state, townId));
  const storageCapacity = useSelector((state: RootState) => state.towns[townId].storageCapacity);

  const handleToggle = () => {
    dispatch(toggleResourceDisplay())
  }

  return (
    <div className={Style.wrapper} onClick={handleToggle}>
      <SingleResource id={ResourceId.Timber} />
      <SingleResource id={ResourceId.Clay} />
      <SingleResource id={ResourceId.Iron} />

      <div className={Style.inner}>
        <div className={Style.displayText}>{storageCapacity.toFixed(0)}</div>
      </div>
      <div className={Style.inner}>
        <div className={Style.displayText}>{`${population.toFixed(0)}/${maxPopulation.toFixed(0)}`}</div>
      </div>
    </div>
  )
}
