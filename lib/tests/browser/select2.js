//Select2 is a jQuery-based replacement for select boxes. It supports searching, remote data sets, and pagination of results.
//https://github.com/select2/select2
//https://select2.org/
define([
	"module",
	"jquery",
	"select2",
	"css!vendor/select2/4.1.0/css/select2.min"
],function(
	module,
	jq,
	obj
){
	console.log([module.id,'start'].join(':'));
	console.log(obj);
	$=jq;
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#888888;
			padding:8px;
			font-family:monospace;
		}
	`));
	{//basic usage
		$("body").append($(`
			<select class="js-example-basic-single" name="state">
				<option value="AL">Alabama</option>
				<option value="BL">Blabama</option>
				<option value="Cl">Clabama</option>
				<option value="WY">Wyoming</option>
			</select>
		`));
		$('.js-example-basic-single').select2();
		$("body").append([$("<br/>"),$("<hr/>")]);
	}
	{//multiple
		var el=$(`
			<select class="js-example-basic-multiple" name="states[]" multiple="multiple">
				<option value="AL">Alabama</option>
				  <option value="BL">Blabama</option>
				  <option value="Cl">Clabama</option>
				<option value="WY">Wyoming</option>
			</select>
		`);
		el.css({"width":"100%"});
		$("body").append(el)
		$(el).select2();
		$("body").append([$("<br/>"),$("<hr/>")]);
	}
});
