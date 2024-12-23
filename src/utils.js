import * as consts from "./const.js"

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

export function watchEntityHealth(k, entity) {
    k.onUpdate(() => {
        if (entity.getHealth() <= 0) {
            //playerState.setHealth(playerState.getMaxHealth());
            k.go("game_over");
        }
    });
}

export function onCollideWithPlayer(k, entity) {
    player.onCollide(entity, async (player) => {
        if (player.isAttacking) return;
        playerState.setHealth(playerState.getHealth() - 0.5); //enemy.attackPower
        k.destroyAll("healthContainer");
        healthBar(k, player);
        shake(1);
    });
}