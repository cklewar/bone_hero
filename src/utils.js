export function playAnimIfNotPlaying(gameObj, animName) {
  if (gameObj.curAnim() !== animName) {
    gameObj.play(animName);
  }
}

export function watchPlayerOffScreen(k, player, levelIdx, lvl_length, zcene) {
    k.onUpdate(() => {
	    const spos = player.screenPos();
        if (spos.x > width()) {
            if (levelIdx + 1 < lvl_length) {
                go(zcene, levelIdx + 1);
            }
            else {
                go(zcene, 0);
            }
        }
        else if (spos.y < 0 || spos.y > height()) {
            if (levelIdx > 0) {
                go(zcene, levelIdx - 1);
            }
        }
	});
}