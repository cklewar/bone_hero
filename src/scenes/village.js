import {
  generatePlayerComponents,
  setPlayerControls,
} from "../entities/player.js";
import { generateNpcComponents } from "../entities/npc.js";
import { watchPlayerOffScreen, watchEntityHealth, onCollideWith } from "../utils.js";
import { healthBar } from "../components/healthbar.js";
import { playerState } from "../state/playerGlobalState.js";
import * as consts from "../const.js";
import {get_scenes} from "./scenes.js";

export default async function village(k, levelIdx) {
  const entities = {
    player: null,
    enemy: null,
  };

  add([
		sprite("village",
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

    //Player
    entities.player = generatePlayerComponents(k, k.vec2(0, height() - consts.PLAYER_START_POS_Y_OFFSET), level);
    watchPlayerOffScreen(k, entities.player, levelIdx, levels.length, "village", "graveyard", get_scenes());
	healthBar(k);
	setPlayerControls(k, entities.player);
	watchEntityHealth(k, entities.player);

	//Magician
	//height() - consts.PLAYER_START_POS_Y_OFFSET)
	entities.magician = generateNpcComponents(k, k.vec2(width() / 2, 100), level, entities.player);

    //Collide
    onCollideWith(k, entities.player, entities.player.entityState, entities.magician);
    
}