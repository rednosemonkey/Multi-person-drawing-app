var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		lineWidth = 2,
		socket = io.connect('http://127.0.0.1:3000');

		socket.on('apple', function(data) {
			drawLine(data.x, data.y);
		});

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	// context.lineWidth = lineWidth;
	
	function doDraw(e){
		canvasX = e.targetTouches[0].pageX - canvas.offsetLeft;
		canvasY = e.targetTouches[0].pageY - canvas.offsetTop;

		socket.emit('banana', {
		  x: canvasX,
		  y: canvasY
		});

		drawLine(canvasX, canvasY) //draws on own canvas
	}
	
	function doTouchStart(e){
		e.preventDefault();
		// context.moveTo(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
	}
	
	function doTouchEnd(){
		context.beginPath();
	}

	canvas.addEventListener('touchstart', doTouchStart, false);
	canvas.addEventListener('touchend', doTouchEnd, false);
	canvas.addEventListener('touchmove', doDraw, true);
		 
	function drawLine(canvasX, canvasY){
		context.lineTo(canvasX, canvasY);
		context.lineJoin = context.lineCap = 'round';
		context.lineWidth = lineWidth;
		context.shadowBlur = lineWidth / 3;
		context.stroke();
	}

// clear canvas

	var clearButton = document.getElementById('clear');

	clearButton.addEventListener('click', clearCanvas, false);

	function clearCanvas(){
		context.clearRect(0, 0, canvas.width, canvas.height);
	}
