import { enemyState } from "../state/enemyState.js";
import * as consts from "../const.js";

const enemy_attrs = new Map([
    ["bat", { vec_x: 10, vec_y: 40, rect_x: 35, rect_y: 50, png: "bat_1", body: false, scale: 1, move: false, weapon: null}],
    ["warrior", { vec_x: 10, vec_y: -5, rect_x: 35, rect_y: 50, png: "enemy_1", body: true, scale: 3, move: true, weapon: "axe"}],
  ]);


export function generateEnemyComponents(k, type, pos, level, player) {
    var attr = enemy_attrs.get(type);
    var items = [
        k.sprite(attr.png, { anim: "idle" }),
        k.area({ shape: new Rect(vec2(attr.vec_x, attr.vec_y), attr.rect_x, attr.rect_y) }),
        k.pos(pos),
        k.opacity(),
        k.scale(attr.scale),
        k.anchor("center"),
        k.state("move", ["idle", "attack", "move"]),
        k.tile(),
        {
          speed: 340,
          attackPower: 0.5,
          direction: "left",
          isAttacking: false,
          weapon: attr.weapon,
          entityState: enemyState,
        },
        "enemy",
    ];

    if (attr.body) items.push(k.body());
    const enemy = level.spawn(items, 2, 2);

    if (attr.move) {
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
    }

  return enemy;
}