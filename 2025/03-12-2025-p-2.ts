async function getMaxJoltage(path: string): Promise<number> {
	const file = Bun.file(path);
	const text = await file.text();
	const banks = text.split("\n");
	let maxJoltage = 0;

	for (const bank of banks) {
		// get number of iterations where you need to delete all the smallest nums
		let n = bank.length - 12;
		let bankArr = Array.from(bank).map(Number);
		let stack: Array<number> = [];

		// use greedy approach for getting largest num while respecting order
		for (const digit of bankArr) {
			while (
				stack.length > 0 &&
				stack[stack.length - 1] !== undefined &&
				n > 0 &&
				stack[stack.length - 1]! < digit
			) {
				stack.pop();
				n--;
			}
			stack.push(digit);
		}

		// if there are more than 12 elements then remove them from the stack
		while (n > 0) {
			stack.pop();
			n--;
		}

		// join the array with undefined values to get the max voltage of bank
		const res = Number(stack.join(""));
		maxJoltage += res;
	}

	return maxJoltage;
}

const maxJoltage = await getMaxJoltage("2025/03-12-2025-input.txt");
console.log(maxJoltage);
