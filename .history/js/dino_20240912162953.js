import {
	getCustomProperty,
	incrementCustomProperty,
	setCustomProperty,
} from "./updateCustomProperty.js";

const dinoEl = $("[data-dino]");
const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100;

let isJumping = false;
let dinoFrame;
let currentFrameTime;
let yVelocity;

function handleRun(delta, speedScale) {
	if (isJumping) {
		dinoEl.attr("src", `images/dino-stationary.png`);
		return;
	}

	currentFrameTime += delta * speedScale;

	if (currentFrameTime >= FRAME_TIME) {
		dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
		dinoEl.attr("src", `images/dino-run-${dinoFrame}.png`);
		currentFrameTime -= FRAME_TIME;
	}
}

function handleJump(delta) {
	if (!isJumping) return;

	yVelocity -= GRAVITY * delta;
	dinoEl.style.bottom = `${
		parseFloat(dinoEl.style.bottom) + yVelocity * delta
	}px`;

	if (parseFloat(dinoEl.style.bottom) <= 0) {
		dinoEl.style.bottom = "0px";
		isJumping = false;
	}
}

function onJump(e) {
	if (e.code !== "Space" || isJumping) return;

	yVelocity = JUMP_SPEED;
	isJumping = true;
}

export function updateDino(delta, speedScale) {
	handleRun(delta, speedScale);
	handleJump(delta);
}

export function setupDino() {
	isJumping = false;
	dinoFrame = 0;
	currentFrameTime = 0;
	yVelocity = 0;
	setCustomProperty(dinoEl, "--bottom", 0);
	$(document).off("keydown", onJump);
	$(document).on("keydown", onJump);
	dinoEl.attr("src", `images/dino-run-0.png`);
}
