import sky from "./scenes/sky.js";
import forest_and_castle from "./scenes/forest_and_castle.js";
import village from "./scenes/village.js";
import graveyard from "./scenes/graveyard.js";
import sunset from "./scenes/sunset.js";
import castle from "./scenes/castle.js";
import cave from "./scenes/cave.js";
import intro from "./scenes/intro.js";

export const GRAVITY = 1400;
export const SPEED = 320;
export const BULLET_SPEED = 800;
export const JUMP_FORCE = 1000;
export const ENEMY_SPEED = 160;
export const PLAYER_HEALTH = 4;
export const PLAYER_NAME = "Lucifer"
export const PAD = 24;
export const PLAYER_START_POS_Y_OFFSET = 200;

export const scenes = {
  intro,
  sky,
  forest_and_castle,
  village,
  cave,
  graveyard,
  sunset,
  castle,
};