import {
  generatePlayerComponents,
  setPlayerControls,
} from "../entities/player.js";
import { generateEnemyComponents } from "../entities/enemy.js";
import { watchPlayerOffScreen, watchEntityHealth, onCollideWithPlayer } from "../utils.js";
import { healthBar } from "../components/healthbar.js";
import { playerState } from "../state/playerGlobalState.js";
import * as consts from "../const.js";
import {get_scenes} from "./scenes.js";

export default async function graveyard(k, levelIdx) {
  const entities = {
    player: null,
    enemy: null,
  };

  add([
		sprite("graveyard",
			{
				width: width(),
				height: height(),
			})
	])

	// level layouts
	const levels = [
		[
		    "                               ",
		    "                               ",
		    "                               ",
			"                               ",
			"                               ",
			"                               ",
			"                               ",
			"                               ",
			"                               ",
			"                               ",
			"                               ",
			"                               ",
			"                               ",
			"                               ",
			"                               ",
			"===============================",
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

	//Player
    entities.player = generatePlayerComponents(k, k.vec2(0, height() - consts.PLAYER_START_POS_Y_OFFSET), level);
	healthBar(k);
	setPlayerControls(k, entities.player);
	watchPlayerOffScreen(k, entities.player, levelIdx, levels.length, "graveyard", "sunset", get_scenes());
	watchEntityHealth(k, playerState);

	//Enemy
	entities.enemy = generateEnemyComponents(k, k.vec2(width() / 2, height() - consts.PLAYER_START_POS_Y_OFFSET), level, entities.player);
    onCollideWithPlayer(k, entities.player, "axe");
}