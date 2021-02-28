import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ResourceId } from "../../../game/constants";
import { RootState } from "../../../store";
import { selectResource, selectSingleRps } from "../../../selectors";
import Style from "./style.module.css";

export const SingleResource = ({ id: resourceId }: { id: ResourceId }) => {
  const { townId } = useParams<{ townId: string }>();
  const display = useSelector((state: RootState) => state.misc.userSettings.resourceDisplayToggle);
  const rps = useSelector((state: RootState) => selectSingleRps(state, townId, resourceId));
  const resource = useSelector((state: RootState) => selectResource(state, townId, resourceId));

  return (
    <div className={Style.inner} title={display ? `${rps.toFixed(2)}/s` : `${(resource).toFixed(0)}`}>
      <img className={Style.icon} src={`${process.env.PUBLIC_URL}/resources/${resourceId}.png`} alt="" />
      <div className={Style.displayText}>{display ? `${(resource).toFixed(0)}` : `${rps.toFixed(2)}/s`}</div>
    </div>
  );
};
