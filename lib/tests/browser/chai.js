//https://github.com/chaijs/chai
//https://www.chaijs.com/
//https://www.chaijs.com/guide/styles/
//chai - BDD / TDD assertion framework for node.js and the browser that can be paired with any testing framework.
//Chai is an assertion library, similar to Node's built-in assert. It makes testing much easier by giving you lots of assertions you can run against your code.
define([
	"module",
	"chai"
],function(
	module,
	chai
){
	console.log([module.id,'start'].join(':'));
	console.log(chai);
	chai.expect(1).to.eql(1);
});
