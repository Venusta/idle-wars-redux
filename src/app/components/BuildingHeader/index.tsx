import { useParams } from "react-router-dom";
import { BuildingIdType } from "../../game/constants";
import { baseBuildings } from "../../game/buildings";
import { selectBuildingLevel } from "../../selectors";
import "./style.css";
import { useStateSelector } from "../hooks";

export const BuildingHeader = (): JSX.Element => {
  const { townId, buildingId } = useParams<{ townId: string, buildingId: BuildingIdType }>();
  const { name, description } = baseBuildings[buildingId];
  const level = useStateSelector((state) => selectBuildingLevel(state, townId, buildingId));

  return (
    <div className="building-header-title">
      <h2>{`${name} (Level ${level})`}</h2>
      {description}
    </div>
  );
};
