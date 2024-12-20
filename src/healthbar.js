import { playerState } from ".//playerGlobalState.js";

export function healthBar(k) {
  let nbFullHearts = Math.floor(playerState.getHealth());
  let addHalfHeart = false;

  if (playerState.getHealth() - nbFullHearts === 0.5) {
    addHalfHeart = true;
  }

  let nbEmptyHearts =
    playerState.getMaxHealth() - nbFullHearts - (addHalfHeart ? 1 : 0);

  const heartsContainer = k.add([k.pos(20, 20), k.fixed(), "healthContainer"]);

  let previousX = 0;
  for (let i = 0; i < nbFullHearts; i++) {
    heartsContainer.add([k.sprite("heart_full"), k.pos(previousX, 0)]);
    previousX += 58;
  }

  if (addHalfHeart) {
    console.log(previousX);
    heartsContainer.add([k.sprite("heart_half"), k.pos(previousX, 0)]);

    previousX += 58;
  }

  if (nbEmptyHearts > 0) {
    for (let i = 0; i < nbEmptyHearts; i++) {
      heartsContainer.add([k.sprite("heart_empty"), k.pos(previousX, 0)]);
      previousX += 58;
    }
  }

  return heartsContainer;
}