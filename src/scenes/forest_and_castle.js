import {
  generatePlayerComponents,
  setPlayerControls,
} from "../entities/player.js";
import { generateEnemyComponents } from "../entities/enemy.js";
import { watchPlayerOffScreen, watchEntityHealth, onCollideWithEnemy } from "../utils.js";
import { healthBar } from "../components/healthbar.js";
import { playerState } from "../state/playerGlobalState.js";
import * as consts from "../const.js";
import {get_scenes} from "./scenes.js";

export default async function forest_and_castle(k, levelIdx) {
    const entities = {
        player: null,
        echse1: null,
        echse2: null,
        echse3: null,
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
			"           ::::::    :::::::   ",
			"                               ",
			"                            :  ",
			"   :::::.                   :  ",
			"                            :  ",
			"                            :  ",
			"                            :  ",
			"                            :  ",
			"                            :  ",
			"                            :  ",
			"                            :  ",
			"===============================",
		],
		[
			"                               ",
		    "                               ",
		    "                               ",
			"                               ",
			"              :::::            ",
			"                               ",
			"                       ::::    ",
			"    ::::::                     ",
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
                    sprite("stamm_1", {}),
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


    switch (levelIdx) {
		case 0:
			 //Enemy
            entities.echse1 = generateEnemyComponents(k, "echse", k.vec2(width() / 2, height() - consts.PLAYER_START_POS_Y_OFFSET), level, entities.player, "echse1");
            entities.echse2 = generateEnemyComponents(k, "echse", k.vec2(width() / 2 - 100 , height() - 525), level, entities.player, "echse2");
            entities.echse3 = generateEnemyComponents(k, "echse", k.vec2(width() / 2 - 500, height() - 460), level, entities.player, "echse3");
            watchEntityHealth(k, entities.echse1, entities);
            watchEntityHealth(k, entities.echse2, entities);
            watchEntityHealth(k, entities.echse3, entities);

            //Collide
            onCollideWithEnemy(k, entities.player, entities.player.entityState, entities.echse1);
            onCollideWithEnemy(k, entities.player, entities.player.entityState, entities.echse2);
            onCollideWithEnemy(k, entities.player, entities.player.entityState, entities.echse3);
            onCollideWithEnemy(k, entities.echse1, entities.echse1.entityState, entities.player);
            onCollideWithEnemy(k, entities.echse2, entities.echse2.entityState, entities.player);
            onCollideWithEnemy(k, entities.echse3, entities.echse3.entityState, entities.player);
		  	break;
		case 1:
			break;
		case 2:
		  break;
		default:
		  console.log(`Sorry, we are out of ${expr}.`);
	}
}