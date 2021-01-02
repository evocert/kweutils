define([
	"module",
	"jquery",
	"tweenjs",
],function(
	module,
	jq,
	TWEEN
){
	console.log([module.id,'start'].join(':'));
	console.log(TWEEN);
	$('body').append($(`<style>
			body {
				font-family: Arial, Helvetica, sans;
			}
			table {
				border-collapse: collapse;
			}
			td {
				width: 5px;
				height: 5px;
			}
			#target {
				position: absolute;
				top: 4em;
				right: 3em;
			}
	</style>`));
	$('body').append($(`<div id="target"></div>`));

			init()
			animate()

			function init() {
				var target = document.getElementById('target')

				var t = document.createElement('table')
				var index = 0

				for (var i = 0; i < 64; i++) {
					var tr = t.insertRow(-1)
					for (var j = 0; j < 64; j++) {
						var td = tr.insertCell(-1)
						td.style.background = '#000'
						var x = (i + j) * 0.1
						var cell = {td: td, value: 0}
						var tween = new TWEEN.Tween(cell)
							.to({value: 1}, 8000)
							.delay((0.001 * index + Math.random()) * 500)
							.easing(TWEEN.Easing.Elastic.InOut)
							.onUpdate(function (object) {
								var c = Math.floor(object.value * 0xff)
								object.td.style.background = 'rgb(' + c + ', 0, 0)'
							})

						var tweenBack = new TWEEN.Tween(cell)
							.to({value: 0}, 4000)
							.delay((0.001 * index + Math.random()) * 500)
							.easing(TWEEN.Easing.Elastic.InOut)
							.onUpdate(function (object) {
								var c = Math.floor(object.value * 0xff)
								object.td.style.background = 'rgb(' + c + ', 0, 0)'
							})

						tween.chain(tweenBack)
						tweenBack.chain(tween)

						tween.start()
						index++
					}
				}

				target.appendChild(t)
			}

			function animate(time) {
				requestAnimationFrame(animate)

				TWEEN.update(time)
			}
});
