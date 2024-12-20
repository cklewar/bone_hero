export default async function game_over(k) {
    add([
		rect(width(), height()),
		color(0, 0, 0),
	])

	var txt = add([
		text("Game Over"),
		pos(center()),
		anchor("center"),
		opacity(0.5),
	]);

	txt.fadeIn(10);

	onKeyDown("enter", () => {
		go("intro");
	})
}