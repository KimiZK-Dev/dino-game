$(function () {
	const e = {
		world: $("[data-world]"),
	};

	const WORLD_WIDTH = 100;
	const WORLD_HEIGHT = 30;

	function setPixelToWorldScale() {
		const winHeight = window.innerHeight;
		const winWidth = window.innerWidth;
		let worldToPixelScale;

		if (winWidth / winHeight < WORLD_WIDTH / WORLD_HEIGHT) {
			worldToPixelScale = winWidth / WORLD_WIDTH;
		} else {
			worldToPixelScale = winHeight / WORLD_HEIGHT;
		}

		e.world.css({
			width: `${WORLD_WIDTH * worldToPixelScale}px`,
			height: `${WORLD_HEIGHT * worldToPixelScale}px`,
		});
	}

	let lastTime = null;
	function update(time) {
		if (lastTime === null) {
			lastTime = time;
			window.requestAnimationFrame(update);
			return;
		}

		const delta = time - lastTime;
		lastTime = time;

		window.requestAnimationFrame(update);
	}

	setPixelToWorldScale();
	window.requestAnimationFrame(update);
	$(window).resize(setPixelToWorldScale);
});
