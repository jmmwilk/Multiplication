'use strict';

let squareSize = 45;
let gameSize = 10;

function start () {
	let application = document.getElementById('application');
	let titleBar = document.getElementById('title-bar');
	let gameVertical = document.getElementById('game-vertical');
	gameVertical.style.height = (1 + gameSize) * squareSize + 'px';
	gameVertical.style.width = (1 + gameSize) * squareSize + 'px';
	let gameHorizontal = document.getElementById('game-horizontal');
	gameHorizontal.style.height = (1 + gameSize) * squareSize + 'px';
	gameHorizontal.style.width = (1 + gameSize) * squareSize + 'px';
	createLines ('game-vertical', 'marginLeft', 'line-vertical');
	createLines ('game-horizontal', 'marginTop', 'line-horizontal');
	createRectangle ();
	putSidesNumbers ();
	placeSidesNumbers ();
	addMushroomInButton ();
	addMushroomsInRectangle ();
	let rectangle = document.getElementById('rectangle');
	let frame = document.getElementById('frame');

	let dots = document.getElementsByClassName('dot');

	Array.from(dots).forEach(function(dot) {
		dot.onmousedown = function () {
			frame.onmousemove = function(event){
				resizeRectangle(event, dot);
				addMushroomsInRectangle ();
				placeSidesNumbers ();
				putSidesNumbers ();
			};
			frame.onmouseup = function () {
				frame.onmousemove = undefined;
				adjustRectangle ();
				displayEquation ();
				placeSidesNumbers ();
				putSidesNumbers ();
				removeMushrooms ();
				addMushroomsInRectangle ();
			}
		}
	})
	

	let squares = document.getElementById('squares');
	squares.onclick = displaySqaures;

	displayEquation ();

	let multiplication = document.getElementById('multiplication');
	multiplication.onclick = displayMultiplication;

	let mushroomButton = document.getElementById('mushroom-button');
	mushroomButton.onclick = displayMushrooms;

	
	let sidesButton = document.getElementById("sides-button");
	sidesButton.onclick = displaySides;
	
}

function displaySides () {
	let sides = document.getElementsByClassName('side');
	for (let i=0; i<sides.length; i++) {
		if (sides[i].style.display == 'none') {
			sides[i].style.display = '';
		} else {
			sides[i].style.display = 'none'
		}
		
	}
}

function putSidesNumbers () {
	let rectangle = document.getElementById('rectangle');
	let topSide = document.getElementById('top-side');
	let bottomSide = document.getElementById('bottom-side');
	let leftSide = document.getElementById('left-side');
	let rightSide = document.getElementById('right-side');
	topSide.innerText = Math.floor(parseInt(rectangle.style.width) / squareSize);
	bottomSide.innerText = Math.floor(parseInt(rectangle.style.width) / squareSize);
	leftSide.innerText = Math.floor(parseInt(rectangle.style.height) / squareSize);
	rightSide.innerText = Math.floor(parseInt(rectangle.style.height) / squareSize);
}

function placeSidesNumbers () {
	let rectangle = document.getElementById('rectangle');
	let topSide = document.getElementById('top-side');
	let bottomSide = document.getElementById('bottom-side');
	let leftSide = document.getElementById('left-side');
	let rightSide = document.getElementById('right-side');
	topSide.style.top = parseInt(rectangle.style.top) - (0.5 * squareSize) + 'px';
	topSide.style.left = parseInt(rectangle.style.left) + (0.5 * parseInt(rectangle.style.width)) - 7 + 'px';
	bottomSide.style.top = parseInt(rectangle.style.top) + parseInt(rectangle.style.height) + 'px';
	bottomSide.style.left = parseInt(rectangle.style.left) + (0.5 * parseInt(rectangle.style.width)) - 7 + 'px';
	leftSide.style.top = parseInt(rectangle.style.top) + 0.5 * parseInt(rectangle.style.height) - 10 + 'px';
	leftSide.style.left = parseInt(rectangle.style.left) - (0.5 * squareSize) + 'px';
	rightSide.style.top = parseInt(rectangle.style.top) + 0.5 * parseInt(rectangle.style.height) - 10 + 'px';
	rightSide.style.left = parseInt(rectangle.style.left) + parseInt(rectangle.style.width) + 5 + 'px';
}

function resizeRectangle (event, dot) {
	let rectangle = document.getElementById('rectangle')
	let gameVertical = document.getElementById('game-vertical');
	let position = rectanglePosition (event);
	let mouse = mousePosition (event);
	
	if (dot.id == 'dot-top-right') {
		rectangle.style.height = position.bottom - mouse.y + 'px';
		rectangle.style.width = mouse.x - position.left + 'px';
		rectangle.style.top = mouse.y + 'px';
	}

	if (dot.id == 'dot-bottom-left') {
		rectangle.style.height = mouse.y - position.top + 'px';
		rectangle.style.width = position.right - mouse.x + 'px';
		rectangle.style.left = mouse.x + 'px';
	}

	if (dot.id == 'dot-top-left') {
		rectangle.style.height = position.bottom - mouse.y +'px';
		rectangle.style.width = position.right - mouse.x + 'px';
		rectangle.style.left = mouse.x + 'px';
		rectangle.style.top = mouse.y + 'px';
	}

	if (dot.id == 'dot-bottom-right') {
		rectangle.style.height = mouse.y - position.top + 'px';
		rectangle.style.width = mouse.x - position.left + 'px';
	}
}

