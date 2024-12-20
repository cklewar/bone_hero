export default async function end(k) {
   add([
		rect(width(), height()),
		color(0, 0, 0),
	])

	var txt = add([
		text("END"),
		pos(center()),
		anchor("center"),
		opacity(0.5),
	]);

	txt.fadeIn(10);

	onKeyDown("enter", () => {
		go("intro");
	})
}