import {
  generatePlayerComponents,
  setPlayerControls,
} from "../entities/player.js";
import { generateEnemyComponents } from "../entities/enemy.js";
import { watchPlayerOffScreen, watchEntityHealth, onCollideWith } from "../utils.js";
import { healthBar } from "../components/healthbar.js";
import * as consts from "../const.js";
import {get_scenes} from "./scenes.js";

export default async function graveyard(k, levelIdx) {
  const entities = {
    player: null,
    ghost1: null,
    ghost2: null,
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
			"                         :     ",
			"                               ",
			"              :  :             ",
			"    :::  :::             :::   ",
			"                               ",
			"                       ::::    ",
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

    //Enemy
    entities.ghost1 = generateEnemyComponents(k, "ghost", k.vec2(width() / 2, height() - 260), level, entities.player);
    entities.ghost2 = generateEnemyComponents(k, "ghost", k.vec2(width() / 5, height() - 700), level, entities.player);
    entities.ghost3 = generateEnemyComponents(k, "ghost", k.vec2(width() - 750 , height() - 900), level, entities.player);
    watchEntityHealth(k, entities.ghost1);
    watchEntityHealth(k, entities.ghost2);
    watchEntityHealth(k, entities.ghost3);

    //Collide
    onCollideWith(k, entities.ghost1, entities.ghost1.entityState, entities.player);
    onCollideWith(k, entities.ghost2, entities.ghost2.entityState, entities.player);
    onCollideWith(k, entities.ghost3, entities.ghost2.entityState, entities.player);
}