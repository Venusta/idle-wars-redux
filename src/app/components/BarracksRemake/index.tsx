/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { BuildingRequirements } from '../BuildingResourceDisplay';
import { ConstructButton } from '../Buttons';
import "./style.css";

export const BarracksRemake = () => {

  const Title = () => (
    <div className="barracks-title">
      <h2>Headquarters (Level 4)</h2>
      <div className="barracks-description">
        {"In the Headquarters you can construct new buildings or upgrade existing ones. The higher the level of your Headquarters, the faster the constructions will be finished. As soon as your Headquarters is upgraded to level 15, you will be able to demolish buildings in this village (requires 100% loyalty)."}
      </div>
    </div>
  );

  const levelUp = (int: number) => {
    console.log("yeet " + int);
    // TODO dispatch level up queue shit blah
  }

  const FirstElement = ({ name, level = 0 }: { name: string, level?: number }) => (
    <div className="barracks-item">
      <div className="first-column-container">
        <img className="first-column-img" src={`${process.env.PUBLIC_URL}/buildings/main1.png`} title={name} alt="" />
        <div className="first-column-info">
          <a href="#" className="link">{name}</a>
          <div className="smoll">{`Level ${level}`}</div>
        </div>
      </div>
    </div>
  );

  const SecondElement = () => (
    <div className="barracks-item">
      <BuildingRequirements />
    </div>
  )

  const ThirdElement = () => (
    <div className="barracks-item third-column">
      <ConstructButton text="Level 4" handleClick={() => levelUp(4)} />
    </div>
  )

  const FullyElement = () => (
    <div className="barracks-item fully-constructed">Building fully constructed</div>
  )

  const InactiveElement = ({ text }: { text: string }) => (
    <div className="barracks-item inactive">{text}</div>
  )

  const HeaderElement = ({ text }: { text: string }) => (
    <div className="barracks-header">{text}</div>
  )

  const BuildThingy = () => (
    <div className="barracks-build-wrapper">
      <HeaderElement text="Buildings" />
      <HeaderElement text="Requirements" />
      <HeaderElement text="Construct" />

      <FirstElement name="Headquarters" /> 
      <SecondElement />
      <ThirdElement />

      <FirstElement name="Barracks" />
      <FullyElement />

      <FirstElement name="Stable" />
      <SecondElement />
      <InactiveElement text="Queue is currently full" />

      <FirstElement name="Rally Point"/>
      <SecondElement />
      <InactiveElement text="Resources available in 0:00:09" />

      <div className="barracks-item">test11</div>
      <div className="barracks-item">test12</div>
      <div className="barracks-item">testddddddddddddddddd</div>
    </div>
  )

  return (
    <div className="barracks-container">
      <Title />
      <BuildThingy />
    </div>
  )
}
