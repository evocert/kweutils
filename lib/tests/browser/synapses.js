//A lightweight library for neural networks that runs anywhere!
//Supported languages:
// JavaScript
// Python
// Java
// C#
// Scala
// F#
//https://github.com/mrdimosthenis/Synapses
//https://mrdimosthenis.github.io/Synapses/?javascript#synapses
define([
	"module",
	"jquery",
	"synapses",
],function(
	module,
	jq,
	NeuralNetwork
){
	console.log([module.id,'start'].join(':'));
	console.log(NeuralNetwork);
	$=jq;
	$("body").css({
		"background":"#222222"
	});
	{//basic usage
		var layers = [4, 6, 5, 3];
		var neuralNetwork = NeuralNetwork.init(layers);
		var inputValues = [1.0, 0.5625, 0.511111, 0.47619];
		var prediction =NeuralNetwork.prediction(neuralNetwork, inputValues);
		var learningRate = 0.5;
		var expectedOutput = [0.0, 1.0, 0.0];
		var fitNetwork =
			NeuralNetwork.fit(
			    neuralNetwork,
			    learningRate,
			    inputValues,
			    expectedOutput
			);
		function activationF(layerIndex) {
		    switch (layerIndex) {
			case 0:
			    return ActivationFunction.sigmoid;
			case 1:
			    return ActivationFunction.identity;
			case 2:
			    return ActivationFunction.leakyReLU;
			case 3:
			    return ActivationFunction.tanh;
		    }
		}

		function weightInitF(_layerIndex) {
		    return 1.0 - 2.0 * Math.random();
		}

		var customizedNetwork =
			NeuralNetwork.customizedInit(
			    layers,
			    activationF,
			    weightInitF
			);
		var svg = NeuralNetwork.toSvg(customizedNetwork);
		$("body").append($(svg));
		var json = NeuralNetwork.toJson(customizedNetwork);
		var loadedNetwork = NeuralNetwork.ofJson(json);
		var setosaDatapoint = {
		    petal_length: "1.5",
		    petal_width: "0.1",
		    sepal_length: "4.9",
		    sepal_width: "3.1",
		    species: "setosa"
		};

		var versicolorDatapoint = {
		    petal_length: "3.8",
		    petal_width: "1.1",
		    sepal_length: "5.5",
		    sepal_width: "2.4",
		    species: "versicolor"
		};

		var virginicaDatapoint = {
		    petal_length: "6.0",
		    petal_width: "2.2",
		    sepal_length: "5.0",
		    sepal_width: "1.5",
		    species: "virginica"
		};

		var datasetArr = [ setosaDatapoint,
				   versicolorDatapoint,
				   virginicaDatapoint ];

		var datasetIter = datasetArr[Symbol.iterator]();

		var dataPreprocessor =
			DataPreprocessor.init(
			     [ ["petal_length", false],
			       ["petal_width", false],
			       ["sepal_length", false],
			       ["sepal_width", false],
			       ["species", true] ],
			     datasetIter
			);

		var encodedDatapoints = datasetArr.map(x =>
			DataPreprocessor.encodedDatapoint(dataPreprocessor, x)
		);
		var expectedWithOutputValuesArr =
			[ [ [ 0.0, 0.0, 1.0], [ 0.0, 0.0, 1.0] ],
			  [ [ 0.0, 0.0, 1.0], [ 0.0, 1.0, 1.0] ] ];

		var expectedWithOutputValuesIter =
			expectedWithOutputValuesArr[Symbol.iterator]();

		var rmse = Statistics.rootMeanSquareError(
					expectedWithOutputValuesIter
		);
	}
	{//sample json network
		//https://raw.githubusercontent.com/mrdimosthenis/Synapses/master/network.json
		var obj=
			[
			  [
			    {
			      "activationF": "sigmoid",
			      "weights": [
				0.9211880913772268,
				0.027180243817137795,
				0.10852652658514339,
				-0.20162813099768573,
				-0.10075233916843396
			      ]
			    },
			    {
			      "activationF": "sigmoid",
			      "weights": [
				-0.9489930079469029,
				-0.26015677306584273,
				-0.6978873003833059,
				0.2874994065396639,
				0.7276149322065253
			      ]
			    },
			    {
			      "activationF": "sigmoid",
			      "weights": [
				-0.9357227175449083,
				-0.9155202030305005,
				-0.9129309852279106,
				-0.6978999469719491,
				0.8063910194692945
			      ]
			    },
			    {
			      "activationF": "sigmoid",
			      "weights": [
				0.47588465535587576,
				-0.5681549645809776,
				0.9815364553014789,
				-0.6175472916357287,
				0.6688055519864093
			      ]
			    },
			    {
			      "activationF": "sigmoid",
			      "weights": [
				-0.18065888278217646,
				-0.8943132277876955,
				0.294939737903549,
				-0.13946653126709108,
				-0.975106575568284
			      ]
			    },
			    {
			      "activationF": "sigmoid",
			      "weights": [
				0.4437184379986423,
				0.2690674140331535,
				0.32810615530021336,
				0.17323902449022643,
				0.09221847729601618
			      ]
			    }
			  ],
			  [
			    {
			      "activationF": "identity",
			      "weights": [
				-0.8928384189584146,
				-0.3161167802991376,
				-0.21496286920606544,
				0.25806133542967125,
				0.8131999422319118,
				0.3867614051417534,
				0.45388143955720217
			      ]
			    },
			    {
			      "activationF": "identity",
			      "weights": [
				-0.5964794872043058,
				0.7903102784527913,
				-0.9051888424151342,
				-0.09122610135386999,
				0.6535569969369026,
				-0.22748365874317633,
				-0.13615987609385183
			      ]
			    },
			    {
			      "activationF": "identity",
			      "weights": [
				0.6208093403826789,
				0.33538576542866516,
				0.753380386023317,
				-0.2055709809859254,
				0.9488128412675767,
				-0.07338684978278609,
				-0.7968643692136412
			      ]
			    },
			    {
			      "activationF": "identity",
			      "weights": [
				-0.35625015691520523,
				-0.06294831714455151,
				-0.5599640923034961,
				-0.35867440290460384,
				0.5199823465293354,
				0.6691922308539804,
				-0.8999692624692617
			      ]
			    },
			    {
			      "activationF": "identity",
			      "weights": [
				-0.26545912729664556,
				0.37560221411197214,
				0.2923244847426285,
				-0.8896329641128919,
				0.5311148426965802,
				0.6182392962661842,
				-0.20406638996276305
			      ]
			    },
			    {
			      "activationF": "identity",
			      "weights": [
				-0.18786441034717605,
				-0.5055219662230839,
				0.04524373070462362,
				-0.11891872316176122,
				-0.9069098420319777,
				-0.49189194418627435,
				0.9655404131465519
			      ]
			    },
			    {
			      "activationF": "identity",
			      "weights": [
				-0.2337494582987365,
				0.03348554207672061,
				0.5612844635907202,
				-0.7847214826295577,
				0.4115511461873751,
				-0.5715595557401487,
				-0.5608001287671116
			      ]
			    },
			    {
			      "activationF": "identity",
			      "weights": [
				0.14039252306721073,
				0.896464828302568,
				-0.8349609673341298,
				-0.3124209022398132,
				0.6436975813480024,
				-0.818871154230379,
				0.5071867885500334
			      ]
			    }
			  ],
			  [
			    {
			      "activationF": "leakyReLU",
			      "weights": [
				-0.1496727007713341,
				-0.9446600359811137,
				0.09017935830009893,
				-0.07576012821021783,
				0.07030263961505323,
				-0.11406885695371116,
				-0.7461112874103033,
				0.6833332651740873,
				-0.8010245653234098
			      ]
			    },
			    {
			      "activationF": "leakyReLU",
			      "weights": [
				0.09559309427323814,
				-0.7879378967496491,
				-0.8000009310923726,
				0.7686306359582724,
				-0.25249222972726404,
				-0.014427663912890187,
				-0.11461181526757702,
				0.21053088617197546,
				-0.8854886060416924
			      ]
			    },
			    {
			      "activationF": "leakyReLU",
			      "weights": [
				0.8977806470434868,
				0.2759342617685159,
				0.3579625812601752,
				-0.2766215427970271,
				0.45365535947447677,
				0.16974844709537806,
				-0.06753778989996984,
				-0.7966183698132514,
				0.10365561824201519
			      ]
			    },
			    {
			      "activationF": "leakyReLU",
			      "weights": [
				0.15614262821491143,
				0.7307043329040679,
				-0.3024535882183548,
				0.8996197510630033,
				-0.5483748571969123,
				-0.4933601809685686,
				0.8877285560646404,
				-0.2549474709795905,
				-0.05003354274804406
			      ]
			    },
			    {
			      "activationF": "leakyReLU",
			      "weights": [
				0.20640525641997542,
				-0.7982126402919107,
				-0.4301615753543542,
				0.6235826001059404,
				0.39016787049890334,
				0.4847542393708937,
				0.041606408464528455,
				-0.5472453822430938,
				-0.7980597656641701
			      ]
			    }
			  ],
			  [
			    {
			      "activationF": "tanh",
			      "weights": [
				-0.4203698112641414,
				0.7385922108576337,
				-0.17832762689312132,
				0.9771813932353159,
				-0.39248885855237936,
				0.44173755976288676
			      ]
			    },
			    {
			      "activationF": "tanh",
			      "weights": [
				0.6408935521820589,
				-0.1255305117848784,
				0.5138918346393466,
				-0.8575752178510132,
				-0.37135956253563385,
				-0.06644905302411086
			      ]
			    },
			    {
			      "activationF": "tanh",
			      "weights": [
				0.8661031205839747,
				0.346207271189116,
				-0.4354090876965633,
				0.005500142063942892,
				0.10443723474592459,
				-0.9447855799384712
			      ]
			    }
			  ]
			]

		;

	}
});