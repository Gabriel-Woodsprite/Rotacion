export function rotationAlgorithm(coordinatesArray, degree) {
	const rotationArray = [
		[Math.cos(degree), -Math.sin(degree), 0],
		[Math.sin(degree), Math.cos(degree), 0],
		[0, 0, 1],
	];

	let newArray = coordinatesArray.map(subArray => [...subArray, 1]);
	let transposedArray = transpose(newArray);

	const rowsA = rotationArray.length;
	const colsA = rotationArray[0].length;
	const rowsB = transposedArray.length;
	const colsB = transposedArray[0].length;

	console.log(rotationArray);

	const rotatedPoints = Array(rowsA)
		.fill(null)
		.map(() => Array(colsB).fill(0));

	for (let i = 0; i < rowsA; i++) {
		for (let j = 0; j < colsB; j++) {
			for (let k = 0; k < colsA; k++) {
				rotatedPoints[i][j] += rotationArray[i][k] * transposedArray[k][j];
			}
		}
	}

	console.log(transpose(rotatedPoints.slice(0, -1)), transposedArray);
	return transpose(rotatedPoints.slice(0, -1));
}

function transpose(array) {
	return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
}

// const rotatedPoints = [
// 	[3, 3],
// 	[5, -1],
// 	[6, -2],
// 	[8, 0],
// 	[10, 4],
// 	[12, 8],
// 	[13, 12],
// 	[13, 16],
// 	[15, 15],
// 	[19, 15],
// 	[22, 15],
// 	[24, 15],
// 	[26, 16],
// 	[25, 14],
// 	[23, 10],
// 	[22, 6],
// 	[19, 5],
// 	[17, 3],
// 	[16, 1],
// 	[15, -3],
// 	[15, -7],
// 	[13, -8],
// 	[11, -10],
// 	[9, -12],
// 	[8, -14],
// 	[7, -18],
// 	[5, -16],
// 	[1, -14],
// 	[0, -14],
// 	[-4, -15],
// 	[-6, -17],
// 	[-8, -15],
// 	[-10, -13],
// 	[-11, -12],
// 	[-12, -12],
// 	[-13, -12],
// 	[-14, -13],
// 	[-17, -15],
// 	[-18, -15],
// 	[-22, -13],
// 	[-24, -12],
// 	[-25, -12],
// 	[-27, -13],
// 	[-25, -11],
// 	[-23, -8],
// 	[-21, -5],
// 	[-19, 0],
// 	[-15, -2],
// 	[-12, -4],
// 	[-10, -5],
// 	[-7, -6],
// 	[-4, -6],
// 	[-1, -6],
// 	[-1, -3],
// 	[-2, 1],
// 	[0, -1],
// 	[1, 0],
// 	[2, 0],
// 	[3, 1],
// 	[3, 3],
// ];
