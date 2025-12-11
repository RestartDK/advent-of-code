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
	const matrix = text.split("\n").map((row) => row.split(""));
	let debug = structuredClone(matrix);

	const rows = matrix.length;
	const columns = matrix[0]?.length ?? -1; // satisfy ts compiler

	let res = 0;
	let removed = 0;

	do {
		removed = 0;
		for (let x = 0; x < rows; x++) {
			for (let y = 0; y < columns; y++) {
				if (matrix[x]?.[y] === "@") {
					let n = 0;
					n += (matrix[x - 1]?.[y] === "@" || matrix[x - 1]?.[y] === "x") ? 1 : 0;
					n += (matrix[x - 1]?.[y - 1] === "@" || matrix[x - 1]?.[y - 1] === "x") ? 1 : 0;
					n += (matrix[x - 1]?.[y + 1] === "@" || matrix[x - 1]?.[y + 1] === "x") ? 1 : 0;
					n += (matrix[x]?.[y - 1] === "@" || matrix[x]?.[y - 1] === "x") ? 1 : 0;
					n += (matrix[x]?.[y + 1] === "@" || matrix[x]?.[y + 1] === "x") ? 1 : 0;
					n += (matrix[x + 1]?.[y] === "@" || matrix[x + 1]?.[y] === "x") ? 1 : 0;
					n += (matrix[x + 1]?.[y - 1] === "@" || matrix[x + 1]?.[y - 1] === "x") ? 1 : 0;
					n += (matrix[x + 1]?.[y + 1] === "@" || matrix[x + 1]?.[y + 1] === "x") ? 1 : 0;

					if (n < 4) {
						removed += 1;
						// @ts-ignore
						matrix[x][y] = "x";
					}
				}
			}
		}
		prettyPrintMatrix(matrix);
		res += removed;
		matrix.forEach((row, i) =>
			row.forEach((cell, j) => {
				// @ts-ignore
				if (cell === "x") matrix[i][j] = ".";
			})
		);
	} while (removed > 0);

	prettyPrintMatrix(matrix);

	return res;
}

const res = await getToiletPaper("2025/04-12-2025-input.txt");
console.log(res);
