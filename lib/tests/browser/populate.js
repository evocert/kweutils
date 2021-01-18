//A simple JavaScript populate( form, data ) function which will populate form fields from a JSON object.
//Input types (text, email, select, multiple select, etc) are taken into account but not validated.
////https://github.com/dannyvankooten/populate.js
define([
	"module",
	"jquery",
	"populatejs",
],function(
	module,
	jq,
	populate
){
	console.log([module.id,'start'].join(':'));
	console.log(populate);
	{//basic usage
		var form=$(`
			<form id="my-form">
				<input type="text" name="name" />
				<input type="email" name="email" />
				<input type="text" name="address[addr1]" />
				<input type="text" name="address[city]" />
				<input type="text" name="address[state]" />
			</form>
		`);
		$("body").append(form);
		// your JSON object
		// keys have to match input names
		var data = {
			"email": "john@doe.com",
			"name": "John Doe",
			"address": {
				"addr1": "Street name",
				"city": "City name",
				"state": "State"
			}
		}

		// your containing element
		var formElement = document.getElementById('my-form');

		// populate the form with our JSON object
		populate(formElement, data);
	}
});
