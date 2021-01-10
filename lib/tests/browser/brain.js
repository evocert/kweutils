//GPU accelerated Neural networks in JavaScript for Browsers and Node.js
//https://github.com/BrainJS/brain.js
//https://brain.js.org/#/
define([
	"module",
	"brainjs",
],function(
	module,
	brain
){
	console.log([module.id,'start'].join(':'));
	console.log(brain);
	{//basic usage
		const config = {
		  binaryThresh: 0.5,
		  hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
		  activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
		  leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
		};

		// create a simple feed forward neural network with backpropagation
		const net = new brain.NeuralNetwork(config);

		net.train([
		  { input: [0, 0], output: [0] },
		  { input: [0, 1], output: [1] },
		  { input: [1, 0], output: [1] },
		  { input: [1, 1], output: [0] },
		]);

		const output = net.run([1, 0]); // [0.987]
		console.log(output);
	}
	{//more configuration
		// provide optional config object, defaults shown.
		const config = {
		  inputSize: 20,
		  inputRange: 20,
		  hiddenLayers: [20, 20],
		  outputSize: 20,
		  learningRate: 0.01,
		  decayRate: 0.999,
		};

		// create a simple recurrent neural network
		const net = new brain.recurrent.RNN(config);

		net.train([
		  { input: [0, 0], output: [0] },
		  { input: [0, 1], output: [1] },
		  { input: [1, 0], output: [1] },
		  { input: [1, 1], output: [0] },
		]);

		var output = net.run([0, 0]); // [0]
		console.log(output);
		/*
		output = net.run([0, 1]); // [1]
		console.log(output);
		output = net.run([1, 0]); // [1]
		console.log(output);
		output = net.run([1, 1]); // [0]
		console.log(output);
		*/
	}
});
