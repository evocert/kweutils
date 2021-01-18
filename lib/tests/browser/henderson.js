//A tiny event emitter-based finite state machine, with promises
//A tiny finite state machine library with asynchronous state transfers, based on an event-emitter. henderson is the promise-based version of pastafarian.
//Features
//tiny finite state machine library, only slightly bigger than its synchronous cousin pastafarian
//simple but powerful API
//works without dependencies on modern browsers (see requirements)
//well below 100 LOC, small enough to read and understand immediately
//https://github.com/orbitbot/henderson
define([
	"module",
	"henderson",
],function(
	module,
	StateMachine
){
	console.log([module.id,'start'].join(':'));
	console.log(StateMachine);
	{//basic usage
		var state = new StateMachine({
			initial : 'start',
			states	: {
				start : ['end', 'start'],
				end	 : ['start']
			}
		});
		state.on('*', function(prev, next) {
			console.log('State changed from ' + prev + ' to ' + next);
		});
		state
			.on('before:start', function(prev, param) {
				console.log('Reset with param === "foo": ' + param === 'foo');
			})
			.on('after:start', function(next) {
				console.log('Going to ' + next);
			})
			.on('before:end', function(prev, param) {
				console.log('ffs!');
			})
			.on('end', function(prev, param) {
				return new Promise(function(resolve) {
					setTimeout(function() {
						console.log('Now at end, 2 + 2 = ' + param);
						resolve();
					}, 1500);
				});
			});
		state.go('end', 2 + 2)
			.then(function() {
				console.log('Transition finished!');
			});
		state.reset = state.go.bind(state, 'start');
		state.reset('foo');
	}
});
