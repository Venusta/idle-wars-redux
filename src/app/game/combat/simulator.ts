import { Army } from "../../../types/types";
import { baseUnits } from "../units";
import { isUnitId } from "../utility";

export const simulateBattle = (attackers: Army, defenders: Army) => {

  /* -------------- Wall defence bonus for defender ---------------------------- */
  const wallLevel = 1; // Retrieve from defending town
  const ramAttackValue = 2; // Retrieve from unit stats
  const numRams = 0; // Retrieve from attacking army
  const wallLevelsNegated = numRams * ramAttackValue / (8 * 1.09 ** wallLevel)
  // Wall bonus level can at most be reduced to half of the wall level so check if it would reduce by more and if so limit it to half
  const wallBonusLevel = Math.round(wallLevelsNegated) > (wallLevel / 2) ? (wallLevel / 2) : wallLevel - Math.round(wallLevelsNegated);
  const defenceMultiplier = 1.037 ** wallBonusLevel;
  /* 
    Walls get downgraded to a certain level based on if the attacker or defender wins
    if the attacker wins: wallNewLevel = wallLevel - Math.round(wallLevelsNegated * (2 - attackingUnitsDead / attackingUnitsTotal))
    if the defender wins: wallNewLevel = wallLevel - Math.round(wallLevelsNegated * (defendingUnitsDead / defendingUnitsTotal))
  */


  /* -------------- Morale & Luck bonus for attacker --------------------------- */
  const morale = 100; // Dunno how morale works in the game but we can just leave it as 100 or remove it altogether
  const luck = 0; // We can always roll a random number between +/- 25% or something if we want some randomness
  const attackMultiplier = morale / 100 * (luck / 100 + 1);


  /* -------------- Total attack values per type for attacker ------------------ */
  const totalAttack = [0, 0, 0] // [infantry, archer, cavalry]

  for (const [unit, amount] of Object.entries(attackers)) {
    if (isUnitId(unit)){
      const unitData = baseUnits[unit];
      totalAttack[unitData.atkType] += unitData.atk * (amount ?? 0) * attackMultiplier;
    } else {
      console.error(`${unit} was not a valid unit id.`);      
    }
  }


  /* -------------- Total defence values per type for defender ------------------ */
  const totalDefence = [0, 0, 0] // [infantry, archer, cavalry]
  // const [ inf, arc, cav ] = [ 0,0,0]

  for (const [unit, amount] of Object.entries(defenders)) {
    if (isUnitId(unit)){
      const unitData = baseUnits[unit];
      totalDefence[0] += unitData.def * (amount ?? 0) * defenceMultiplier;
      totalDefence[1] += unitData.defArc * (amount ?? 0) * defenceMultiplier;
      totalDefence[2] += unitData.defCav * (amount ?? 0) * defenceMultiplier;
    } else {
      console.error(`${unit} was not a valid unit id.`);      
    }
  }


  /* -------------- Calculate ratios -------------------------------------------- */
  
}
