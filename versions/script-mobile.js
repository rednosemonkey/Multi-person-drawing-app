var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		// lineWidth = 4,
		draw = false,
		cords = [],
		socket = io.connect('http://127.0.0.1:3000');

		socket.on('apple', function(data) {
			pushLine(data);
		});

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	var ifTouch = ('ontouchstart' in window),
			startEvent = ifTouch ? 'touchstart' : 'mousedown',
			moveEvent = ifTouch ? 'touchmove' : 'mousemove',
			endEvent = ifTouch ? 'touchend' : 'mouseup';

	canvas.addEventListener(startEvent, drawStart, false);
	canvas.addEventListener(moveEvent, drawing, true);
	canvas.addEventListener(endEvent, endDraw, false);

	function pushLine(data){
		drawLine(data.cords);
	}
	
	function drawing(e){
		if (!draw) return;
		var x = ifTouch ? (e.targetTouches[0].pageX - canvas.offsetLeft) : (e.offsetX || e.layerX - canvas.offsetLeft);
		var y = ifTouch ? (e.targetTouches[0].pageY - canvas.offsetTop) : (e.offsetY || e.layerY - canvas.offsetTop);

		cords.push({
			x: x,
			y: y
		});

		drawLine(cords) //draws on own canvas
	}
	
	function drawStart(e){
		e.preventDefault();
		draw = true;
	}
	
	function endDraw(){
		draw = false;

		socket.emit('banana', {
		  cords: cords
		});

		cords = [];
	}
		 
	function drawLine(cords){
		context.beginPath();
		context.moveTo(cords[0].x, cords[0].y);

		for (var i=1; i<cords.length; i++) {
			context.lineTo(cords[i].x, cords[i].y);
		}
		context.stroke();
	}

// clear canvas

	var clearButton = document.getElementById('clear');

	clearButton.addEventListener('click', clearCanvas, false);

	function clearCanvas(){
		context.clearRect(0, 0, canvas.width, canvas.height);
	}
