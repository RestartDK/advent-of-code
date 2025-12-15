async function getFreshIds(path: string): Promise<number> {
	const file = Bun.file(path);
	const text = await file.text();
	const inputs = text.split("\n\n");
	const ranges = inputs[0]?.split("\n");
	const ids = inputs[1]?.split("\n");
	let res = 0;

	if (!ranges || !ids) {
		throw new Error("Parsing went wrong");
	}
  console.log(ranges)
  console.log(ids)

	for (let idStr of ids) {
    const id = Number(idStr)
		for (const arr of ranges) {
			const parsed = arr.split("-");
			const start = Number(parsed[0]);
			const end = Number(parsed[1]);
			console.log(id);
			console.log(`Range inclusive from ${start} to ${end}`);

			if (id >= start && id <= end) {
				res += 1;
        break;
			}
		}
	}

	return res;
}

const res = await getFreshIds("2025/05-12-2025-input.txt");
console.log(res);
