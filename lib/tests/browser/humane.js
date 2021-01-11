//This project was heavily inspired by humanmsg project for jQuery. I really liked the project but I wanted to remove the jQuery dependency, add support for CSS transitions, and have more control over the timing. I consider the project complete and don't plan on adding any new features except for any bug fixes.
//https://github.com/wavded/humane-js
//http://wavded.github.io/humane-js/
define([
	"module",
	"humanejs",
	"css!vendor/humanejs/3.2.2/themes/original.css",
	"css!vendor/humanejs/3.2.2/themes/bigbox.css",
	"css!vendor/humanejs/3.2.2/themes/boldlight.css",
	"css!vendor/humanejs/3.2.2/themes/flatty.css",
	"css!vendor/humanejs/3.2.2/themes/jackedup.css",
	"css!vendor/humanejs/3.2.2/themes/libnotify.css",
	/*
	*/
],function(
	module,
	humane
){
	console.log([module.id,'start'].join(':'));
	console.log(humane);
	{//basic usage
		humane.log("Welcome Back")
		/*
		humane.log("Record 392 has been updated")
		humane.log(["List","of","Items"])
		humane.log("Callback when finished", function(){ document.body.style.backgroundColor="#a66000" })
		humane.log("Options can be passed", { timeout: 4000, clickToClose: true, addnCls: 'humane-error' })
		*/
	}
	{//options
		//Sets the delay before a message fades out (set to 0 for no timeout).
		humane.timeout = 5000 // default: 2500
		//Wait for mouse, keyboard, or touch action to be taken before clearing message (after timeout)
		humane.waitForMove = true // default: false
		//Click or touch the notification to close
		humane.clickToClose = true // default: false
		//Delay before notification disappears (useful in conjunction with waitForMove)
		humane.timeoutAfterMove = 2000 // default: 0
		//Specify an additional class to apply when notifying (nice when you only want to change just a little bit of the style)
		humane.addnCls = 'humane-info' // default: ''

	}
	{//create instances
		//Create a completely new instance of humane using humane.create().
		var notify = humane.create({ timeout: 4000, baseCls: 'humane-bigbox' })
		notify.log('Custom Notifier')
		//There are a options that can also be applied when creating an instance:
		humane.baseCls = 'humane' // default: 'humane'
	}
	{//crazy
		var bigbox = humane.create({baseCls: 'humane-bigbox', timeout: 1000})
		bigbox.error = bigbox.spawn({addnCls: 'humane-bigbox-error'})
		bigbox.log('Oh!').error('No!')

		var libnotify = humane.create({baseCls: 'humane-libnotify', addnCls: 'humane-libnotify-info'})
		libnotify.log('Notified')

		var jacked = humane.create({baseCls: 'humane-jackedup', addnCls: 'humane-jackedup-success'})
		jacked.log("What's up here!")
	}
});
