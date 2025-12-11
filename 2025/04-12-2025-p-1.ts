function prettyPrintMatrix(matrix: string[][]): void {
	console.log("\nMatrix:");
	console.log("─".repeat((matrix[0]?.length ?? 0) * 2 + 1));
	for (const row of matrix) {
		console.log("│ " + row.join(" ") + " │");
	}
	console.log("─".repeat((matrix[0]?.length ?? 0) * 2 + 1));
	console.log();
}

async function getToiletPaper(path: string): Promise<number> {
	const file = Bun.file(path);
	const text = await file.text();
	const input = text.split("\n");
	const matrix = input.map((row) => row.split(""));
	let debug = structuredClone(matrix);
	let res = 0;
	const rows = matrix.length;
	const columns = matrix[0]?.length ?? -1; // satisfy ts compiler

	for (let x = 0; x < rows; x++) {
		for (let y = 0; y < columns; y++) {
			if (matrix[x]?.[y] === "@") {
				let n = 0;
				n += matrix[x - 1]?.[y] === "@" ? 1 : 0;
				n += matrix[x - 1]?.[y - 1] === "@" ? 1 : 0;
				n += matrix[x - 1]?.[y + 1] === "@" ? 1 : 0;
				n += matrix[x]?.[y - 1] === "@" ? 1 : 0;
				n += matrix[x]?.[y + 1] === "@" ? 1 : 0;
				n += matrix[x + 1]?.[y] === "@" ? 1 : 0;
				n += matrix[x + 1]?.[y - 1] === "@" ? 1 : 0;
				n += matrix[x + 1]?.[y + 1] === "@" ? 1 : 0;

				if (n < 4) {
					res += 1;
				}
			}
		}
	}

	prettyPrintMatrix(matrix);

	return res;
}

const res = await getToiletPaper("2025/04-12-2025-input.txt");
console.log(res);
