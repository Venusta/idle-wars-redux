import { useParams } from "react-router-dom";
import { selectResource, selectSingleRps } from "../../../selectors";
import Style from "./style.module.css";
import { useStateSelector } from "../../hooks";
import { ResourceIdType } from "../../../game/constants";

export const SingleResource = ({ id: resourceId }: { id: ResourceIdType }): JSX.Element => {
  const { townId } = useParams<{ townId: string }>();
  const display = useStateSelector((state) => state.misc.userSettings.resourceDisplayToggle);
  const rps = useStateSelector((state) => selectSingleRps(state, townId, resourceId));
  const resource = useStateSelector((state) => selectResource(state, townId, resourceId));

  return (
    <div className={Style.inner} title={display ? `${rps.toFixed(2)}/s` : `${(resource).toFixed(0)}`}>
      <img alt="" className={Style.icon} src={`${process.env.PUBLIC_URL}/resources/${resourceId}.png`} />
      <div className={Style.displayText}>{display ? `${(resource).toFixed(0)}` : `${rps.toFixed(2)}/s`}</div>
    </div>
  );
};
