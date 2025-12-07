// Password method 0x434C49434B: Count the number of times the dial points at 0,
// regardless of whether it happens during a rotation or at the end of one.
//
// The dial has positions [0, 100) (0 to 99 inclusive).
// The dial starts at position 50.
//
// For each rotation:
// - Full rotations (multiples of 100): each full rotation passes through 0 once
// - Partial rotation: count zeros that occur during or at the end of the rotation
//   - If we wrap around and don't start/end at 0: we pass through 0 during rotation
//   - If we end at 0: we end at 0 (count this)
//   - If we start at 0 and wrap: don't count the wrap (starting at 0 was counted as end of previous rotation)

async function getPassword(path: string): Promise<number> {
	const file = Bun.file(path);

	const text = await file.text();
	const combinations = text.split("\n").filter((line) => line.trim() !== "");

	let dial = 50;
	let res = 0;

	for (const combination of combinations) {
		const direction = combination[0];
		const rotations = Number(combination.slice(1));

		// Store starting position before rotation
		const startedAtZero = dial === 0;

		// Count zeros from full rotations (each full rotation passes through 0 once)
		const fullRotations = Math.floor(rotations / 100);
		res += fullRotations;

		// Calculate the partial rotation
		const partialRotations = rotations % 100;

		// Calculate where we'll end up after the partial rotation
		let newDial: number;
		if (direction === "L") {
			newDial = dial - partialRotations;
		} else {
			newDial = dial + partialRotations;
		}

		// Check if the partial rotation crosses the 0 boundary (wraps around)
		const wrapped = (direction === "L" && newDial < 0) || (direction === "R" && newDial >= 100);

		// Normalize the dial position to [0, 100)
		if (newDial >= 100) {
			dial = newDial - 100;
		} else if (newDial < 0) {
			dial = newDial + 100;
		} else {
			dial = newDial;
		}

		// Count zeros:
		// 1. If we wrap and DON'T start at 0 and DON'T end at 0, we pass through 0 during rotation
		// 2. If we end at 0, we end at 0 (count this regardless)
		// Note: If we start at 0 and wrap, we don't count the wrap (starting at 0 was counted as end of previous rotation)
		if (wrapped && !startedAtZero && dial !== 0) {
			// We wrapped, didn't start at 0, and didn't end at 0
			// So we passed through 0 during rotation
			res += 1;
		}
		
		if (dial === 0) {
			// We end at 0 (count this)
			res += 1;
		}
	}

	return res;
}

const path = "2025/01-12-2025-input.txt";
const result = await getPassword(path);
console.log(result);
