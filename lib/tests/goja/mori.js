define([
	"module",
	"console",
	"cyclejs",
	"mori",
],function(
	module,
	console,
	cyclejs,
	mori
){
	console.log([module.id,'start'].join(':'));
	console.log(mori);
	try{//basic
		var inc = function(n) {
				return n+1;
		};
		console.log(mori.intoArray(mori.map(inc, mori.vector(1,2,3,4,5))));
		// => [2,3,4,5,6]
	}catch(e){console.error(e.toString());}
	try{//non-destructive updates
		var v1 = mori.vector(1,2,3);
		var v2 = mori.conj(v1, 4);
		console.log(v1.toString()); // => '[1 2 3]'
		console.log(v2.toString()); // => '[1 2 3 4]'
	}catch(e){console.error(e.toString());}
	try{
		var sum = function(a, b) {
				return a + b;
		};
		console.log(mori.reduce(sum, mori.vector(1, 2, 3, 4))); // => 10
	}catch(e){console.error(e.toString());}
	try{//lazy sequences
		var _ = mori;
		console.log(_.intoArray(_.interpose("foo", _.vector(1, 2, 3, 4))));
		// => [1, "foo", 2, "foo", 3, "foo", 4]
	}catch(e){console.error(e.toString());}
	try{//freeze/thaw
		var m = mori;
			// ~220ms with V8 version 3.29.80 MBP 2.26ghz
			for(var j = 0; j < 10; j++) {
				var s = new Date();
				var arr = [];
				for(var i = 0; i < 10000000; i++) {
					arr.push(i);
				}
				console.log("Array push " + arr.length + " items " + ((new Date())-s));
				//gc();
			}

			// ~70ms
			for(var j = 0; j < 10; j++) {
				s = new Date();
				var mv = m._thaw(m.vector());
				for(var i = 0; i < 10000000; i++) {
					mv = m._conj.f2(mv, i);
				}
				var v = m._freeze(mv);
				console.log("Mutable vector conj " + m.count(v) + " items " + ((new Date())-s));
				//gc();
			}
	}catch(e){console.error(e.toString());}
	try{//es6 inspired map
		var m = mori;
		var h = m.hashMap("foo", 1, "bar", 2);

		h.has("foo"); // => true
		h.get("foo"); // => 1

		var iter = h.keys();
		console.log(iter.next()); // => {done: false, value: "foo"}
	}catch(e){console.error(e.toString());}
	try{//transducors
		var m = mori;
		var a = [];

		for(var i = 0; i < 1000000; i++) {
			a.push(i);
		}

		// make it immutable
		var v = m.into(m.vector(), a);

		function time(f) {
			var s = new Date();
			f();
			console.log(((new Date())-s)+"ms");
		}

		// ~190ms V8 version 3.29.80 MBP 2.26ghz
		time(function() {
			var xf = m.comp(m.map(m.inc), m.map(m.inc), m.map(m.inc));
			return m.transduce(xf, m.completing(m.sum), 0, v);
		}, 10);

		// ~440ms
		time(function() {
			return a.map(m.inc).map(m.inc).map(m.inc).reduce(function(a,b){return a+b;}, 0);
		}, 10);
	}catch(e){console.error(e.toString());}
	console.log("----------------------------------------");
	console.log("done");
	console.log("----------------------------------------");
});
