import * as consts from "./const.js"
import { healthBar } from "./components/healthbar.js";
import keyLines from "./content/keyDialogue.js";

export function playAnimIfNotPlaying(gameObj, animName) {
  if (gameObj.curAnim() !== animName) {
    gameObj.play(animName);
  }
}

async function displayLine(textContainer, line) {
  for (const char of line) {
    await new Promise((resolve) =>
      setTimeout(() => {
        textContainer.text += char;
        resolve();
      }, 1)
    );
  }
}

export async function dialog(k, pos, content) {
  const dialogBox = k.add([k.rect(800, 200), k.pos(pos), k.fixed(), color(99, 99, 99), k.outline(4),]);
  const textContainer = dialogBox.add([
    k.text("", {
      font: "gameboy",
      width: 700,
      lineSpacing: 15,
      size: 30,
    }),
    k.color(0, 0, 0),
    k.pos(20, 40),
    k.fixed(),
  ]);

  let index = 0;
  await displayLine(textContainer, content[index]);
  let lineFinishedDisplayed = true;
  const dialogKey = k.onKeyPress("space", async () => {
    if (!lineFinishedDisplayed) return;

    index++;
    if (!content[index]) {
      k.destroy(dialogBox);
      dialogKey.cancel();
      return;
    }

    textContainer.text = "";
    lineFinishedDisplayed = false;
    await displayLine(textContainer, content[index]);
    lineFinishedDisplayed = true;
  });
}

function addButton(txt = "button", p = vec2(200, 100), f = () => debug.log("button added"),) {
    // add a parent background object
    const btn = add([
        rect(240, 80, { radius: 8 }),
        pos(p),
        area(),
        scale(1),
        anchor("center"),
        outline(4),
        color(255, 255, 255),
    ]);

    btn.add([
        text(txt),
        anchor("center"),
        color(0, 0, 0),
    ]);

    btn.onHoverUpdate(() => {
        const t = time() * 10;
        btn.color = hsl2rgb((t / 10) % 1, 0.6, 0.7);
        btn.scale = vec2(1.2);
        setCursor("pointer");
    });

    btn.onHoverEnd(() => {
        btn.scale = vec2(1);
        btn.color = rgb();
    });

    btn.onClick(f);

    return btn;
}

export function watchPlayerOffScreen(k, player, levelIdx, lvl_length, curr_scene, next_scene, scenes) {

    k.onUpdate(async () => {
	    const spos = player.screenPos();
        if (spos.x > k.width()) {

            if (levelIdx < lvl_length - 1) {
                k.scene(curr_scene, () => scenes[curr_scene](k, levelIdx + 1));
                k.go(curr_scene);
            }
            else {
                switch (curr_scene) {
                    case 'graveyard':
                        if (player.entityState.getHasKey()) {
                            k.go(next_scene, 0);
                            break;
                        } else {
                            await dialog(k, k.vec2(300, 300), keyLines[consts.locale]);
                            break;
                        }
                    default:
                        k.go(next_scene, 0);
                }
            }
        }
        else if (spos.y < 0 || spos.y > k.height()) {
            if (levelIdx > 0) {
                k.scene(curr_scene, () => scenes[curr_scene](k, levelIdx - 1));
                k.go(curr_scene, levelIdx - 1);
            }
        }
	});
}

export function watchEntityHealth(k, entity) {
    if (entity) {
        entity.onUpdate(() => {
            if (entity.entityState.getHealth() <= 0) {
                if (entity.type === "player") {
                    k.go("game_over", 0);
                } else if (entity.type === "boss") {
                    entity.destroy();
                    k.destroyAll("flame_bar");
                    let diamond = k.add([
                        k.sprite("diamond_1",{}),
                        k.area({ shape: new Rect(vec2(0, 0), 80, 120) }),
                        k.pos(k.vec2(width() / 2, 940)),
                        k.opacity(),
                        k.anchor("center"),
                        "diamond_obj",
                    ]);
                    diamond.fadeIn(2);
                } else {
                    play("enemy_death");
                    entity.destroy();
                }
            }
        });
    }
}

export function onCollideWithNpc(k, entity_a, entity_a_state, entity_b) {
    entity_a.onCollide(entity_b, async (entity_b) => {
        switch (entity_b.type) {
            case "magicer":
                await dialog(k, k.vec2(300, 100), keyLines[consts.locale]);
                entity_b.enterState("disappear");

                break;
            default:
                console.log("unknown npc type");
        }
    });
}

export function onCollideWithObj(k, entity_a, entity_a_state, entity_b) {
    entity_a.onCollide(entity_b, (entity) => {
        if (entity.tags[1] == "diamond_obj") {
            go("end", 0)
        }

        if (!entity_a_state.getHasKey()) {
            entity_a_state.setHasKey(true);
            k.destroy(k.get(entity_b)[0]);
        }
    });
}

export function onCollideWithEnemy(k, entity_a, entity_a_state, entity_b) {
    if (entity_b.weapon) {
        entity_a.onCollide(entity_b.weapon, (entity) => {
            entity_a_state.setHealth(entity_a_state.getHealth() - entity_b.attackPower);
            healthBar(k, entity_a);
            shake(entity_a.shake);
        });
    } else if (entity_b.type === "flamebar") {
        entity_a.onCollide("fireball", (entity) => {
            entity_a_state.setHealth(entity_a_state.getHealth() - entity_b.attackPower);
            healthBar(k, entity_a);
            shake(entity_a.shake);
        });

    } else {
        entity_a.onCollide(entity_b.tags[2], (entity_b) => {
            entity_a_state.setHealth(entity_a_state.getHealth() - entity_b.attackPower);
            healthBar(k, entity_a);
            shake(entity_a.shake);
        });
    }
}

export function addFlamebar(k, tag, position = vec2(0), angle = 0, num = 6) {
    // Create a parent game object for position and rotation
    const flameHead = k.add([
        k.pos(position),
        k.rotate(angle),
        {
            type: "flamebar",
            attackPower: 1,
        },
        tag,
        "flame_bar",

    ]);

    // Add each section of flame as children
    for (let i = 0; i < num; i++) {
        if (i % 2 === 0) {
           flameHead.add([
                k.sprite("fireball_1"),
                k.pos(0, i * 42),
                k.area(),
                k.anchor("center"),
                "fireball"
            ]);
        } else {
            flameHead.add([
                k.sprite("fireball_1"),
                k.pos(0, i * 42),
                k.anchor("center"),
            ]);
        }
    }

    // The flame head's rotation will affect all its children
    flameHead.onUpdate(() => {
        flameHead.angle += dt() * 60;
    });

    return flameHead;
}