function rectanglePosition (event) {
	let rectangle = document.getElementById('rectangle');
	let gameVertical = document.getElementById('game-vertical');
	let position = {
		left: rectangle.getBoundingClientRect().left - gameVertical.getBoundingClientRect().left,
		right: rectangle.getBoundingClientRect().right - gameVertical.getBoundingClientRect().left,
		top: rectangle.getBoundingClientRect().top - gameVertical.getBoundingClientRect().top,
		bottom: rectangle.getBoundingClientRect().bottom - gameVertical.getBoundingClientRect().top,
	}
	return position;
}

function mousePosition (event) {
	let gameVertical = document.getElementById('game-vertical');
	let mouse = {
		y: event.clientY - gameVertical.getBoundingClientRect().top,
		x: event.clientX - gameVertical.getBoundingClientRect().left,
	}
	return mouse;
}


function adjustRectangle () {
	let rectangle = document.getElementById('rectangle');
	for (let i=0; i<gameSize + 1; i++) {
		if (parseInt(rectangle.style.width)> (i - 0.5) * squareSize
			&& parseInt(rectangle.style.width) <= (i+0.5) * squareSize) {
			rectangle.style.width = i * squareSize + 'px';
		}
		if (parseInt(rectangle.style.height)> (i - 0.5) * squareSize
			&& parseInt(rectangle.style.height) <= (i+0.5) * squareSize) {
			rectangle.style.height = i * squareSize + 'px';
		}
		if (parseInt(rectangle.style.top)> (i) * squareSize
			&& parseInt(rectangle.style.top) <= (i + 1) * squareSize) {
			rectangle.style.top = (i+0.5) * squareSize + 'px';
		}
		if (parseInt(rectangle.style.left)> (i) * squareSize
			&& parseInt(rectangle.style.left) <= (i + 1) * squareSize) {
			rectangle.style.left = (i+0.5) * squareSize + 'px';
		}
	}
}

function displayEquation () {
	let factors = document.getElementById('factors');
	let factor1 = parseInt(rectangle.style.height)/squareSize;
	let factor2 = parseInt(rectangle.style.width)/squareSize;
	let multiplication = document.getElementById('multiplication');
	factors.innerText = factor1 + ' x ' + factor2 + ' = ';
	multiplication.innerText = factor1 * factor2;
}

function createLines (parentId, margin, lineClass) {
	for (let i=0; i<gameSize + 1; i++) {
		let line = document.createElement("div");
		line.className = lineClass;
		if (i==0) {
			line.style[margin] = 0.5 * squareSize - 2 + 'px';
		} else {
			line.style[margin] = squareSize - 2 + 'px';

		}

		let parent = document.getElementById(parentId);
		parent.appendChild(line);
	}
}

function createRectangle () {
	let rectangle = document.getElementById('rectangle');
	rectangle.style.height = squareSize + 'px';
	rectangle.style.width = squareSize + 'px';
	rectangle.style.left = 0.5 * squareSize + 'px';
	rectangle.style.top = 0.5 * squareSize + 'px';
}


function displaySqaures () {
	let gameVertical = document.getElementById('game-vertical');
	let gameHorizontal = document.getElementById('game-horizontal');
	let squares = document.getElementById('squares');
	if (gameVertical.style.display == 'none') {
		gameVertical.style.display = ''
	} else {
		gameVertical.style.display = 'none'
	}
	if (gameHorizontal.style.display == 'none') {
		gameHorizontal.style.display = ''
	} else {
		gameHorizontal.style.display = 'none'
	}
}


function displayMultiplication () {
	let multiplication = document.getElementById('multiplication');
	let factor1 = parseInt(rectangle.style.height)/squareSize;
	let factor2 = parseInt(rectangle.style.width)/squareSize;
	if (multiplication.innerText == factor1 * factor2) {
		multiplication.innerText = '';
	} else {
		multiplication.innerText = factor1 * factor2;
	}
}


function addImage (parentId) {
    let image = document.createElement('img');
    document.getElementById(parentId).appendChild(image);
    return image
}

function addMushroomInButton () {
	const mushroom = addImage('mushroom-button');
	mushroom.src = 'mushroom.img';
	mushroom.className = 'mushroom-icon';

}

function addMushroomsInRectangle () {
	removeMushrooms ();
	let rectangle = document.getElementById('rectangle');
	let width = Math.floor(parseInt(rectangle.style.width) / squareSize);
	let height = Math.floor(parseInt(rectangle.style.height) / squareSize)
	for (let i=0; i<width; i++) {
		for (let x=0; x<height; x++) {
			const mushroom = addImage('rectangle');
			mushroom.src = 'mushroom.img';
			mushroom.className = 'mushroom';
			mushroom.style.position = 'absolute';
			mushroom.style.top = (x) * squareSize + 'px';
			mushroom.style.left = (i) * squareSize + 'px';
		}
	}
}

function removeMushrooms () {
	let mushrooms = document.getElementsByClassName('mushroom');
	let rectangle = document.getElementById('rectangle');
	Array.from(mushrooms).forEach(function (mushroom) {rectangle.removeChild(mushroom)});
}

function displayMushrooms () {
	let mushrooms = document.getElementsByClassName('mushroom');

	Array.from(mushrooms).forEach(function (mushroom) {
		
		if (mushroom.style.display == 'none') {
			mushroom.style.display = 'block';
		} else {
			mushroom.style.display = 'none';
		}
		console.log (mushroom.style.display);
	})
}
