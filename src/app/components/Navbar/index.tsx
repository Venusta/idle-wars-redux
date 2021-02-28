import { Link, useParams } from "react-router-dom";
import Style from "./style.module.css";
import { BuildingId } from "../../game/constants";
import { baseBuildings } from "../../game/buildings";

export const Navbar = () => {
  const { townId, buildingId: buildingPageId } = useParams<{ townId: string, buildingId: BuildingId }>();

  const buildingIds = [
    BuildingId.Headquarters,
    BuildingId.Barracks,
    BuildingId.Stable,
    BuildingId.Warehouse,
    BuildingId.Smithy,
  ];

  // TODO add image maybe
  return (
    <div className={Style.container}>
      {
        buildingIds.map((buildingId: BuildingId) => (
          <div key={buildingId}>
            <Link to={`/${townId}/buildings/${buildingId}`} className={`${Style.text} ${buildingId === buildingPageId ? Style.active : ""}`}>{baseBuildings[buildingId].name}</Link>
          </div>
        ))
      }
    </div>
  );
};
