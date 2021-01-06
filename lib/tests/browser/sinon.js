//https://github.com/sinonjs/sinon
//https://sinonjs.org/
//https://stackabuse.com/using-mocks-for-testing-in-javascript-with-sinon-js/
//https://stackoverflow.com/questions/30990798/setting-up-karma-chai-requirejs-chai-jquery
//Standalone test spies, stubs and mocks for JavaScript.
//Works with any unit testing framework.
//https://stackoverflow.com/questions/42857778/how-do-you-run-mocha-tests-in-the-browser
//https://addyosmani.com/blog/unit-testing-backbone-js-apps-with-qunit-and-sinonjs/
define([
	"module",
	"jquery",
	"mocha",
	"chai",
	//https://www.chaijs.com/plugins/
	"chai-match",//https://www.chaijs.com/plugins/chai-match/
	"chai-jq",//https://www.chaijs.com/plugins/chai-jq/
	"sinon",
	'css!vendor/mocha/8.2.1/mocha.min.css',
],function(
	module,
	jq,
	mocha,
	chai,
	chaiMatch,
	chaiJq,
	sinon
){
window.chai=chai;
	console.log([module.id,'start'].join(':'));
	$=jq;
	chai.use(chaiJq);//example of plugin that works
	chai.use(chaiMatch);//!:(
	//window.chaiMatch=chaiMatch;
	//window.chai=chai;
	//--------------------------------------------------------------------------------
	{
		$("style").remove();
		var mochadiv=$("<div/>").attr("id","mocha");
		$("body").append(mochadiv);
		mocha.setup('bdd');
	}
	//--------------------------------------------------------------------------------
	//The following function takes a function as its argument and returns a new function. You can call the resulting function as many times as you want, but the original function will only be called once:
	function once(fn) {
		var returnValue, called = false;
		return function () {
			if (!called) {
				called = true;
				returnValue = fn.apply(this, arguments);
			}
			return returnValue;
		};
	}
	//The following function triggers network activity:
	function getTodos(listId, callback) {
		jQuery.ajax({
			url: '/todo/' + listId + '/items',
			success: function (data) {
				// Node-style CPS: callback(err, data)
				callback(null, data);
			}
		});
	}
	//Testing time-sensitive logic without the wait is a breeze with Sinon.JS. The following function debounces another function - only when it has not been called for 100 milliseconds will it call the original function with the last set of arguments it received.
	function debounce(callback) {
		var timer;
		return function () {
			clearTimeout(timer);
			var args = [].slice.call(arguments);
			timer = setTimeout(function () {
				callback.apply(this, args);
			}, 100);
		};
	}

	//--------------------------------------------------------------------------------
	function test0(){
		describe('test',function(){
			var xhr;
			var requests=[];
			//hooks
			before(function() {
				xhr = sinon.useFakeXMLHttpRequest();
				requests = [];
				xhr.onCreate = function (req) {
					console.log("fake xhr...");
					requests.push(req);
				};
				window.requests=requests;
			});
			after(function() {
				xhr.restore();
				sinon.restore();//all ???, including xhr ???
			});
			beforeEach(function(done) {

				done();
			});
			afterEach(function() {
			});
			describe('#sinon',()=>{
				it('calls the original function', function () {
					////Testing this function can be quite elegantly achieved with a test fake:
					var callback = sinon.fake();
					var proxy = once(callback);
					proxy();
					chai.assert(callback.called);
				});
				it('calls the original function only once', function () {
					//The fact that the function was only called once is important:
					var callback = sinon.fake();
					var proxy = once(callback);
					proxy();
					proxy();
					chai.assert(callback.calledOnce);
					// ...or:
					// assert.equals(callback.callCount, 1);
				});
				it('calls original function with right this and args', function () {
					//We also care about the this value and arguments:
					var callback = sinon.fake();
					var proxy = once(callback);
					var obj = {};
					proxy.call(obj, 1, 2, 3);
					chai.assert(callback.calledOn(obj));
					chai.assert(callback.calledWith(1, 2, 3));
				});
				it("returns the return value from the original function", function () {
					//The function returned by once should return whatever the original function returns. To test this, we create a fake with behavior:
					var callback = sinon.fake.returns(42);
					var proxy = once(callback);
					chai.expect(proxy(), 42);
				});

				it("makes a GET request for todo items (sinon fake xhr) [42]", function () {
						//but jquery is also fake...do in seperate test?
						getTodos(42, sinon.fake());
						chai.expect(requests.length, 1);
						chai.expect(requests[0].url).to.equal("/todo/42/items");
				});
				it("makes a GET request for todo items (sinon fake xhr) [43]", function () {
						//but jquery is also fake...do in seperate test?
						getTodos(43, sinon.fake());
						chai.expect(requests.length,2);
						chai.expect(requests[requests.length-1].url).to.equal("/todo/43/items");
				});
				it('makes a GET request for todo items [43]', function () {
					sinon.replace(jQuery, 'ajax', sinon.fake());//ordered
					getTodos(42, sinon.fake());
					chai.assert(jQuery.ajax.calledWithMatch({ url: '/todo/42/items' }));
				});
				it("chai jq example 0", function () {
					var el=$("<div/>").attr("id","foo");
					chai.expect(el).to.have.$attr('id','foo')
				});
				it("chai jq example 1", function () {
					var el=$("<div/>").attr("id","foo");
					chai.expect(el).to.have.$attr('id','bar')
				});

			});
		});
		mocha.run();
	}
	//--------------------------------------------------------------------------------
	function test1(){
		describe('test',function(){
			var server;

			//hooks
			before(function() {
				console.log("starting fake server...");
				server = sinon.fakeServer.create();
			});
			after(function() {
				console.log("stopping fake server...");
				server.restore();
			});
			beforeEach(function(done) {

				done();
			});
			afterEach(function() {
			});
			describe('#sinon',()=>{
				it('fake server test', function () {
					////Testing this function can be quite elegantly achieved with a test fake:
					var callback = sinon.fake();
					var proxy = once(callback);
					proxy();
					chai.assert(callback.called);
					var callback = sinon.fake();
					getTodos(42, callback);
					// This is part of the FakeXMLHttpRequest API
					server.requests[0].respond(
						200,
						{ "Content-Type": "application/json" },
						JSON.stringify([{ id: 1, text: "Provide examples", done: true }])
					);
			    		chai.assert(callback.calledOnce);
				});
			});
		});
		mocha.run();
	}
	function test2(){
		describe('test',function(){
			var clock;
			//hooks
			before(function() {
				clock = sinon.useFakeTimers(); 
			});
			after(function() {
				clock.restore(); 
			});
			beforeEach(function(done) {

				done();
			});
			afterEach(function() {
			});
			//tests
			describe('#sinon',()=>{
				it('calls callback after 100ms', function () {
					var callback = sinon.fake();
					var throttled = debounce(callback);

					throttled();

					clock.tick(99);
					chai.assert(callback.notCalled);

					clock.tick(1);
					chai.assert(callback.calledOnce);

					// Also:
					// assert.equals(new Date().getTime(), 100);
				});
			});
		});
		mocha.run();
	}
	test2();
});
