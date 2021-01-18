//JavaScript and TypeScript finite state machines and statecharts for the modern web.
//Read the documentation 📑 Adheres to the SCXML specification.
//Packages
//xstate - Core finite state machine and statecharts library + interpreter
//@xstate/fsm - Minimal finite state machine library
//@xstate/graph - Graph traversal utilities for XState
//@xstate/react - React hooks and utilities for using XState in React applications
//@xstate/vue - Vue composition functions and utilities for using XState in Vue applications
//@xstate/test - Model-Based-Testing utilities (using XState) for testing any software
//@xstate/inspect - Inspection utilities for XState
//https://github.com/davidkpiano/xstate
//https://xstate.js.org/docs/
//https://xstate.js.org/docs/guides/installation.html#exports
//https://xstate.js.org/viz/
//https://www.youtube.com/watch?v=VU1NKX6Qkxc
define([
	"module",
	"xstate",
],function(
	module,
	XState
){
	console.log([module.id,'start'].join(':'));
	console.log(XState);
	{//basic usage
		const { Machine, actions, interpret } = XState; // global variable: window.XState
		const lightMachine = Machine({
		// ...
		});
		const lightService = interpret(lightMachine);
	}
	{//basic usage
		const { createMachine, interpret } = XState;
		// Stateless machine definition
		// machine.transition(...) is a pure function used by the interpreter.
		const toggleMachine = createMachine({
			id: 'toggle',
			initial: 'inactive',
			states: {
				inactive: { on: { TOGGLE: 'active' } },
				active: { on: { TOGGLE: 'inactive' } }
			}
		});

		// Machine instance with internal state
		const toggleService = interpret(toggleMachine)
			.onTransition((state) => console.log(state.value))
			.start();
		// => 'inactive'

		toggleService.send('TOGGLE');
		// => 'active'

		toggleService.send('TOGGLE');
		// => 'inactive'
	}
	{//promise example
		const { createMachine, interpret, assign } = XState;

		const fetchMachine = createMachine({
			id: 'Dog API',
			initial: 'idle',
			context: {
				dog: null
			},
			states: {
				idle: {
					on: {
						FETCH: 'loading'
					}
				},
				loading: {
					invoke: {
						id: 'fetchDog',
						src: (context, event) =>
							fetch('https://dog.ceo/api/breeds/image/random').then((data) =>
								data.json()
							),
						onDone: {
							target: 'resolved',
							actions: assign({
								dog: (_, event) => event.data
							})
						},
						onError: 'rejected'
					},
					on: {
						CANCEL: 'idle'
					}
				},
				resolved: {
					type: 'final'
				},
				rejected: {
					on: {
						FETCH: 'loading'
					}
				}
			}
		});

		const dogService = interpret(fetchMachine)
			.onTransition((state) => console.log(state.value))
			.start();

		dogService.send('FETCH');
	}
});
