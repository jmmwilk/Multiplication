'use strict';

let squareSize = 45;
let gameSize = 10;
let mushroomsShown = false;
let horLinesShown = false;
let verLinesShown = false;
let sidesShown = false;
let multiplicationShown = false;
let numbersContainersShown = false;
let resultShown = true;
let factor1;
let factor2;
let okCount = false;
let view;

function showHomeScreen () {
	let name = document.getElementById('name');
	let activitiesContainer = document.getElementById('activities-container');
	name.style.display = '';
	activitiesContainer.style.display = '';
	let titleBar = document.getElementById('title-bar');
	let frame = document.getElementById('frame');
	titleBar.style.display = 'none';
	frame.style.display = 'none';
	let sideBarExplore = document.getElementById('side-bar-explore');
	sideBarExplore.style.display = 'none';
	let explore = document.getElementById('explore');
	explore.onclick = goToExplore;
	let learn = document.getElementById('learn');
	learn.onclick = goToLearn;
	let play = document.getElementById('play');
	play.onclick = goToPlay;
}

function hideHomeScreen () {
	let name = document.getElementById('name');
	let activitiesContainer = document.getElementById('activities-container');
	name.style.display = 'none';
	activitiesContainer.style.display = 'none';
}

function goToExplore () {
	hideHomeScreen ();
	showExploreScreen ();
	startExplore();
}

function showExploreScreen () {
	let titleBar = document.getElementById('title-bar');
	let frame = document.getElementById('frame');
	let sideBarExplore = document.getElementById('side-bar-explore');
	titleBar.style.display = '';
	frame.style.display = '';
	sideBarExplore.style.display = '';
}

function cleanUp () {
	removeMushrooms ();
	hideMushrooms();
	removeSidesNumbers ();
	hideSides ();
	removeHLines ()
	hideHorizontalDivision ();
	removeVLines ()
	hideVerticalDivision ();
	removeNumbersContainers ();
	hideNumbersContainers ();
	hideMultiplication ();
	multiplicationShown = false;
	hideMultiplicationLearn ();
	createGame ();
	makeRectangle ();
	goBack();
}

function startExplore () {
	cleanUp ();
	displayEquation ();
	displayButtons ();
	let ok = document.getElementById('ok');
	ok.style.display = 'none';
	let rectangle = document.getElementById('rectangle');
	let frame = document.getElementById('frame');
	let dots = document.getElementsByClassName('dot');
	Array.from(dots).forEach(function(dot) {
		dot.onmousedown = function () {
			frame.onmousemove = function(event){
				resizeRectangle(event, dot);
				resizeRecHorizontal ();
				resizeRecVertical ();
				addMushroomsInRectangle ();
				placeSidesNumbers ();
				putSidesNumbers ();
				horizontalDivision (dot);
				verticalDivision (dot);
				createNumbersContainers ();
			};
			frame.onmouseup = function () {
				frame.onmousemove = undefined;
				frame.onmouseup = undefined;
				adjustRectangle (lastPosition, lastDimensions);
				resizeRecHorizontal ();
				resizeRecVertical ();
				displayEquation ();
				showNewMultiplication ();
				placeSidesNumbers ();
				putSidesNumbers ();
				addMushroomsInRectangle ();
				horizontalDivision (dot);
				verticalDivision (dot);
				createNumbersContainers ();
				countMushrooms ();
			}
		}
	})
	let hand = document.getElementById('hand');
	hand.onmousedown = function () {
		let lastPosition = rectanglePosition();
		frame.onmousemove = function (event) {
			moveRectangle (event)
		};
		frame.onmouseup = function (event) {
			frame.onmousemove = undefined;
			frame.onmouseup = undefined;
			adjustRectangle (lastPosition, lastDimensions);
			putRectangleInNewPosition (lastPosition);
		}
	}
}

function displayButtons () {
	let squares = document.getElementById('squares');
	squares.onclick = displaySqaures;

	multiplication.onclick = displayMultiplication;

	let mushroomButton = document.getElementById('mushroom-button');
	mushroomButton.onclick = displayMushrooms;

	let sidesButton = document.getElementById('sides-button');
	sidesButton.onclick = displaySides;

	let horizontalDivButton = document.getElementById('horizontal-div-button');
	horizontalDivButton.onclick = displayHorizontalDivision;

	let verticalDivButton = document.getElementById('vertical-div-button');
	verticalDivButton.onclick = displayVerticalDivision;

	let countingButton = document.getElementById('counting-button');
	countingButton.onclick = displayNumbersContainers;
}

