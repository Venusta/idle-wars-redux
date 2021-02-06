/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { BuildingRequirements } from '../BuildingResourceDisplay';
import "./style.css";

export const BarracksRemake = () => {

  const Title = () => (
    <div>
      <h2>Barracks (Level 15)</h2>
      {"In the barracks you can recruit infantry. The higher its level the faster the recruitment of troops will be finished."}
    </div>
  );

  const BuildThingy = () => (
    <div className="barracks-build-wrapper">
      <div className="barracks-header">
        Unit
        </div>
      <div className="barracks-header">Requirements</div>
      <div className="barracks-header">In the village/total</div>
      <div className="barracks-header">Recruit</div>
      <div className="barracks-row">
        <div className="first-column-container">
          <img className="first-column-img" src="https://dsuk.innogamescdn.com/asset/5d6f385f/graphic/buildings/mid/main1.png" title="Headquarters" />
          <div className="first-column-info">
            <a href="#" className="link">Headquarters</a>
            <div className="smoll">Level 3</div>
          </div>
        </div>
      </div>
      <div className="barracks-row">
        <BuildingRequirements />
      </div>
      <div className="barracks-row third-column">{"16/16"}</div>
      <div className="barracks-row">test4</div>
      <div className="barracks-row">test5</div>
      <div className="barracks-row">test6</div>
      <div className="barracks-row">test7</div>
      <div className="barracks-row">test8</div>
      <div className="barracks-row">test9</div>
      <div className="barracks-row">test10</div>
      <div className="barracks-row">test11</div>
      <div className="barracks-row">test12</div>
    </div>
  )

  return (
    <div className="barracks-container">
      <Title />
      <BuildThingy />
    </div>
  )
}
