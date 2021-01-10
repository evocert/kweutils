//ConvNetJS is a Javascript implementation of Neural networks, together with nice browser-based demos. It currently supports:
//https://github.com/karpathy/convnetjs
//https://cs.stanford.edu/people/karpathy/convnetjs/started.html
define([
	"module",
	"jquery",
	"convnetjs",
],function(
	module,
	jq,
	convnetjs
){
	console.log([module.id,'start'].join(':'));
	console.log(convnetjs);
	$=jq;
	$("body").css({
		"background":"#222222"
	});
	{//basic usage
		$("body").append($("<div/>").attr("id","egdiv"));
		function periodic() {
		  var d = document.getElementById('egdiv');
		  d.innerHTML = 'Random number: ' + Math.random()
		}
		 
		var net; // declared outside -> global variable in window scope
		function start() {
		  // this gets executed on startup
		  //... 
		  net = new convnetjs.Net();
		  // ...
		 
		  // example of running something every 1 second
		  setInterval(periodic, 1000);
		}
	}
	{//Here's a minimum example of defining a 2-layer neural network and training it on a single data point:
		// species a 2-layer neural network with one hidden layer of 20 neurons
		var layer_defs = [];
		// input layer declares size of input. here: 2-D data
		// ConvNetJS works on 3-Dimensional volumes (sx, sy, depth), but if you're not dealing with images
		// then the first two dimensions (sx, sy) will always be kept at size 1
		layer_defs.push({type:'input', out_sx:1, out_sy:1, out_depth:2});
		// declare 20 neurons, followed by ReLU (rectified linear unit non-linearity)
		layer_defs.push({type:'fc', num_neurons:20, activation:'relu'}); 
		// declare the linear classifier on top of the previous hidden layer
		layer_defs.push({type:'softmax', num_classes:10});

		var net = new convnetjs.Net();
		net.makeLayers(layer_defs);

		// forward a random data point through the network
		var x = new convnetjs.Vol([0.3, -0.5]);
		var prob = net.forward(x); 

		// prob is a Vol. Vols have a field .w that stores the raw data, and .dw that stores gradients
		console.log('probability that x is class 0: ' + prob.w[0]); // prints 0.50101

		var trainer = new convnetjs.SGDTrainer(net, {learning_rate:0.01, l2_decay:0.001});
		trainer.train(x, 0); // train the network, specifying that x is class zero

		var prob2 = net.forward(x);
		console.log('probability that x is class 0: ' + prob2.w[0]);
		// now prints 0.50374, slightly higher than previous 0.50101: the networks
		// weights have been adjusted by the Trainer to give a higher probability to
		// the class we trained the network with (zero)
	}
	{//and here is a small Convolutional Neural Network if you wish to predict on images:
		$("body").append($("<img/>").attr({"src":"./lib/data/img/faces.jpg","id":"some_image"}).on("load",function(){
			var layer_defs = [];
			layer_defs.push({type:'input', out_sx:32, out_sy:32, out_depth:3}); // declare size of input
			// output Vol is of size 32x32x3 here
			layer_defs.push({type:'conv', sx:5, filters:16, stride:1, pad:2, activation:'relu'});
			// the layer will perform convolution with 16 kernels, each of size 5x5.
			// the input will be padded with 2 pixels on all sides to make the output Vol of the same size
			// output Vol will thus be 32x32x16 at this point
			layer_defs.push({type:'pool', sx:2, stride:2});
			// output Vol is of size 16x16x16 here
			layer_defs.push({type:'conv', sx:5, filters:20, stride:1, pad:2, activation:'relu'});
			// output Vol is of size 16x16x20 here
			layer_defs.push({type:'pool', sx:2, stride:2});
			// output Vol is of size 8x8x20 here
			layer_defs.push({type:'conv', sx:5, filters:20, stride:1, pad:2, activation:'relu'});
			// output Vol is of size 8x8x20 here
			layer_defs.push({type:'pool', sx:2, stride:2});
			// output Vol is of size 4x4x20 here
			layer_defs.push({type:'softmax', num_classes:10});
			// output Vol is of size 1x1x10 here

			net = new convnetjs.Net();
			net.makeLayers(layer_defs);

			// helpful utility for converting images into Vols is included
			var x = convnetjs.img_to_vol(document.getElementById('some_image'))
			var output_probabilities_vol = net.forward(x)
			console.log(["output_probabilities_vol ",JSON.stringify(output_probabilities_vol)].join(":"));
		}));
	}
});
