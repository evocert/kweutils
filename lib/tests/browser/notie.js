//https://jaredreich.com/notie/
//https://github.com/jaredreich/notie
define([
	"module",
	"notie",
	"css!vendor/notie/4.3.0/notie.min.css"
],function(
	module,
	notie
){
	console.log([module.id,'start'].join(':'));
	console.log(notie);
	{//basic usage
		notie.alert({ text: 'Info!' })
		notie.alert({ type: 1, text: 'Success!', stay: true }) // Never hides unless clicked, or escape or enter is pressed
		notie.alert({ type: 'success', text: 'Success!', time: 2 }) // Hides after 2 seconds
		notie.alert({ type: 2, text: 'Warning<br><b>with</b><br><i>HTML</i><br><u>included.</u>' })
		notie.alert({ type: 'warning', text: 'Watch it...' })
		notie.alert({ type: 3, text: 'Error.', position: 'bottom' })
		notie.alert({ type: 'error', text: 'Oops!' })
		notie.alert({ type: 4, text: 'Information.' })
		notie.alert({ type: 'info', text: 'FYI, blah blah blah.' })

		notie.force({
			type: 3,
			text: 'You cannot do that, sending you back.',
			buttonText: 'OK',
			callback: function () {
				notie.alert({ type: 3, text: 'Maybe when you\'re older...' })
			}
		})

		notie.confirm({
			text: 'Are you sure you want to do that?<br><b>That\'s a bold move...</b>',
			cancelCallback: function () {
				notie.alert({ type: 3, text: 'Aw, why not? :(', time: 2 })
			},
			submitCallback: function () {
				notie.alert({ type: 1, text: 'Good choice! :D', time: 2 })
			}
		})
		notie.confirm({ text: 'Are you sure?' }, function() {
			notie.confirm({ text: 'Are you <b>really</b> sure?' }, function() {
				notie.confirm({ text: 'Are you <b>really</b> <i>really</i> sure?' }, function() {
					notie.alert({ text: 'Okay, jeez...' })
				})
			})
		})

		notie.input({
			text: 'Please enter your email:',
			submitText: 'Submit',
			cancelText: 'Cancel',
			cancelCallback: function (value) {
				notie.alert({ type: 3, text: 'You cancelled with this value: ' + value })
			},
			submitCallback: function (value) {
				notie.alert({ type: 1, text: 'You entered: ' + value })
			},
			value: 'jane@doe.com',
			type: 'email',
			placeholder: 'name@example.com'
		})

		notie.input({
			text: 'Please enter your name:',
			type: 'text',
			placeholder: 'Jane Doe',
			allowed: ['a', 's']
		}, function(value) {
			notie.alert({ type: 1, text: 'You entered: ' + value })
		}, function(value) {
			notie.alert({ type: 3, text: 'You cancelled with this value: ' + value })
		})

		notie.input({
			text: 'Please enter the price:',
			cancelCallback: function (value) {
				notie.alert({ type: 3, text: 'You cancelled with this value: ' + value })
			},
			submitCallback: function (value) {
				notie.alert({ type: 1, text: 'You entered: ' + value })
			},
			type: 'text',
			placeholder: '500',
			allowed: new RegExp('[^0-9]', 'g')
		})

		notie.select({
			text: 'Demo item #1, owner is Jane Smith',
			cancelText: 'Close',
			cancelCallback: function () {
				notie.alert({ type: 5, text: 'Cancel!' })
			},
			choices: [
				{
					text: 'Share',
					handler: function () {
						notie.alert({ type: 1, text: 'Share item!' })
					}
				},
				{
					text: 'Open',
					handler: function () {
						notie.alert({ type: 1, text: 'Open item!' })
					}
				},
				{
					type: 2,
					text: 'Edit',
					handler: function () {
						notie.alert({ type: 2, text: 'Edit item!' })
					}
				},
				{
					type: 3,
					text: 'Delete',
					handler: function () {
						notie.alert({ type: 3, text: 'Delete item!' })
					}
				}
			]
		})

		function date() {
			notie.date({
				value: new Date(2015, 8, 27),
				cancelCallback: function (date) {
					notie.alert({ type: 3, text: 'You cancelled: ' + date.toISOString() })
				},
				submitCallback: function (date) {
					notie.alert({ type: 1, text: 'You selected: ' + date.toISOString() })
				}
			})
		}
	}
});
