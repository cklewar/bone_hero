import {
  generatePlayerComponents,
  setPlayerControls,
} from "../entities/player.js";
import { generateEnemyComponents } from "../entities/enemy.js";
import { generateBossComponents } from "../entities/boss.js";
import { watchPlayerOffScreen, watchEntityHealth, onCollideWithPlayer } from "../utils.js";
import { healthBar } from "../components/healthbar.js";
import { playerState } from "../state/playerGlobalState.js";
import * as consts from "../const.js";
import {get_scenes} from "./scenes.js";

export default async function castle(k, levelIdx) {
    const entities = {
        boss: null,
        player: null,
        enemy: null,
    };

    add([
        sprite("castle_1",
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

    k.add([

    ])

    //Player
    entities.player = generatePlayerComponents(k, k.vec2(0, height() - consts.PLAYER_START_POS_Y_OFFSET), level);
	healthBar(k);
	setPlayerControls(k, entities.player);
	watchEntityHealth(k, playerState);

    //Boss
    entities.boss = generateBossComponents(k, k.vec2(width() / 2, height() - 400), level);
}