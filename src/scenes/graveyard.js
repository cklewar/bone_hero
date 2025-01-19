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
    enemy: null,
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
	healthBar(k);
	setPlayerControls(k, entities.player);
	watchPlayerOffScreen(k, entities.player, levelIdx, levels.length, "graveyard", "cave", get_scenes());
	watchEntityHealth(k, entities.player);

	//Enemy
	entities.enemy = generateEnemyComponents(k, k.vec2(width() / 2, height() - consts.PLAYER_START_POS_Y_OFFSET), level, entities.player);
    watchEntityHealth(k, entities.enemy, entities);

    //Collide
    onCollideWith(k, entities.player, entities.player.entityState, entities.enemy);
    onCollideWith(k, entities.enemy, entities.enemy.entityState, entities.player);
}