import sky from "./sky.js";
import forest_and_castle from "./forest_and_castle.js";
import village from "./village.js";
import graveyard from "./graveyard.js";
import sunset from "./sunset.js";
import castle from "./castle.js";
import cave from "./cave.js";
import intro from "./intro.js";

const _scenes = {
  intro,
  sky,
  forest_and_castle,
  village,
  graveyard,
  cave,
  sunset,
  castle,
};

export default function sceneManager() {
    let instance = null;

    function createInstance() {
      return {};
    }

    return {
      getInstance() {
        if (!instance) {
          instance = createInstance();
        }

        return instance;
      },
    };
  }

export function init_scenes(k) {
    for (const sceneName in _scenes) {
      k.scene(sceneName, ({levelIdx}) => _scenes[sceneName](k, 0, _scenes));
    }
}

export function get_scenes() {
    return _scenes;
}

export function get_scene(name) {
    return _scenes[name];
}

export const scenes = sceneManager().getInstance();