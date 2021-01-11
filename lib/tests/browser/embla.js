// Embla Carousel is a bare bones carousel library with great fluid motion and awesome swipe precision. It's library agnostic, dependency free and 100% open source. Build awesome carousels by extending Embla Carousel with your own CSS and JavaScript. 
//https://github.com/davidcetinkaya/embla-carousel/tree/master/src/vanilla
//https://davidcetinkaya.github.io/embla-carousel/build/static/media/media-3.5a957bad.jpeg
define([
	"module",
	"embla",
	"jquery",
	"css!vendor/embla/3.0.13/embla.css"
],function(
	module,
	EmblaCarousel,
	jq
){
	console.log([module.id,'start'].join(':'));
	console.log(EmblaCarousel);
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			margin:24px;
		}
	`));
	{//basic usage
		$("body").append($(`
			<!-- Embla -->
			<div class="embla">
				<div class="embla__viewport">
					<div class="embla__container">
						<div class="embla__slide">
							<div class="embla__slide__inner">
								<img class="embla__slide__img" src="./lib/data/img/cats/0.jpeg" />
							</div>
						</div>
						<div class="embla__slide">
							<div class="embla__slide__inner">
								<img class="embla__slide__img" src="./lib/data/img/cats/1.jpeg" />
							</div>
						</div>
						<div class="embla__slide">
							<div class="embla__slide__inner">
								<img class="embla__slide__img" src="./lib/data/img/cats/2.jpeg" />
							</div>
						</div>
					</div>
				</div>

				<!-- Buttons -->
				<button class="embla__button embla__button--prev" type="button">
					<svg
						class="embla__button__svg"
						viewBox="137.718 -1.001 366.563 643.999"
					>
						<path
							d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z"
						></path>
					</svg>
				</button>
				<button class="embla__button embla__button--next" type="button">
					<svg class="embla__button__svg" viewBox="0 0 238.003 238.003">
						<path
							d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z"
						></path>
					</svg>
				</button>
			</div>
		`));

		const wrap = document.querySelector(".embla");
		const viewPort = wrap.querySelector(".embla__viewport");
		const prevBtn = wrap.querySelector(".embla__button--prev");
		const nextBtn = wrap.querySelector(".embla__button--next");
		const embla = EmblaCarousel(viewPort, { loop: false });
		const setupPrevNextBtns = (prevBtn, nextBtn, embla) => {
			prevBtn.addEventListener('click', embla.scrollPrev, false);
			nextBtn.addEventListener('click', embla.scrollNext, false);
		};
		const disablePrevNextBtns = (prevBtn, nextBtn, embla) => {
			return () => {
				if (embla.canScrollPrev()) prevBtn.removeAttribute('disabled');
				else prevBtn.setAttribute('disabled', 'disabled');

				if (embla.canScrollNext()) nextBtn.removeAttribute('disabled');
				else nextBtn.setAttribute('disabled', 'disabled');
			};
		};
		const disablePrevAndNextBtns = disablePrevNextBtns(prevBtn, nextBtn, embla);
		setupPrevNextBtns(prevBtn, nextBtn, embla);
		embla.on("select", disablePrevAndNextBtns);
		embla.on("init", disablePrevAndNextBtns);
	}
});
