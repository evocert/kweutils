//https://en.wikipedia.org/wiki/Test_Anything_Protocol
//https://testanything.org/
//https://github.com/dwyl/learn-tape
//https://catonmat.net/writing-javascript-tests-with-tape
//https://medium.com/@arnaudrinquin/frictionless-unit-testing-in-javascript-with-browser-tap-6ac2cea89a59
//https://dev.to/avalander/introduction-to-unit-testing-with-tape-the-basics-1an5
//TAP, the Test Anything Protocol, is a simple text-based interface between testing modules in a test harness. TAP started life as part of the test harness for Perl but now has implementations in C, C++, Python, PHP, Perl, Java, JavaScript, and others.
define([
	"module",
	"tape",
],function(
	module,
	tape	
){
	console.log([module.id,'start'].join(':'));
	var test=tape();
	window.t=test;
	test.test('1==1',function(t){
		t.equals(1,1);
		t.pass('ok')
		t.end();
	});
	test.test('test0',function(t){
		t.notEquals(1,1);
		t.pass('ok')
		t.end();
	});
	test.test('test1',function(t){
		t.notEquals(1,0);
		t.pass('ok')
		t.end();
	});
	test.test('test2',function(t){
		/*
		 * plan:	receives an integer, it makes the test fail if more or fewer assertions than the number set are executed.
		 * equal:	checks that two values are equal. It does not work well with arrays and objects, for those you need
		 * deepEqual:	is like equal but it works on arrays and objects.
		 * pass:	always passes.
		 * end:		signals the end of the test.
		 */
		  t.plan(3)
		  t.equal(3, 3)
		  t.deepEqual([ 1, 2, 3 ], [ 1, 2, 3 ])
		  t.pass('We good')
		  t.end()
	});
});
