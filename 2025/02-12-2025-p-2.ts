async function getSumInvalidIds(path: string): Promise<number> {
	const file = Bun.file(path);
	const text = await file.text();
	const idRanges = text.split(",");
	let sumInvalidIds = 0;

	for (const id of idRanges) {
		const ranges = id.split("-");
		const start = Number(ranges[0]);
		const end = Number(ranges[1]);

		for (let i = start; i <= end; i++) {
			const sequence = i.toString();

			// Find n potential sequences
			for (let n = 1; n < sequence.length; n++) {
				if (sequence.length % n == 0) {
					// See if n sequences are repeated n times
					const unique = new Set<string>();
					for (let j = n; j <= sequence.length; j += n) {
						const subSeq = sequence.slice(j - n, j);
						unique.add(subSeq);
					}

					// If there is more than one entry then it was not the same sequence
					if (unique.size === 1) {
						sumInvalidIds += i;
						break;
					}
				}
			}
		}
	}

	return sumInvalidIds;
}

const res = await getSumInvalidIds("2025/02-12-2025-input.txt");
console.log(res);
