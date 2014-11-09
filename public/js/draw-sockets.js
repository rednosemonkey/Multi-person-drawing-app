window.onload = function(){
	"use strict";

	var allMessages = [],
			message = document.getElementById("message"),
			messageContent = document.getElementById("message-content"),
			form = document.getElementById('message-box'),
			socket = io.connect('http://drawwithfriend.com:8001');

	socket.on('message', function (msg) {
		allMessages.push(msg.message);
		var html = '';

		if(allMessages.length <= 3) {
			for(var i = 0, j = allMessages.length; i < j; i++) {
					html += '<li>' + allMessages[i] + '</li>';
			}
		} else {
			allMessages.shift(msg.message);
			for(var i = 0, j = allMessages.length; i < j; i++) {
					html += '<li>' + allMessages[i] + '</li>';
			}
		}
		messageContent.innerHTML = html;
	});

	form.onsubmit = function(e) {
		socket.emit('send', { message: message.value });
		allMessages.push(message.value);
		var html = '';

		if(allMessages.length <= 3) {
			for(var i = 0, j = allMessages.length; i < j; i++) {
					html += '<li>' + allMessages[i] + '</li>';
			}
		} else {
			allMessages.shift(message.value);
			for(var i = 0, j = allMessages.length; i < j; i++) {
					html += '<li>' + allMessages[i] + '</li>';
			}
		}
		messageContent.innerHTML = html;
		message.value = '';
		e.preventDefault();
	};

//draw function
	var canvasSupport = document.getElementById('canvas-support'),
			canvas = document.createElement('canvas'),
			context = canvas.getContext('2d');

	canvas.setAttribute('id', 'canvas');
	canvasSupport.appendChild(canvas);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var lineWidth = 2,
			draw = false,
			cords = [],
			color,
			// http://127.0.0.1:8001 for local testing
			socket = io.connect('http://drawwithfriend.com:8001');

	socket.on('apple', function(data) {
		drawLine(data.cords, data.lineWidth, data.color);
	});

	var ifTouch = ('ontouchstart' in window),
			startEvent = ifTouch ? 'touchstart' : 'mousedown',
			moveEvent = ifTouch ? 'touchmove' : 'mousemove',
			endEvent = ifTouch ? 'touchend' : 'mouseup';

	canvas.addEventListener(startEvent, drawStart, false);
	canvas.addEventListener(moveEvent, drawing, true);
	canvas.addEventListener(endEvent, endDraw, false);

	// function pushLine(data){
	// 	drawLine(data.cords, data.lineWidth, data.color);
	// }

	// function pushColor(data){
	// 	setColor(data.color);
	// }

	function drawing(e){
		if (!draw) return;
		var x = ifTouch ? (e.targetTouches[0].pageX - canvas.offsetLeft) : (e.offsetX || e.layerX - canvas.offsetLeft);
		var y = ifTouch ? (e.targetTouches[0].pageY - canvas.offsetTop) : (e.offsetY || e.layerY - canvas.offsetTop);

		cords.push({
			x: x,
			y: y
		});

		drawLine(cords, lineWidth, color) //draws on own canvas
	}

	function drawStart(e){
		e.preventDefault();
		draw = true;
	}

	function endDraw(){
		draw = false;
		canvas.style.cursor = "default";

		socket.emit('banana', {
			cords: cords,
			lineWidth: lineWidth,
			color: color
		});

		cords = [];
	}

	function drawLine(cords, lineWidth, color){
		canvas.style.cursor = "crosshair";
		context.beginPath();
		context.moveTo(cords[0].x, cords[0].y);

		for (var i=1; i<cords.length; i++) {
			context.lineTo(cords[i].x, cords[i].y);
		}
		context.lineJoin = context.lineCap = 'round';
		context.lineWidth = lineWidth;
		context.stroke();
	}


// Change brush type

	var	brushTypeBtn = document.getElementById('brush-type');

	brushTypeBtn.addEventListener('click', changeBrushType, false);

	context.shadowBlur = Math.round(lineWidth / 3);

	function changeBrushType(){
		if (brushTypeBtn.classList.contains('icon-pencil')) {
			brushTypeBtn.classList.remove('icon-pencil');
			brushTypeBtn.classList.add('icon-pen');
			context.shadowBlur = Math.round(lineWidth / 3);
		} else if (brushTypeBtn.classList.contains('icon-pen')) {
			brushTypeBtn.classList.remove('icon-pen');
			brushTypeBtn.classList.add('icon-pencil');
			context.shadowBlur = 0;
		}
	}

// change line width

	var lineWithOutput = document.getElementById('line-width'),
			brushSizeBtn = document.getElementById('rangeSlider');

	brushSizeBtn.addEventListener('click', toggleRangeSlider, false);
	brushSizeBtn.addEventListener('change', updateLineWidth, false);

	lineWithOutput.innerHTML = lineWidth;

	function updateLineWidth(newSize) {
		newSize = brushSizeBtn.value;
		lineWithOutput.innerHTML = newSize;
		lineWidth = newSize;
		if (brushTypeBtn.classList.contains('icon-pen')) {
			context.shadowBlur = Math.round(newSize / 3);
		}
	}

	function toggleRangeSlider() {
		brushSizeBtn.classList.toggle('show-slider');
	}

	// color button menu and change line color

	var menuButton = document.getElementById('color-menu-button'),
			drop = document.getElementsByClassName('drop-down')[0],
			rise = document.getElementsByClassName('rise-up')[0],
			menuButtonBg = document.getElementsByTagName('nav')[0];

	menuButton.addEventListener('click', menuClick, false);

	function menuClick(){
		if (menuButton.classList.contains('drop-down')){
			menuButton.classList.remove('drop-down');
			menuButton.classList.add('rise-up');
			menuButtonBg.classList.remove('open-whole');
		} else {
			menuButtonBg.classList.add('open-whole');
			menuButton.classList.remove('rise-up');
			menuButton.classList.add('drop-down');
		}
	}

	var swatches = document.getElementById('swatches');
	var colors = ["#2c3e50", "#3498db", "#2ecc71", "#e74c3c", "#9b59b6", "#f1c40f", "#000", "pink"];

	for(var i = 0, j = colors.length; i<j; i++){
		var swatch = document.createElement('li');
		swatch.style.backgroundColor = colors[i];
		swatches.appendChild(swatch); // inject swatches into HTML.
	}

	swatches.addEventListener('click', setSwatch, false);

	function setSwatch(e){
		var target = e.target,
				selected = swatches.querySelector("li.selected"),
				// selected = document.getElementsByClassName('selected')[0];
				newColor = target.style.backgroundColor;

		if(selected){
			selected.classList.remove('selected');
		}

		if(target.nodeName.toLowerCase() === 'li'){
			target.classList.toggle('selected');
			if (menuButton.classList.contains('drop-down')) {
				menuButton.classList.remove('drop-down');
				menuButton.classList.add('rise-up');
			}
			menuButtonBg.classList.remove('open-whole');
		}

		context.strokeStyle = context.shadowColor = newColor;
	}

	// function setColor(color){
	// 	context.strokeStyle = context.shadowColor = color;
	// }

setSwatch( { target: swatches.querySelector('li') } );

// clear canvas

	var clearButton = document.getElementById('clear');

	clearButton.addEventListener('click', clearCanvas, false);

	function clearCanvas(){
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

// save image

	var saveButton = document.getElementById('save');

	saveButton.addEventListener('click', saveImage, false);

	function saveImage(){
		var data = canvas.toDataURL();

		window.open(data, '_blank', 'location=0, menubar=0');
	}

}
