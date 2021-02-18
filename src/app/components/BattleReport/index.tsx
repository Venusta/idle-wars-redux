import React from 'react'
import Style from "./style.module.css"
import { UnitId } from '../../game/constants'
import { baseUnits } from '../../game/units'


type Report = {
  [id in UnitId]?: {
    total: number
    loss: number
  };
}

const AttDefTable = () => {
  const details: Report = {
    [UnitId.Archer]: {
      total: 0,
      loss: 0,
    },
    [UnitId.SpearFighter]: {
      total: 100,
      loss: 10,
    },
    [UnitId.Swordsman]: {
      total: 100,
      loss: 100,
    }
  }

  interface RowProps {
    amount: number
  }
  const SingleItem = ({ amount }: RowProps) => {
    return (<div className={`${Style.value} ${amount === 0 ? Style.fade : ""}`}>{amount}</div>)
  }

  const icons: JSX.Element[] = [];
  const quantity: JSX.Element[] = [];
  const losses: JSX.Element[] = [];

  Object.values(UnitId).forEach((key) => {
    const total = details[key]?.total ?? 0;
    const loss = details[key]?.loss ?? 0;
    const id = baseUnits[key].id;

    icons.push(<img key={key+"img1"} className={`${Style.unitIcon} ${total === 0 ? Style.fade : ""}`} src={`${process.env.PUBLIC_URL}/units/unit_${id}.png`} title={id} alt="" />)
    quantity.push(<SingleItem amount={total} key={key + "quantity1"} />)
    losses.push(<SingleItem amount={loss} key={key + "loss1"} />)
  });

  return (
    <div className={Style.attdef}>
      {icons}
      {quantity}
      {losses}
    </div>
  )
}

export const BattleReport = () => {
  return (
    <div className={Style.container}>
      Attacker
      <AttDefTable />
      Defender
      <AttDefTable />
    </div>
  )
}