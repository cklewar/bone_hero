import { bossState } from "../state/bossState.js";
import * as consts from "../const.js";

export function generateBossComponents(k, pos, level, player) {
    const boss = level.spawn(
		[
			k.sprite("daemon_6", { anim: "idle" }),
			k.area({ shape: new Rect(vec2(0, 55), 128, 125) }),
			k.scale(2),
			k.pos(pos),
			k.body(),
			k.anchor("center"),
			k.state("move", ["idle", "attack", "move"]),
			k.tile(),
			{
              speed: 340,
              attackPower: 0.5,
              direction: "left",
              isAttacking: false,
              weapon: "axe",
              entityState: bossState,
            },
            "boss"
		], 2, 2,
	);

    /*boss.onStateEnter("idle", async () => {
        await wait(0.5);
        boss.enterState("attack");
    });

    boss.onStateEnter("attack", async () => {
        if (!boss.exists()) {
            return;
        }

		if (player.exists()) {
			const dir = player.pos.sub(boss.pos).unit();

			k.add([
				k.sprite("axe_1", { anim: "throw" }),
				k.pos(boss.pos),
				k.area({ shape: new Rect(vec2(0, 16), 24, 24) }),
				k.move(dir, 300),
				k.scale(3),
				k.area(),
				k.offscreen({ destroy: true }),
				k.anchor("center"),
				boss.weapon,
				"boss",
			]);
		}

		// Waits 1 second to make the boss enter in "move" state
		await wait(1);
		boss.enterState("move");
	});

	boss.onStateEnter("move", async () => {
		await wait(2);
		boss.enterState("idle");
	});

	boss.onStateUpdate("move", () => {
		// We move the boss in the direction of the player
		if (!player.exists()) return;
		const dir = player.pos.sub(boss.pos).unit();
		boss.move(dir.scale(consts.ENEMY_SPEED));
	});*/

  return boss;
}