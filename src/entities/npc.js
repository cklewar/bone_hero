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
            k.state("idle", ["idle", "disappear"]),
            k.tile(),
            {
              type: type,
              speed: 340,
              attackPower: 0.5,
              weapon: "ward",
              entityState: npcState,
            },
            "npc",
        ], 2, 2);

    npc.onStateEnter("disappear", async () => {
        npc.play("disappear");
        await wait(1.5);
        npc.destroy();
    });

  return npc;
}

