import {
  generatePlayerComponents,
  setPlayerControls,
} from "../entities/player.js";
import { generateEnemyComponents } from "../entities/enemy.js";
import { watchPlayerOffScreen, watchEntityHealth, onCollideWithEnemy, onCollideWithObj } from "../utils.js";
import { healthBar } from "../components/healthbar.js";
import { musicState } from "../state/musicGlobalState.js";
import * as consts from "../const.js";
import {get_scenes} from "./scenes.js";

export default async function graveyard(k, levelIdx) {
    const entities = {
        player: null,
        ghost1: null,
        ghost2: null,
    };

    //Background music
    if (!musicState.getObj()) {
        musicState.setTitle("scene_background_graveyard");
        musicState.play();
    } else {
        musicState.stop();
        musicState.setTitle("scene_background_graveyard");
        musicState.play();
        musicState.setPaused(false);
    }

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
			"                   ::        : ",
			"                             : ",
			"                             : ",
			"       ::::::::::            : ",
			"      :                        ",
			"     :                         ",
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
			"                          : : :",
			"                        ::     ",
			"                               ",
			"              :  :             ",
			"    :::  :::             :::   ",
			"                               ",
			//                       ::::   ",
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
				sprite("deadgrass_1", {}),
				pos(0, height() - consts.LEVEL_HEIGHT_OFFSET),
				area(),
				body({ isStatic: true }),
			],
			":": () => [
				sprite("grave_3", { anim: "idle" }),
				pos(0, height() - consts.LEVEL_HEIGHT_OFFSET),
				area(),
				body({ isStatic: true }),
				"tile_grave",
		    ],
		},
	})

	//Player
    entities.player = generatePlayerComponents(k, k.vec2(0, height() - consts.PLAYER_START_POS_Y_OFFSET), level);
    watchPlayerOffScreen(k, entities.player, levelIdx, levels.length, "graveyard", "cave", get_scenes());
	healthBar(k);
	setPlayerControls(k, entities.player);
	watchEntityHealth(k, entities.player);

    switch (levelIdx) {
        case 0:
            //Enemy
            entities.ghost1 = generateEnemyComponents(k, "ghost", k.vec2(width() / 2, height() - 250), level, entities.player, "ghost1");
            entities.ghost2 = generateEnemyComponents(k, "ghost", k.vec2(width() / 5, height() - 700), level, entities.player, "ghost2");
            entities.ghost3 = generateEnemyComponents(k, "ghost", k.vec2(width() - 750 , height() - 890), level, entities.player, "ghost3");
            watchEntityHealth(k, entities.ghost1);
            watchEntityHealth(k, entities.ghost2);
            watchEntityHealth(k, entities.ghost3);

            //Collide
            onCollideWithEnemy(k, entities.ghost1, entities.ghost1.entityState, entities.player);
            onCollideWithEnemy(k, entities.ghost2, entities.ghost2.entityState, entities.player);
            onCollideWithEnemy(k, entities.ghost3, entities.ghost3.entityState, entities.player);
            onCollideWithEnemy(k, entities.player, entities.player.entityState, entities.ghost1);

            break;
        case 1:
            //Objects
            k.add([
                k.sprite("key",{}),
                k.area({ shape: new Rect(vec2(0, 0), 60, 180) }),
                k.pos(k.vec2(width() - 1600, 200)),
                k.opacity(),
                k.anchor("center"),
                "key_obj",
           
			])

			    //Enemy
			
				entities.ghost1 = generateEnemyComponents(k, "ghost", k.vec2(width() / 2, height() - 250), level, entities.player, "ghost1");
				entities.ghost2 = generateEnemyComponents(k, "ghost", k.vec2(width() / 5, height() - 700), level, entities.player, "ghost2");




            //Collide
            onCollideWithObj(k, entities.player, entities.player.entityState, "key_obj");

			onCollideWithEnemy(k, entities.ghost1, entities.ghost1.entityState, entities.player);
			onCollideWithEnemy(k, entities.ghost2, entities.ghost2.entityState, entities.player

   }
}