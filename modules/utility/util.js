function compareArrays(parent, child) {
	return parent.some(
		arr =>
			arr.length === child.length && arr.every((val, i) => val === child[i]),
	);
}

function validCoordinate(input) {
	const valid = /^\s*\[?\s*-?\d+\s*,\s*-?\d+\s*\]?\s*$/;
	return valid.test(input);
}

function matrixMultiplication(matrixA, degree) {}

export { compareArrays, validCoordinate, matrixMultiplication };
