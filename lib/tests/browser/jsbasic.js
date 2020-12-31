define([
	"module",
	"jquery",
	"jsbasic",
	"jsbasic.tty",
	"jsbasic.dos",
	"jsbasic.lores",
	"jsbasic.hires",
	"jsbasic.bell",
	"jsbasic.keyboard",
	"css!vendor/jsbasic/display.css"
],function(
	module,
	jq,
	basic,
	TTY,
	DOS,
	LoRes,
	HiRes,
	Bell,
	keyboard
){
	console.log([module.id,'start'].join(':'));
	console.log(basic);
	console.log(TTY);
	console.log(DOS);
	console.log(LoRes);
	console.log(HiRes);
	console.log(Bell);
	console.log(keyboard);
	$=jq;
	var ttydiv=$('<div/>').addClass('jsb-tty');
	var kbddiv=$('<div/>');
	$('body').append(ttydiv);
	$('body').append(kbddiv);
	var tty=new TTY(ttydiv[0],kbddiv[0]);
	(function() {
		// Install output hook for bell
		var b = new Bell(/^.*\/|/.exec(window.location)[0]);
		var orig = tty.writeChar;
		tty.writeChar = function index_writeChar(c) {
			if (c.charCodeAt(0) === 7)
				b.play();
			else
				orig(c);
		};
	}());
	var dos = new DOS(tty);
	var lorescanvas=$('<canvas/>');
	var hirescanvas=$('<canvas/>');
	var hires2canvas=$('<canvas/>');
	$('body').append(lorescanvas);
	$('body').append(hirescanvas);
	$('body').append(hires2canvas);

	var lores = new LoRes(lorescanvas[0], 40, 48);
	var hires = new HiRes(hirescanvas[0], 280, 192);
	var hires2 = new HiRes(hires2canvas[0], 280, 192);

	var display = {
		state: { graphics: false, full: true, page1: true, lores: true },
		setState: function(state, value /* ... */) {
			var args = Array.prototype.slice.call(arguments);
			while (args.length) {
				state = args.shift();
				value = args.shift();
				this.state[state] = value;
			}

			if (this.state.graphics) {
				lores.show(this.state.lores);
				hires.show(!this.state.lores && this.state.page1);
				hires2.show(!this.state.lores && !this.state.page1);
				tty.splitScreen(tty.getScreenSize().height - (this.state.full ? 0 : 4));
			} else {
				lores.show(false);
				hires.show(false);
				hires2.show(false);
				tty.splitScreen(0);
			}
		},
		getState: function() {
			return Object.assign({}, this.state);
		}
	};
	var pdl=[0, 0, 0, 0];
	dos.reset();
	tty.reset();
	tty.autoScroll = true;
	program = basic.compile((function(){
		ret='';
		for(var i=0;i<8;i++){
			ret+=[i,print,i,'\n'].join(' ');
		}
		return ret;
	})());
	program.init({
		tty: tty,
		hires: hires,
		hires2: hires2,
		lores: lores,
		display: display,
		paddle: function(n) { return pdl[n]; }
	});
	/*
	var state;
	do {
        	state = program.step();
		// may throw basic.RuntimeError
	} while (state !== basic.STATE_STOPPED);
	*/
/*
	function driver() {
		var state;
		do {
			state = program.step(driver);
			console.log(state);
		// may throw basic.RuntimeError
		} while (state === basic.STATE_RUNNING);
	}
	driver(); // step until done or blocked
*/

});
