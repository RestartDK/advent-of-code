// there can be duplicates of numbers, so might have max max value in one but not it's other one next to it
// there will always be more than one line of input
// the min number in one bank is 11 and max is 99

async function getMaxJoltage(path: string): Promise<number> {
	const file = Bun.file(path);
	const text = await file.text();
	const banks = text.split("\n");
	let maxJoltage = 0;

	for (const bank of banks) {
		let l = 0;
		let r = 1;
		let res = 0;
		while (r < bank.length) {
			const left = bank[l];
			const right = bank[r];
			if (left !== undefined && right !== undefined) {
				const j = Number(left + right);
				res = Math.max(res, j);
				if (right > left) {
					l = r;
				}
				r += 1;
			}
		}
		maxJoltage += res;
	}

	return maxJoltage;
}

const maxJoltage = await getMaxJoltage("2025/03-12-2025-input.txt");
console.log(maxJoltage);
