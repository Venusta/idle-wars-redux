/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { baseBuildings } from '../../game/buildings';
import { BuildingId } from '../../game/constants';
import { BuildingRequirements } from '../BuildingResourceDisplay';
import { ConstructButton } from '../Buttons';
import "./style.css";

// TODO this is actually HQ

interface Props {
  id: BuildingId;
  level: number;
};

export const BarracksRemake = ({ id, level }: Props) => {
  const { name, description } = baseBuildings[id]

  const Title = () => (
    <div className="building-title">
      <h2>{name} (Level {level})</h2>
      <div className="building-description">
        {description}
      </div>
    </div>
  );

  const levelUp = (int: number) => {
    console.log("yeet " + int);
    // TODO dispatch level up queue shit blah
  }

  const FirstElement = ({ id, level = 0 }: { id: BuildingId, level: number }) => {
    const { name } = baseBuildings[id]
    return (
      <div className="construct-grid-item">
        <div className="first-column-container">
          <img className="first-column-img" src={`${process.env.PUBLIC_URL}/buildings/${id}.png`} title={name} alt="" />
          <div className="first-column-info">
            <a href="#" className="link">{name}</a>
            <div className="smoll">{`Level ${level}`}</div>
          </div>
        </div>
      </div>
    );
  }

  const SecondElement = () => (
    // todo pass down the cost or id + level?
    <div className="construct-grid-item">
      <BuildingRequirements />
    </div>
  )

  const ThirdElement = () => (
    <div className="construct-grid-item third-column">
      <ConstructButton text="Level 4" handleClick={() => levelUp(4)} />
    </div>
  )

  const FullyElement = () => (
    <div className="construct-grid-item fully-constructed">Building fully constructed</div>
  )

  const InactiveElement = ({ text }: { text: string }) => (
    <div className="construct-grid-item inactive">{text}</div>
  )

  const HeaderElement = ({ text }: { text: string }) => (
    <div className="barracks-header">{text}</div>
  )

  const RowTest = ({ id, level }: { id: BuildingId, level: number }) => (
    <>
      <FirstElement id={id} level={level} />
      <SecondElement />
      <ThirdElement />
    </>
  )


  const BuildThingy = () => (
    <div className="barracks-build-wrapper">
      <HeaderElement text="Buildings" />
      <HeaderElement text="Requirements" />
      <HeaderElement text="Construct" />

      <RowTest id={BuildingId.Headquarters} level={5}/>

      <FirstElement id={BuildingId.Barracks} level={4}/>
      <FullyElement />

      <FirstElement id={BuildingId.Stable} level={7}/>
      <SecondElement />
      <InactiveElement text="Queue is currently full" />

      <FirstElement id={BuildingId.IronMine} level={15}/>
      <SecondElement />
      <InactiveElement text="Resources available in 0:00:09" />

      <div className="construct-grid-item">test11</div>
      <div className="construct-grid-item">test12</div>
      <div className="construct-grid-item">testddddddddddddddddd</div>
    </div>
  )

  return (
    <div className="barracks-container">
      <Title />
      <BuildThingy />
    </div>
  )
}
