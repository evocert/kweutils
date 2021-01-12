//Chosen is a library for making long, unwieldy select boxes more user friendly.
//https://github.com/harvesthq/chosen
//http://harvesthq.github.io/chosen/
define([
	"module",
	"jquery",
	"chosen",
	"css!vendor/chosen/1.8.7/chosen.min"
],function(
	module,
	jq,
	obj
){
	console.log([module.id,'start'].join(':'));
	console.log($().chosen);
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
		$(el).chosen({disable_search_threshold: 10});;
		$("body").append([$("<br/>"),$("<hr/>")]);
	}
	{//default
		var el=$(`
			<select class="js-example-basic-multiple" name="states[]" multiple="multiple" data-placeholder="Choose a country...">
				<option value="AL">Alabama</option>
				  <option value="BL">Blabama</option>
				  <option value="Cl">Clabama</option>
				<option value="WY">Wyoming</option>
			</select>
		`);
		el.css({"width":"100%"});
		$("body").append(el)
		$(el).chosen({disable_search_threshold: 10});;
		$("body").append([$("<br/>"),$("<hr/>")]);
	}
	{//no results
		var el=$(`
			<select class="js-example-basic-multiple" name="states[]" multiple="multiple" data-placeholder="Choose a country...">
				<option value="AL">Alabama</option>
				  <option value="BL">Blabama</option>
				  <option value="Cl">Clabama</option>
				<option value="WY">Wyoming</option>
			</select>
		`);
		el.css({"width":"100%"});
		$("body").append(el)
		$(el).chosen({disable_search_threshold: 10,no_results_text: "Oops, nothing found!"});;
		$("body").append([$("<br/>"),$("<hr/>")]);
	}
	{//limit multiselect
		var el=$(`
			<select class="js-example-basic-multiple" name="states[]" multiple="multiple" data-placeholder="Choose a country...">
				<option value="AL">Alabama</option>
				  <option value="BL">Blabama</option>
				  <option value="Cl">Clabama</option>
				<option value="WY">Wyoming</option>
			</select>
		`);
		el.css({"width":"100%"});
		$("body").append(el)
		$(el).chosen({disable_search_threshold: 10,no_results_text: "Oops, nothing found!",max_selected_options:2});
		$(el).bind("chosen:maxselected", function () {alert('max select');}); 
		$("body").append([$("<br/>"),$("<hr/>")]);
	}
	{//deselect
		var el=$(`
			<select class="js-example-basic-multiple" name="states[]" multiple="multiple" data-placeholder="Choose a country...">
				<option value="AL">Alabama</option>
				  <option value="BL">Blabama</option>
				  <option value="Cl">Clabama</option>
				<option value="WY">Wyoming</option>
			</select>
		`);
		el.css({"width":"100%"});
		$("body").append(el)
		$(el).chosen({allow_single_deselect: true});
		$("body").append([$("<br/>"),$("<hr/>")]);
	}
	{//destroy
		var el=$(`
			<select class="js-example-basic-multiple" name="states[]" multiple="multiple" data-placeholder="Choose a country...">
				<option value="AL">Alabama</option>
				  <option value="BL">Blabama</option>
				  <option value="Cl">Clabama</option>
				<option value="WY">Wyoming</option>
			</select>
		`);
		el.css({"width":"100%"});
		$("body").append(el)
		$(el).chosen({allow_single_deselect: true});
		$("body").append([$("<br/>"),$("<hr/>")]);
		$(el).chosen("destroy");
	}
});
