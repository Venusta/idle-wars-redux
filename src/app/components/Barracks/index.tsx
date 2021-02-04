/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { useSelector } from 'react-redux';
import { ResourceId, UnitId } from '../../game/constants';
import { baseResources } from '../../game/resources';
import { baseUnits } from '../../game/units';
import { Unit } from '../../game/units/base/unit';
import { selectTown } from '../../selectors';
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
    const town = useSelector((state: RootState) => selectTown(state, townId))
    const { unlocked } = town
    console.log(unlocked);

    const SingleResource = ({ resourceId, amount }: { resourceId: ResourceId, amount: number }) => {
      return <span><img src={`${process.env.PUBLIC_URL}/resources/${resourceId}.png`} style={{ verticalAlign: "middle" }} /> {amount}</span>;
    }

    const RecruitRequirements = ({ unit }: { unit: Unit }) => {
      const costComponent = Object.entries(unit.cost).map(([key, res], index) => {
        //todo don't use index
        const x = baseResources[index as ResourceId]?.id;
        return <SingleResource resourceId={x} amount={res}></SingleResource>
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
      return Object.keys(unlocked).map((k, index) => {
        const x = parseInt(k);
        const unit = baseUnits[x as UnitId] // TODO bad cast
        const exists = town.units[x as UnitId] // TODO bad cast

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
