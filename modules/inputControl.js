import { compareArrays } from "/modules/utility/util.js";
import { coordinatesArray } from "/modules/rotationAlgorithm.js";

const coordinateInput = document.querySelector("#inputCoordinate");
const coordinateContainerP = document.querySelector(".coordinatesContainer>p");

coordinateInput.addEventListener("keypress", function (e) {
	let regex = /^\[\d+,\d+\]$/;
	if (e.key == "Enter") {
		let coordinate = e.target.value;
		if (regex.test(coordinate)) {
			if (appendCoordinate(coordinate)) {
				coordinateContainerP.innerText += coordinate + "\n";
			}
			coordinateInput.value = "";
		} else {
			alert("Formato invalido, debe ingresar el formato [a,b]");
		}
	}
});

function appendCoordinate(coordinate) {
	let parsedCoordinate = [Number(coordinate[1]), Number(coordinate[3])];

	if (!compareArrays(coordinatesArray, parsedCoordinate)) {
		coordinatesArray.push(parsedCoordinate);
	} else {
		alert("No pueden existir puntos repetidos");
		return false;
	}
	return true;
}

export { appendCoordinate };
