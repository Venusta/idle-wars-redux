import { useSelector } from "react-redux";
import { ResourcesNormalised } from "../../../types/townStateTypes";
// import { useParams } from "react-router-dom";
import { selectTowns } from "../../selectors";
import { RootState } from "../../store";
import Style from "./style.module.css";

export const Overview = (): JSX.Element => {
  const towns = useSelector((state: RootState) => selectTowns(state));
  // Object.values(towns.byId)

  const Resources = ({ resources }: { resources: ResourcesNormalised }): JSX.Element => (
    <div>
      {Object.values(resources.byId).map((resource) => {
        if (resource !== undefined) {
          return (
            <div>{`${resource.id}: ${resource.amount}`}</div>
          );
        }
        return <></>;
      })}
    </div>
  );

  return (
    <div className={Style.container}>
      {
        Object.values(towns.byId).map(({ id, resources }) => (
          <div key={id}>
            {`Town ${id}`}
            <Resources resources={resources} />
          </div>
        ))
      }
    </div>
  );
};
