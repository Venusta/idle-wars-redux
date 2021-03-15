import { Link, useParams } from "react-router-dom";
import Style from "./style.module.css";
import { BuildingIdType, navBarBuildings } from "../../game/constants";
import { baseBuildings } from "../../game/buildings";

export const Navbar = (): JSX.Element => {
  const { townId, buildingId: buildingPageId } = useParams<{ townId: string, buildingId: BuildingIdType }>();

  // TODO add image maybe
  return (
    <div className={Style.container}>
      {
        navBarBuildings.map((buildingId: BuildingIdType) => (
          <div key={buildingId}>
            <Link
              className={`${Style.text} ${buildingId === buildingPageId ? Style.active : ""}`}
              to={`/${townId}/buildings/${buildingId}`}
            >
              {baseBuildings[buildingId].name}
            </Link>
          </div>
        ))
      }
    </div>
  );
};
