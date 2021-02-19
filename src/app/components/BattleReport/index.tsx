import React from 'react'
import Style from "./style.module.css"
import { UnitId } from '../../game/constants'
import { baseUnits } from '../../game/units'


type Report = {
  townId: string
  type: "Attacker" | "Defender"
  units: {
    [id in UnitId]?: {
      total: number
      loss: number
    };
  }
}

const units = {
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
  },
  [UnitId.Scout]: {
    total: 300,
    loss: 38,
  },
  [UnitId.HeavyCavalry]: {
    total: 8000,
    loss: 3000,
  },
  [UnitId.Ram]: {
    total: 120,
    loss: 0,
  }
}

const attacker: Report = {
  townId: "0",
  type: "Attacker",
  units,
};

const defender: Report = {
  townId: "1",
  type: "Defender",
  units,
};

const AttDefTable = ({ report }: { report: Report }) => {

  interface RowProps {
    amount: number
  }

  const SingleItem = ({ amount }: RowProps) => {
    return (<div className={`${Style.value} ${amount === 0 ? Style.fade : ""}`}>{amount}</div>)
  }

  const icons: JSX.Element[] = [<div />];
  const quantity: JSX.Element[] = [<div>Quantity:</div>];
  const losses: JSX.Element[] = [<div>Losses:</div>];

  Object.values(UnitId).forEach((key) => {
    const total = report.units[key]?.total ?? 0;
    const loss = report.units[key]?.loss ?? 0;
    const id = baseUnits[key].id;

    icons.push(<img key={key + "img1"} className={`${Style.unitIcon} ${total === 0 ? Style.fade : ""}`} src={`${process.env.PUBLIC_URL}/units/unit_${id}.png`} title={id} alt="" />)
    quantity.push(<SingleItem amount={total} key={key + "quantity1"} />)
    losses.push(<SingleItem amount={loss} key={key + "loss1"} />)
  });

  return (
    <div className={Style.attdef}>
      <div className={Style.titleBar}>{`${report.type}: `}</div>
      <div className={Style.name}>{report.type === "Attacker" ? "Attacker" : "Defender"} name</div>
      <div>{report.type === "Attacker" ? "Origin" : "Destination"}:</div>
      <div className={Style.name}>TownName (543|577) K55</div>
      {icons}
      {quantity}
      {losses}
    </div>
  )
}

export const BattleReport = () => {
  return (
    <div className={Style.outer} >
      <ul className={Style.reportSelector}>
        <li>Report 1</li>
        <li>Report 2</li>
        <li>Report 3</li>
        <li>Report 4</li>
        <li>Report 5</li>
        <li>Report 6</li>
        <li>Report 7</li>
        <li>Report 8</li>
        <li>Report 9</li>
        <li>Report 10</li>
      </ul>
      <div className={Style.container}>
        <AttDefTable report={attacker} />
        <AttDefTable report={defender} />
      </div>
    </div>
  )
}