//A lightweight, intuitive, vanilla ES6 fueled JS cookie and local storage library.
//https://github.com/nirtz89/crumbsjs
define([
	"module",
	"crumbsjs",
],function(
	module,
	crumbs
){
	console.log([module.id,'start'].join(':'));
	console.log(crumbs);
	{//basic usage
		// Cookie
		crumbs.set("Operating System","Win10"); // => true
		// Local storage key
		crumbs.ls.set("Operating System","Win10"); // => true
		// Cookie
		console.log(crumbs.get("Operating System"));; // => true
		// Local storage key
		console.log(crumbs.ls.get("Operating System")); // => true
	}
	{//expiration
		// The "expires" parameter is capable of taking a number, and will default as days.
		crumbs.set("Name","Roy Azaeev",{type:"day",value:7},"/crumbsjs"); // => true
	}
	{//add multiple
		var/*const*/my_cookies=[];
		my_cookies.push({name:"OperatingSystem",value:"Win10"});
		my_cookies.push({name:"Age",value:"29"});
		crumbs.set(my_cookies); // => [{name:"Operating System",value:"Win10"},{name:"Age",value:"29"}]
	}
	{//multiple local storage keys
		var/*const*/my_localstorage_array=[];
		my_localstorage_array.push({"key":"Operating System","value":"Win10"});
		my_localstorage_array.push({"key":"Age","value":"29"});
		crumbs.set(my_localstorage_array); // => [{key:"Operating System",value:"Win10"},{key:"Age",value:"29"}]
	}
	{//get all
		// Cookies
		var/*let*/all_cookies=crumbs.getAll(); // => [{name:"Operating System",value:"Win10"},{name:"Age",value:"29"}]
		console.log(all_cookies);
		// // Local storage
		var/*let*/all_localstorage=crumbs.ls.getAll(); // => [{key:"Operating System",value:"Win10"},{key:"Age",value:"29"}]
		console.log(all_localstorage);
	}
	{//remove
		// Cookie
		crumbs.delete("Operating system"); // => true
		// Local storage
		crumbs.ls.delete("Operating system"); // => true
	}
	{//delete multiple
		var/*const*/my_cookies=[];
		my_cookies.push("Operating system");
		my_cookies.push("Age");
		crumbs.delete(my_cookies); // => true
	}
});
