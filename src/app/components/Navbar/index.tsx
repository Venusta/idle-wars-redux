import { Link, useParams } from "react-router-dom";
import Style from "./style.module.css";
import { BuildingId, BuildingIdType } from "../../game/constants";
import { baseBuildings } from "../../game/buildings";

export const Navbar = (): JSX.Element => {
  const { townId, buildingId: buildingPageId } = useParams<{ townId: string, buildingId: BuildingIdType }>();

  const navBuildings = [
    BuildingId.Headquarters,
    BuildingId.Barracks,
    BuildingId.Stable,
    BuildingId.Workshop,
    BuildingId.Smithy,
  ];

  // TODO add image maybe
  return (
    <div className={Style.container}>
      {
        navBuildings.map((buildingId: BuildingIdType) => (
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
