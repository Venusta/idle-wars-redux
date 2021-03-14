import { Link, useParams } from "react-router-dom";
import { baseBuildings } from "../../../game/buildings";
import { BuildingIdType } from "../../../game/constants";
import "./style.css";

export const BuildingInfo = ({ buildingId, level = 0 }: { buildingId: BuildingIdType, level: number }): JSX.Element => {
  const { townId } = useParams<{ townId: string }>();

  const { name } = baseBuildings[buildingId];
  return (
    <div className="buildings-column">
      <img alt="" className="building-info-img" src={`${process.env.PUBLIC_URL}/buildings/${buildingId}.png`} title={name} />
      <div className="building-info-details">
        <Link className="link" to={`/${townId}/buildings/${buildingId}`}>{name}</Link>
        <div className="smoll">{`Level ${level}`}</div>
      </div>
    </div>
  );
};
