//BitSet.js is an infinite Bit-Array (aka bit vector, bit string, bit set) implementation in JavaScript. That means that if you invert a bit vector, the leading ones get remembered. As far as I can tell, BitSet.js is the only library which has this feature. It is also heavily benchmarked against other implementations and is the most performant implementation to date.
//https://github.com/infusion/BitSet.js
//
//todo: fix up for goja vendor/bitset/5.1.1/bitset.js
//      SyntaxError: SyntaxError: <eval>: Line 912:6 Unexpected identifier (and 70 more errors)
//
define([
	"module",
	"console",
	"bitset",
],function(
	module,
	console,
	BitSet
){
	console.log([module.id,'start'].join(':'));
	console.log(BitSet);
	/*
	{//basic
		var bs = new BitSet;
		bs.set(128, 1); // Set bit at position 128
		console.log(bs.toString(16)); // Print out a hex dump with one bit set
	}
	{//flip bits
		var bs=new BitSet;
		bs
			.flip(0,62)
			.flip(29,35);
		var str = bs.toString();
		if(str==="111111111111111111111111111000000011111111111111111111111111111") {
			 console.log("YES!");
		}
	}
	{//setting range
		let bs=new BitSet;
		bs.setRange(10,18,1); // Set a 1 between 10 and 18, inclusive
		console.log(bs.toString()); // Print out a hex dump with one bit set
	}
	{//user permissions
		var P_READ=2; // Bit pos
		var P_WRITE=1;
		var P_EXEC=0;
		var user=new BitSet;
		user.set(P_READ); // Give read perms
		user.set(P_WRITE); // Give write perms
		var group=new BitSet(P_READ);
		var world=new BitSet(P_EXEC);
		console.log("0"+user.toString(8)+group.toString(8)+world.toString(8));
	}
	*/
});
