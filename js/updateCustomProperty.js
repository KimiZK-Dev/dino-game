export function getCustomProperty(e, prop) {
	return parseFloat(getComputedStyle(e).getPropertyValue(prop) || 0);
}
export function setCustomProperty(e, prop, val) {
	e.style.setProperty(prop, val);
}
export function incrementCustomProperty(e, prop, inc) {
	setCustomProperty(e, prop, getCustomProperty(e, prop) + inc);
}
