// never have a negative number
// never have a increasing to decreasing range
// never have a leading zero
// sequences must always be in the same order
// the sequence could be a number less than 10

// sliding window, use left and right pointers, shift right if the sliced seq
// is not in the set, otherwise

// I did not realise that this question was asking me to have the exact same sequence duplicated, not sub sequences...

async function getSumInvalidIds(path: string): Promise<number> {
	const file = Bun.file(path);
	const text = await file.text();
	const idRanges = text.split(",");
	let sumInvalidIds = 0;

	console.log(idRanges);

	// Do this for every id
	for (const id of idRanges) {
		const ranges = id.split("-");
		const start = Number(ranges[0]);
		const end = Number(ranges[1]);
		console.log(`ranges: ${ranges} | ${start} to ${end}`);
		console.log(`invalid ids ${sumInvalidIds}`);

		for (let i = start; i <= end; i++) {
			const sequence = i.toString();
			if (sequence.length % 2 === 0) {
				const firstHalf = sequence.slice(0, sequence.length / 2);
				const secondHalf = sequence.slice(sequence.length / 2, sequence.length);
				// console.log(`first half: ${firstHalf} = second half ${secondHalf}`);
				if (firstHalf == secondHalf) {
					console.log(`🥳 first half: ${firstHalf} = second half ${secondHalf}`);
					sumInvalidIds += i;
				}
			}
		}
	}

	return sumInvalidIds;
}

const res = await getSumInvalidIds("2025/02-12-2025-input.txt");
console.log(res);
console.log("i came");
