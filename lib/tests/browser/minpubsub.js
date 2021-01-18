//CDNJS A micro publish/subscribe messaging framework, weighing in at only 198 bytes gzipped. Created by rewriting Peter Higgins' jQuery plugin, MinPubSub is completely self contained with no external dependencies. Keep your projects loosely coupled with this powerful design pattern. Also available on NPM and Bower.
//https://github.com/daniellmb/MinPubSub
define([
	"module",
	"minpubsub",
],function(
	module,
	minpubsub
){
	console.log([module.id,'start'].join(':'));
	console.log(minpubsub);
	{//basic usage
		const{subscribe,publish,unsubscribe}=minpubsub;
		//subscribe to a topic
		var handle = subscribe("/some/topic", function(msg){
			console.log(msg);
		});

		//publish topic a few times
		publish("/some/topic", ["first time"]);
		publish("/some/topic", ["second time"]);

		//unsubscribe from the topic
		unsubscribe(handle);

		//subscriber is no longer listening to the topic
		publish("/some/topic", ["message will not be logged"]);
	}
});
