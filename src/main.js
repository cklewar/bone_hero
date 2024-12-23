import kaplay from "kaplay";
import "kaplay/global";
import { healthBar } from "./healthbar.js";
import { playerState } from "./playerGlobalState.js";
/*import sky from "./scenes/sky.js";
import forest_and_castle from "./scenes/forest_and_castle.js";
import village from "./scenes/village.js";
import graveyard from "./scenes/graveyard.js";
import sunset from "./scenes/sunset.js";
import castle from "./scenes/castle.js";
import cave from "./scenes/cave.js";
import intro from "./scenes/intro.js";*/
import * as consts from "./const.js"

const k = kaplay({
	width: 1920,
	height: 1080,
	letterbox: true,
	background: [255, 255, 255],
});

k.loadRoot("./"); // A good idea for Itch.io publishing later
k.loadSprite("sky", "sprites/sky_1.png");
k.loadSprite("grass", "sprites/grass_4.png");
k.loadSprite("hero", "sprites/hero.png");
k.loadSprite("hero_green", "sprites/hero_green.png");
k.loadSprite("hero_pink", "sprites/hero_female_pink.png");
k.loadSprite("hero_lucw", "sprites/lucw.png");
k.loadSprite("skelett_1", "sprites/skelett_1.png");
k.loadSprite("headline", "sprites/bone_hero_headline.png");
k.loadSprite("forest_and_castle", "sprites/background_forest_and_castle.png");
k.loadSprite("knight_1", "sprites/skelett_knight.png");
k.loadSprite("graveyard", "sprites/graveyard.png");
k.loadSprite("cave_1", "sprites/cave_1.png");
k.loadSprite("sword", "sprites/sword.png");
k.loadSprite("key", "sprites/key.png");
k.loadSprite("spike_1", "sprites/spike_1.png");
k.loadSprite("village", "sprites/village.png");
k.loadSprite("block_1", "sprites/block_1.png");
k.loadSprite("castle_1", "sprites/castle.png");
k.loadSprite("sunset_1", "sprites/sunset.png");
k.loadSprite("stone_1", "sprites/stone.png");
k.loadSprite("bone_1", "sprites/bone_1.png");
k.loadSprite("grave_1", "sprites/grave_1.png");
k.loadSprite("flag_1", "sprites/flag_1.png");
k.loadSprite("stalacknieten_1", "sprites/stalacknieten_1.png");

k.loadSpriteAtlas("sprites/daemon_3.png", "sprites/daemon_3.json");
k.loadSpriteAtlas("sprites/dungeon_1.png", "sprites/dungeon_1.json");

k.setGravity(consts.GRAVITY);

for (const sceneName in consts.scenes) {
  k.scene(sceneName, ({levelIdx}) => consts.scenes[sceneName](k, 0));
}

const delay = ms => new Promise(res => setTimeout(res, ms));
/*
await delay(5000);
k.scene("sky", ({levelIdx}) => sky(k, 1));
k.go("sky", {levelIdx: 1});
*/

k.go("forest_and_castle", {levelIdx: 0});

