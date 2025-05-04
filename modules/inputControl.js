import { compareArrays, validCoordinate } from "/modules/utility/util.js";
import { coordinatesArray } from "/modules/rotationAlgorithm.js";

const coordinateInput = document.querySelector("#inputCoordinate");
const listContainer = document.querySelector(".listContainer");

listContainer.addEventListener("click", function (e) {
	if (e.target.classList.contains("editable")) {
		const index = e.target.dataset.index;
		const input = document.createElement("input");
		input.value = coordinatesArray[index].join(",");
		e.target.replaceWith(input);
		input.focus();

		input.addEventListener("blur", () => {
			if (parseCoordinates(input.value)) {
				appendCoordinate(parseCoordinates(input.value), index);
			}
		});
	}
});

coordinateInput.addEventListener("keypress", function (e) {
	if (e.key == "Enter") {
		if (parseCoordinates(e.target.value)) {
			appendCoordinate(parseCoordinates(e.target.value));
			coordinateInput.value = "";
		}
	}
});

function appendCoordinate(coordinate, index = -1) {
	if (!compareArrays(coordinatesArray, coordinate)) {
		if (index == -1) {
			coordinatesArray.push(coordinate);
		} else {
			coordinatesArray[index] = coordinate;
		}
		renderCoordinates();
		console.log(coordinatesArray);
	} else {
		alert("No pueden existir puntos repetidos");
	}
}

function renderCoordinates() {
	listContainer.innerHTML = "";
	coordinatesArray.forEach((point, index) => {
		const row = document.createElement("DIV");
		row.innerHTML = `<SPAN data-index=${index} class="editable">[${point[0]}, ${point[1]}]</SPAN>`;
		listContainer.appendChild(row);
	});
}

function parseCoordinates(input) {
	if (!validCoordinate(input)) {
		alert("Formato Invalido");
		return null;
	}
	const cleaned = input.replace(/[\[\]\s]/g, "");
	return cleaned.split(",").map(Number);
}

export { appendCoordinate };
