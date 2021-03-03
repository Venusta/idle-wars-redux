import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BuildingId } from "../../game/constants";
import { baseBuildings } from "../../game/buildings";
import { RootState } from "../../store";
import { selectBuildingLevel } from "../../selectors";
import "./style.css";

export const BuildingHeader = (): JSX.Element => {
  const { townId, buildingId } = useParams<{ townId: string, buildingId: BuildingId }>();
  const { name, description } = baseBuildings[buildingId];
  const level = useSelector((state: RootState) => selectBuildingLevel(state, townId, buildingId));

  return (
    <div className="building-header-title">
      <h2>{`${name} (Level ${level})`}</h2>
      {description}
    </div>
  );
};
