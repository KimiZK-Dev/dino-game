import {
	incrementCustomProperty,
	setCustomProperty,
	getCustomProperty,
} from "./updateCustomProperty.js";

const $dinoElem = $("[data-dino]");
const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100;

let isJumping;
let dinoFrame;
let currentFrameTime;
let yVelocity;
export function setupDino() {
	isJumping = false;
	dinoFrame = 0;
	currentFrameTime = 0;
	yVelocity = 0;
	setCustomProperty($dinoElem[0], "--bottom", 0);
	$(document).off("keydown", onJump);
	$(document).on("keydown", onJump);
}

export function updateDino(delta, speedScale) {
	handleRun(delta, speedScale);
	handleJump(delta);
}

export function getDinoRect() {
	return $dinoElem[0].getBoundingClientRect();
}

export function setDinoLose() {
	$dinoElem.attr("src", "imgs/dino-lose.png");
}

function handleRun(delta, speedScale) {
	if (isJumping) {
		$dinoElem.attr("src", `imgs/dino-stationary.png`);
		return;
	}

	if (currentFrameTime >= FRAME_TIME) {
		dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
		$dinoElem.attr("src", `imgs/dino-run-${dinoFrame}.png`);
		currentFrameTime -= FRAME_TIME;
	}
	currentFrameTime += delta * speedScale;
}

function handleJump(delta) {
	if (!isJumping) return;

	incrementCustomProperty($dinoElem[0], "--bottom", yVelocity * delta);

	if (getCustomProperty($dinoElem[0], "--bottom") <= 0) {
		setCustomProperty($dinoElem[0], "--bottom", 0);
		isJumping = false;
	}

	yVelocity -= GRAVITY * delta;
}

function onJump(e) {
	if (e.code !== "Space" || isJumping) return;

	yVelocity = JUMP_SPEED;
	isJumping = true;
}
