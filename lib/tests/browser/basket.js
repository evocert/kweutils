//Basket.js loads your site's scripts into a page and saves them in localStorage so they can be reused after the session until they are expired. It also checks to see if the scripts are already in localStorage, and if not, loads them. This prevents unneccessary reloading of scripts and can improve load time and website performance.
//https://github.com/addyosmani/basket.js
//https://github.com/andrewwakeling/requirejs-basketjs
//https://github.com/andrewwakeling/requirejs-basketjs/blob/master/basket-loader.js
//https://github.com/andrewwakeling/basket-css-example
//https://badassjs.com/post/40850339601/basketjs-a-javascript-loader-with
//https://t3n.de/news/basketjs-performance-localstorage-515119/
//https://www.sitepoint.com/how-to-improve-loading-time-with-basket-js/
define([
	"module",
	"basketjs",
],function(
	module,
	basket
){
	console.log([module.id,'start'].join(':'));
	console.log(basket);
	try{//basic usage (https://www.sitepoint.com/how-to-improve-loading-time-with-basket-js/)
		basket.require({ url: 'jquery.js' });
	}catch(e){console.error(e.toString());}
});
