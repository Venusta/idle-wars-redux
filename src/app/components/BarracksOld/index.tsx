/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { useSelector } from 'react-redux';
import { ResourceId } from '../../game/constants';
import { baseResources } from '../../game/resources';
import { baseUnits } from '../../game/units';
import { Unit } from '../../game/model/unit';
import { isResourceId, isUnitId } from '../../game/utility';
import { selectTown, selectResearch, selectUnits } from '../../selectors';
import { RootState } from '../../store';

export const Barracks = () => {


  const Title = () => (
    <table>
      <tbody>
        <tr>
          <td>
            <h2>Barracks (Level 15)</h2>
            {"In the barracks you can recruit infantry. The higher its level the faster the recruitment of troops will be finished."}
          </td>
        </tr>
      </tbody>
    </table>
  )

  const AHHH = () => {
    const townId = "0";
    const research = useSelector((state: RootState) => selectResearch(state, townId));
    const units = useSelector((state: RootState) => selectUnits(state, townId));

    const SingleResource = ({ resourceId, amount }: { resourceId: ResourceId, amount: number }) => {
      return <span><img src={`${process.env.PUBLIC_URL}/resources/${resourceId}.png`} style={{ verticalAlign: "middle" }} /> {amount}</span>;
    }

    const RecruitRequirements = ({ unit }: { unit: Unit }) => {
      const costComponent = Object.entries(unit.cost.resources).map(([key, res]) => {
        if (isResourceId(key)) {
          const x = baseResources[key]?.id;
          return <SingleResource resourceId={x} amount={res}></SingleResource>
        } else {
          console.error(`${key} was not a valid resource id.`);          
          return <div></div>;
        }
      });
      // TODO add time and pop too
      return (
        <td>
          <div className="recruit_req">
            {costComponent}
          </div>
        </td>
      )
    }

    const UnitRows = () => {
      return Object.keys(research).map((key, index) => {
        if (isUnitId(key)) {
          const unit = baseUnits[key];
          console.log(unit);          
          const exists = units[key];
          console.log(exists);
  
          const howManyCanWeMake = 10; // todo actually calc it
  
          return (
            <tr>
              <td>
                <a href="#">
                  <img src={`${process.env.PUBLIC_URL}/units/${unit.id}.png`} style={{ verticalAlign: "middle" }} />
                  {unit.name}
                </a>
              </td>
              <RecruitRequirements unit={unit} />
              <td style={{ textAlign: "center" }}>{exists ? `${exists.town} / ${exists.total}` : `0/0`}</td>
  
              <td>
                <span>
                  <input type="text" style={{ width: "50px", color: "black" }} maxLength={5} tabIndex={index} />
                  <a href="unit_build_block.set_max('spear')">({howManyCanWeMake})</a>
                </span>
                <span id="spear_0_afford_hint" className="inactive" style={{ textAlign: "center", fontSize: " 11px", display: "none" }}>Resources available in x</span>
              </td>
            </tr>
          )
        } else {
          console.log(`${key} was not a unit id.`);          
          return <div></div>;
        }
      })
    }

    return (
      <form action="/game.php?village=2876&amp;screen=barracks&amp;action=train&amp;mode=train" id="train_form" method="post">
        <table className="vis" style={{ width: "100%" }}>
          <tbody>
            <tr>
              <th style={{ width: "20%" }}>Unit</th>
              <th style={{ minWidth: "400px" }}>Requirements</th>
              <th>In the village/total</th>
              <th style={{ width: "120px" }}>Recruit</th>
            </tr>
            {UnitRows()}
            <tr>
              <td colSpan={3}>
              </td>
              <td>
                <input className="btn btn-recruit" style={{ float: "inherit" }} type="submit" value="Recruit" tabIndex={5} />
              </td>
            </tr>
          </tbody>
        </table>
        <input type="hidden" name="h" value="28f26910" />
      </form>
    );
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <Title />
            <AHHH />
          </td>
        </tr>
      </tbody>
    </table>
  )
};
