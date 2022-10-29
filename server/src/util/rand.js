const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function randomRange(min, maxExclusive) {
	return Math.floor(Math.random() * (maxExclusive - min)) + min
}

export function randomFromArray(arr) {
	let randIdx = randomRange(0, arr.length)
	return arr[randIdx]
}

export function randomUppercaseChar() {
	let randIdx = randomRange(0, uppercaseChars.length)
	return uppercaseChars.charAt(randIdx)
}