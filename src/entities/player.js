import { playerState } from "../state/playerGlobalState.js";
import { playAnimIfNotPlaying} from "../utils.js";
import * as consts from "../const.js"

function spin() {
    let spinning = false;

    return {
        id: "spin",
        update() {
            if (spinning) {
                if (this.parent.direction == "right") {
                    this.angle += 1200 * dt();

                    if (this.angle >= 360) {
                        this.angle = 60;
                        spinning = false;
                    }
                } else if (this.parent.direction == "left") {
                    this.angle += 1200 * dt();

                    if (this.angle >= 600) {
                        spinning = false;
                        this.angle = 300;
                    }
                }
            }
        },
        spin() {
            spinning = true;
        },
        isSpinning: () => spinning,
    };
}

function jump(p) {
	if (p.isGrounded()) {
		p.jump(consts.JUMP_FORCE);
	}
}

export function generatePlayerComponents(k, pos, level) {

    var items = [
       k.sprite("bone_hero", { anim: "idle_right" }),
        k.area({ shape: new k.Rect(vec2(-15, -2), 20, 50)}),
        k.body(),
        k.pos(pos),
        k.opacity(),
        k.scale(3),
        k.anchor("center"),
        k.tile(),
    ];

    var values = {
        type: "player",
        speed: 340,
        attackPower: 1,
        weapon: "sword",
        entityState: playerState,
        direction: "right"
    };

    items.push(values);
    items.push("player");

    const player = level.spawn(items, 2, 2);
    const weapon = player.add([
        k.pos(-16, 14),
        k.area({ shape: new Rect(vec2(0, 5), 20, 60) }),
        k.sprite("sword"),
        k.anchor("bot"),
        k.rotate(60),
        k.scale(0.7),
        spin(),
        player.weapon,
    ]);

    playAnimIfNotPlaying(player, "idle_right");
    player.onGround((i) => {
        if (i.is("tile_grave")) {
            i.move(0, 2000);
        }
    })

  return player;
}

export function setPlayerControls(k, player) {
    k.onKeyRelease((key) => {
        if (!isKeyDown("left") && !isKeyDown("right")) {
            let weapon = player.get("sword")[0];

            if (player.direction == "right") {
                playAnimIfNotPlaying(player, "idle_right");
            } else if (player.direction == "left") {
                playAnimIfNotPlaying(player, "idle_left");
            }
        }
    });

	k.onKeyDown((key) => {
	     if (["left"].includes(key)) {
	      playAnimIfNotPlaying(player, "run_left");
          player.move(-player.speed, 0);
          player.direction = "left";
          let weapon = player.get("sword")[0];

          if (weapon.isSpinning()){

          } else {
            weapon.angle = 300;
            weapon.pos.x = 8;
          }

          return;
        }

        if (["right"].includes(key)) {
          playAnimIfNotPlaying(player, "run_right");
          player.move(player.speed, 0);
          player.direction = "right";
          let weapon = player.get("sword")[0];

          if (weapon.isSpinning()){

          } else {
            weapon.pos.x = -16;
            weapon.angle = 60;
          }

          return;
        }
	});

    k.onKeyPress((key) => {
        if (["space"].includes(key)) {
            if (player.isGrounded()) {
		        player.jump(consts.JUMP_FORCE);
		        play("move_grass")
	        }
            return;
        }

        if (["f"].includes(key)) {
            const weapon = player.get(player.weapon);
            play("player_weapon_attack")
            weapon[0].spin();
            return;
        }
    });
}