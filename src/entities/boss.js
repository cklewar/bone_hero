import { bossState } from "../state/bossState.js";
import * as consts from "../const.js";

const collision_map = new Map([
  ["boss_1", { vec_x: 0, vec_y: 55, rect_x: 128, rect_y: 125 }],
  ["boss_2", { vec_x: 0, vec_y: 55, rect_x: 128, rect_y: 125 }],
]);

export function generateBossComponents(k, boss_type, pos, level, player) {
    var c_map = collision_map.get("boss_1")

    const boss = level.spawn(
		[
			k.sprite("daemon_6", { anim: "idle" }),
			k.area({ shape: new Rect(vec2(c_map.vec_x, c_map.vec_y), c_map.rect_x, c_map.rect_y) }),
			k.scale(2),
			k.pos(pos),
			//k.body(),
			k.anchor("center"),
			k.state("move", ["idle", "attack", "move"]),
			k.tile(),
			{
              speed: 340,
              attackPower: 1.0,
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