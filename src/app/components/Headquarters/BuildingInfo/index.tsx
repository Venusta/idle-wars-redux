import { BuildingId } from "../../../game/constants";
import { baseBuildings } from "../../../game/buildings";
import { Link, useParams } from "react-router-dom";
import "./style.css";

export const BuildingInfo = ({ buildingId, level = 0 }: { buildingId: BuildingId, level: number }) => {
  const { townId } = useParams<{ townId: string }>();

  const { name } = baseBuildings[buildingId]
  return (
    <div className="buildings-column">
        <img className="building-info-img" src={`${process.env.PUBLIC_URL}/buildings/${buildingId}.png`} title={name} alt="" />
        <div className="building-info-details">
          <Link to={`/${townId}/buildings/${buildingId}`} className="link">{name}</Link>
          <div className="smoll">{`Level ${level}`}</div>
      </div>
    </div>
  );
}