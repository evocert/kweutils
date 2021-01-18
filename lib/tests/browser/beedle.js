//Beedle is a tiny library to help you manage state across your application. Inspired by great libraries like Vuex and Redux, Beedle creates a central store that enables you predictably control and cascade state across your application.
//
//This library was initially created as a prototype for this article on CSS-Tricks, where you learn how to build a state management system from scratch with Vanilla JavaScript.
//https://github.com/hankchizljaw/beedle
//https://beedle-basic-demo.hankchizljaw.io/
//https://beedle-advanced-demo.hankchizljaw.io/
define([
	"module",
	"jquery",
	"beedle",
],function(
	module,
	jq,
	Store
){
	console.log([module.id,'start'].join(':'));
	console.log(Store);
	$=jq;
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
			color:#888888;
			padding:8px;
			font-family:monospace;
		}
	`));

	{//basic usage
		var input=$("<input/>");
		var msg=$("<div/>");
		$("body").append(input);
		$("body").append(msg);
		const actions = {
			saySomething(context, payload) {
				context.commit('setMessage', payload);
			}
		};
		const mutations = {
			setMessage(state, payload) {
				state.message = "["+payload+"]";
				return state;
			}
		};
		const initialState = {
			message: 'Hello, world'
		};
		const storeInstance = new Store({
			actions,
			mutations,
			initialState
		});
		// Grab the textarea and dispatch the action on 'input'
		input[0].addEventListener('input', () => {
			console.log('evt');
			// Dispatch the action, which will subsequently pass this message to the mutation
			// which in turn, updates the store's state
			storeInstance.dispatch('saySomething', input[0].value.trim());
		});
		// Grab the text element and attach it to the stateChange event
		// This fires every time the state updates
		storeInstance.subscribe(state => {
			msg[0].innerText = state.message;
		});
	}
});
