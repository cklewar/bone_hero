import {
  generatePlayerComponents,
  setPlayerControls,
} from "../entities/player.js";
import { generateEnemyComponents } from "../entities/enemy.js";
import { generateBossComponents } from "../entities/boss.js";
import { watchPlayerOffScreen, watchEntityHealth, onCollideWith, addFlamebar} from "../utils.js";
import { healthBar } from "../components/healthbar.js";
import { playerState } from "../state/playerGlobalState.js";
import * as consts from "../const.js";
import {get_scenes} from "./scenes.js";

export default async function castle(k, levelIdx) {
    const entities = {
        boss1: null,
        boss2: null,
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
			"     :::::                     ",
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
            ":": () => [
                sprite("stamm_1", {}),
                pos(0, height() - consts.LEVEL_HEIGHT_OFFSET),
                area(),
                body({ isStatic: true }),
            ],
        },
    })

    k.add([

    ])

    //Objects
    addFlamebar(vec2(350, 600), -40, 8);
    //addFlamebar(vec2(480, 100), 180);
    //addFlamebar(vec2(400, 480), 0);

    //Player
    entities.player = generatePlayerComponents(k, k.vec2(0, height() - consts.PLAYER_START_POS_Y_OFFSET), level);
	healthBar(k);
	setPlayerControls(k, entities.player);
	watchEntityHealth(k, entities.player);

	//Boss
    //entities.boss1 = generateBossComponents(k, k.vec2(width() / 2, height() - 400), level, entities.player);
    entities.boss2 = generateBossComponents(k, k.vec2(width() / 2, height() - 400), level, entities.player);
    entities.boss2.move();

	//Enemy
	//entities.enemy = generateEnemyComponents(k, k.vec2(width() / 2, height() - consts.PLAYER_START_POS_Y_OFFSET), level, entities.player);
    //watchEntityHealth(k, entities.enemy, entities);

    //Collide
    //onCollideWith(k, entities.player, entities.player.entityState, entities.enemy);
    //onCollideWith(k, entities.enemy, entities.enemy.entityState, entities.player);






}