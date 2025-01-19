import kaplay from "kaplay";
import "kaplay/global";
import * as consts from "./const.js";
import {init_scenes, get_scenes } from "./scenes/scenes.js";

const k = kaplay({
	width: 1920,
	height: 1080,
	letterbox: true,
	background: [255, 255, 255],
	debugKey: "r",
	debug: true,
});

debug.inspect = false;

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
k.loadSprite("flag_1", "sprites/flag_1.png");
k.loadSprite("stamm_1", "sprites/stamm_1.png");
k.loadSprite("stalacknieten_1", "sprites/stalacknieten_1.png");
k.loadSprite("korb_1", "sprites/korb_1.png");
k.loadSprite("wappen_1", "sprites/wappen.png");
k.loadSprite("fireball_1", "sprites/fireball.png");
k.loadSprite("deadgrass_1", "sprites/deadgrass.png");
k.loadSprite("boden_1", "sprites/boden.png");
k.loadSprite("teppich_1", "sprites/teppich.png");
k.loadSprite("king_1", "sprites/king.png");

k.loadSpriteAtlas("sprites/daemon_4.png", "sprites/daemon_4.json");
k.loadSpriteAtlas("sprites/dungeon_1.png", "sprites/dungeon_1.json");
k.loadSpriteAtlas("sprites/grave_3.png", "sprites/grave_3.json");
k.loadSpriteAtlas("sprites/bone_2.png", "sprites/bone_2.json");
k.loadSpriteAtlas("sprites/magicer.png", "sprites/magicer.json");
k.loadSpriteAtlas("sprites/daemon_6.png", "sprites/daemon_6.json");
k.loadSpriteAtlas("sprites/ghost_1.png", "sprites/ghost_1.json");
k.loadSpriteAtlas("sprites/bat_1.png", "sprites/bat_1.json");

k.setGravity(consts.GRAVITY);

init_scenes(k);
k.go("graveyard",{levelIdx: 0});