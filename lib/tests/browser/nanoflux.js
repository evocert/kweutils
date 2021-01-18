//nanoflux is a very lightweight (about 3.5 KiB minified, and 1.25 KiB gzipped) dependency-free Flux implementation.
//The idea of this implementation is to support a very small, but full Flux implementation (separated Action, Dispatcher, and Store), and also a "fluxy" version, with Action and Dispatcher merged in one unit.
//Furthermore, nanoflux uses a pure functional approach as a performant solution.
//https://github.com/ohager/nanoflux
define([
	"module",
	"nanoflux",
],function(
	module,
	NanoFlux
){
	console.log([module.id,'start'].join(':'));
	console.log(NanoFlux);
	{//basic usage
		var setup = function() {
		
			// Creating a store 'myStore' with functions triggered by dispatched actions
			// The convention for action handlers name is: on<ActionName>
			NanoFlux.createStore('myStore', {
		
				// the handlers signature bases on the users convention
				onAction1: function (test) {
					console.log("Store.onAction1: " + test);
					// this will call the subscribed callbacks
					this.notify({data: test});
				},
		
				onAction2: function (test) {
					console.log("Store.onAction2: " + test);
					this.notify({data: test});
				},
		
				onAction3: function (test) {
					console.log("Store.onAction3: " + test);
					this.notify({data: test});
				}
			});

			// Creating the Dispatcher
			// You may also use the implicit default dispatcher: 
			// var dispatcher = NanoFlux.getDispatcher();
			var dispatcher = NanoFlux.createDispatcher('myDispatcher');
			
			// The full flux concept foresees a separation of actions and dispatcher
			// Here we create actions using the built in action creator
			NanoFlux.createActions('myActions', dispatcher, {
				action1 : function(data){
					console.log("Action 1");
					// this way, the dispatcher establishes dynamically the action binding, calling stores onAction1().
					this.dispatch('action1', data);
				},
		
				action2 : function(data){
					console.log("Action 2");
					this.dispatch('action2', data);
				}
			});	
		};
		setup();
		function Component(){
		
			// callback called by Store.notify
			this.onNotify = function(data){
				console.log("Component notified: " + JSON.stringify(data));
			};
		
			this.exec = function(){
		
					
				var dispatcher = NanoFlux.getDispatcher('myDispatcher');
				var store = NanoFlux.getStore('myStore');
				var actions = NanoFlux.getActions('myActions'); 
				
				// Now, connecting Store and Dispatcher
				dispatcher.connectTo(store);
				
				// establishes the link between store's notification mechanism and this component.
				// use the returned object to unsubscribe, if needed!
				var subscription = store.subscribe(this, this.onNotify);
		
				// executing the actions	
				actions.action1("test 1");
				actions.action2("test 2");
			};
		}   
		//middleware example
		function Logger(){
			var log = [];

			return function(handlerName, args){
				log.push({
					handler: handlerName,
					payload : args
					}
				)
			}
		}

		// somewhere in your app --- using the fluxy approach for sake of simplicity
		// ...
		var dispatcher = NanoFlux.createDispatcher(null, ["action1", "action2"]);
		NanoFlux.use(new Logger(), dispatcher);

		dispatcher.action1({foo:"fromAction1"});
		/* Log is:  [{handler: "onAction1", payload: [{foo:"fromAction1"}]}] */

		dispatcher.action2({foo:"fromAction2"});
		/* Final Log is:
			[
				{handler: "onAction1", payload: [{foo:"fromAction1"}]}
				{handler: "onAction2", payload: [{foo:"fromAction2"}]}
			]
		*/

	}
});
