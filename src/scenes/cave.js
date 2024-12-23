import {
  generatePlayerComponents,
  setPlayerControls,
} from "../entities/player.js";
import { generateEnemyComponents } from "../entities/enemy.js";
import { watchPlayerOffScreen } from "../utils.js";
import { healthBar } from "../components/healthbar.js";
import * as consts from "../const.js"

export default async function cave(k, levelIdx) {
  const entities = {
    player: null,
    enemy: null,
  };

  add([
		sprite("cave_1",
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
				pos(0, height() - consts.LEVEL_HEIGHT_OFFSET),
				area(),
				body({ isStatic: true }),
			],
		},
	})

    entities.player = generatePlayerComponents(k, k.vec2(0, height() - consts.PLAYER_START_POS_Y_OFFSET), level);
	healthBar(k);
	setPlayerControls(k, entities.player);
	watchPlayerOffScreen(k, entities.player, levelIdx, levels.length, "cave", "graveyard", get_scenes());
	watchEntityHealth(k, playerState);
}