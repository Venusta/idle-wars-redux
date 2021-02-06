/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { BuildingRequirements } from '../BuildingResourceDisplay';
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

  const BuildThingy = () => (
    <div className="barracks-build-wrapper">
      <div className="barracks-header">Buildings</div>
      <div className="barracks-header">Requirements</div>
      <div className="barracks-header">Construct</div>
      <div className="barracks-item">
        <div className="first-column-container">
          <img className="first-column-img" src={`${process.env.PUBLIC_URL}/buildings/main1.png`} title="Headquarters" />
          <div className="first-column-info">
            <a href="#" className="link">Headquarters</a>
            <div className="smoll">Level 3</div>
          </div>
        </div>
      </div>
      <div className="barracks-item">
        <BuildingRequirements />
      </div>
      <div className="barracks-item third-column">
        <button className="button-style">Level 4</button>
      </div>
      <div className="barracks-item">test4</div>
      <div className="barracks-item fully-constructed">Building fully constructed</div>
      <div className="barracks-item">test5</div>
      <div className="barracks-item">test6</div>
      <div className="barracks-item inactive">Queue is currently full</div>
      <div className="barracks-item">test8</div>
      <div className="barracks-item">test9</div>
      <div className="barracks-item inactive">Resources available in 0:00:09</div>
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
