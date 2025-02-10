function fadeIn(speed = 1) {
    let opacity = 0;

    return {
        // runs when object is added to the scene
        add() {
            this.color.a = opacity; // make sure the game object using this component has `color()` component
        },
        // runs every frame when object is still in the scene
        update() {
            if (opacity < 1) {
                console.log(opacity);
                opacity += dt() * speed;
                this.color.a = opacity;
            }
        },
    };
}

export default async function game_over(k) {
    k.add([
		k.rect(width(), height()),
		k.color(0, 0, 0),
	])

    k.add ([
        k.sprite("game_over", { anim: "idle" }),
        k.pos(width() - 1100 , height() - 700),
    ]);

	let txt = k.add([
		k.text("Press enter to start"),
		k.pos(width() - 970 , height() - 300),
		k.anchor("center"),
	]);

	k.onKeyDown("enter", () => {
		k.go("sky", 0);
	})
}