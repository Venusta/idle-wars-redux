import { ResourcesNormalised } from "../../../types/townStateTypes";
import { selectTowns } from "../../selectors";
import { useStateSelector } from "../hooks";
import Style from "./style.module.css";

const Resources = ({ resources }: { resources: ResourcesNormalised }): JSX.Element => (
  <div>
    {Object.values(resources.id).map((resource) => {
      if (resource !== undefined) {
        return (
          <div>{`${resource.id}: ${resource.amount}`}</div>
        );
      }
      return <></>;
    })}
  </div>
);

export const Overview = (): JSX.Element => {
  const towns = useStateSelector((state) => selectTowns(state));
  // Object.values(towns.byId)

  return (
    <div className={Style.container}>
      {
        Object.values(towns.id).map(({ id, resources }) => (
          <div key={id}>
            {`Town ${id}`}
            <Resources resources={resources} />
          </div>
        ))
      }
    </div>
  );
};
