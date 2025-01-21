import { npcState } from "../state/npcState.js";
import * as consts from "../const.js";

const enemy_attrs = new Map([
    ["magicer", { vec_x: 0, vec_y: 30, rect_x: 140, rect_y: 180, png: "magicer", body: true, scale: 1, move: false, weapon: null}],
]);

export function generateNpcComponents(k, type, pos, level, player) {
    var attr = enemy_attrs.get(type);
    const npc = level.spawn(
        [
            k.sprite("magicer", { anim: "idle" }),
            k.area({ shape: new Rect(vec2(attr.vec_x, attr.vec_y), attr.rect_x, attr.rect_y) }),
            k.body(),
            k.pos(pos),
            k.opacity(),
            k.scale(1),
            k.anchor("center"),
            k.state("move", ["idle", "disappear"]),
            k.tile(),
            {
              speed: 340,
              attackPower: 0.5,
              weapon: "ward",
              entityState: npcState,
            },
            "npc",
        ], 2, 2);

    /*enemy.onStateEnter("idle", async () => {
        await wait(0.5);
        //enemy.enterState("move");
    });

	enemy.onStateEnter("move", async () => {
		await wait(2);
		enemy.enterState("idle");
	});

	enemy.onStateUpdate("move", () => {
		// We move the boss in the direction of the player
		if (!player.exists()) return;
		const dir = player.pos.sub(enemy.pos).unit();
		enemy.move(dir.scale(consts.ENEMY_SPEED));
	});*/

  return npc;
}

