/*!
 * jQuery Text Typer
 * 
 * @version : 1.1.0
 * @author : Pathik Gandhi (http://pathikgandhi.info)
 * @plugin_uri : https://github.com/gr8pathik/canvas-bouncingballs
 * @plugin_demo : http://labs.pathikgandhi.info/canvas/bouncingballs/
 */
 
// Make sure we don't execute when canvas isn't supported
var canvas = document.getElementById("myCanvas");
var pause = true;
var circle = []; //circles array
var isCanvasSupported = false;
var context = '';
if (canvas.getContext){				
	isCanvasSupported = true;
	context = canvas.getContext('2d');
}

var addCircleBtn = document.getElementById("addCircle");
var startBtn = document.getElementById("startAnim");
var stopBtn = document.getElementById("stopAnim");
var totalCircleBtn = document.getElementById("totalCircles");
var aminStatusBtn = document.getElementById("aminStatus");
var resetAnimBtn = document.getElementById("resetAnim");

var radiusWidth = 50;
var interTime = 50;
var defaultOption = {};
defaultOption.x = 100;
defaultOption.y = 100;

if(isCanvasSupported){
	addCircle();
	setInterval(function(){
		if(pause){
			animateCircle();
		}
	}, interTime);
	canvas.addEventListener('click', function(e){
		console.log(e);
		var x;
		var y;
		var thisradius = (radiusWidth*Math.random());
		if (e.offsetX || e.offsetY) { 
		  x = e.offsetX;
		  y = e.offsetY;
		}
		else { 
		  x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
		  y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
		} 
		x -= canvas.offsetLeft;
		y -= canvas.offsetTop;

		console.log(x, y);
		//addCircle(thisx, thisy, thisradius);
		addCircle(x, y, thisradius);
	}, false);

	if(addCircleBtn){
		addCircleBtn.addEventListener('click', function(e){
			var thisradius = (radiusWidth*Math.random());
			addCircle(undefined, undefined, thisradius)
		}, false);
	}
	
	if(startBtn){
		startBtn.addEventListener('click', function(){		
			pause = true;
			aminStatusChange();
		},false);
	}

	if(resetAnimBtn){
		resetAnimBtn.addEventListener('click', function(){
			circle = [];
			addCircle();
		});
	}

	if(stopBtn){
		stopBtn.addEventListener('click', function(){		
			pause = false;
			aminStatusChange();
		},false);
	}
	aminStatusChange();
}else{
	alert('Canvas is not supported in you browser.')
}

function degree(value){
	return value * (Math.PI / 180);
}

function addCircle(x, y, radius){
	// If x is not defined
	if(typeof x == 'undefined'){
		//get the random position between 1 and canvas.width
		x = getRandomInt(1,canvas.width);
	}

	// If y is not defined
	if(typeof y == 'undefined'){
		//get the random position between 1 and canvas.height
		y = getRandomInt(1,canvas.height);
	}

	// If radius is not defined
	if(typeof radius == 'undefined'){
		radius = (radiusWidth*Math.random());
	}

	// Check if x and y are not in the four corner otherwise the circle will stuck
	if(x < radius){
		x = radius;
	}else if(x > (canvas.width-radius)){
		x = (canvas.width-radius);
	}

	if(y < radius){
		y = radius;
	}else if(y > (canvas.height-radius)){
		y = (canvas.height-radius);
	}

	//add the circle on the place of x and y
	circle.push({x:x,
				 xvc:(3*Math.random()),
				 y:y,
				 yvc:(3*Math.random()),
				 radius:radius,
				 color: 'rgba(' + (Math.random()*238).toFixed(0) + ', ' +
                        (Math.random()*238).toFixed(0) + ', ' +
                        (Math.random()*238).toFixed(0) + ', 1.0)'
				});

	totalCircle();
}

function animateCircle(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	circle.forEach(function(circle){
		context.beginPath();
		//context.arc(circle.x, circle.y, circle.radius, degree(0), degree(360), false);
		context.arc(circle.x, circle.y, circle.radius, degree(0), degree(360), false);
		context.fillStyle = circle.color;
		context.closePath();
		context.fill();
		changePosition(circle);
	});	
}

function changePosition(circle){
	if (circle.x + circle.xvc + circle.radius > canvas.width ||
       circle.x + circle.xvc - circle.radius < 0){
      circle.xvc = -circle.xvc;
  	}

   	if (circle.y + circle.yvc + circle.radius > canvas.height ||
       circle.y + circle.yvc - circle.radius  < 0) {
      circle.yvc= -circle.yvc;
    }

	circle.x += circle.xvc;
	circle.y += circle.yvc;
}

function totalCircle(){
	if(totalCircleBtn) totalCircleBtn.innerText  = circle.length;
}

function aminStatusChange(){
	if(aminStatusBtn) aminStatusBtn.innerText  = (pause == false)?"Stopped":"Running";
}

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}