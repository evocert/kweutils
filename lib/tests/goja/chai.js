//https://github.com/chaijs/chai
//https://www.chaijs.com/
//https://www.chaijs.com/guide/styles/
//chai - BDD / TDD assertion framework for node.js and the browser that can be paired with any testing framework.
//Chai is an assertion library, similar to Node's built-in assert. It makes testing much easier by giving you lots of assertions you can run against your code.
define([
	"module",
	"console",
	"chai"
],function(
	module,
	console,
	chai
){
	console.log([module.id,'start'].join(':'));
	console.log(chai);
        foo = 'bar';
        beverages = { tea: [ 'chai', 'matcha', 'oolong' ]};
        //assert
        console.log(chai.assert.typeOf(foo, 'string')); // without optional message
        console.log(chai.assert.typeOf(foo, 'string', 'foo is a string')); // with optional message
        console.log(chai.assert.equal(foo, 'bar', 'foo equal `bar`'));
        console.log(chai.assert.lengthOf(foo, 3, 'foo`s value has a length of 3'));
        console.log(chai.assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea'));
        //expect
        console.log(chai.expect(1).to.eql(1));
        console.log(chai.expect(foo).to.be.a('string'));
        console.log(chai.expect(foo).to.equal('bar'));
        console.log(chai.expect(foo).to.have.lengthOf(3));
        console.log(chai.expect(beverages).to.have.property('tea').with.lengthOf(3));
});
