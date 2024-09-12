import {
	getCustomProperty,
	incrementCustomProperty,
	setCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.05;
const groundEle = $("[data-ground]");

export function setupGround() {
	setCustomProperty(groundEle[0], "--left", 0);
	setCustomProperty(groundEle[1], "--left", 300);
}

export function updateGround(delta, speedScale) {
	groundEle.each(function () {
		incrementCustomProperty(
			this,
			"--left",
			delta * speedScale * SPEED * -1
		);

		if (getCustomProperty(this, "--left") <= -300) {
			incrementCustomProperty(this, "--left", 600);
		}
	});
}
