//A JavaScript/TypeScript notification, confirmation, and prompt library.
//Notifications can display as toast style, snackbar style, banners, dialogs, alerts, or desktop notifications (using the Web Notifications spec) with fall back to an in-browser notice.
//PNotify provides a unique notification flow called modalish that provides a good user experience, even when many notifications are shown at once.
//    Rich graphical features and effects.
//        Automatic dark mode support.
//        Material, Bootstrap 3/4, Font Awesome 4/5, or the stand-alone theme, Bright Theme.
//        Mobile styling and swipe support.
//        Timed hiding.
//        Slick animations with Animate.css.
//        Attention getters with Animate.css.
//        Countdown bar to show time left before notice closes.
//    Highly customizable UI.
//        Modalish, modal, and modeless notification flows.
//        Sticky (pinned) notices.
//        Optional close and stick buttons.
//        Supports non-blocking notices for less intrusive use.
//        Notification types: notice, info, success, and error.
//        Stacks allow notices to position together or independently.
//        Control stack direction and push to top or bottom.
//        Confirm dialogs, alert buttons, and prompts.
//        RTL language support.
//    Feature rich API.
//        Desktop notifications based on the Web Notifications standard.
//        Dynamically update existing notices.
//        Put text, HTML, or DOM elements in notices.
//            By default, escapes text to prevent XSS attacks.
//        Optional notice history for reshowing old notices.
//    Universally compatible.
//        Works with any frontend library (React, Angular, Svelte, Vue, Ember, etc.).
//        Works with bundlers (Webpack, Rollup, etc.).
//        No dependencies for most features.
//https://github.com/sciactive/pnotify
define([
	"module",	
	"pnotify",
	"css!vendor/pnotify/5.2.0/node_modules/@pnotify/core/dist/PNotify.css",
	"css!vendor/pnotify/5.2.0/node_modules/@pnotify/desktop/dist/PNotifyDesktop.css",
	"css!vendor/pnotify/5.2.0/node_modules/@pnotify/core/BrightTheme.css",
	/*
	"css!vendor/pnotify/5.2.0/node_modules/@pnotify/bootstrap3/dist/PNotifyBootstrap3.css",
	"css!vendor/pnotify/5.2.0/node_modules/@pnotify/bootstrap4/dist/PNotifyBootstrap4.css",
	"css!vendor/pnotify/5.2.0/node_modules/@pnotify/confirm/dist/PNotifyConfirm.css",
	"css!vendor/pnotify/5.2.0/node_modules/@pnotify/core/Angeler.css",
	"css!vendor/pnotify/5.2.0/node_modules/@pnotify/core/dist/Angeler.css",
	"css!vendor/pnotify/5.2.0/node_modules/@pnotify/core/dist/BrightTheme.css",
	"css!vendor/pnotify/5.2.0/node_modules/@pnotify/core/dist/Material.css",
	"css!vendor/pnotify/5.2.0/node_modules/@pnotify/core/Material.css",
	"css!vendor/pnotify/5.2.0/node_modules/@pnotify/countdown/dist/PNotifyCountdown.css",
	"css!vendor/pnotify/5.2.0/node_modules/@pnotify/mobile/dist/PNotifyMobile.css",
	"css!vendor/pnotify/5.2.0/node_modules/@pnotify/paginate/dist/PNotifyPaginate.css",
	"css!vendor/pnotify/5.2.0/node_modules/@pnotify/reference/dist/PNotifyReference.css",
	*/
],function(
	module,
	PNotify
){
	console.log([module.id,'start'].join(':'));
	console.log(PNotify);
	window.PNotify=PNotify;
	{//basic usage
/*
		PNotify.defaultModules.set(PNotify, {});
		PNotify.alert({
			text: 'Notice me, senpai!',
			type: 'info'
		});
*/

	}
	{//stacks
		var mystack= new PNotify.Stack({
			dir1: 'up',
			dir2: 'left',
			push: 'top',
			firstpos1: 25,
			firstpos2: 25,
			spacing1: 36,
			spacing2: 36,
			push: 'bottom',
			modal: true,
			context: document.body
		});
		PNotify.alert({
			text: 'Notice me, senpai!',
			type: 'info',
			stack:mystack
		});
	}
	{//maps ???
		//var defaultModules = new PNotify.Map()
	}
});

