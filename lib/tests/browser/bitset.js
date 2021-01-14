//BitSet.js is an infinite Bit-Array (aka bit vector, bit string, bit set) implementation in JavaScript. That means that if you invert a bit vector, the leading ones get remembered. As far as I can tell, BitSet.js is the only library which has this feature. It is also heavily benchmarked against other implementations and is the most performant implementation to date.
//https://github.com/infusion/BitSet.js
define([
	"module",
	"bitsetjs",
],function(
	module,
	BitSet
){
	console.log([module.id,'start'].join(':'));
	console.log(BitSet);
	{//basic usage
		let bs = new BitSet;
		bs.set(128, 1); // Set bit at position 128
		console.log(bs.toString(16)); // Print out a hex dump with one bit set
	}
	{//flipping bits
		let bs = new BitSet;
		bs
		  .flip(0, 62)
		  .flip(29, 35);

		let str = bs.toString();

		if (str === "111111111111111111111111111000000011111111111111111111111111111") {
		   console.log("YES!");
		}
	}
	{//range set
		let bs = new BitSet;
		bs.setRange(10, 18, 1); // Set a 1 between 10 and 18, inclusive
	}
	{//user permissions
		let P_READ  = 2; // Bit pos
		let P_WRITE = 1;
		let P_EXEC  = 0;

		let user = new BitSet;
		user.set(P_READ); // Give read perms
		user.set(P_WRITE); // Give write perms

		let group = new BitSet(P_READ);
		let world = new BitSet(P_EXEC);

		console.log("0" + user.toString(8) + group.toString(8) + world.toString(8));
	}
	{//iterator interface
		let bs = BitSet.Random(55);
		for (let b of bs) {
		  console.log(b);
		} 
}
});