function goBack() {
	let back = document.getElementById('back');
	back.onclick = function() {
		showHomeScreen();
	}
}

function createGame () {
	let gameVertical = document.getElementById('game-vertical');
	gameVertical.style.display = '';
	gameVertical.style.height = (1 + gameSize) * squareSize + 'px';
	gameVertical.style.width = (1 + gameSize) * squareSize + 'px';
	let gameHorizontal = document.getElementById('game-horizontal');
	gameHorizontal.style.display = '';
	gameHorizontal.style.height = (1 + gameSize) * squareSize + 'px';
	gameHorizontal.style.width = (1 + gameSize) * squareSize + 'px';

	removeLines ('game-vertical', 'line-vertical');
	removeLines ('game-horizontal', 'line-horizontal');
	createLines ('game-vertical', 'marginLeft', 'line-vertical');
	createLines ('game-horizontal', 'marginTop', 'line-horizontal');
}

function createNumbersContainers () {
	removeNumbersContainers ();
	let rectangle = document.getElementById('rectangle');
	let width = Math.floor(parseInt(rectangle.style.width) / squareSize);
	let height = Math.floor(parseInt(rectangle.style.height) / squareSize);
	let number = 0;
	for (let i=0; i<width; i++) {
		for (let x=0; x<height; x++) {
			const numberContainer = document.createElement('div');
			numberContainer.className = 'number-container';
			numberContainer.style.height = squareSize + 'px';
			numberContainer.style.width = squareSize + 'px';
			number = number + 1;
			numberContainer.innerText = number;
			rectangle.appendChild(numberContainer);
			if (numbersContainersShown == false) {
				numberContainer.style.display = 'none';
			}
		}
	}
}

function removeNumbersContainers () {
	let rectangle = document.getElementById('rectangle');
	let numbersContainers = document.getElementsByClassName('number-container');
	numbersContainersShown = false;
	Array.from(numbersContainers).forEach(function(numberContainer){rectangle.removeChild(numberContainer)}) 
}

function hideNumbersContainers () {
	let numbersContainers = document.getElementsByClassName('number-container');
	Array.from(numbersContainers).forEach(function(numberContainer){
		numberContainer.style.display = 'none'
	})
	numbersContainersShown = false;
}

function displayNumbersContainers () {
	let numbersContainers = document.getElementsByClassName('number-container');
	Array.from(numbersContainers).forEach(function(numberContainer){
		if (numberContainer.style.display == 'none') {
			numberContainer.style.display = ''
			hideMushrooms ();
		} else {
			numberContainer.style.display = 'none'
		}
	})
	numbersContainersShown = !numbersContainersShown;
}

function displaySides () {
	let sides = document.getElementsByClassName('side');
	for (let i=0; i<sides.length; i++) {
		if (sides[i].style.display == 'none') {
			sides[i].style.display = '';
		} else {
			sides[i].style.display = 'none'
		}
	sidesShown = !sidesShown;
	}
}

