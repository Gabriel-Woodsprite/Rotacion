import { rotationAlgorithm } from "/modules/rotationAlgorithm.js";
import { coordinatesArray, degree } from "/modules/inputControl.js";

console.log(coordinatesArray);

const button = document.querySelector("#graphicateButton");
let imageContainer = document.querySelector(".imageContainer");

button.addEventListener("click", function (e) {
	console.log(coordinatesArray);
	if (coordinatesArray.length >= 3) {
		fetch("http://localhost:8080", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				originalPoints: coordinatesArray,
				rotatedPoints: rotationAlgorithm(coordinatesArray, degree),
			}),
		})
			.then(response => response.json()) //respuesta del servidor
			.then(data => {
				let jsonData = [];
				for (let i in data) {
					jsonData.push([i, data[i]]);
				}
				createImage(jsonData[0][1]);
			})
			.catch(error => {
				console.log("Error " + error.message);
			});
	} else {
		alert("Una figura bidimensional tiene al menos tres puntos");
	}
});

function createImage(imagePath) {
	imageContainer.innerHTML = "";
	let img = document.createElement("IMG");
	img.src = imagePath;
	imageContainer.appendChild(img);
}
