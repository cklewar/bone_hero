export function generateBossComponents(k, pos, level) {
    const boss = level.spawn(
		[
			k.sprite("daemon_4", { anim: "idle" }),
			k.area({ shape: new Rect(vec2(0, 50), 12, 12) }),
			k.scale(3),
			k.pos(pos),
			k.body(),
			k.anchor("center"),
			k.state("idle", ["idle"]),
			k.tile(),
		], 2, 2,
	);

  return boss;
}