function hideSides () {
	let sides = document.getElementsByClassName('side');
	for (let i=0; i<sides.length; i++) {
		sides[i].style.display = 'none';
	}
	sidesShown = !sidesShown;
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

function removeSidesNumbers () {
	let rectangle = document.getElementById('rectangle');
	let sides = document.getElementsByClassName('sides')
	Array.from(sides).forEach(function (side) {rectangle.removeChild(side)});
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

function resizeRecHorizontal () {
	let rectangleHorizontal = document.getElementById('rectangle-horizontal');
	let rectangle = document.getElementById('rectangle');
	rectangleHorizontal.style.height = parseInt(rectangle.style.height) - 4 + 'px';
	rectangleHorizontal.style.width = parseInt(rectangle.style.width) - 4 + 'px';
}

function resizeRecVertical () {
	let rectangle = document.getElementById('rectangle');
	let rectangleVertical = document.getElementById('rectangle-vertical');
	rectangleVertical.style.height = parseInt(rectangle.style.height) - 4 + 'px';
	rectangleVertical.style.width = parseInt(rectangle.style.width) - 4 + 'px';
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

function rectangleDimensions () {
	let rectangle = document.getElementById('rectangle');
	let dimensions = {
		width: rectangle.style.width,
		height: rectangle.style.height,
	}
	return dimensions;
}

function adjustRectangleDimensions (lastDimensions, isNewSpaceFree) {
	let rectangle = document.getElementById('rectangle');
	if (isNewSpaceFree == false) {
		rectangle.style.width = lastDimensions.width;
		rectangle.style.height = lastDimensions.height;
	}
}

function adjustRectangle (lastPosition, lastDimensions) {
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
	if (parseInt(rectangle.style.top)< 0.5 * squareSize) {
		rectangle.style.top = 0.5 * squareSize + 'px';
	}
	if (parseInt(rectangle.style.left)< 0.5 * squareSize) {
		rectangle.style.left = 0.5 * squareSize + 'px';
	}
	if (parseInt(rectangle.style.right)> (gameSize + 0.5) * squareSize) {
		rectangle.style.right = (gameSize + 0.5) * squareSize + 'px';
	}
	if (parseInt(rectangle.style.bottom)> (gameSize + 0.5) * squareSize) {
		rectangle.style.bottom = (gameSize + 0.5) * squareSize + 'px';
	}

	if (parseInt(rectangle.style.width)> gameSize * squareSize) {
			rectangle.style.width = gameSize * squareSize + 'px';
	}
	if (parseInt(rectangle.style.height)> gameSize * squareSize) {
			rectangle.style.height = gameSize * squareSize + 'px';
	}
	let isNewSpaceFree = isSpaceFree ();
	putRectangleInNewPosition (lastPosition, isNewSpaceFree);
	adjustRectangleDimensions (lastDimensions, isNewSpaceFree);
}

function displayEquation () {
	let factors = document.getElementById('factors');
	let factor1 = parseInt(rectangle.style.height)/squareSize;
	let factor2 = parseInt(rectangle.style.width)/squareSize;
	factors.innerText = factor1 + ' x ' + factor2 + ' = ';
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

function removeLines (parentId, lineClass) {
	let lines = document.getElementsByClassName(lineClass);
	let rectangleName = document.getElementById(parentId);
	Array.from(lines).forEach(function (line) {rectangleName.removeChild(line)});
}

function makeRectangle () {
	let rectangle = document.getElementById('rectangle');
	rectangle.style.height = squareSize + 'px';
	rectangle.style.width = squareSize + 'px';
	rectangle.style.left = 0.5 * squareSize - 1 + 'px';
	rectangle.style.top = 0.5 * squareSize - 1 + 'px';
}


function displaySqaures () {
	let gameVertical = document.getElementById('game-vertical');
	let gameHorizontal = document.getElementById('game-horizontal');
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

function countMultiplication () {
	let factor1 = parseInt(rectangle.style.height)/squareSize;
	let factor2 = parseInt(rectangle.style.width)/squareSize;
	let multiplication = factor1 * factor2;
	return multiplication
}

function showNewMultiplication () {
	let multiplication = document.getElementById('multiplication');
	if (multiplicationShown == true) {
		multiplication.innerText = countMultiplication ();
	}
}

function displayMultiplication () {
	let multiplication = document.getElementById('multiplication');
	let factor1 = parseInt(rectangle.style.height)/squareSize;
	let factor2 = parseInt(rectangle.style.width)/squareSize;
	if (multiplicationShown == false) {
		multiplication.innerText = countMultiplication ();
	} else {
		multiplication.innerText = '';
	}
	multiplicationShown = !multiplicationShown
}

function hideMultiplication () {
	let multiplication = document.getElementById('multiplication');
	multiplication.innerText = '';
}

function addImage (parentId) {
    let image = document.createElement('img');
    document.getElementById(parentId).appendChild(image);
    return image
}

function addMushroomsInRectangle () {
	removeMushrooms ();
	let rectangle = document.getElementById('rectangle');
	let width = Math.floor(parseInt(rectangle.style.width) / squareSize);
	let height = Math.floor(parseInt(rectangle.style.height) / squareSize);
	for (let i=0; i<width; i++) {
		for (let x=0; x<height; x++) {
			const mushroom = addImage('rectangle');
			mushroom.src = 'mushroom.img';
			mushroom.className = 'mushroom';
			mushroom.style.position = 'absolute';
			mushroom.style.top = (x) * squareSize + 'px';
			mushroom.style.left = (i) * squareSize + 'px';
			if (mushroomsShown == false) {
				mushroom.style.display = 'none';
			}
		}
	}
}

function removeMushrooms () {
	let mushrooms = document.getElementsByClassName('mushroom');
	let rectangle = document.getElementById('rectangle');
	Array.from(mushrooms).forEach(function (mushroom) {rectangle.removeChild(mushroom)});
}

function hideMushrooms () {
	let mushrooms = document.getElementsByClassName('mushroom');
	Array.from(mushrooms).forEach(function (mushroom) {
		mushroom.style.display = 'none';
	})
	mushroomsShown = false;
}

function displayMushrooms () {
	let mushrooms = document.getElementsByClassName('mushroom');
	Array.from(mushrooms).forEach(function (mushroom) {
		if (mushroomsShown == false) {
			mushroom.style.display = 'block';
		} else {
			mushroom.style.display = 'none';
		}
		// if (mushroom.style.display == 'none') {
		// 	mushroom.style.display = 'block';
		// 	hideNumbersContainers ();
		// } else {
		// 	mushroom.style.display = 'none';
		// }
	})
	mushroomsShown = !mushroomsShown;
}

function countMushrooms () {
	let rectangle = document.getElementById('rectangle');
	let width = Math.floor(parseInt(rectangle.style.width) / squareSize);
	let height = Math.floor(parseInt(rectangle.style.height) / squareSize);
	let mushrooms = document.getElementsByClassName('mushroom');
	let thereIsAMushroom;
	Array.from(mushrooms).forEach(function (mushroom) {
		mushroom.onclick = function () {
			mushroom.style.display = 'none'
			for (let i=0; i<height*width; i++) {
				if (mushroom.style.display == '') {
					thereIsAMushroom = true;
				}
				if (thereIsAMushroom !== true) {
				mushroomsShown = false;
				}
			}
		}
	})
}

function horizontalDivision (dot) {
	removeHLines ();
	let rectangle = document.getElementById('rectangle');
	let rectangleHorizontal = document.getElementById('rectangle-horizontal');
	let width = Math.floor(parseInt(rectangle.style.width) / squareSize);
	let height = Math.floor(parseInt(rectangle.style.height) / squareSize);
	for (let i=0; i<height - 1; i++) {
		let line = document.createElement("div");
		line.className = 'line-horizontal-rec';
		line.style.width = height * squareSize;
		rectangleHorizontal.appendChild(line);
		if (dot.id == 'dot-bottom-left' || dot.id == 'dot-bottom-right') {
			rectangleHorizontal.style.flexDirection = 'column';
			line.style.marginTop = squareSize - 4 + 'px';
		}
		if (dot.id == 'dot-top-right' || dot.id == 'dot-top-left') {
			rectangleHorizontal.style.flexDirection = 'column-reverse';
			line.style.marginBottom = squareSize - 4 + 'px';
		}
		if (horLinesShown == false) {
		line.style.display = 'none';
		}
	}
}

function displayHorizontalDivision() {
	let lines = document.getElementsByClassName('line-horizontal-rec');
	Array.from(lines).forEach(function (line) {
		if (line.style.display == 'none') {
			line.style.display = 'block';
			hideVerticalDivision ();
		} else {
			line.style.display = 'none';
		}
	})
	horLinesShown = !horLinesShown;
}

function hideHorizontalDivision () {
	let lines = document.getElementsByClassName('line-horizontal-rec');
	Array.from(lines).forEach(function (line) {
		line.style.display = 'none';
	})
	horLinesShown = false;
}

function removeHLines () {
	let lines = document.getElementsByClassName('line-horizontal-rec');
	let rectangleHorizontal = document.getElementById('rectangle-horizontal');
	Array.from(lines).forEach(function (line) {rectangleHorizontal.removeChild(line)});
}

function verticalDivision (dot) {
	removeVLines ();
	let rectangle = document.getElementById('rectangle');
	let rectangleVertical = document.getElementById('rectangle-vertical');
	let width = Math.floor(parseInt(rectangle.style.width) / squareSize);
	let height = Math.floor(parseInt(rectangle.style.height) / squareSize);
	for (let i=0; i<width - 1; i++) {
		let line = document.createElement("div");
		line.className = 'line-vertical-rec';
		line.style.width = width * squareSize;
		rectangleVertical.appendChild(line);
		if (dot.id == 'dot-bottom-left' || dot.id == 'dot-top-left') {
			rectangleVertical.style.flexDirection = 'row-reverse';
			line.style.marginRight = squareSize - 4 + 'px';
		}
		if (dot.id == 'dot-bottom-right' || dot.id == 'dot-top-right') {
			rectangleVertical.style.flexDirection = 'row';
			line.style.marginLeft = squareSize - 4 + 'px';
		}
		if (verLinesShown == false) {
			line.style.display = 'none';
		}
	}
}

function hideVerticalDivision () {
	let lines = document.getElementsByClassName('line-vertical-rec');
	Array.from(lines).forEach(function (line) {
		line.style.display = 'none';
	})
	verLinesShown = false;
}

function removeVLines () {
	let lines = document.getElementsByClassName('line-vertical-rec');
	let rectangleVertical = document.getElementById('rectangle-vertical');
	Array.from(lines).forEach(function (line) {rectangleVertical.removeChild(line)});
}


function displayVerticalDivision() {
	let lines = document.getElementsByClassName('line-vertical-rec');
	Array.from(lines).forEach(function (line) {
		if (line.style.display == 'none') {
			line.style.display = 'block';
			hideHorizontalDivision ();
		} else {
			line.style.display = 'none';
		}
	})
	verLinesShown = !verLinesShown;
}


function showPlayScreen () {
	let titleBar = document.getElementById('title-bar');
	let frame = document.getElementById('frame');
	titleBar.style.display = '';
	frame.style.display = '';
	let sideBarExplore = document.getElementById('side-bar-explore');
	sideBarExplore.style.display = '';
}

function goToLearn () {
	hideHomeScreen ();
	showLearnScreen();
	startLearn();
}

function showLearnScreen () {
	let titleBar = document.getElementById('title-bar');
	let frame = document.getElementById('frame');
	titleBar.style.display = '';
	frame.style.display = '';
	let sideBarExplore = document.getElementById('side-bar-explore');
	sideBarExplore.style.display = '';
}

function startLearn () {
	cleanUp ();
	hideMultiplicationBox ();
	displayButtons ();
	let ok = document.getElementById('ok');
	ok.style.display = '';
	newExercise ();

	let dots = document.getElementsByClassName('dot');
	Array.from(dots).forEach(function(dot) {
		dot.onmousedown = function () {
			frame.onmousemove = function(event){
				resizeRectangle(event, dot);
				resizeRecHorizontal ();
				resizeRecVertical ();
				addMushroomsInRectangle ();
				placeSidesNumbers ();
				putSidesNumbers ();
				horizontalDivision (dot);
				verticalDivision (dot);
				createNumbersContainers ();
			};
			frame.onmouseup = function () {
				frame.onmousemove = undefined;
				frame.onmouseup = undefined;
				adjustRectangle ();
				resizeRecHorizontal ();
				resizeRecVertical ();
				placeSidesNumbers ();
				putSidesNumbers ();
				addMushroomsInRectangle ();
				horizontalDivision (dot);
				verticalDivision (dot);
				createNumbersContainers ();
				countMushrooms ();
			}
		}
	})
	let hand = document.getElementById('hand');
	hand.onmousedown = function () {
		frame.onmousemove = function (event) {
			moveRectangle (event)
		};
		frame.onmouseup = function () {
			frame.onmousemove = undefined;
			frame.onmouseup = undefined;
			adjustRectangle ();
		}
	}
}

function goToPlay () {
	hideHomeScreen ();
	showPlayScreen();
	startPlay();
}

function startPlay () {
	cleanUp ();
	view = 'play';
	hideMultiplicationBox ();
	displayButtons ();
	mushroomsShown = true;
	let ok = document.getElementById('ok');
	ok.style.display = '';
	let lastPosition;
	let lastDimensions;
	newExercise ();

	let dots = document.getElementsByClassName('dot');
	Array.from(dots).forEach(function(dot) {
		dot.onmousedown = function () {
			lastPosition = rectanglePosition();
			lastDimensions = rectangleDimensions();
			frame.onmousemove = function(event){
				resizeRectangle(event, dot);
				resizeRecHorizontal ();
				resizeRecVertical ();
				addMushroomsInRectangle ();
			};
			frame.onmouseup = function () {
				frame.onmousemove = undefined;
				frame.onmouseup = undefined;
				adjustRectangle (lastPosition, lastDimensions);
				resizeRecHorizontal ();
				resizeRecVertical ();
				addMushroomsInRectangle ();
			}
		}
	})
	let hand = document.getElementById('hand');
	hand.onmousedown = function () {
		lastPosition = rectanglePosition();
		lastDimensions = rectangleDimensions();
		frame.onmousemove = function (event) {
			moveRectangle (event)
		};
		frame.onmouseup = function (event) {
			frame.onmousemove = undefined;
			frame.onmouseup = undefined;
			adjustRectangle (lastPosition, lastDimensions);
		}
	}
}

function generateFactors () {
	let factor1 =  Math.floor (Math.random () * 5) + 1;
	let factor2 =  Math.floor (Math.random () * 5) + 1;
	let factors = [factor1, factor2];
	return factors;
}

function fillFactors (factors) {
	let factor1 = factors[0];
	let factor2 = factors[1];
	let factorsbox = document.getElementById('factors');
	factorsbox.innerText = factor1 + " × " + factor2;
}

function addEquelsSign (factors) {
	let factor1 = factors[0];
	let factor2 = factors[1];
	let factorsbox = document.getElementById('factors');
	factorsbox.innerText = factor1 + " × " + factor2 + " = ";
}

function hideMultiplicationBox () {
	let multiplication = document.getElementById('multiplication');
	multiplication.style.display = 'none';
}

function hideMultiplicationLearn () {
	let multiplicationLearn = document.getElementById('multiplication-learn');
	multiplicationLearn.style.display = 'none';
}

function showMultiplicationLearn () {
	let multiplicationLearn = document.getElementById('multiplication-learn');
	multiplicationLearn.style.display = '';
}

function displayResult () {
	let result = document.getElementById('result');
	if (resultShown == false) {
		result.style.display = 'none';
	} else {
		result.style.display = '';
	}
	resultShown = !resultShown;
}

function okClick (factors) {
	if (okCount == false) {
		check(factors)
	}
	if (okCount == true) {
		if (checkAnswer (factors) == 'wellDone') {
			if (view == 'play') {
				removeMushrooms ();
				createDoneRec (factors);
				createCompRec ();
			}
			newExercise ();
			createNewUserRectangle ();
		}
	}
}

function check (factors) {
	if (checkSize (factors) == true) {
		showMultiplicationLearn ();
		addEquelsSign (factors);
		okCount = !okCount;
		return 'wellDone';
	}
}

function checkAnswer (factors) {
	let multiplicationLearn = document.getElementById('multiplication-learn');
	let factor1 = factors[0];
	let factor2 = factors[1];
	if (multiplicationLearn.value == factor1*factor2) {
		okCount = !okCount;
		return 'wellDone';
	}
}

function newExercise () {
	removeAnswer ();
	hideMultiplicationLearn ();
	let factors = generateFactors ();
	fillFactors (factors);
	let ok = document.getElementById('ok');
	ok.onclick = function () {okClick (factors)};
}

function removeAnswer () {
	let multiplicationLearn = document.getElementById('multiplication-learn');
	multiplicationLearn.value = '';
}

function checkSize (factors) {
	let width = Math.floor(parseInt(rectangle.style.width) / squareSize);
	let height = Math.floor(parseInt(rectangle.style.height) / squareSize);
	let factor1 = factors[0];
	let factor2 = factors[1];
	if (width == factor1
		&& height == factor2) {
		return true
	}
	if (height == factor1
		&& width == factor2) {
		return true
	}
	else {
		return false
	}
}

function createResultBox (parent, factors) {
	let resultBox = document.createElement('div');
	parent.appendChild(resultBox);
	let factor1 = factors[0];
	let factor2 = factors[1];
	let result = document.createElement('div');
	resultBox.appendChild(result)
	result.innerText = factor1 * factor2;
	resultBox.className = 'result-box';
	const mushroom = document.createElement('img');
    resultBox.appendChild(mushroom);
	mushroom.src = 'mushroom.img';
	mushroom.className = 'mushroom-icon';
}

function createDoneRec (factors) {
	let doneRec = document.createElement('div');
	doneRec.className = 'done-rec all-rec';
	let game = document.getElementById('game');
	game.appendChild(doneRec);
	let rectangle = document.getElementById('rectangle');
	doneRec.style.height = rectangle.style.height;
	doneRec.style.width = rectangle.style.width;
	doneRec.style.top = rectangle.style.top;
	doneRec.style.left = rectangle.style.left;
	createResultBox (doneRec, factors);
}

function createCompRec () {
	let factors = generateFactors ();
	let factor1 = factors[0];
	let factor2 = factors[1];
	let compRec = document.createElement('div');
	compRec.className = 'comp-rec all-rec' ;
	createResultBox (compRec, factors);
	let game = document.getElementById('game');
	game.appendChild(compRec);
	compRec.style.height = factor1 * squareSize + 'px';
	compRec.style.width = factor2 * squareSize + 'px';
	let allRecs = document.getElementsByClassName ('all-rec');

	for (let x=10; x>=1; x--) {
		for (let y=10; y>=1; y--) {
			for (let i=x; i>=(x - factor2 + 1); i--) {
				for (let j=y; j>=(y - factor1 + 1); j--) {
					let squareIsFree = true;
					Array.from(allRecs).forEach(function(allRec) {
						let a = (allRec.offsetLeft - squareSize/2 - 0.5)/squareSize + 1;
						let b = (allRec.offsetTop - squareSize/2 - 0.5)/squareSize + 1;
						console.log('x, y', x, y)
						console.log ('i,j', i, j)
						console.log ('a, b', a, b);
						if (i>=a && i<=a+factor2-1 && j>=b && j<=b+factor1-1) {
							squareIsFree = false;
							console.log ('squareIsFree', squareIsFree);
							return
						}
					})
					if (squareIsFree == true) {
						compRec.style.left = (x - factor2 + 1)*squareSize - squareSize/2 + 'px';
						compRec.style.top = (y - factor1 + 1)*squareSize - squareSize/2 + 'px';
		 				return
		 			}
				}
			}
		}
	}
}

function createNewUserRectangle () {
	let allRecs = document.getElementsByClassName ('all-rec');
	let rectangle = document.getElementById('rectangle');
	for (let x=1; x<=10; x++) {
		for (let y=1; y<=10; y++) {
			let squareIsFree = true;
			Array.from(allRecs).forEach(function(allRec) {
				let a = (allRec.offsetLeft - squareSize/2 - 0.5)/squareSize + 1;
				let b = (allRec.offsetTop - squareSize/2 - 0.5)/squareSize + 1;
				let allRecWidth = allRec.offsetWidth / squareSize;
				let allRecHeight = allRec.offsetHeight / squareSize;
				if (x>=a && x<=a+allRecWidth-1 && y>=b && y<=b+allRecHeight-1) {
					squareIsFree = false;
					return
				}
			})
			if (squareIsFree == true) {
 				rectangle.style.width = squareSize + 'px';
 				rectangle.style.height = squareSize + 'px';
				rectangle.style.left = (x-1)*squareSize + squareSize/2 + 'px';
 				rectangle.style.top = (y-1)*squareSize + squareSize/2 + 'px';
 				return
 			}
		}
	}
}

function putRectangleInNewPosition (lastPosition, isNewSpaceFree) {
	if (isNewSpaceFree == false) {
		rectangle.style.top = lastPosition.top + 'px';
		rectangle.style.left = lastPosition.left + 'px';
	}
}



function isSpaceFree () {
	let isSpaceFree = true;
	let rectangle = document.getElementById('rectangle');
	let allRecs = document.getElementsByClassName ('all-rec');
	let a;
	let b;
	let x = (rectangle.offsetLeft - squareSize/2 - 0.5) / squareSize + 1;
	let y = (rectangle.offsetTop - squareSize/2 - 0.5) / squareSize + 1;
	let width = rectangle.offsetWidth / squareSize;
	let height = rectangle.offsetHeight / squareSize;
	for (let i = x; i < x + width; i++) {
		for (let j = y; j < y + height; j++) {
			Array.from(allRecs).forEach(function(allRec) {
				a = (allRec.offsetLeft - squareSize/2 - 0.5)/squareSize + 1;
				b = (allRec.offsetTop - squareSize/2 - 0.5)/squareSize + 1;
				let allRecWidth = allRec.offsetWidth / squareSize;
				let allRecHeight = allRec.offsetHeight / squareSize;
				if (i>=a && i<=a+allRecWidth-1 && j>=b && j<=b+allRecHeight-1) {
					isSpaceFree = false;
					return
				}
			})
		}
	}
	return isSpaceFree;
}

function moveRectangle (event) {
	let hand = document.getElementById('hand');
	let mouse = mousePosition (event);
	let rectangle = document.getElementById('rectangle');
	rectangle.style.top = mouse.y + 'px';
	rectangle.style.left = mouse.x -parseInt(rectangle.style.width)/2 + 'px';
}

