//Simple loading spinners animated with CSS. See demo. SpinKit only uses (transform and opacity) CSS animations to create smooth and easily customizable animations.
//https://github.com/tobiasahlin/SpinKit
define([
	"module",
	"jquery",
	"css!vendor/spinkit/2.0.1/spinkit.min.css"
],function(
	module,
	jq
){
	console.log([module.id,'start'].join(':'));
	$=jq;
	$("body").css({
		"background":"#111111"
	});
	{//basic usage
		$("body").append($(`
			<div class="sk-plane"></div><
		`));
		$("body").append($(`
<div class="sk-chase">
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
</div>
		`));
		$("body").append($(`
<div class="sk-bounce">
  <div class="sk-bounce-dot"></div>
  <div class="sk-bounce-dot"></div>
</div>
		`));
		$("body").append($(`
<div class="sk-wave">
  <div class="sk-wave-rect"></div>
  <div class="sk-wave-rect"></div>
  <div class="sk-wave-rect"></div>
  <div class="sk-wave-rect"></div>
  <div class="sk-wave-rect"></div>
</div>
		`));
		$("body").append($(`
<div class="sk-pulse"></div>
		`));
		$("body").append($(`
<div class="sk-flow">
  <div class="sk-flow-dot"></div>
  <div class="sk-flow-dot"></div>
  <div class="sk-flow-dot"></div>
</div>
		`));
		$("body").append($(`
<div class="sk-swing">
  <div class="sk-swing-dot"></div>
  <div class="sk-swing-dot"></div>
</div>
		`));
		$("body").append($(`
<div class="sk-circle">
  <div class="sk-circle-dot"></div>
  <div class="sk-circle-dot"></div>
  <div class="sk-circle-dot"></div>
  <div class="sk-circle-dot"></div>
  <div class="sk-circle-dot"></div>
  <div class="sk-circle-dot"></div>
  <div class="sk-circle-dot"></div>
  <div class="sk-circle-dot"></div>
  <div class="sk-circle-dot"></div>
  <div class="sk-circle-dot"></div>
  <div class="sk-circle-dot"></div>
  <div class="sk-circle-dot"></div>
</div>
		`));
		$("body").append($(`
<div class="sk-circle-fade">
  <div class="sk-circle-fade-dot"></div>
  <div class="sk-circle-fade-dot"></div>
  <div class="sk-circle-fade-dot"></div>
  <div class="sk-circle-fade-dot"></div>
  <div class="sk-circle-fade-dot"></div>
  <div class="sk-circle-fade-dot"></div>
  <div class="sk-circle-fade-dot"></div>
  <div class="sk-circle-fade-dot"></div>
  <div class="sk-circle-fade-dot"></div>
  <div class="sk-circle-fade-dot"></div>
  <div class="sk-circle-fade-dot"></div>
  <div class="sk-circle-fade-dot"></div>
</div>
		`));
		$("body").append($(`
<div class="sk-grid">
  <div class="sk-grid-cube"></div>
  <div class="sk-grid-cube"></div>
  <div class="sk-grid-cube"></div>
  <div class="sk-grid-cube"></div>
  <div class="sk-grid-cube"></div>
  <div class="sk-grid-cube"></div>
  <div class="sk-grid-cube"></div>
  <div class="sk-grid-cube"></div>
  <div class="sk-grid-cube"></div>
</div>
		`));
		$("body").append($(`
<div class="sk-fold">
  <div class="sk-fold-cube"></div>
  <div class="sk-fold-cube"></div>
  <div class="sk-fold-cube"></div>
  <div class="sk-fold-cube"></div>
</div>
		`));
		$("body").append($(`
<div class="sk-wander">
  <div class="sk-wander-cube"></div>
  <div class="sk-wander-cube"></div>
  <div class="sk-wander-cube"></div>
</div>
		`));
	}
});
