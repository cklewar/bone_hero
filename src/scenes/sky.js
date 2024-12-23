import {
  generatePlayerComponents,
  setPlayerControls,
} from "../entities/player.js";
import { watchPlayerOffScreen } from "../utils.js";
import * as consts from "../const.js"

export default async function sky(k, levelIdx) {
  const entities = {
    player: null,
    enemy: null,
  };

  add([
		sprite("sky",
			{
				width: width(),
				height: height(),
			})
	])

   /*

	// character dialog data
	const characters = {
		"a": {
			sprite: "bag",
			msg: "Hi Warrior! You should get that key!",
		},
		"b": {
			sprite: "ghosty",
			msg: "Who are you? You can see me??",
		},
	}
    */
	// level layouts
	const levels = [
		[
			"                               ",
			"                               ",
			"                               ",
			"                               ",
			"            ::::::             ",
			"                               ",
			"     :::::                     ",
			"                      ::::     ",
			"                               ",
			"                               ",
			"                               ",
			"                               ",
			"===============================",
		],
		[
		    "                               ",
			"                               ",
			"                               ",
			"                          :    ",
			"               :::::::    :    ",
			"                          :    ",
			"     :::::                :    ",
			"                          :    ",
			"            :::::         :    ",
			"                          :    ",
			"                          :    ",
			"                          :    ",
			"===============================",
		],
		[
		    "                               ",
			"                               ",
			"                               ",
			"                               ",
			"                  ::      :    ",
			"                               ",
			"            :::::::            ",
			"                               ",
			"    ::::                       ",
			"                               ",
			"                               ",
			"                               ",
			"===============================",
		]
 	]

	const level = k.addLevel(levels[levelIdx], {
		tileWidth: 64,
		tileHeight: 64,

		tiles: {
			"=": () => [
				sprite("grass", {}),
				pos(0, height() - 800),
				area(),
				body({ isStatic: true }),
			],
			":": () => [
				sprite("block_1", {}),
				pos(40, 400),
				area(),
				body({ isStatic: true }),
			]
		},
	})

	entities.player = generatePlayerComponents(k, k.vec2(0, height() - consts.PLAYER_START_POS_Y_OFFSET), level);
	setPlayerControls(k, entities.player);
	watchPlayerOffScreen(k, entities.player, levelIdx, levels.length, "sky", "forest_and_castle", consts.scenes);

	/*
    function watchPlayerHealth(k) {
		k.onUpdate(() => {
			if (playerState.getHealth() <= 0) {
				//playerState.setHealth(playerState.getMaxHealth());
				k.go("game_over");
				//k.go("main1");
			}
		});
	}*/

	//function onCollideWithPlayer(k, entity) {
		/*player.onCollide("axe", async (player) => {
			if (player.isAttacking) return;
			playerState.setHealth(playerState.getHealth() - 0.5); //enemy.attackPower
			k.destroyAll("healthContainer");
			healthBar(k, player);
			shake(1);
		});*/
	//}

	//healthBar(k);
	//watchPlayerHealth(k);

	/*const enemy = level.spawn(
		[
			sprite("enemy_1", { anim: "idle" }),
			pos(800, height() - consts.PLAYER_START_POS_Y_OFFSET),
			area({ shape: new Rect(vec2(0, 16), 12, 12) }),
			scale(3),
			body(),
			anchor("center"),
			state("move", ["idle", "attack", "move"]),
			tile(),
		],
		2,
		2,
	);

	onCollideWithPlayer(k, enemy);

	// Run the callback once every time we enter "idle" state.
	// Here we stay "idle" for 0.5 second, then enter "attack" state.
	enemy.onStateEnter("idle", async () => {
		await wait(0.5);
		enemy.enterState("attack");
	});

	// When we enter "attack" state, we fire a bullet, and enter "move" state after 1 sec
	enemy.onStateEnter("attack", async () => {
		// Don't do anything if player doesn't exist anymore
		if (player.exists()) {
			const dir = player.pos.sub(enemy.pos).unit();

			add([
				sprite("axe_1", { anim: "throw" }),
				pos(enemy.pos),
				area({ shape: new Rect(vec2(0, 16), 24, 24) }),
				move(dir, 300),
				scale(3),
				area(),
				offscreen({ destroy: true }),
				anchor("center"),
				"axe",
			]);
		}

		// Waits 1 second to make the enemy enter in "move" state
		await wait(1);
		enemy.enterState("move");
	});

	// When we enter "move" state, we stay there for 2 sec and then go back to "idle"
	enemy.onStateEnter("move", async () => {
		await wait(2);
		enemy.enterState("idle");
	});

	// .onStateUpdate() is similar to .onUpdate(), it'll run every frame, but in this case
	// Only when the current state is "move"
	enemy.onStateUpdate("move", () => {
		// We move the enemy in the direction of the player
		if (!player.exists()) return;
		const dir = player.pos.sub(enemy.pos).unit();
		enemy.move(dir.scale(ENEMY_SPEED));
	});
	*/
}