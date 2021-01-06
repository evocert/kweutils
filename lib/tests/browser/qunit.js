//https://stackoverflow.com/questions/42857778/how-do-you-run-mocha-tests-in-the-browser
//https://stackoverflow.com/questions/26546362/QUnit-any-official-solution-to-not-output-results-within-websites-dom-tree
//https://stackoverflow.com/questions/13040167/QUnit-wont-run-tests
//https://api.QUnitjs.com/QUnit/start/
//https://api.qunitjs.com/QUnit/module/
define([
	"module",
	"jquery",
	"qunit",
	'css!vendor/QUnit/2.13.0/QUnit.css',
],function(
	module,
	jq,
	QUnit
){
	console.log([module.id,'start'].join(':'));
	$=jq;
	//build dom...
	$("body").append($("<div/>").attr("id","qunit"));
	$("body").append($("<div/>").attr("id","qunit-fixture"));
	//$("body").append($('<div id="qunit"></div><div id="qunit-fixture"></div>'));
	//...then load qunit!
	require([
		"qunit",
		'css!vendor/QUnit/2.13.0/QUnit.css'
	],function(
		QUnit
	){
		console.log(QUnit);
		/*
		const add = (a, b) => a + b;
		QUnit.config.autostart = false
		QUnit.begin(function( details ) {
			console.log( "Test Suit Starting." );
		});
		// set up a handler to capture the output from QUnit.log()
		// then put that output into the array above for reporting later
		var log = [];
		QUnit.testStart(function(testDetails){
			console.log("teststart");
			QUnit.log(function(details){
				if (!details.result) {
					details.name = testDetails.name;
					log.push(details);
				}
			});
		});
		QUnit.testDone(function( details ) {
			console.log("testdone");
			console.log(details);
		});
		// set up a callback for when the entire test suite is complete
		QUnit.done(function (totals) {
			console.log("done");
			console.log(totals);
		});
		QUnit.moduleDone(function( details ) {
			console.log("moduledone");
		});
		QUnit.module('add', function() {
			QUnit.test('should add two numbers', function(assert) {
				assert.equal(add(1, 1), 2, '1 + 1 = 3');
			});
		});
		QUnit.start();
		*/
	/*
		QUnit.module( "module A", {
			before: function() {
				// prepare something once for all tests
			},
			beforeEach: function() {
				// prepare something before each test
			},
			afterEach: function() {
				// clean up after each test
			},
			after: function() {
				// clean up once after all tests are done
			}
		});
		QUnit.start();
	*/
	/*
		QUnit.module( "Group A", hooks => {

			QUnit.test( "basic test example", assert => {
				console.log('QUnit.test( "basic test example", assert => {');
				assert.true( true, "this is fine" );
			});

			QUnit.test( "basic test example 2", assert => {
				console.log('QUnit.test( "basic test example 2", assert => {');
				assert.true( true, "this is also fine" );
			});
		});

		QUnit.module( "Group B", hooks => {

			QUnit.test( "basic test example 3", assert => {
				console.log('QUnit.test( "basic test example 3", assert => {');
				assert.true( true, "this is fine" );
			});

			QUnit.test( "basic test example 4", assert => {
				console.log('QUnit.test( "basic test example 4", assert => {');
				assert.true( true, "this is also fine" );
			});
		});
		QUnit.start()
	*/
	/*
		QUnit.module( "My Group", hooks => {
			// It is valid to call the same hook methods more than once.
			hooks.beforeEach( assert => {
				console.log('hooks.beforeEach( assert =>');
				console.log(this);
				assert.ok( true, "beforeEach called" );
			});
			hooks.afterEach( assert => {
				console.log('hooks.afterEach( assert =>');
				console.log(this);
				assert.ok( true, "afterEach called" );
			});
			QUnit.test( "with hooks", assert => {
				console.log('QUnit.test( "with nested hooks", assert => ');
				console.log(this);
				// 1 x beforeEach
				// 1 x afterEach
				assert.expect( 2 );
			});
			QUnit.module( "Nested Group", hooks => {
				// This will run after the parent module's beforeEach hook
				hooks.beforeEach( assert => {
					console.log('hooks.beforeEach( assert =>');
					console.log(this);
					assert.ok( true, "nested beforeEach called" );
				});
				// This will run before the parent module's afterEach
				hooks.afterEach( assert => {
					console.log('hooks.afterEach( assert =>');
					console.log(this);
					assert.ok( true, "nested afterEach called" );
				});
				QUnit.test( "with nested hooks", assert => {
					console.log('QUnit.test( "with nested hooks", assert => ');
					console.log(this);
					// 2 x beforeEach (parent, current)
					// 2 x afterEach (current, parent)
					assert.expect( 4 );
				});
			});
		});
		QUnit.start()
	*/
	/*
		//test context ???
		QUnit.module( "Machine Maker", {
			beforeEach: function() {
				this.maker = new Maker();
				this.parts = [ "wheels", "motor", "chassis" ];
			}
		});

		QUnit.test( "makes a robot", function( assert ) {
			this.parts.push( "arduino" );
			console.log(this);
			assert.equal( this.maker.build( this.parts ), "robot" );
			assert.deepEqual( this.maker.log, [ "robot" ] );
		});

		QUnit.test( "makes a car", function( assert ) {
			assert.equal( this.maker.build( this.parts ), "car" );
			console.log(this.maker);
			this.maker.duplicate();
			assert.deepEqual( this.maker.log, [ "car", "car" ] );
		});
		QUnit.start();
	*/
	/*
		//test context with arrow functions (not working)
		QUnit.module( "Machine Maker", hooks => {
			let maker;
			let parts;
			hooks.beforeEach( () => {
				maker = new Maker();
				parts = [ "wheels", "motor", "chassis" ];
			});
			QUnit.test( "makes a robot", assert => {
				console.log("makes a robot");
				console.log(maker.parts);
				parts.push( "arduino" );
				assert.equal( maker.build( parts ), "robot" );
				assert.deepEqual( maker.log, [ "robot" ] );
			});
			QUnit.test( "makes a car", assert => {
				console.log("makes a car");
				assert.equal( maker.build( parts ), "car" );
				maker.duplicate();
				assert.deepEqual( maker.log, [ "car", "car" ] );
			});
		});
		QUnit.start();
	*/
	/*
		//run tests under conditions
		// Only execute this module when developing the feature,
		// skipping tests from other modules.
		QUnit.module.only( "Android", hooks => {
		  let android;
		  hooks.beforeEach( () => {
			 android = new Android();
		  });

		  QUnit.test( "Say hello", assert => {
			 console.log("Say hello");
			 assert.strictEqual( android.hello(), "Hello, my name is AN-2178!" );
		  });

		  QUnit.test( "Basic conversation", assert => {
			 console.log("Basic conversation");
			 android.loadConversationData( {
				"Hi": "Hello",
				"What's your name?": "My name is AN-2178.",
				"Nice to meet you!": "Nice to meet you too!",
				"...": "..."
			 });

			 assert.strictEqual(
				android.answer( "What's your name?" ),
				"My name is AN-2178."
			 );
		  });
		  // ...
		});
		QUnit.start();
	*/
	/*
		//module.todo: ???
		QUnit.module.todo( "Robot", function( hooks ) {
			hooks.beforeEach( function() {
				this.robot = new Robot();
			});

			QUnit.test( "Say", assert => {
				console.log("Say");
				// Currently, it returns undefined
				assert.strictEqual( this.robot.say(), "I'm Robot FN-2187" );
			});
			QUnit.test( "Move arm", function ( assert ) {
				console.log("Move arm");
				// Move the arm to point (75, 80). Currently, it throws a NotImplementedError
				assert.throws( function() {
					this.robot.moveArmTo(75, 80);
				}, /Not yet implemented/ );

				assert.throws( function() {
					assert.deepEqual( this.robot.getPosition(), { x: 75, y: 80 });
				}, /Not yet implemented/ );
			});
			// ...
		});
		QUnit.start();
	*/
	/*
		//config: autostart
		QUnit.config.autostart = false;
		require(["test/tests1.js", "test/tests2.js"], function() {
			QUnit.start();
		});
	*/
	/*
	*/
	/*
		//QUnit.test: adds test to run
		{
			{
				function square( x ) {
					return x * x;
				}
				QUnit.test( "square()", assert => {
					console.log("square()");
					QUnit.assert.equal( square( 2 ), 4, "square(2)" );
					QUnit.assert.equal( square( 3 ), 9, "square(3)" );
				});
			}
			{//async
				function fetchSquare( x ) {
					console.log("fetchSquare:start");
					return new Promise( resolve => {
						setTimeout(() =>
							{
								console.log("fetchSquare:resolving");
								resolve( x * x );
							},
							1000
						);
					});
				}
				QUnit.test( "Test with Promise", assert => {
					console.log("Test with Promise");
					return fetchSquare( 3 ).then( result => {
						assert.equal( result, 9 );
					});
				});
			}
			{//async await functions
				function fetchSquare( x ) {
					console.log("fetchSquare:start");
					return new Promise( resolve => {
						setTimeout(() =>
							{
								console.log("fetchSquare:resolving");
								resolve( x * x );
							},
							1000
						);
					});
				}

				QUnit.test( "Test with async-await", async assert => {
					console.log("Test with async-await");
					const a = await fetchSquare(2);
					const b = await fetchSquare(3);

					assert.equal( a, 4 );
					assert.equal( b, 9 );
					assert.equal( await fetchSquare(5), 25 );
				});

			}
			QUnit.start();
		}
	*/
		{//current test name
			QUnit.config.autostart = true;
			QUnit.load();
			function square( x ) {
				return x * x;
			}
			QUnit.test( "square()", assert => {
				console.log(QUnit.config.current.testName);
				QUnit.assert.equal( square( 2 ), 4, "square(2)" );
				QUnit.assert.equal( square( 3 ), 9, "square(3)" );
			});
		}
	});
});
