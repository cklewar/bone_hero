import * as consts from "../const.js";

export function generateEnemyComponents(k, pos, level, player) {
    const enemy = level.spawn(
        [
            k.sprite("enemy_1", { anim: "idle" }),
            k.area({ shape: new k.Rect(vec2(0, 0), 12, 35)}),
            k.body(),
            k.pos(pos),
            k.opacity(),
            k.scale(3),
            k.anchor("center"),
            k.state("move", ["idle", "attack", "move"]),
            k.tile(),
            {
              speed: 340,
              attackPower: 1,
              direction: "left",
              isAttacking: false,
              isFrozen: false,
              weapon: null,
            },
            "enemy",
        ], 2, 2);

    enemy.onStateEnter("idle", async () => {
        await wait(0.5);
        enemy.enterState("attack");
    });

    enemy.onStateEnter("attack", async () => {
		if (player.exists()) {
			const dir = player.pos.sub(enemy.pos).unit();

			add([
				k.sprite("axe_1", { anim: "throw" }),
				k.pos(enemy.pos),
				k.area({ shape: new Rect(vec2(0, 16), 24, 24) }),
				k.move(dir, 300),
				k.scale(3),
				k.area(),
				k.offscreen({ destroy: true }),
				k.anchor("center"),
				"axe",
			]);
		}

		// Waits 1 second to make the enemy enter in "move" state
		await wait(1);
		enemy.enterState("move");
	});

	enemy.onStateEnter("move", async () => {
		await wait(2);
		enemy.enterState("idle");
	});

	enemy.onStateUpdate("move", () => {
		// We move the enemy in the direction of the player
		if (!player.exists()) return;
		const dir = player.pos.sub(enemy.pos).unit();
		enemy.move(dir.scale(consts.ENEMY_SPEED));
	});

  return enemy;
}

