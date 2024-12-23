import { playAnimIfNotPlaying} from "../utils.js";
import * as consts from "../const.js"

function spin() {
    let spinning = false;
    return {
        id: "spin",
        update() {
            if (spinning) {
                this.angle += 1200 * dt();
                if (this.angle >= 360) {
                    this.angle = 60;
                    spinning = false;
                }
            }
        },
        spin() {
            spinning = true;
        },
    };
}

function jump(p) {
	if (p.isGrounded()) {
		p.jump(consts.JUMP_FORCE);
	}
}

export function generatePlayerComponents(k, pos, level) {
    const player = level.spawn(
        [
            k.sprite("hero_2", { anim: "idle" }),
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
            "player",
        ], 2, 2);

    const weapon = player.add([
        k.pos(-20, 10),
        k.sprite("sword"),
        k.anchor("bot"),
        k.rotate(60),
        k.scale(0.7),
        spin(),
        "weapon",
    ]);

    playAnimIfNotPlaying(player, "idle");

  return player;
}

export function setPlayerControls(k, player) {
    k.onKeyRelease((key) => {
			if (!isKeyDown("left") && !isKeyDown("right")) {
				playAnimIfNotPlaying(player, "idle");
			}
    });

	k.onKeyDown((key) => {
	     if (["left"].includes(key)) {
	      playAnimIfNotPlaying(player, "run");
          player.move(-player.speed, 0);
          player.direction = "left";
          return;
        }

        if (["right"].includes(key)) {
          playAnimIfNotPlaying(player, "run");
          player.move(player.speed, 0);
          player.direction = "right";
          return;
        }
	});

    k.onKeyPress((key) => {
        if (["space"].includes(key)) {
            if (player.isGrounded()) {
		        player.jump(consts.JUMP_FORCE);
	        }
            return;
        }

        if (["f"].includes(key)) {
            const weapon = player.get("weapon");
            weapon[0].spin();
            return;
        }
    });
}