import {
  generatePlayerComponents,
  setPlayerControls,
} from "../entities/player.js";
import { generateEnemyComponents } from "../entities/enemy.js";
import { watchPlayerOffScreen, watchEntityHealth, onCollideWith } from "../utils.js";
import { healthBar } from "../components/healthbar.js";
import { playerState } from "../state/playerGlobalState.js";
import * as consts from "../const.js";
import {get_scenes} from "./scenes.js";

export default async function forest_and_castle(k, levelIdx) {
    const entities = {
        player: null,
        enemy: null,
    };

    add([
		sprite("forest_and_castle",
			{
				width: width(),
				height: height(),
			})
	])

	const levels = [
		[
		    "                               ",
		    "                               ",
		    "                               ",
			"                               ",
			"                     :::       ",
			"           :::::               ",
			"     :::::                     ",
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
			"     :::::                     ",
			"                 :::::::::     ",
			"                            :  ",
			"        :::::               :  ",
			"                            :  ",
			"                            :  ",
			"===============================",
		],
		[
			"                               ",
		    "                               ",
		    "                               ",
			"                               ",
			"                               ",
			"                               ",
			"                               ",
			"           ::::::::::          ",
			"                               ",
			"    ::::                       ",
			"                               ",
			"            ::::               ",
			"                               ",
			"                               ",
			"                               ",
			"===============================",
		],
	]

    const level = k.addLevel(levels[levelIdx], {
            tileWidth: 64,
            tileHeight: 64,

            tiles: {
                "=": () => [
                    sprite("grass", {}),
                    pos(0, height() - consts.LEVEL_HEIGHT_OFFSET),
                    area(),
                    body({ isStatic: true }),
                ],
                ":": () => [
                    sprite("block_1", {}),
                    pos(40, 400),
                    area(),
                    body({ isStatic: true }),
                ]
            },
	})

    //Player
    entities.player = generatePlayerComponents(k, k.vec2(0, height() - consts.PLAYER_START_POS_Y_OFFSET), level);
    watchPlayerOffScreen(k, entities.player, levelIdx, levels.length, "forest_and_castle", "village", get_scenes());
	healthBar(k);
	setPlayerControls(k, entities.player);
	watchEntityHealth(k, entities.player);

    //Enemy
	entities.enemy = generateEnemyComponents(k, k.vec2(width() / 2, height() - consts.PLAYER_START_POS_Y_OFFSET), level, entities.player);
    watchEntityHealth(k, entities.enemy, entities);

    //Collide
    onCollideWith(k, entities.player, entities.player.entityState, entities.enemy);
    onCollideWith(k, entities.enemy, entities.enemy.entityState, entities.player);
}