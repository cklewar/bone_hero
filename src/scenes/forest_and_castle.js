import {
  generatePlayerComponents,
  setPlayerControls,
} from "../entities/player.js";
import { watchPlayerOffScreen } from "../utils.js";
import * as consts from "../const.js"

export default async function forest_and_castle(k, levelIdx) {
    const entities = {
        player: null,
        enemy: null,
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
			"                               ",
			"                               ",
			"                               ",
			"     :::::                     ",
			"                 :::::::::     ",
			"                            :  ",
			"        :::::               :  ",
			"                            :  ",
			"                            :  ",
			"===============================",
		],
		[
			"                               ",
			"                               ",
			"                               ",
			"                               ",
			"           ::::::::::          ",
			"                               ",
			"    ::::                       ",
			"                               ",
			"            ::::               ",
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

	entities.player = generatePlayerComponents(k, k.vec2(0, height() - consts.PLAYER_START_POS_Y_OFFSET), level);
	setPlayerControls(k, entities.player);
	watchPlayerOffScreen(k, entities.player, levelIdx, levels.length, "forest_and_castle", "village", consts.scenes);
}