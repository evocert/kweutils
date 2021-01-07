//note* not getting this working in goja
//      error: interface conversion: goja.valueString is goja.asciiString, not goja.unicodeString...
//      busy modifying ./lib/vendor/sugarjs/2.0.4/sugar.js, around line 5000-7000
//Sugar is a Javascript utility library for working with native objects.
//https://github.com/andrewplummer/Sugar
//https://sugarjs.com/quickstart/
define([
	"module",
	"console",
	"cyclejs",
	"sugarjs",
],function(
	module,
	console,
	cyclejs,
	Sugar
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(Sugar));
	{//basic usage
		console.log(Sugar.Number.random(1, 100));
		console.log(Sugar.Date.create('next Friday'));
		console.log(Sugar.Array.unique([1,2,2,3]));
		console.log(Sugar.Date.format(new Date(), '%Y-%m-%d'));
	}
	{//chainable
		var arr = new Sugar.Array([1,2]);
		console.log(arr.concat([2,3]).unique().raw);
		var num = new Sugar.Number(3.1415);
		console.log(num.round(1).toFixed(2).raw);
	}
	{//date
		var date = new Sugar.Date('2 weeks ago');
		console.log(date.raw);
	}
	{//object
		var obj = new Sugar.Object({"users":[{"profile":{"hobbies":42}}]});
		console.log(obj.has('users').raw);
		var obj = new Sugar.Object({"users":[{"profile":{"hobbies":42}}]});
		console.log(obj.get('users[0].profile.hobbies').raw);
		//var users = new Sugar.Object(usersByName);
		//users.merge(moreUsersByName);
		//console.log(users.average('profile.likes').round(2).raw);
	}
	{//number
		console.log(new Sugar.Number(5) == 5);
		console.log(new Sugar.Number(5) >= 4);
		console.log(new Sugar.Number(5) * new Sugar.Number(5));
	}
	{//extended mode - extend only array
		Sugar.Array.extend();
	}
	{//extended mode - extend only array and date
		Sugar.extend({
			namespaces: [Array, Date]
		});
	}
	{//extended mode - blacklist
		Sugar.extend({
		  except: [Array]
		});
	}
	{//extended mode - extend all
		Sugar.extend();
		console.log([1,2,2,3].unique());
		console.log((3.1415).round(1).toFixed(2));
	}
});
