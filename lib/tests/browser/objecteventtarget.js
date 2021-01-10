//A same behaviour EventTarget prototype, that can work with any object from JavaScript
//You know as everybody knows how to use the EventTarget today, because every Node instance (HTML Elements) prototype it. And that's make it awesome. You can prototype your objects with this and you will have support to events.
//https://github.com/gartz/ObjectEventTarget
define([
	"module",
	"objecteventtarget",
],function(
	module,
	ObjectEventTarget
){
	console.log([module.id,'start'].join(':'));
	console.log(ObjectEventTarget);
	{//basic usage
		function Foo(){}
		Foo.prototype = ObjectEventTarget.prototype;
	}
	{//async
		function AsyncFoo(){
			this.bar = function(){
				if (this.dispatchEvent({type: 'beforebar'})){
					console.log('The beforebar default behaviour');
				}
				// Do something then...
				var self = this;
				setTimeout(function (){
					// I'm async
					if (
						self.dispatchEvent(
							new ObjectEvent(
								'bar',
								{"cancelable": true}
							)
						)
					){
						console.log('The bar default behaviour');
					};
					console.log('End of bar method');
				}, 1e3);
			}
		}
		AsyncFoo.prototype = ObjectEventTarget.prototype;
		instanceOne = new AsyncFoo();
		instanceOne.addEventListener('beforebar', function (){
			console.log('You triggered bar from a AsyncFoo instance');
		});
		instanceOne.addEventListener('bar', function (event){
			event.preventDefault();
			console.log('The method bar was async and finished calling "bar" event type');
		});
		instanceOne.bar();
		// #1: You triggered bar from a AsyncFoo instance
		// #2: The beforebar default behaviour
		// after a seccond
		// #3: The method bar was async and finished calling "bar" event type
		// #4: End of bar method
	}
});
