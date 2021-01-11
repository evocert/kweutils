//Swiper - is the free and most modern mobile touch slider with hardware accelerated transitions and amazing native behavior. It is intended to be used in mobile websites, mobile web apps, and mobile native/hybrid apps.
//Swiper is not compatible with all platforms, it is a modern touch slider which is focused only on modern apps/platforms to bring the best experience and simplicity.
//https://github.com/nolimits4web/Swiper
define([
	"module",
	"swiper",
	"jquery",
	"css!vendor/swiper/6.4.5/swiper-bundle.min.css"
],function(
	module,
	Swiper,
	jq
){
	console.log([module.id,'start'].join(':'));
	console.log(Swiper);
	$=jq;
	{//basic usage
		//layout
		var style=$("<style/>").text(`
			html,
			body {
				position: relative;
				height: 100%;
			}
			body {
				background: #222222;
				font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
				font-size: 14px;
				color: #CCCCCC;
				margin: 0;
				padding: 0;
			}
			.swiper-container {
				width: 100%;
				height: 100%;
			}
			.swiper-slide {
				text-align: center;
				font-size: 18px;
				background: #222;

				/* Center slide text vertically */
				display: -webkit-box;
				display: -ms-flexbox;
				display: -webkit-flex;
				display: flex;
				-webkit-box-pack: center;
				-ms-flex-pack: center;
				-webkit-justify-content: center;
				justify-content: center;
				-webkit-box-align: center;
				-ms-flex-align: center;
				-webkit-align-items: center;
				align-items: center;
			}
		`);
		var root=$(`
			<!-- Slider main container -->
			<div class="swiper-container">
				<!-- Additional required wrapper -->
				<div class="swiper-wrapper">
				<!-- Slides -->
				<div class="swiper-slide">Slide 1</div>
				<div class="swiper-slide">Slide 2</div>
				<div class="swiper-slide">Slide 3</div>
				...
				</div>
				<!-- If we need pagination -->
				<div class="swiper-pagination"></div>

				<!-- If we need navigation buttons -->
				<div class="swiper-button-prev"></div>
				<div class="swiper-button-next"></div>

				<!-- If we need scrollbar -->
				<div class="swiper-scrollbar"></div>
			</div>
		`);
		$("body").append(style);
		$("body").append(root);
		var mySwiper = new Swiper('.swiper-container', {
			// Optional parameters
			direction: 'vertical',
			loop: true,

			// If we need pagination
			pagination: {
				el: '.swiper-pagination',
			},

			// Navigation arrows
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},

			// And if we need scrollbar
			scrollbar: {
				el: '.swiper-scrollbar',
			},
		});
	}
});
