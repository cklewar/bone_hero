import { bossState } from "../state/bossState.js";
import * as consts from "../const.js";

const boss_attrs = new Map([
  ["boss_1", { vec_x: 15, vec_y: 55, rect_x: 220, rect_y: 120, png: "daemon_6", body: false}],
  ["boss_2", { vec_x: 0, vec_y: -5, rect_x: 128, rect_y: 130, png: "daemon_4", body: true}],
]);

export function generateBossComponents(k, boss_type, pos, level, player) {
    var attr = boss_attrs.get(boss_type);
    var items = [
			k.sprite(attr.png, { anim: "idle" }),
			k.area({ shape: new Rect(vec2(attr.vec_x, attr.vec_y), attr.rect_x, attr.rect_y) }),
			k.scale(2),
			k.pos(pos),
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
		];

    if (attr.body) items.push(k.body())
    const boss = level.spawn(items, 2, 2);

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