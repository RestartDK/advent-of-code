async function getFreshIds(path: string): Promise<number> {
	const file = Bun.file(path);
	const text = await file.text();
	const inputs = text.split("\n\n");
	const ranges = inputs[0]?.split("\n");
	let res = 0;

	if (!ranges) {
		throw new Error("Parsing went wrong");
	}

	// Sort ranges
	ranges.sort((a, b) => {
		if (!a || !b) return 0;
		const startA = Number(a.split("-")[0]);
		const startB = Number(b.split("-")[0]);
		return startA - startB;
	});

	// transform to 2d array for easier boilerplate
	let easyRanges: number[][] = [];
	for (const arr of ranges) {
		const parsed = arr.split("-");
		const start = Number(parsed[0]);
		const end = Number(parsed[1]);

		easyRanges.push([start, end]);
	}

	// Merge the arrays with overlapping ranges
	let mergedRanges: number[][] = [];
	for (const range of easyRanges) {
		if (range.length < 2 || !range[0] || !range[1]) continue;
		const top = mergedRanges[mergedRanges.length - 1];
		if (top && top.length >= 2 && top[0] && top[1] && range[0] <= top[1]) {
			if (top && top.length >= 2) {
				top[1] = range[1] > top[1] ? range[1] : top[1];
			}
		} else {
			mergedRanges.push(range);
		}
	}

	// Calculate the ranges and append to result
	for (const range of mergedRanges) {
		if (range.length >= 2 && range[0] !== undefined && range[1] !== undefined) {
			res += range[1] - range[0] + 1;
		}
	}

	return res;
}

const res = await getFreshIds("2025/05-12-2025-input.txt");
console.log(res);
