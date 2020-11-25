function positiveMod(number: number, divisor: number): number {
	return number < 0 ? divisor + (number % divisor) : (number % divisor);
}

/**
 * Modifies the array into another array that uniquely represents it and has length multiple of 4.
 */
export function adjustNumberArray(array: number[]): void {
	if (array.length === 0) return;

	const lengthRemainder = array.length % 4;
	const paddingNeeded = lengthRemainder === 0 ? 0 : 4 - lengthRemainder;

	const firstValue = array[0]!;
	const lastValue = array[array.length - 1]!;

	/* eslint-disable no-multi-spaces */
	const fillerValues = [
		positiveMod(7 * firstValue + 13 * lastValue -  9 * paddingNeeded, 256),
		positiveMod(3 * firstValue - 11 * lastValue +  5 * paddingNeeded, 256),
		positiveMod(2 * firstValue +  7 * lastValue - 19 * paddingNeeded, 256),
		positiveMod(7 * firstValue +  3 * lastValue + 47 * paddingNeeded, 256),
		positiveMod(5 * firstValue + 29 * lastValue + 67 * paddingNeeded, 256),
		positiveMod(2 * firstValue + 41 * lastValue + 17 * paddingNeeded, 256),
	] as const;
	/* eslint-enable no-multi-spaces */

	for (let i = 0; i < paddingNeeded; i++) {
		// This value is not important, it just has to be constant for the same input
		array.push(fillerValues[fillerValues.length - 1 - i]!);
	}

	// The last three values are not important, they just have to be constant for the same input
	array.push(paddingNeeded, fillerValues[0], fillerValues[1], fillerValues[2]);
}

/**
 * Modifies the array into the array it was before `adjustNumberArray` was called on it.
 */
export function uncoverOriginalNumberArray(adjustedArray: number[]): void {
	if (adjustedArray.length === 0) return;
	const paddingNeeded = adjustedArray[adjustedArray.length - 4]!;
	if (![0, 1, 2, 3].includes(paddingNeeded)) throw new Error('Unexpected padding.');
	for (let i = 0; i < paddingNeeded + 4; i++) adjustedArray.pop();
}
