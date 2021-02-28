import SimpleBar from "simplebar-react";
import Style from "./style.module.css";
import { UnitId } from "../../game/constants";
import { baseUnits } from "../../game/units";
// eslint-disable-next-line import/no-extraneous-dependencies
import "simplebar/dist/simplebar.min.css";
import "./style.css";
import { UnitLosses } from "../../../types/types";

export type Report = {
  townId: string
  type: "Attacker" | "Defender"
  units: UnitLosses;
};

const units = {
  [UnitId.Archer]: {
    total: 0,
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
  },
};

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

  const SingleItem = ({ amount }: RowProps) => (<div className={`${Style.value} ${amount === 0 ? Style.fade : ""}`}>{amount}</div>);

  const columnData = Object.values(UnitId).map((key) => {
    const total = report.units[key]?.total ?? 0;
    const loss = report.units[key]?.loss ?? 0;
    const { id } = baseUnits[key];
    return (
      <>
        <img key={`${key}img1`} className={`${Style.unitIcon} ${total === 0 ? Style.fade : ""}`} src={`${process.env.PUBLIC_URL}/units/unit_${id}.png`} title={id} alt="" />
        <SingleItem amount={total} key={`${key}quantity1`} />
        <SingleItem amount={loss} key={`${key}loss1`} />
      </>
    );
  });

  return (
    <div className={Style.attdef}>
      <div className={Style.titleBar}>{`${report.type}: `}</div>
      <div className={Style.name}>
        {report.type === "Attacker" ? "Attacker" : "Defender"}
        {" "}
        name
      </div>
      <div>
        {report.type === "Attacker" ? "Origin" : "Destination"}
        :
      </div>
      <div />
      <div className={Style.name}>TownName (543|577) K55</div>
      <div>Quantity:</div>
      <div>Losses:</div>
      {columnData}
    </div>
  );
};

export const BattleReport = () => (
  <div className={Style.outer}>
    <ul className={Style.reportSelector}>
      <SimpleBar autoHide={false} forceVisible="y" className={Style.simpleBar}>
        <li className={Style.listItem}>Report with a longer than usual name</li>
        <li className={Style.listItem}>Report 2</li>
        <li className={Style.listItem}>Report 3</li>
        <li className={Style.listItem}>Report 4</li>
        <li className={Style.listItem}>Report 5</li>
        <li className={Style.listItem}>Report 6</li>
        <li className={Style.listItem}>Report 7</li>
        <li className={Style.listItem}>Report 8</li>
        <li className={Style.listItem}>Report 9</li>
        <li className={Style.listItem}>Report 10</li>
        <li className={Style.listItem}>Report 1</li>
        <li className={Style.listItem}>Report 2</li>
        <li className={Style.listItem}>Report 3</li>
        <li className={Style.listItem}>Report 4</li>
        <li className={Style.listItem}>Report 5</li>
        <li className={Style.listItem}>Report 6</li>
        <li className={Style.listItem}>Report 7</li>
        <li className={Style.listItem}>Report 8</li>
        <li className={Style.listItem}>Report 9</li>
        <li className={Style.listItem}>Report 10</li>
        <li className={Style.listItem}>Report 1</li>
        <li className={Style.listItem}>Report 4</li>
        <li className={Style.listItem}>Report 5</li>
        <li className={Style.listItem}>Report 6</li>
        <li className={Style.listItem}>Report 7</li>
        <li className={Style.listItem}>Report 8</li>
        <li className={Style.listItem}>Report 9</li>
        <li className={Style.listItem}>Report 10</li>
        <li className={Style.listItem}>Report 1</li>
      </SimpleBar>
    </ul>
    <div className={Style.container}>
      <AttDefTable report={attacker} />
      <AttDefTable report={attacker} />
      <AttDefTable report={defender} />
      <AttDefTable report={defender} />
    </div>
  </div>
);
