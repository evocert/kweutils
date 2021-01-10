//The tracking.js library brings different computer vision algorithms and techniques into the browser environment. By using modern HTML5 specifications, we enable you to do real-time color tracking, face detection and much more — all that with a lightweight core (~7 KB) and intuitive interface.
//https://github.com/eduardolundgren/tracking.js
define([
	"module",
	"jquery",
	"tracking",
	"tracking.face",
	"tracking.eye",
	"tracking.mouth",
],function(
	module,
	jq,
	tracking,
	tf
){
	console.log([module.id,'start'].join(':'));
	console.log(tracking);
	console.log(tf);
	$=jq;
	$("body").append($("<style/>").text(`
		document,body{
			background:#222222;
		}
	`));
	function test0(){//plot image
		$("body").append($("<style/>").text(`
			document,body{
				background:#222222;
			}
			.rect {
				border: 2px solid #a64ceb;
				left: -1000px;
				position: absolute;
				top: -1000px;
			}

			#img {
				position: absolute;
				top: 50%;
				left: 50%;
				margin: -173px 0 0 -300px;
			}		
		`));
		var img=$("<img/>")
			.attr({
				"src":"./lib/data/img/faces.jpg",
				//"src":"./lib/data/img/tng.jpg",
				"id":"img"
			})
			.css({
			})
		;
		$("body").append($("<div/>").addClass("demo-container").append(img));
		window.setTimeout(function(){
			var img = document.getElementById('img');
			var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
			tracker.setStepSize(1.7);
			tracking.track('#img', tracker);
			function plot(x, y, w, h) {
				var rect = document.createElement('div');
				document.querySelector('.demo-container').appendChild(rect);
				rect.classList.add('rect');
				rect.style.width = w + 'px';
				rect.style.height = h + 'px';
				rect.style.left = (img.offsetLeft + x) + 'px';
				rect.style.top = (img.offsetTop + y) + 'px';
			};
			tracker.on('track', function(event) {
				event.data.forEach(function(rect) {
					plot(rect.x,rect.y,rect.width,rect.height);
				});
			});
		},1000);
	}
	function test1(){//plot video
		var width=320;
		var height=320;
		var video=$("<video/>")
			.attr({
				"id":"video",
				"autoplay":true,
				"mute":true,
				"width":width,
				"height":height,
			})
			.css({})
		;
		var canvas=$("<canvas/>")
			.attr({
				"id":"canvas",
				"width":width,
				"height":height,
			})
			.css({})
		;
		$("body").append(video);
		$("body").append(canvas);
		if (navigator.mediaDevices.getUserMedia) {
		  navigator.mediaDevices.getUserMedia({ video: true })
			.then(function (stream) {
				video[0].srcObject = stream;
				//var video = document.getElementById('video');
				var canvas = document.getElementById('canvas');
				var context = canvas.getContext('2d');
				var tracker = new tracking.ObjectTracker('face');
				tracker.setInitialScale(4);
				tracker.setStepSize(2);
				tracker.setEdgesDensity(0.1);
				tracking.track('#video', tracker, { camera: true });
				tracker.on('track', function(event) {
					context.clearRect(0, 0, canvas.width, canvas.height);
					event.data.forEach(function(rect) {
						context.strokeStyle = '#a64ceb';
						context.strokeRect(rect.x, rect.y, rect.width, rect.height);
						context.font = '11px Helvetica';
						context.fillStyle = "#fff";
						context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
						context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
					});
				});
			})
			.catch(function (err0r) {
				console.log("Something went wrong!");
			});
		}	
	}
	function test2(){
		$("body").append($("<style/>").text(`

		`));
		var width=640;
		var height=480;
		var sources=[
			{"source":"./lib/data/vid/c.mp4","type":"video/mp4"},
			{"source":"./lib/data/vid/a.ogg","type":"video/ogg"}
		];
		var text="Your browser does not support the video tag.";
		var container=$("<div/>")
			.attr({})
			.css({
				"position":"relative"
			})
		;
		var video=$("<video/>")
			.attr({
				"id":"video",
				"autoplay":true,
				"loop":false,
				"controls":true,
				"width":width,
				"height":height,
			})
			.text(text)
			.append(
				(function(sources){
					var ret=[];
					sources.forEach(function(source){
						ret.push(
							$("<source/>").attr({
								"src":source.source,
								"type":source.type
							})
						);
					});
					return ret;
				})(sources)
			)
		;
		var canvas=$("<canvas/>")
			.attr({
				"id":"canvas",
				"width":width,
				"height":height,
			})
			.css({
				"background":"#00FF0011",
				"position":"absolute",
				"top":"0px",
				"left":"0px"
			})
		;
		//window.video=video;
		container.append(video);
		container.append(canvas);
		$("body").append(container);
		$("body").append($("<button/>")
			.css({
				"background":"#000000",
				"color":"#CCCCCC",
				"font-family":"monospace",
				"border":"unset",
			})
			.text("Toggle Tracking")
			.click(function(){
				$(canvas).toggle();
			})
		);
		canvas.hide();
      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');

      var tracker = new tracking.ObjectTracker('face');
      tracker.setInitialScale(4);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);

      tracking.track('#video', tracker, { camera: false});

      tracker.on('track', function(event) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        event.data.forEach(function(rect) {
          context.strokeStyle = '#a64ceb';
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          context.font = '11px Helvetica';
          context.fillStyle = "#fff";
          context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
          context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        });
      });
	/*
      var gui = new dat.GUI();
      gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01);
      gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1);
      gui.add(tracker, 'stepSize', 1, 5).step(0.1);
	*/
	}
	test2();

});
