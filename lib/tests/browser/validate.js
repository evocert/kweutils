//validate.js is a lightweight JavaScript form validation library inspired by CodeIgniter.
//features:
//
// Validate form fields from over a dozen rules
// No dependencies
// Customizable Messages
// Supply your own validation callbacks for custom rules
// Chainable customization methods for ease of declaration
// Works in all major browsers, (even IE6!)
// Modeled off the CodeIgniter form validation API
//
//https://github.com/rickharrison/validate.js
//http://rickharrison.github.io/validate.js/
define([
	"module",
	"jquery",
	"validatejs",
	"css!/kweutils/css/bootswatch/slate/bootstrap.css"
],function(
	module,
	jq,
	FormValidator
){
	console.log([module.id,'start'].join(':'));
	console.log(FormValidator);
	$=jq;
	{//basic usage
		var form=$(`
<form id="example_form" name="example_form" action="#" method="POST">
        <label for="req">Required field:</label>
        <label for="alphanumeric">Alphanumeric field:</label>

        <input name="req" id="req">
        <input name="alphanumeric" id="alphanumeric">

        <label for="password">Password:</label>
        <label for="password_confirm">Password Confirmation (match password):</label>

        <input name="password" id="password" type="password">
        <input name="password_confirm" id="password_confirm" type="password">

        <label for="email">Email:</label>
        <label for="minlength">Min length field (min. 8 chars):</label>

        <input name="email" id="email">
        <input name="minlength" id="minlength">

        <label for="tos_checkbox">Required checkbox (example: Terms of Service)</label>
        <input name="tos_checkbox" id="tos_checkbox" type="checkbox">

        <button class="button gray" type="submit" name="submit">Submit</button>
</form>
		`);
		$("body").append(form);
		var validator = new FormValidator('example_form', [{
			name: 'req',
			display: 'required',
			rules: 'required'
		}, {
			name: 'alphanumeric',
			rules: 'alpha_numeric'
		}, {
			name: 'password',
			rules: 'required'
		}, {
			name: 'password_confirm',
			display: 'password confirmation',
			rules: 'required|matches[password]'
		}, {
			name: 'email',
			rules: 'valid_email'
		}, {
			name: 'minlength',
			display: 'min length',
			rules: 'min_length[8]'
		}, {
			names: ['fname', 'lname'],
			rules: 'required|alpha'
		}], function(errors) {
			if (errors.length > 0) {
				console.log(errors);
			}
		});
	}
});
