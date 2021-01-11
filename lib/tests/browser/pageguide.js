//An interactive, responsive, and smart guide for web page elements using jQuery and CSS3. Works great for dynamic pages and single-page apps as well as static pages. Check it out IRL at http://tracelytics.github.com/pageguide!
//https://github.com/tracelytics/pageguide
//http://tracelytics.github.io/pageguide/
define([
	"module",
	"jquery",
	"pageguide",
	"css!vendor/pageguide/1.3.2/pageguide.min.css"
],function(
	module,
	jq,
	tl
){
	console.log([module.id,'start'].join(':'));
	console.log(tl);
	$=jq;
	{//basic usage
		//modal cached, showed first time page is visited
		$("body").append($(`
			<ul id="tlyPageGuide" data-tourtitle="REPLACE THIS WITH A TITLE">
				<li class="tlypageguide_left" data-tourtarget=".first_element_to_target">
					<div>
						Here is the first item description. The number will appear to the left of the element.
					</div>
				</li>
				<li class="tlypageguide_right" data-tourtarget="#second_element_to_target">
					<div>
						Here is the second item description. The number will appear to the right of the element.
					</div>
				</li>
				<li class="tlypageguide_top" data-tourtarget=".third_element_to_target > div.is_here">
					<div>
						Here is the third item description. The number will appear above the element.
					</div>
				</li>
				<li class="tlypageguide_bottom" data-tourtarget="#fourth_element_to_target">
					<div>
						Here is the fourth item description. The number will appear below the element.
					</div>
				</li>
			</ul>
		`));
		//controls
		$("body").append($(`
			<div class="tlyPageGuideWelcome">
				<p>Here's a snappy modal to welcome you to my new page! pageguide is here to help you learn more.</p>
				<p>
					This button will launch pageguide:
					<button class="tlypageguide_start">let's go</button>
				</p>
				<p>
					This button will close the modal without doing anything:
					<button class="tlypageguide_ignore">not now</button>
				</p>
				<p>
					This button will close the modal and prevent it from being opened again:
					<button class="tlypageguide_dismiss">got it, thanks</button>
				</p>
			</div>
		`));
		tl.pg.init({ /* optional preferences go here */ });
	}
});
