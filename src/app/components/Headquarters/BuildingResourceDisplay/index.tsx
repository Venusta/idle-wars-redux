/* eslint-disable jsx-a11y/alt-text */
import { useSelector } from "react-redux";
import { baseBuildings } from "../../../game/buildings";
import { BuildingId, ResourceId } from "../../../game/constants";
import { RootState } from "../../../store";
import { selectBuilding, selectResource } from "../../../selectors";
import "./style.css";

interface Props {
  buildingId: BuildingId
  townId: string
}

const SingleBuildingResource = ({ amount, resourceId, townId }: { amount: number, resourceId: ResourceId, townId: string }) => {
  const resource = useSelector((state: RootState) => selectResource(state, townId, resourceId));
  return (
    <div className="brd-group">
      <img src={`${process.env.PUBLIC_URL}/resources/${resourceId}.png`} />
      <div className={`brd-display ${resource < amount ? "dangerText" : ""}`}>{amount.toFixed(0)}</div>
    </div>
  );
};

export const BuildingResourceDisplay = ({ buildingId, townId }: Props): JSX.Element => {
  const headquarters = useSelector((state: RootState) => selectBuilding(state, townId, BuildingId.Headquarters));
  const queuedBuilding = useSelector((state: RootState) => selectBuilding(state, townId, buildingId));

  const buildingData = baseBuildings[buildingId];
  const cost = buildingData.getCost(queuedBuilding.queuedLevel);
  const amount = 1; // todo props?
  // TODO LOOP OVER THE BELOW RESOURCES THIS SHOULD NOT BE HARDCODED
  const timber = cost.resources[0][1] * amount;
  const clay = cost.resources[1][1] * amount;
  const iron = cost.resources[2][1] * amount;
  const pop = ((cost.population ?? 0) * amount);
  const time = new Date(buildingData.getBuildTime(queuedBuilding.queuedLevel, headquarters.level) * 1000).toISOString().substr(11, 8);

  // todo move
  const SingleBuildingRequirements = ({ data, imgId }: { data: string | number, imgId: string }) => {
    if (typeof data === "number") {
      // eslint-disable-next-line no-param-reassign
      data = data.toFixed(0);
    }
    return (
      <div className="brd-group">
        <img src={`${process.env.PUBLIC_URL}/resources/${imgId}.png`} />
        <div className="brd-display">{data}</div>
      </div>
    );
  };
  // TODO LOOP OVER THE BELOW SingleBuildingResource THIS SHOULD NOT BE HARDCODED
  return (
    <>
      <SingleBuildingResource amount={timber} resourceId={ResourceId.Timber} townId={townId} />
      <SingleBuildingResource amount={clay} resourceId={ResourceId.Clay} townId={townId} />
      <SingleBuildingResource amount={iron} resourceId={ResourceId.Iron} townId={townId} />
      <SingleBuildingRequirements data={pop} imgId="timber" />
      <SingleBuildingRequirements data={time} imgId="timber" />
    </>
  );
};
