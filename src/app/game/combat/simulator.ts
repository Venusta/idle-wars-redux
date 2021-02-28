/* eslint-disable @typescript-eslint/no-unused-vars */
import { Army, UnitLosses } from "../../../types/types";
import { baseUnits } from "../units";
import { isUnitId } from "../utility";
import { UnitId } from "../constants";

interface BattleResult {
  attackerLosses: UnitLosses;
  defenderLosses: UnitLosses;
}

export const simulateBattle = (attackers: Army, defenders: Army, wallLevel = 1): BattleResult => {
  /* -------------- Wall defence bonus for defender ---------------------------- */
  const numRams = attackers[UnitId.Ram] ?? 0;
  const wallLevelsNegated = (numRams * baseUnits[UnitId.Ram].atk) / (8 * 1.09 ** wallLevel);
  // Wall bonus level can at most be reduced to half of the wall level so check if it would reduce by more and if so limit it to half
  const wallBonusLevel = Math.round(wallLevelsNegated) > (wallLevel / 2) ? (wallLevel / 2) : wallLevel - Math.round(wallLevelsNegated);
  const defenceMultiplier = 1.037 ** wallBonusLevel;

  /* -------------- Morale & Luck bonus for attacker --------------------------- */
  const morale = 100; // Dunno how morale works in the game but we can just leave it as 100 or remove it altogether
  const luck = 0; // We can always roll a random number between +/- 25% or something if we want some randomness
  const attackMultiplier = (morale / 100) * (luck / 100 + 1);

  const attackerLosses: UnitLosses = {};
  const defenderLosses: UnitLosses = {};

  Object.entries(attackers).forEach(([unit, amount = 0]) => {
    if (isUnitId(unit)) {
      attackerLosses[unit] = {
        total: amount,
      };
    }
  });

  Object.entries(defenders).forEach(([unit, amount = 0]) => {
    if (isUnitId(unit)) {
      defenderLosses[unit] = {
        total: amount,
      };
    }
  });

  let numAttackingTroops = Object.values(attackers).reduce((a = 0, b = 0) => a + b) ?? 0;
  let numDefendingTroops = Object.values(defenders).reduce((a = 0, b = 0) => a + b) ?? 0;

  let roundNumber = 0;

  // Fight until one army is dead
  while (numAttackingTroops > 0 && numDefendingTroops > 0) {
    /* -------------- Total attack values per type for attacker ------------------ */
    const totalAttack = [0, 0, 0]; // [infantry, archer, cavalry]

    Object.entries(attackers).forEach(([unit, amount]) => {
      if (isUnitId(unit)) {
        const unitData = baseUnits[unit];
        totalAttack[unitData.atkType] += unitData.atk * (amount ?? 0) * attackMultiplier;
      } else {
        console.error(`${unit} was not a valid unit id.`);
      }
    });

    /* -------------- Total defence values per type for defender ------------------ */
    // Every village has a base defence based on its wall level but this is only a thing during the first round of combat for some fucking reason
    const wallBaseDefense = roundNumber >= 1 ? 0 : 20 + 50 * wallBonusLevel;
    const totalDefence = [wallBaseDefense, wallBaseDefense, wallBaseDefense]; // [infantry, archer, cavalry]

    Object.entries(defenders).forEach(([unit, amount = 0]) => {
      if (isUnitId(unit)) {
        const unitData = baseUnits[unit];
        totalDefence[0] += unitData.def * amount * defenceMultiplier;
        totalDefence[1] += unitData.defArc * amount * defenceMultiplier;
        totalDefence[2] += unitData.defCav * amount * defenceMultiplier;
      } else {
        console.error(`${unit} was not a valid unit id.`);
      }
    });

    /* -------------- Calculate ratios -------------------------------------------- */
    const ratiosAttacker = [0, 0, 0]; // [infantryRatio, archerRatio, cavalryRatio]
    const ratiosDefender = [0, 0, 0]; // [infantryRatio, archerRatio, cavalryRatio]

    const sumTotalAttack = totalAttack.reduce((a, b) => a + b);

    for (let index = 0; index < 3; index += 1) {
      // If the total attack of the attacking army is zero or when the defence against this attack type is zero
      if (sumTotalAttack === 0 || totalDefence[index] === 0) {
        ratiosAttacker[index] = 0; // All attacking troops of this attack type die since they can't hurt anything
        ratiosDefender[index] = 0; // All defending troops attacked by this attack type die since no defence against it

        // If the total attack is stronger than the defence against this type
      } else if (sumTotalAttack > totalDefence[index]) {
        ratiosAttacker[index] = (totalDefence[index] / sumTotalAttack) ** 1.5;
        ratiosDefender[index] = 1; // All defending troops attacked by this type die

        // If the defence is bigger than the total attack
      } else {
        ratiosAttacker[index] = 1; // All attacking troops of this type die
        ratiosDefender[index] = (sumTotalAttack / totalDefence[index]) ** 1.5;
      }
    }

    /* -------------- Calculate attacker survivors -------------------------------- */

    Object.entries(attackers).forEach(([unit, amount = 0]) => {
      if (isUnitId(unit)) {
        // Scouts are unaffected by everything except other scouts
        if (unit === UnitId.Scout) {
          const numDefendingScouts = defenders[UnitId.Scout] ?? 0;
          // If there are more than twice as many defending scouts then all attacking scouts die
          if (numDefendingScouts / amount >= 2) {
            // eslint-disable-next-line no-param-reassign
            attackers[unit] = 0;

            // Otherwise calculate the number of scouts that survive the attack
          } else {
            // eslint-disable-next-line no-param-reassign
            attackers[unit] = amount - Math.round(amount * (numDefendingScouts / (amount * 2)) ** 1.5);
          }

          // All the other unit types
        } else {
          const unitData = baseUnits[unit];
          // eslint-disable-next-line no-param-reassign
          attackers[unit] = Math.round(amount * (1 - ratiosAttacker[unitData.atkType]));
        }
      } else {
        console.error(`${unit} was not a valid unit id.`);
      }
    });

    /* -------------- Calculate defender survivors -------------------------------- */

    // Calculate the percentage of troops that survive the attack
    const defenderAccumulatedSurvivorRatio = (totalAttack[0] * ratiosDefender[0] + totalAttack[1] * ratiosDefender[1] + totalAttack[2] * ratiosDefender[2]) / sumTotalAttack;

    Object.entries(defenders).forEach(([unit, amount = 0]) => {
      if (isUnitId(unit)) {
        // eslint-disable-next-line no-param-reassign
        defenders[unit] = Math.round(amount * (1 - defenderAccumulatedSurvivorRatio));
      } else {
        console.error(`${unit} was not a valid unit id.`);
      }
    });

    numAttackingTroops = Object.values(attackers).reduce((a = 0, b = 0) => a + b) ?? 0;
    numDefendingTroops = Object.values(defenders).reduce((a = 0, b = 0) => a + b) ?? 0;
    roundNumber += 1;
  }

  /* -------------- Get attacker & defender losses  ----------------------------- */
  Object.entries(attackers).forEach(([unit, amount = 0]) => {
    if (isUnitId(unit)) {
      const initial = attackerLosses[unit]?.total ?? 0;
      const loss = initial - amount;
      attackerLosses[unit] = {
        total: initial,
        loss,
      };
    }
  });

  Object.entries(defenders).forEach(([unit, amount = 0]) => {
    if (isUnitId(unit)) {
      const initial = defenderLosses[unit]?.total ?? 0;
      const loss = initial - amount;
      defenderLosses[unit] = {
        total: initial,
        loss,
      };
    }
  });

  /* -------------- Calculate wall downgrade level ------------------------------ */
  const downgradedWallLevel = wallLevel;
  /*
    Walls get downgraded to a certain level based on if the attacker or defender wins
    if the attacker wins: wallNewLevel = wallLevel - Math.round(wallLevelsNegated * (2 - attackingUnitsDead / attackingUnitsTotal))
    if the defender wins: wallNewLevel = wallLevel - Math.round(wallLevelsNegated * (defendingUnitsDead / defendingUnitsTotal))
  */
  // If the attacker won the fight and all defending troops are dead
  if (numDefendingTroops <= 0) {

    // Defender won
  // eslint-disable-next-line no-empty
  } else {
  }

  return { attackerLosses, defenderLosses };
};
