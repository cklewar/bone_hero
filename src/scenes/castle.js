import {
  generatePlayerComponents,
  setPlayerControls,
} from "../entities/player.js";
import { generateEnemyComponents } from "../entities/enemy.js";
import { generateBossComponents } from "../entities/boss.js";
import { watchPlayerOffScreen, watchEntityHealth, onCollideWithEnemy, onCollideWithObj, addFlamebar} from "../utils.js";
import { healthBar } from "../components/healthbar.js";
import { playerState } from "../state/playerGlobalState.js";
import { musicState } from "../state/musicGlobalState.js";
import * as consts from "../const.js";
import {get_scenes} from "./scenes.js";

export default async function castle(k, levelIdx) {
    const entities = {
        boss1: null,
        boss2: null,
        player: null,
        enemy: null,
    };

    //Background music
    if (!musicState.getObj()) {
        musicState.setTitle("scene_background_castle");
        musicState.play();
        musicState.setPaused(false);
    } else {
        musicState.stop();
        musicState.setTitle("scene_background_castle");
        musicState.play();
        musicState.setPaused(false);
    }

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
			"     :::::           :::::     ",
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
                sprite("teppich_1", {}),
                pos(0, height() - consts.LEVEL_HEIGHT_OFFSET),
                area(),
                body({ isStatic: true }),
            ],
            ":": () => [
                sprite("wappen_1", {}),
                pos(0, height() - consts.LEVEL_HEIGHT_OFFSET),
                area(),
                body({ isStatic: true }),
            ],
        },
    })

    k.add([

    ])

    //Objects
    const fbar1 = addFlamebar(k, "flame_bar1", vec2(600, 760), -60, 8);
    const fbar2 = addFlamebar(k, "flame_bar2", vec2(1380, 760), -60, 8);

    //Player
    entities.player = generatePlayerComponents(k, k.vec2(0, height() - consts.PLAYER_START_POS_Y_OFFSET), level);
	healthBar(k);
	setPlayerControls(k, entities.player);
	watchEntityHealth(k, entities.player);

	//Boss
    entities.boss1 = generateBossComponents(k, "boss_1", k.vec2(width() / 2, height() - 420), level, entities.player);
    await wait(2);

	for (let i = 0; i < 45; i++) {
	    var cur_pos = entities.boss1.pos;
        entities.boss1.move(0, -cur_pos.y + i);
        await wait(0.01);
    }

    entities.boss1.destroy();
    entities.boss2 = generateBossComponents(k, "boss_2", k.vec2(width() / 2, height() / 100), level, entities.player);
    watchEntityHealth(k, entities.boss2, entities);

    //Collides
    onCollideWithEnemy(k, entities.player, entities.player.entityState, entities.boss2);
    onCollideWithEnemy(k, entities.boss2, entities.boss2.entityState, entities.player);
    onCollideWithEnemy(k, entities.player, entities.player.entityState, fbar1);
    onCollideWithEnemy(k, entities.player, entities.player.entityState, fbar2);
    onCollideWithObj(k, entities.player, entities.player.entityState, "diamond_obj");
}
