//Composable Concurrency Abstractions for JavaScript.
//https://github.com/marcoonroad/sporadic
//https://www.marcoonroad.dev/sporadic/streams
//https://www.marcoonroad.dev/sporadic/channels
//https://www.marcoonroad.dev/sporadic/coroutines
define([
	"module",
	"sporadic",
],function(
	module,
	sporadic
){
	console.log([module.id,'start'].join(':'));
	console.log(sporadic);
	{//basic usage
		(async () => {
			const channel=await sporadic.channels.open()
			const wasReceivedPromise=sporadic.channels.send(channel,"Hello,World!")
			const messagePromise=sporadic.channels.receive(channel)
			const promises=[wasReceivedPromise,messagePromise]
			const [wasReceived,message]=await Promise.all(promises)
			console.log(wasReceived) // ==> true
			console.log(message) // ==> Hello, World!
		})()
	}
});
