//https://github.com/MatthewMueller/date
//minor changes to ./lib/vendor/date/0.3.3/date.[min.]js for goja
define([
	"module",
	"console",
	"cyclejs",
	"date",
],function(
	module,
	console,
	cyclejs,
	date
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(date));
	{
		console.log(date('10 minutes from now'));
		console.log(date('in 5 hours'));
		console.log(date('at 5pm'));
		console.log(date('at 12:30'));
		console.log(date('at 23:35'));
		console.log(date('in 2 days'));
		console.log(date('tuesday at 9am'));
		console.log(date('monday at 1:00am'));
		console.log(date('last monday at 1:00am'));
		console.log(date('tomorrow at 3pm'));
		console.log(date('yesterday at 12:30am'));
		console.log(date('5pm tonight'));
		console.log(date('tomorrow at noon'));
		console.log(date('next week tuesday'));
		console.log(date('next week tuesday at 4:30pm'));
		console.log(date('2 weeks from wednesday'));
		console.log(date('tomorrow night at 9'));
		console.log(date('tomorrow afternoon'));
		console.log(date('this morning at 9'));
		console.log(date('at 12:30pm'));
		console.log(date('tomorrow at 9 in the morning'));
		console.log(date('2 years from yesterday at 5pm'));
		console.log(date('last month'));
		console.log(date('2nd of January'));
		console.log(date('1st of March'));
		console.log(date('1 st of March'));
		console.log(date('31st of September 4:00am'));
		console.log(date('1st of January 4:00am'));
		console.log(date('9th of December 4:00am'));
		console.log(date('tomorrow afternoon at 4:30pm 1 month from now'));
		console.log(date('10 seconds ago'));
		console.log(date('1 minute ago'));
		console.log(date('2 hours ago'));
		console.log(date('5 weeks ago'));
		console.log(date('2 months ago'));
		console.log(date('1 year ago'));
		console.log(date('an hour later'));
		console.log(date('2w from wednesday'));
		console.log(date('2nd day of January'));
		console.log(date('two hours later'));
		console.log(date('a fortnight from wednesday'));
		console.log(date('a minute ago'));
		console.log(date('at 12:30'));
		console.log(date('at 12.30'));
		console.log(date('tuesday at 9'));
		console.log(date('tomorrow at 15'));
	}
});
