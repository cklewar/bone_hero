import * as consts from "../const.js"

const intro_txt = `This story comes from a world far away.
	\nBut that doesn't matter now because it's
	\nabout a powerful stone called the Blue Life Stone
	\nthat gives the land grain and life but the angels
	\nwere the protectors of the stone but a young angel
	\nnamed Iranius stole it out of greed, he wanted so much
	\npower and rammed the stone into his heart but he became
	\na monster and slaughtered normal angels.
	\n
	\nBut the stone used its last power to summon a dead knight who is now known as the Bone Hero.`;

export default async function intro(k) {
    add([
		k.rect(width(), height()),
		k.color(0, 0, 0),
	]);

	var picture = add([
		k.sprite("headline", {
			width: 512,
			height: 512,
		}),
		k.pos(width() - 600, 200),
		k.opacity(0.5),
	]);

	var headline = add([
	    k.text("Bone Hero", {
            width: width() - consts.PAD * 2,
            size: 96,
            align: "center",
            lineSpacing: 8,
            letterSpacing: 4,
            transform: (idx, ch) => ({
                color: hsl2rgb((time() * 0.2 + idx * 0.1) % 0.1, 0.2, 0.8),
                pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
                scale: wave(1, 1.2, time() * 3 + idx),
                angle: wave(-9, 9, time() * 3 + idx),
            }),
        }),
	]);

    var description = add([
        k.text(intro_txt, {
		    width: width() - consts.PAD * 2,
		    align: "left"
		}),

		k.pos(center()),
		k.anchor("center"),
		k.opacity(0.5),
    ]);

	description.fadeIn(100);
	picture.fadeIn(100);

	var start = add([
	    k.text("Press Enter to start!", {
            width: width() - consts.PAD * 2,
            size: 32,
            align: "left",
            lineSpacing: 8,
            letterSpacing: 4,
        }),

        k.pos(width() - 350 , height() - 100),
		k.anchor("center"),

	]);

	k.onKeyDown("enter", () => {
	    k.go("sunset", 0);
	})
}