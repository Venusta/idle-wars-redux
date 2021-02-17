import React, { useState } from 'react'
import Style from "./style.module.css";
import { Link, useParams } from 'react-router-dom';
import { BuildingId } from '../../game/constants';


interface Props {
  townId: string
  children: React.ReactNode
}

const BasicVillage = ({ townId, children }: Props) => {
  return (
    <div className={Style.basicContainer}>
      <Link to={`/${townId}/buildings/${BuildingId.Headquarters}`} className="link">{children}</Link>
      <span>&nbsp;</span>
      <div>(489|489) K44</div>
    </div>
  );
}

const DropDownMenu = ({ styles }: { styles: boolean }) => {
  const blah = 20
  return (
    <div className={`${Style.sq} ${styles ? Style.hide : ""}`}>
      {[...Array(blah)].map((e, index) => <BasicVillage townId="0" key={index}>{`Test village ${index}`}</BasicVillage>)}
    </div>
  )
}

export const VillageTitle = () => {
  const { townId } = useParams<{ townId: string }>();
  const [hide, setHide] = useState(false)
  const thing = (hide: boolean) => {
    setHide(hide)
  }

  return (
    <div className={Style.container}>
      <Link to={`/${townId}/buildings/${BuildingId.Headquarters}`} className="link">Test village</Link>
      <span>&nbsp;</span>
      <div onMouseOver={() => thing(false)} onMouseLeave={() => thing(true)}>
        (489|489) K44
        <DropDownMenu styles={hide} />
      </div>
    </div>
  );
}

