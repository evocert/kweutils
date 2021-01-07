//Chance is a minimalist generator of random [1] strings, numbers, etc. to help reduce some monotony particularly while writing automated tests or anywhere else you need anything random.
//Chance is open source software and is released under the developer and business-friendly MIT License
//Chance is loaded on this site so you can just open the console on your browser and play!
//https://chancejs.com/
//modifications made and saved in ./lib/vendor/chancejs/1.1.7/chance.es5.js for goja
define([
	"module",
	"console",
	"cyclejs",
	"chancejs",
],function(
	module,
	console,
	cyclejs,
	Chance
){
	console.log([module.id,'start'].join(':'));
	console.log(cyclejs.decycle(Chance));
	{//basic usage
		var chance=new Chance();
		console.log(chance.phone());
		console.log(chance.guid());
		console.log(chance.zip());
		console.log(chance.d20());
	}
	{//bool
		console.log(chance.bool());
		console.log(chance.bool({ likelihood: 30 }));
	}
	{//character
		console.log(chance.character());
		console.log(chance.character({ pool: 'abcde' }));
		console.log(chance.character({ alpha: true }));
		console.log(chance.character({ numeric: true }));
		console.log(chance.character({ casing: 'lower' }));
		console.log(chance.character({ symbols: true }));
	}
	{//floating
		console.log(chance.floating());
		console.log(chance.floating({ fixed: 7 }));
		console.log(chance.floating({ min: 0, max: 100 }));
	}
	{//integer
		console.log(chance.integer());
		console.log(chance.integer({ min: -20, max: 20 }));
	}
	{//letter
		console.log(chance.letter());
		console.log(chance.letter({ casing: 'lower' }));
	}
	{//natural
		console.log(chance.natural());
		console.log(chance.natural({ min: 1, max: 20 }));
	}
	{//prime
		console.log(chance.prime());
		console.log(chance.prime({ min: 1, max: 20 }));
	}
	{//string
		console.log(chance.string());
		console.log(chance.string({ length: 5 }));
		console.log(chance.string({ pool: 'abcde' }));
		console.log(chance.string({ alpha: true }));
		console.log(chance.string({ casing: 'lower' }));
		console.log(chance.string({ symbols: true }));
	}
	{//paragraph
		console.log(chance.paragraph());
		console.log(chance.paragraph({ sentences: 1 }));
	}
	{//sentence
		console.log(chance.sentence());
		console.log(chance.sentence({ words: 5 }));
	}
	{//syllable
		console.log(chance.syllable());
	}
	{//word
		console.log(chance.word());
		console.log(chance.word({ syllables: 3 }));
		console.log(chance.word({ length: 5 }));
	}
});
