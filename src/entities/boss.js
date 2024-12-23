export function generateBossComponents(k, pos, level) {
    const boss = level.spawn(
		[
			k.sprite("daemon_3", { anim: "idle" }),
			k.area({ shape: new Rect(vec2(0, 18), 12, 12) }),
			k.scale(5),
			k.pos(pos),
			k.body(),
			k.anchor("center"),
			k.state("idle", ["idle"]),
			k.tile(),
		], 2, 2,
	);

  return boss;
}