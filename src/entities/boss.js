import { bossState } from "../state/bossGlobalState.js";
import * as consts from "../const.js";

const boss_attrs = new Map([
  ["boss_1", { vec_x: 15, vec_y: 55, rect_x: 220, rect_y: 120, png: "daemon_6", body: false, scale: 2, move: false}],
  ["boss_2", { vec_x: 0, vec_y: -5, rect_x: 128, rect_y: 130, png: "daemon_4", body: false, scale: 2, move: true}],
]);

function follow(player) {
    let follow = false;
    return {
        id: "follow",
        update() {
            if (!follow) {
                var deg = 0;

                if (player.pos.x > this.pos.x) {
                    deg = -Math.abs(Math.floor(Math.atan2(this.pos.y - player.pos.y, this.pos.x - player.pos.x) * (180 / Math.PI)));
                } else {
                    deg = Math.abs(Math.floor(Math.atan2(this.pos.y - player.pos.y, this.pos.x - player.pos.x) * (-180 / Math.PI)));
                }
                if (deg > 0) {
                    this.angle = 90 - deg;
                } else {
                    this.angle = 90 + deg;
                }

                follow = true;
            }
        },
    };
}

export function generateBossComponents(k, boss_type, pos, level, player) {
    var attr = boss_attrs.get(boss_type);
    var items = [
			k.sprite(attr.png, { anim: "idle" }),
			k.area({ shape: new Rect(vec2(attr.vec_x, attr.vec_y), attr.rect_x, attr.rect_y) }),
			k.scale(attr.scale),
			k.pos(pos),
			k.anchor("center"),
			k.state("move", ["idle", "attack", "move"]),
			k.tile(),
			{
			  type: "boss",
              speed: 340,
              attackPower: 1.0,
              direction: "left",
              isAttacking: false,
              weapon: "spike",
              entityState: bossState,
            },
            "boss"
		];

    if (attr.body) items.push(k.body());
    const boss = level.spawn(items, 2, 2);

    if (attr.move) {
        boss.onStateEnter("idle", async () => {
            await wait(0.5);
            boss.enterState("attack");
        });

        boss.onStateEnter("attack", async () => {
            if (!boss.exists()) {
                return;
            }

            var deg = 0;
            if (player.exists()) {
                const dir = player.pos.sub(boss.pos).unit();
                k.add([
                    k.sprite("spike_1", {}),
                    k.pos(boss.pos),
                    k.area({ shape: new Rect(vec2(0, 16), 24, 24) }),
                    k.move(dir, 900),
                    k.rotate(deg),
                    k.scale(3),
                    k.area(),
                    k.offscreen({ destroy: true }),
                    k.anchor("center"),
                    follow(player),
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
	    });
    }

  return boss;
}