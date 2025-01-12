import { npcState } from "../state/npcState.js";
import * as consts from "../const.js";

export function generateNpcComponents(k, pos, level, player) {
    const npc = level.spawn(
        [
            k.sprite("magicer", { anim: "idle" }),
            k.area({ shape: new k.Rect(vec2(0, 80), 35, 50)}),
            k.body(),
            k.pos(pos),
            k.opacity(),
            k.scale(1),
            k.anchor("center"),
            k.state("move", ["idle", "attack", "move"]),
            k.tile(),
            {
              speed: 340,
              attackPower: 0.5,
              direction: "left",
              isAttacking: false,
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

