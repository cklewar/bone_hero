export function generateEnemyComponents(k, pos, level) {
    const enemy = level.spawn(
        [
            k.sprite("enemy_1", { anim: "idle" }),
            k.area({ shape: new k.Rect(vec2(0, 0), 12, 35)}),
            k.body(),
            k.pos(pos),
            k.opacity(),
            k.scale(3),
            k.anchor("center"),
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

  return enemy;
}