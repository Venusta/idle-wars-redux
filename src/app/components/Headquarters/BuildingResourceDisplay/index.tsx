import { baseBuildings } from "../../../game/buildings";
import { BuildingId, BuildingIdType, ResourceIdType } from "../../../game/constants";
import { selectBuilding, selectResource } from "../../../selectors";
import "./style.css";
import { ResourcesNormalised } from "../../../../types/townStateTypes";
import { multiplyResources } from "../../../util";
import { useStateSelector } from "../../hooks";

interface Props {
  buildingId: BuildingIdType
  townId: string
}

const SingleBuildingResource = ({ amount, resourceId, townId }: { amount: number, resourceId: ResourceIdType, townId: string }) => {
  const resource = useStateSelector((state) => selectResource(state, townId, resourceId));
  return (
    <div className="brd-group">
      <img alt="" src={`${process.env.PUBLIC_URL}/resources/${resourceId}.png`} />
      <div className={`brd-display ${resource < amount ? "dangerText" : ""}`}>{amount.toFixed(0)}</div>
    </div>
  );
};

const SingleBuildingRequirements = ({ data, imgId }: { data: string | number, imgId: string }) => {
  if (typeof data === "number") {
    // eslint-disable-next-line no-param-reassign
    data = data.toFixed(0);
  }
  return (
    <div className="brd-group">
      <img alt="" src={`${process.env.PUBLIC_URL}/resources/${imgId}.png`} />
      <div className="brd-display">{data}</div>
    </div>
  );
};

export const BuildingResourceDisplay = ({ buildingId, townId }: Props): JSX.Element => {
  const headquarters = useStateSelector((state) => selectBuilding(state, townId, BuildingId.Headquarters));
  const queuedBuilding = useStateSelector((state) => selectBuilding(state, townId, buildingId));

  const buildingData = baseBuildings[buildingId];
  const cost = buildingData.getCost(queuedBuilding.queuedLevel);
  const multiplier = 1; // todo props?
  const multipliedCost: ResourcesNormalised = multiplyResources(cost.resources, multiplier);
  const pop = cost.population * multiplier;
  const time = new Date(buildingData.getBuildTime(queuedBuilding.queuedLevel, headquarters.level) * 1000).toISOString().substr(11, 8);

  return (
    <>
      {multipliedCost.all.map((id) => <SingleBuildingResource key={id} amount={multipliedCost.id[id]?.amount ?? 0} resourceId={id} townId={townId} />)}
      <SingleBuildingRequirements data={pop} imgId="timber" />
      <SingleBuildingRequirements data={time} imgId="timber" />
    </>
  );
};
