//https://medium.com/sons-of-javascript/angular-integrating-jasmine-with-requirejs-amd-7cde3e28895e
define([
	"module",
	"jasmine-boot",
	'css!vendor/jasmine/2.3.0/jasmine-core/jasmine.css',
],function(
	module,
	obj
){
	console.log([module.id,'start'].join(':'));
	console.log(obj);
	{
		//my-library.js
		var myLibrary=(function(){
			function sayHello(){
				return "Hello";
			}
			return{
				sayHello:sayHello
			};
		})();
		// my-library.specs.js
		describe("my-library",function(){
			describe("sayHello",function(){
				it("should say Hello",function(){
					expect(myLibrary.sayHello()).toEqual("Hello");
				})
			})
		});
		//trigger jasmine
		window.onload();
	}
	{
	}
});
