//λ aims to stay small and simple, while powerful. Inspired by async and lodash. Methods are implemented individually and not as part of a whole. That design helps when considering to export functions individually. If you need all the methods in async, then stick with it. Otherwise, you might want to check λ out!
//https://github.com/bevacqua/contra/
define([
	"module",
	"contra",
],function(
	module,
	λ
){
	console.log([module.id,'start'].join(':'));
	console.log(λ);
	{//waterfall
		λ.waterfall([
			function (next) {
				next(null, 'params for', 'next', 'step');
			},
			function (a, b, c, next) {
				console.log(b);
				// <- 'next'
				next(null, 'ok', 'done');
			}
		], function (err, ok, result) {
			console.log(result);
			// <- 'done'
		});
	}
	{//concurrent
		λ.concurrent([
			function (cb) {
				setTimeout(function () {
					cb(null, 'boom');
				}, 1000);
			},
			function (cb) {
				cb(null, 'foo');
			}
		], function (err, results) {
			console.log(results);
			// <- ['boom', 'foo']
		});
	}
	{//concurrent - using objects
		λ.concurrent({
			first: function (cb) {
				setTimeout(function () {
					cb(null, 'boom');
				}, 1000);
			},
			second: function (cb) {
				cb(null, 'foo');
			}
		}, function (err, results) {
			console.log(results);
			// <- { first: 'boom', second: 'foo' }
		});
	}
	{//series
		λ.series([
			function (next) {
				setTimeout(function () {
					next(null, 'boom');
				}, 1000);
			},
			function (next) {
				next(null, 'foo');
			}
		], function (err, results) {
			console.log(results);
			// <- ['boom', 'foo']
		});
	}
	{//series - using objects
		λ.series({
			first: function (next) {
				setTimeout(function () {
					next(null, 'boom');
				}, 1000);
			},
			second: function (next) {
				next(null, 'foo');
			}
		}, function (err, results) {
			console.log(results);
			// <- { first: 'boom', second: 'foo' }
		});
	}
	{//each
		λ.each({ thing: 900, another: 23 }, function (item, cb) {
			setTimeout(function () {
				console.log(item);
				cb();
			}, item);
		});
		// <- 23
		// <- 900
	}
	{//map
		λ.map({ thing: 900, another: 23 }, function (item, cb) {
			setTimeout(function () {
				cb(null, item * 2);
			}, item);
		}, function (err, results) {
			console.log(results);
			//<- { thing: 1800, another: 46 }
		});
	}
	{//filter
		λ.filter({ thing: 900, another: 23, foo: 69 }, function (item, cb) {
			setTimeout(function () {
				cb(null, item % 23 === 0);
			}, item);
		}, function (err, results) {
			console.log(results);
			//<- { another: 23, foo: 69 }
		});
	}
	{//queue
		var q = λ.queue(worker);

		function worker (job, done) {
			console.log(job);
			done(null);
		}

		q.push('job', function () {
			console.log('this job is done!');
		});

		q.push(['some', 'more'], function () {
			console.log('one of these jobs is done!');
		});

		q.on('drain', function () {
			console.log('all done!');
			// if you enqueue more tasks now, then drain
			// will fire again when pending.length reaches 0
		});

		// <- 'this job is done!'
		// <- 'one of these jobs is done!'
		// <- 'one of these jobs is done!'
		// <- 'all done!'
	}
	{//emitter
		var thing = λ.emitter();

		thing.on('foo',function(val){console.log("foo:");console.log(val);});
		thing.on('bar',function(val){console.log("bar:");console.log(val);});
		thing.on('destroy', function () {
			thing.on('create',/*reinitialize*/function(val){console.log("reinitialize:");console.log(val);});
		});

		var destroy = thing.emitterSnapshot('destroy');
		thing.off();
		destroy();
	}
	{//fn
		λ.curry(function(val){console.log(val);}, 1, 3, 5);
		// <- function (next) { fn(1, 3, 5, next); }
	}
	{//curry ???
		var fn=λ.curry(function(next){console.log(["curry",next].join(":"));return next;}, 1, 3, 5);
		fn();
		fn();
		fn();
		// <- function (next) { fn(1, 3, 5, next); }
	}
});
