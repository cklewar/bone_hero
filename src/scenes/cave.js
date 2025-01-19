import {
  generatePlayerComponents,
  setPlayerControls,
} from "../entities/player.js";
import { generateEnemyComponents} from "../entities/enemy.js";
import { watchPlayerOffScreen, watchEntityHealth, onCollideWith } from "../utils.js";
import { healthBar } from "../components/healthbar.js";
import { playerState } from "../state/playerGlobalState.js";
import * as consts from "../const.js";
import {get_scenes} from "./scenes.js";

export default async function cave(k, levelIdx) {
    /*const entities = new Map([
        ["player", null],
        ["bat1", null],
        ["bat2", null],
    ]);*/

  const entities = {
    player: null,
    bat1: null,
	bat2: null,
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
		    "                               ",
		    "                               ",
		    "                               ",
			"                               ",
			"                               ",
			"                    :::::      ",
			"                               ",
			"                               ",
			"            :::                ",
			"                               ",
			"    :::::::                    ",
			"                               ",
			"                      :::::    ",
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
				sprite("boden_1", {}),
				pos(0, height() - consts.LEVEL_HEIGHT_OFFSET),
				area(),
				body({ isStatic: true }),
			],
			":": () => [
				sprite("stalacknieten_1", {}),
				pos(0, height() - consts.LEVEL_HEIGHT_OFFSET),
				area(),
				body({ isStatic: true }),

			],
		},
	})

	//Player

    entities.player = generatePlayerComponents(k, k.vec2(0, height() - consts.PLAYER_START_POS_Y_OFFSET), level);
    watchPlayerOffScreen(k, entities.player, levelIdx, levels.length, "cave", "sunset", get_scenes());
	healthBar(k);
	setPlayerControls(k, entities.player);
	watchEntityHealth(k, entities.player);

    //Enemy
    entities.bat1 = generateEnemyComponents(k, "bat", k.vec2(width() / 2, height() - 250), level, entities.player);
    entities.bat2 = generateEnemyComponents(k, "bat", k.vec2(width() / 5, height() - 600), level, entities.player);
    watchEntityHealth(k, entities.bat1);
    watchEntityHealth(k, entities.bat2);

    //Collide
    onCollideWith(k, entities.bat1, entities.bat1.entityState, entities.player);
    onCollideWith(k, entities.bat2, entities.bat2.entityState, entities.player);
}