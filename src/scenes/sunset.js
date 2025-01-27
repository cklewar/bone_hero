import {
  generatePlayerComponents,
  setPlayerControls,
} from "../entities/player.js";
import { generateEnemyComponents } from "../entities/enemy.js";
import { watchPlayerOffScreen, watchEntityHealth, onCollideWithEnemy } from "../utils.js";
import { healthBar } from "../components/healthbar.js";
import { playerState } from "../state/playerGlobalState.js";
import { musicState } from "../state/musicGlobalState.js";
import * as consts from "../const.js";
import {get_scenes} from "./scenes.js";

export default async function sunset(k, levelIdx) {
    const entities = {
        player: null,
        enemy: null,
    };

    //Background music
    if (!musicState.getObj()) {
        musicState.setTitle("scene_background_sunset");
        musicState.play();
    } else {
        musicState.stop();
        musicState.setTitle("scene_background_sunset");
        musicState.play();
        musicState.setPaused(false);
    }

    add([
        sprite("sunset_1", {
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

    //Objects
    let king = k.add([
        k.sprite("king_1",{}),
        k.area({ shape: new Rect(vec2(0, 60), 250, 70) }),
        k.pos(k.vec2(width() / 2, 940)),
        k.opacity(),
        k.anchor("center"),
        "king_obj",
    ]);

    king.fadeIn(3);

	//Player
    entities.player = generatePlayerComponents(k, k.vec2(0, height() - consts.PLAYER_START_POS_Y_OFFSET), level);
    watchPlayerOffScreen(k, entities.player, levelIdx, levels.length, "sunset", "castle", get_scenes());
	healthBar(k);
	setPlayerControls(k, entities.player);
	watchEntityHealth(k, entities.player);



    //Enemy
	/*entities.enemy = generateEnemyComponents(k, "warrior", k.vec2(width() / 2, height() - consts.PLAYER_START_POS_Y_OFFSET), level, entities.player, "warrior1");
    watchEntityHealth(k, entities.enemy, entities);

    //Collide
    onCollideWithEnemy(k, entities.player, entities.player.entityState, entities.enemy);
    onCollideWithEnemy(k, entities.enemy, entities.enemy.entityState, entities.player);*/
}