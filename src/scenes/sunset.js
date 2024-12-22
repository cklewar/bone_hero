import {
  generatePlayerComponents,
  setPlayerControls,
} from "../entities/player.js";
import { watchPlayerOffScreen } from "../utils.js";
import * as consts from "../const.js"

export default async function sunset(k) {
  const entities = {
    player: null,
    enemy: null,
  };

  add([
		sprite("sunset_1",
			{
				width: width(),
				height: height(),
			})
	])

	// level layouts
	const levelIdx = 0
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
	setPlayerControls(k, entities.player);
	watchPlayerOffScreen(k, entities.player, levelIdx, levels.length, "sunset", "castle", consts.scenes);
}