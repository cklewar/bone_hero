import * as consts from "../const.js"

const intro_txt = `Thank you for playing my game and saving the land.
\nThis will not be the last work adventure with the bone hero.
\n
\nProgramming:
\nLK
\nCK
\n
\nDesign:
\nLK
\n
\nStory:
\nLK

\nTo play again press Enter
`;


export default async function end(k) {
   add([
		rect(width(), height()),
		color(0, 0, 0),
	])

    var txt = add([
			k.text(intro_txt, {
				width: width() - consts.PAD * 2,
				align: "center"
			}),
	
			k.pos(center()),
			k.anchor("center"),
			k.opacity(0.5),
		]);

	txt.fadeIn(10);

	onKeyDown("enter", () => {
		go("sky", 0);
	})
}