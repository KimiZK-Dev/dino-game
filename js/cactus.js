import {
	setCustomProperty,
	incrementCustomProperty,
	getCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.03;
const CACTUS_INTERVAL_MIN = 700;
const CACTUS_INTERVAL_MAX = 2000;
const $worldElem = $("[data-world]");

let nextCactusTime;
export function setupCactus() {
	nextCactusTime = CACTUS_INTERVAL_MIN;
	$("[data-cactus]").each(function () {
		$(this).remove();
	});
}

export function updateCactus(delta, speedScale) {
	$("[data-cactus]").each(function () {
		incrementCustomProperty(
			this,
			"--left",
			delta * speedScale * SPEED * -1
		);
		if (getCustomProperty(this, "--left") <= -100) {
			$(this).remove();
		}
	});

	if (nextCactusTime <= 0) {
		createCactus();
		nextCactusTime =
			randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) /
			speedScale;
	}

	nextCactusTime -= delta;
}

export function getCactusRects() {
	return $("[data-cactus]")
		.map(function () {
			return this.getBoundingClientRect();
		})
		.get();
}

function createCactus() {
	const $cactus = $("<img>");
	$cactus.attr("data-cactus", true);
	$cactus.attr("src", "./images/cactus.png");
	$cactus.addClass("cactus");
	setCustomProperty($cactus[0], "--left", 100);
	$worldElem.append($cactus);
}

function randomNumberBetween(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
