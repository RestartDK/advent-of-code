// if we decrease number beyond 0 or after 99 then it will
// incerement or decrement within that given range
// Password is the num times the dial it point 0 after any rotation in the given sequence
// Given the sequence of combinations, return the number of times the dial is pointing to 0

// Range [0, 100[
// Starts at dial 50

// parse text file and loop through every line in the file
// init current dial value (50)
// If the dial number is 0, increment our res variable
// for every element increment current dial value if R else decrement
// return the res result

const path = "2025/01-12-2025-input.txt";
const file = Bun.file(path);

const text = await file.text();
const combinations = text.split("\n");

let dial = 50;
let res = 0;

for (const combination of combinations) {
	const direction = combination[0];
	const rotations = Number(combination.slice(1));

	if (direction == "L") {
		dial -= rotations % 100;
	} else {
		dial += rotations % 100;
	}

	if (dial >= 100) {
		dial = dial - 100;
	} else if (dial < 0) {
		dial = 100 + dial;
	} 

	if (dial === 0) {
		res += 1;
	}
}

console.log(res);
