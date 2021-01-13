// Garlic.js allows you to automatically persist your forms' text field values locally, until the form is submitted. This way, your users don't lose any precious data if they accidentally close their tab or browser. 
//http://garlicjs.org/
//https://github.com/guillaumepotier/Garlic.js
define([
	"module",
	"jquery",
	"garlic",
],function(
	module,
	jq,
	obj
){
	console.log([module.id,'start'].join(':'));
	$=jq;
	console.log($().garlic);
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#888888;
			padding:8px;
			font-family:monospace;
		}
	`));
	{//declarative usage (not working)
		var form=$(`
			<form data-persist="garlic" method="POST">
				<input type="text" name="k0"></input><br/>
				<input type="text" name="k1"></input><br/>
				<input type="text" name="k2"></input><br/>
				<input type="text" name="k3"></input><br/>
			</form>
		`);
		$("body").append(form);
		$("body").append($("<hr/>"));
	}
	{//programatic
		var form=$(`
			<form method="POST">
				<input type="text" name="k0"></input><br/>
				<input type="text" name="k1"></input><br/>
				<input type="text" name="k2"></input><br/>
				<input type="text" name="k3"></input><br/>
			</form>
		`);
		  $(form).garlic();
		$("body").append(form);
		$("body").append($("<hr/>"));
	}
});
