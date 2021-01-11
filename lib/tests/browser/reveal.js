//reveal.js is an open source HTML presentation framework. It enables anyone with a web browser to create fully featured and beautiful presentations for free. Check out the live demo.
//The framework comes with a broad range of features including nested slides, Markdown support, Auto-Animate, PDF export, speaker notes, LaTeX support, syntax highlighted code and much more.
//https://github.com/hakimel/reveal.js
//https://revealjs.com/
//https://revealjs.com/installation/
//https://revealjs.com/markup/
define([
	"module",
	"revealjs",
	"css!vendor/revealjs/4.1.0/reset.css",
	"css!vendor/revealjs/4.1.0/reveal.css",
	"css!vendor/revealjs/4.1.0/theme/beige.css",
	/*
	"css!vendor/revealjs/4.1.0/theme/black.css",
	"css!vendor/revealjs/4.1.0/theme/blood.css",
	"css!vendor/revealjs/4.1.0/theme/fonts/league-gothic/league-gothic.css",
	"css!vendor/revealjs/4.1.0/theme/fonts/source-sans-pro/source-sans-pro.css",
	"css!vendor/revealjs/4.1.0/theme/league.css",
	"css!vendor/revealjs/4.1.0/theme/moon.css",
	"css!vendor/revealjs/4.1.0/theme/night.css",
	"css!vendor/revealjs/4.1.0/theme/serif.css",
	"css!vendor/revealjs/4.1.0/theme/simple.css",
	"css!vendor/revealjs/4.1.0/theme/sky.css",
	"css!vendor/revealjs/4.1.0/theme/solarized.css",
	"css!vendor/revealjs/4.1.0/theme/white.css",
	*/
	"jquery",
],function(
	module,
	Reveal,
	jq
){
	console.log([module.id,'start'].join(':'));
	console.log(Reveal);
	{//basic usage
		var el=$(`
			<div class="reveal">
				<div class="slides">
					<section>Slide 1</section>
					<section>Slide 2</section>
				</div>
			</div>
		`);
		$("body").append(el);
		Reveal.initialize();
	}
});
