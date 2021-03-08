import { useSelector } from "react-redux";
import { baseBuildings } from "../../../game/buildings";
import { BuildingId, ResourceId } from "../../../game/constants";
import { RootState } from "../../../store";
import { selectBuilding, selectResource } from "../../../selectors";
import "./style.css";
import { ResourcesNormalised } from "../../../../types/townStateTypes";
import { multiplyResources } from "../../../util";

interface Props {
  buildingId: BuildingId
  townId: string
}

const SingleBuildingResource = ({ amount, resourceId, townId }: { amount: number, resourceId: ResourceId, townId: string }) => {
  const resource = useSelector((state: RootState) => selectResource(state, townId, resourceId));
  return (
    <div className="brd-group">
      <img src={`${process.env.PUBLIC_URL}/resources/${resourceId}.png`} alt="" />
      <div className={`brd-display ${resource < amount ? "dangerText" : ""}`}>{amount.toFixed(0)}</div>
    </div>
  );
};

export const BuildingResourceDisplay = ({ buildingId, townId }: Props): JSX.Element => {
  const headquarters = useSelector((state: RootState) => selectBuilding(state, townId, BuildingId.Headquarters));
  const queuedBuilding = useSelector((state: RootState) => selectBuilding(state, townId, buildingId));

  const buildingData = baseBuildings[buildingId];
  const cost = buildingData.getCost(queuedBuilding.queuedLevel);
  const multiplier = 1; // todo props?
  const multipliedCost: ResourcesNormalised = multiplyResources(cost.resources, multiplier);
  const pop = cost.population * multiplier;
  const time = new Date(buildingData.getBuildTime(queuedBuilding.queuedLevel, headquarters.level) * 1000).toISOString().substr(11, 8);

  // todo move
  const SingleBuildingRequirements = ({ data, imgId }: { data: string | number, imgId: string }) => {
    if (typeof data === "number") {
      // eslint-disable-next-line no-param-reassign
      data = data.toFixed(0);
    }
    return (
      <div className="brd-group">
        <img src={`${process.env.PUBLIC_URL}/resources/${imgId}.png`} alt="" />
        <div className="brd-display">{data}</div>
      </div>
    );
  };
  return (
    <>
      {multipliedCost.allIds.map((id) => <SingleBuildingResource key={id} amount={multipliedCost.byId[id]?.amount ?? 0} resourceId={id} townId={townId} />)}
      <SingleBuildingRequirements data={pop} imgId="timber" />
      <SingleBuildingRequirements data={time} imgId="timber" />
    </>
  );
};
