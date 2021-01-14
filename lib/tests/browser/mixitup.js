//MixItUp is a high-performance, dependency-free library for animated DOM manipulation, giving you the power to filter, sort, add and remove DOM elements with beautiful animations.
//MixItUp plays nice with your existing HTML and CSS, making it a great choice for responsive layouts and compatible with inline-flow, percentages, media queries, flexbox and more.
//https://github.com/patrickkunka/mixitup
define([
	"module",
	"jquery",
	"mixitup",
],function(
	module,
	jq,
	mixitup
){
	console.log([module.id,'start'].join(':'));
	console.log(mixitup);
	$=jq;
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#888888;
			padding:8px;
			font-family:monospace;
		}
		.container{
			display:flex;
		}
		.mix{
			background:#444444;
			font-size:32px;
			margin:4px;
			padding:4px;
			width:128px;
			height:128px;
		}
		button{
			border:none;
			background:#444444;
			padding:4px;
			font-family:monospace;
			font-weight:bold;
			color:#888888;
		}
	`));
	{//basic usage
		var el=$(`
			<div class="container">
				<div class="mix category-a" data-order="1">test0 cat-a</div>
				<div class="mix category-b" data-order="2">test1 cat-b</div>
				<div class="mix category-b category-c" data-order="3">test3 cat-b cat-c</div>
				<div class="mix category-a category-d" data-order="4">test4 cat-a cat-d</div>
			</div>
		`);
		var ctl=$(`
			<div>
				<button type="button" data-filter="all">All</button>
				<button type="button" data-filter=".category-a">Category A</button>
				<button type="button" data-filter=".category-b">Category B</button>
				<button type="button" data-filter=".category-c">Category C</button>
				<button type="button" data-sort="order:asc">Ascending</button>
				<button type="button" data-sort="order:descending">Descending</button>
				<button type="button" data-sort="random">Random</button>
			</div>
		`);
		$("body").append(ctl);
		$("body").append(el);
		//var mixer = mixitup(el[0]);
var mixer = mixitup(el[0], {
    selectors: {
        target: '.mix'
    },
    animation: {
        duration: 300
    }
});
	}
});
