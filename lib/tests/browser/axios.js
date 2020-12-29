/*
 * https://github.com/axios/axios
 * Make XMLHttpRequests from the browser
 * Make http requests from node.js
 * Supports the Promise API
 * Intercept request and response
 * Transform request and response data
 * Cancel requests
 * Automatic transforms for JSON data
 * Client side support for protecting against XSRF
 */

define([
	"module",
	"axios"
],function(
	module,
	axios
){
	console.log([module.id,'start'].join(':'));
	console.log(axios);
	axios.get("./index.html").then(function(data){
		console.log(data);
	})
});
