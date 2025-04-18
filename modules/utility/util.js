function compareArrays(parent, child) {
	return parent.some(
		arr =>
			arr.length === child.length && arr.every((val, i) => val === child[i]),
	);
	console.log("hola");
}

export { compareArrays };
