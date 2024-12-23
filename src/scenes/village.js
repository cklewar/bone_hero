import {
  generatePlayerComponents,
  setPlayerControls,
} from "../entities/player.js";
import { watchPlayerOffScreen } from "../utils.js";
import { healthBar } from "../components/healthbar.js";
import * as consts from "../const.js"

export default async function village(k, levelIdx) {
  const entities = {
    player: null,
    enemy: null,
  };

  add([
		sprite("village",
			{
				width: width(),
				height: height(),
			})
	])

	// level layouts
	const levels = [
		[
			"                                        ",
			"========================================",
		],
	]

	const level = addLevel(levels[levelIdx], {
		tileWidth: 64,
		tileHeight: 64,
		tiles: {
			"=": () => [
				sprite("grass", {}),
				pos(0, height() - 100),
				area(),
				body({ isStatic: true }),
			],
		},
	})

	entities.player = generatePlayerComponents(k, k.vec2(0, height() - consts.PLAYER_START_POS_Y_OFFSET), level);
	healthBar(k);
	setPlayerControls(k, entities.player);
	watchPlayerOffScreen(k, entities.player, levelIdx, levels.length, "village", "cave", consts.scenes);
}