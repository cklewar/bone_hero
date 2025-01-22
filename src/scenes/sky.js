import {
  generatePlayerComponents,
  setPlayerControls,
} from "../entities/player.js";
import { generateEnemyComponents } from "../entities/enemy.js";
import { watchPlayerOffScreen, watchEntityHealth, onCollideWith } from "../utils.js";
import { healthBar } from "../components/healthbar.js";
import { playerState } from "../state/playerGlobalState.js";
import { enemyState } from "../state/enemyState.js";
import * as consts from "../const.js";
import {get_scenes} from "./scenes.js";

export default async function sky(k, levelIdx) {

  const entities = {
    player: null,
    enemy: null,
  };

  /*const music = play("OverworldlyFoe", {
    volume: 0.8,
    loop: true
  });*/

  add([
		sprite("sky",
			{
				width: width(),
				height: height(),
			})
	]);

	// level layouts
	const levels = [
		[
		    "                   :::::       ",
			"                               ",
			"          ::::::               ",
			"                               ",
			"                               ",
			"                               ",
			"                               ",
			"       :::::             ::::  ",
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
			"                          :    ",
			"                          :    ",
			"           :    :::::::   :    ",
			"                          :    ",
			"     :::::                :    ",
			"                          :    ",
			"                          :    ",
			"                          :    ",
			"                          :    ",
			"                          :    ",
			"===============================",
		],
		[
		    "                    t           ",
			"                               ",
			"                               ",
		    "                               ",
			"                               ",
			"           :   ::::   :::::    ",
			"         :                     ",
			"        :                      ",
			"       :                       ",
			"        :                      ",
			"         :                     ",
			"                               ",
			"                               ",
			"                               ",
			"                               ",
			"===============================",
		]
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

    //Bone Animation
    if (levelIdx === 0) {
        const bone = add([
            sprite("bone_2", { anim: "idle" }),
            pos(10, height() - 190),
            scale(3),
	    ])
	    await consts.delay(2400);
        k.destroy(bone);
    }

     //Player
    /*entities.player = generatePlayerComponents(k, k.vec2(0, height() - consts.PLAYER_START_POS_Y_OFFSET), level);
    watchPlayerOffScreen(k, entities.player, levelIdx, levels.length, "sky", "forest_and_castle", get_scenes());
	healthBar(k);
	setPlayerControls(k, entities.player);
	watchEntityHealth(k, entities.player);

	switch (levelIdx) {
		case 0:
			//Enemy
			entities.enemy = generateEnemyComponents(k, "warrior", k.vec2(width() - 600, height() - 900), level, entities.player);
			watchEntityHealth(k, entities.enemy, entities);

			//Collide
			onCollideWith(k, entities.player, entities.player.entityState, entities.enemy);
			onCollideWith(k, entities.enemy, entities.enemy.entityState, entities.player);
		  	break;
		case 1:
			break;
		case 2:
		  	//Enemy
			entities.enemy = generateEnemyComponents(k, "warrior", k.vec2(width() / 2, height() - consts.PLAYER_START_POS_Y_OFFSET), level, entities.player);
			watchEntityHealth(k, entities.enemy, entities);

			//Collide
			onCollideWith(k, entities.player, entities.player.entityState, entities.enemy);
			onCollideWith(k, entities.enemy, entities.enemy.entityState, entities.player);
		  break;
		default:
		  console.log(`Sorry, we are out of ${expr}.`);
	}*/
}