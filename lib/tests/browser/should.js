//https://github.com/tj/should.js/
define([
	"module",
	"should",
],function(
	module,
	should
){
	console.log([module.id,'start'].join(':'));
	console.log(should);
	var user = {
			name: 'tj'
		, pets: ['tobi', 'loki', 'jane', 'bandit']
	};

	user.should.have.property('name', 'tj');
	user.should.have.property('pets').with.lengthOf(4);
	try{
		user.should.have.property('name', 'invalid');
	}catch(e){
		console.error(e.toString());
	}

	// if the object was created with Object.create(null)
	// then it doesn't inherit `Object` and have the `should` getter
	// so you can do:

	should(user).have.property('name', 'tj');
	should(true).ok;
	should(5).be.exactly(5)
	/*
	someAsyncTask(foo, function(err, result){
		should.not.exist(err);
		should.exist(result);
		result.bar.should.equal(foo);
	});
	*/
	//chaining
	user.should.be.an.instanceOf(Object).and.have.property('name', 'tj');
	user.pets.should.be.instanceof(Array).and.have.lengthOf(4);
	//truth
	true.should.be.ok;
	'yay'.should.be.ok;
	(1).should.be.ok;
	({}).should.be.ok;
	false.should.not.be.ok;
	''.should.not.be.ok;
	(0).should.not.be.ok;
	//undefined.should.not.be.ok;
	//test for null
	//(err == null).should.be.false;//???

	//true
	true.should.be.true;
	'1'.should.not.be.true;

	//false
	false.should.be.false;
	(0).should.not.be.false;

	//eql
	({ foo: 'bar' }).should.eql({ foo: 'bar' });
	[1,2,3].should.eql([1,2,3]);
	// see next example it is correct, even if it is different types, but actual content the same
	// [1, 2, 3].should.eql({ '0': 1, '1': 2, '2': 3 });

	//equal	/ exactly
	(4).should.equal(4);
	'test'.should.equal('test');
	[1,2,3].should.not.equal([1,2,3]);
	(4).should.be.exactly(4);

	//startswith
	'foobar'.should.startWith('foo');
	'foobar'.should.not.startWith('bar');

	//etcetcetc

	console.log("----------------------------------------");
});
