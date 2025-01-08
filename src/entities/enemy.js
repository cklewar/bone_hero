import { enemyState } from "../state/enemyState.js";
import * as consts from "../const.js";

export function generateEnemyComponents(k, pos, level, player) {
    const enemy = level.spawn(
        [
            k.sprite("enemy_1", { anim: "idle" }),
            k.area({ shape: new k.Rect(vec2(10, -5), 35, 50)}),
            k.body(),
            k.pos(pos),
            k.opacity(),
            k.scale(3),
            k.anchor("center"),
            k.state("move", ["idle", "attack", "move"]),
            k.tile(),
            {
              speed: 340,
              attackPower: 0.5,
              direction: "left",
              isAttacking: false,
              weapon: "axe",
              entityState: enemyState,
            },
            "enemy",
        ], 2, 2);

    enemy.onStateEnter("idle", async () => {
        await wait(0.5);
        enemy.enterState("attack");
    });

    enemy.onStateEnter("attack", async () => {
        if (!enemy.exists()) {
            return;
        }

		if (player.exists()) {
			const dir = player.pos.sub(enemy.pos).unit();

			k.add([
				k.sprite("axe_1", { anim: "throw" }),
				k.pos(enemy.pos),
				k.area({ shape: new Rect(vec2(0, 16), 24, 24) }),
				k.move(dir, 300),
				k.scale(3),
				k.area(),
				k.offscreen({ destroy: true }),
				k.anchor("center"),
				enemy.weapon,
				"enemy",
			]);
		}

		// Waits 1 second to make the boss enter in "move" state
		await wait(1);
		enemy.enterState("move");
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
	});

  return enemy;
}

