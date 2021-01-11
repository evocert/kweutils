//jQuery-plugin for styling checkboxes and radio-buttons. With skin support.
//https://github.com/IonDen/ion.checkRadio
define([
	"module",
	"jquery",
	"check.radio",
	"css!vendor/ion.checkRadio/2.0.0/css/ion.checkRadio.css",
	"css!vendor/ion.checkRadio/2.0.0/css/ion.checkRadio.dark.css",
	/*
	"css!vendor/ion.checkRadio/2.0.0/css/ion.checkRadio.cloudy.css",
	"css!vendor/ion.checkRadio/2.0.0/css/ion.checkRadio.green.css",
	"css!vendor/ion.checkRadio/2.0.0/css/ion.checkRadio.html5.css",
	*/
],function(
	module,
	jq
){
	console.log([module.id,'start'].join(':'));
	$=jq;
	console.log($().ionCheckRadio);
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
		}
	`));
	{//basic usage
		var el=$(`
			<div class="my_inputs">
				<label><input type="checkbox" name="think" value="0" /> Self</label>
				<label><input type="checkbox" name="think" value="1" /> Money</label>
				<label><input type="checkbox" name="think" value="2" /> Stuff</label>
				<label><input type="checkbox" name="think" value="3" /> Health</label>
				<label><input type="checkbox" name="think" value="4" /> Work</label>
				<label><input type="checkbox" name="think" value="5" checked /> Rest</label>
				<label><input type="checkbox" name="think" value="6" disabled checked /> Sex</label>
			</div>
		`)
		$("body").append(el);
		//$(".my_inputs").ionCheckRadio();//specific element/s
		//$("input[type='radio'], input[type='checkbox']").ionCheckRadio();
		$(el).find("input").ionCheckRadio();
	}
	{//
		var el=$(`
			<div class="my_inputs">
				<input type="radio" name="reading" value="0" id="reading_0" checked />
				<label for="reading_0">Very much</label>

				<input type="radio" name="reading" value="1" id="reading_1" />
				<label for="reading_1">Sometimes</label>
			</div>
		`)
		$("body").append(el);
		//$(".my_inputs").ionCheckRadio();//specific element/s
		//$("input[type='radio'], input[type='checkbox']").ionCheckRadio();
		$(el).find("input").ionCheckRadio();
	}
	{//
		var el=$(`
			<div class="my_inputs">
				<input type="checkbox" name="tour" value="0" id="trip_0" checked />
				<label for="trip_0">Towel</label>

				<input type="checkbox" name="tour" value="1" id="trip_1" />
				<label for="trip_1">Hitchhiker guide</label>
			</div>
		`)
		$("body").append(el);
		//$(".my_inputs").ionCheckRadio();//specific element/s
		//$("input[type='radio'], input[type='checkbox']").ionCheckRadio();
		$(el).find("input").ionCheckRadio();
	}
	{//
		var el=$(`
			<div class="my_inputs">
				<label for="cars_0"><input type="radio" name="reading" value="0" id="cars_0" checked /> Super fan</label>

				<label for="cars_1">
				    <input type="radio" name="reading" value="1" id="cars_1" />
				    Love to <b>ride</b>
				</label>
			</div>
		`)
		$("body").append(el);
		//$(".my_inputs").ionCheckRadio();//specific element/s
		//$("input[type='radio'], input[type='checkbox']").ionCheckRadio();
		$(el).find("input").ionCheckRadio();
	}
	{//
		var el=$(`
			<div class="my_inputs">
				<label><input type="checkbox" name="browsers" value="chrome" /> Chrome</label>

				<label>
				    <input type="checkbox" name="browsers" value="firefox" />
				    Firefox
				</label>
			</div>
		`)
		$("body").append(el);
		//$(".my_inputs").ionCheckRadio();//specific element/s
		//$("input[type='radio'], input[type='checkbox']").ionCheckRadio();
		$(el).find("input").ionCheckRadio();
	}
	{//
		var el=$(`
			<div class="my_inputs">
				<label><input checked disabled type="checkbox" name="thoughts" value="sex" /> Sex</label>
				<label><input checked type="checkbox" name="thoughts" value="rest" /> Rest</label>
			</div>
		`)
		$("body").append(el);
		//$(".my_inputs").ionCheckRadio();//specific element/s
		//$("input[type='radio'], input[type='checkbox']").ionCheckRadio();
		$(el).find("input").ionCheckRadio();
	}
	{//
		var el=$(`
			<div class="my_inputs">
				<label class="icr-label">
				    <span class="icr-item type_radio"></span>
				    <span class="icr-hidden"><input class="icr-input" type="radio" name="job" value="0" /></span>
				    <span class="icr-text">Super good</span>
				</label>

				<label class="icr-label">
				    <span class="icr-item type_radio"></span>
				    <span class="icr-hidden"><input class="icr-input" type="radio" name="job" value="1" disabled checked /></span>
				    <span class="icr-text">Like it</span>
				</label>
			</div>
		`)
		$("body").append(el);
		//$(".my_inputs").ionCheckRadio();//specific element/s
		//$("input[type='radio'], input[type='checkbox']").ionCheckRadio();
		$(el).find("input").ionCheckRadio();
	}

});
