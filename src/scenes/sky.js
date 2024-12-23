import {
  generatePlayerComponents,
  setPlayerControls,
} from "../entities/player.js";
import { generateEnemyComponents } from "../entities/enemy.js";
import { watchPlayerOffScreen, watchEntityHealth, onCollideWithPlayer } from "../utils.js";
import { healthBar } from "../components/healthbar.js";
import { playerState } from "../state/playerGlobalState.js";
import * as consts from "../const.js";
import {get_scenes} from "./scenes.js";

export default async function sky(k, levelIdx) {

  const entities = {
    player: null,
    enemy: null,
  };

  add([
		sprite("sky",
			{
				width: width(),
				height: height(),
			})
	])

   /*

	// character dialog data
	const characters = {
		"a": {
			sprite: "bag",
			msg: "Hi Warrior! You should get that key!",
		},
		"b": {
			sprite: "ghosty",
			msg: "Who are you? You can see me??",
		},
	}
    */
	// level layouts
	const levels = [
		[
			"                               ",
			"                               ",
			"                               ",
			"                               ",
			"            ::::::             ",
			"                               ",
			"     :::::                     ",
			"                      ::::     ",
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
			"                          :    ",
			"               :::::::    :    ",
			"                          :    ",
			"     :::::                :    ",
			"                          :    ",
			"            :::::         :    ",
			"                          :    ",
			"                          :    ",
			"                          :    ",
			"===============================",
		],
		[
		    "                               ",
			"                               ",
			"                               ",
			"                               ",
			"                  ::      :    ",
			"                               ",
			"            :::::::            ",
			"                               ",
			"    ::::                       ",
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
				pos(0, height() - 800),
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
	healthBar(k);
	setPlayerControls(k, entities.player);
	watchPlayerOffScreen(k, entities.player, levelIdx, levels.length, "sky", "forest_and_castle", get_scenes());
	watchEntityHealth(k, playerState);

    //Enemy
	entities.enemy = generateEnemyComponents(k, k.vec2(width() / 2, height() - consts.PLAYER_START_POS_Y_OFFSET), level, entities.player);
    onCollideWithPlayer(k, entities.player, "axe");
}