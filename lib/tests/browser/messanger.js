// Show messages in your app.
// Wrap AJAX requests with progress, success and error messages, and add retry to your failed requests.
// Add actions (undo, cancel, etc.) to your messages.
//https://github.com/HubSpot/messenger
//https://github.hubspot.com/messenger/docs/welcome/
define([
	"module",
	"messanger",
	"css!vendor/messanger/1.5.0/css/messenger.css",
"css!vendor/messanger/1.5.0/css/messenger-theme-flat.css",
	/*
"css!vendor/messanger/1.5.0/css/messenger-spinner.css",
"css!vendor/messanger/1.5.0/css/messenger-theme-air.css",
"css!vendor/messanger/1.5.0/css/messenger-theme-block.css",
"css!vendor/messanger/1.5.0/css/messenger-theme-future.css",
"css!vendor/messanger/1.5.0/css/messenger-theme-ice.css",
	*/
],function(
	module,
	Messanger
){
	console.log([module.id,'start'].join(':'));
	console.log(Messanger);
	window.Messanger=Messanger;
	{//basic usage
		Messenger.options={
			extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
			theme: 'flat'
		};
		var msg=new Messanger("HI")
		msg.success("asdf");
		msg.error("asdf");
		msg.warn("asdf");
	}
});
