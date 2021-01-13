// A touch slideout navigation menu for your mobile web apps.
//
// Features
//
// Dependency-free.
// Simple markup.
// Native scrolling.
// Easy customization.
// CSS transforms & transitions.
// Just 2 Kb! (min & gzip)
//
//https://github.com/mango/slideout
define([
	"module",
	"jquery",
	"slideout"
],function(
	module,
	jq,
	Slideout
){
	console.log([module.id,'start'].join(':'));
	console.log(Slideout);
	$=jq;

	{//basic usage
		var style=$("<style/>").text(`
			body {
				background:#222222;
				color:#888888;
				font-family:monospace;
			}

			.slideout-menu {
				 position: fixed;
				 top: 0;
				 bottom: 0;
				 width: 256px;
				 min-height: 100vh;
				 overflow-y: scroll;
				 -webkit-overflow-scrolling: touch;
				 z-index: 0;
				 display: none;
			}

			.slideout-menu-left {
				 left: 0;
			}

			.slideout-menu-right {
				 right: 0;
			}

			.slideout-panel {
				 position: relative;
				 z-index: 1;
				 will-change: transform;
				background:#444444;
				 min-height: 100vh;
			}

			.slideout-open,
			.slideout-open body,
			.slideout-open .slideout-panel {
				 overflow: hidden;
			}

			.slideout-open .slideout-menu {
				 display: block;
			}
		`);
		var nav=$(`
			<nav id="menu">
				<header>
					<h2>Menu</h2>
				</header>
			</nav>
		`);
		var main=$(`
			<main id="panel">
				<header>
					<button class="toggle-button">☰</button>
					<h2>Panel</h2>
				</header>
			</main>
		`);
		$("body").append(style);
		$("body").append(nav);
		$("body").append(main);
		var slideout = new Slideout({
			'panel': $('#panel')[0],
			'menu': $('#menu')[0],
			'padding': 256,
			'tolerance': 70
		});
		// Toggle button
		$('.toggle-button').click(function() {
			slideout.toggle();
		});
	}

});
