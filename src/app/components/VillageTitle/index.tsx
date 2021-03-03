/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Style from "./style.module.css";
import { BuildingId } from "../../game/constants";

interface Props {
  townId: string
  children: React.ReactNode
}

const VillageMenuItem = ({ townId, children }: Props) => (
  <div className={Style.basicContainer}>
    <Link to={`/${townId}/buildings/${BuildingId.Headquarters}`} className="link">{children}</Link>
    <span>&nbsp;</span>
    <div>(489|489) K44</div>
  </div>
);

const DropDownMenu = ({ styles }: { styles: boolean }) => {
  const blah = 20;
  return (
    <div className={`${Style.sq} ${styles ? Style.hide : ""}`}>
      {[...Array(blah)].map((e, index) => <VillageMenuItem townId="0" key={index}>{`Test village ${index}`}</VillageMenuItem>)}
    </div>
  );
};

export const VillageTitle = (): JSX.Element => {
  const { townId } = useParams<{ townId: string }>();
  const [hide, setHide] = useState(true); // hide
  const handleMouseEvent = (hide: boolean) => {
    setHide(hide);
  };

  return (
    <div className={Style.container}>
      <Link to={`/${townId}/buildings/${BuildingId.Headquarters}`} className="link">Test village</Link>
      <span>&nbsp;</span>
      <div onMouseOver={() => handleMouseEvent(false)} onMouseLeave={() => handleMouseEvent(true)}>
        (489|489) K44
        <DropDownMenu styles={hide} />
      </div>
    </div>
  );
};
