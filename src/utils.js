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
                k.scene(curr_scene, () => consts.scenes[curr_scene](k, levelIdx + 1));
                k.go(curr_scene);
            }
            else {
                k.go(next_scene, 0);
            }
        }
        else if (spos.y < 0 || spos.y > k.height()) {
            if (levelIdx > 0) {
                k.scene(curr_scene, () => consts.scenes[curr_scene](k, levelIdx - 1));
                k.go(curr_scene, levelIdx - 1);
            }
        }
	});
}