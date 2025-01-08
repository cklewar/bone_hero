import * as consts from "./const.js"
import { healthBar } from "./components/healthbar.js";

export function playAnimIfNotPlaying(gameObj, animName) {
  if (gameObj.curAnim() !== animName) {
    gameObj.play(animName);
  }
}

export function watchPlayerOffScreen(k, player, levelIdx, lvl_length, curr_scene, next_scene, scenes) {

    k.onUpdate(() => {
	    const spos = player.screenPos();
        if (spos.x > k.width()) {

            if (levelIdx < lvl_length - 1) {
                k.scene(curr_scene, () => scenes[curr_scene](k, levelIdx + 1));
                k.go(curr_scene);
            }
            else {
                k.go(next_scene, 0);
            }
        }
        else if (spos.y < 0 || spos.y > k.height()) {
            if (levelIdx > 0) {
                k.scene(curr_scene, () => scenes[curr_scene](k, levelIdx - 1));
                k.go(curr_scene, levelIdx - 1);
            }
        }
	});
}

export function watchEntityHealth(k, entity, entities) {
    k.onUpdate(() => {
        if (entity.entityState.getHealth() <= 0) {
            if (entity.type === "player") {
                //entity.setHealth(entity.getMaxHealth());
                k.go("game_over", 0);
            } else {
                k.destroyAll("enemy");
                entity.destroy();
            }
        }
    });
}

export function onCollideWith(k, entity_a, entity_a_state, entity_b) {
    entity_a.onCollide(entity_b.weapon, (entity_a) => {
        //console.log("A:", entity_a);
        //console.log("B:", entity_b);
        entity_a_state.setHealth(entity_a_state.getHealth() - entity_b.attackPower);
        healthBar(k, entity_a);
        shake( entity_a.shake);
    });
}