import { setupGround, updateGround } from "./ground.js";
import { updateDino, setupDino } from "./dino.js";

$(function () {
	const e = {
		world: $("[data-world]"),
		score: $("[data-score]"),
		startScreen: $("[data-start-screen]"),
	};

	const WORLD_WIDTH = 100;
	const WORLD_HEIGHT = 30;
	const SPEED_SCALE_INCREASE = 0.0001;
	let lastTime = null;
	let speedScale;
	let score;

	function setPixelToWorldScale() {
		const winHeight = window.innerHeight;
		const winWidth = window.innerWidth;
		const worldToPixelScale =
			winWidth / winHeight < WORLD_WIDTH / WORLD_HEIGHT
				? winWidth / WORLD_WIDTH
				: winHeight / WORLD_HEIGHT;

		e.world.css({
			width: `${WORLD_WIDTH * worldToPixelScale}px`,
			height: `${WORLD_HEIGHT * worldToPixelScale}px`,
		});
	}

	function update(time) {
		if (lastTime === null) {
			lastTime = time;
			window.requestAnimationFrame(update);
			return;
		}

		const delta = time - lastTime;
		updateGround(delta, speedScale);
		updateDino(delta, speedScale);
		updateSpeedScale(delta);
		updateScore(delta);

		lastTime = time;
		window.requestAnimationFrame(update);
	}

	function updateSpeedScale(delta) {
		speedScale += delta * SPEED_SCALE_INCREASE;
	}

	function updateScore(delta) {
		score += delta * 0.01;
		e.score.text(Math.floor(score));
	}

	function handleStart() {
		speedScale = 1;
		score = 0;
		setupGround();
		updateDino();
		e.startScreen.addClass("hide");
		lastTime = null;
		window.requestAnimationFrame(update);
	}

	setPixelToWorldScale();
	$(window).resize(setPixelToWorldScale);
	$(document).one("keydown", handleStart);
});
