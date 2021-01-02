//https://rileyjshaw.com/terra/#main
define([
	"module",
	"jquery",
	"idutils",
	"terrajs",
],function(
	module,
	jq,
	idutils,
	terra
){
	console.log([module.id,'start'].join(':'));
	console.log(terra);
	$=jq;
	{
		var id=idutils.uuidv4();
		var container=$("<div/>").attr("id",id).css({"padding":"8px","background":"#111111","margin":"8px"});
		var heading=$("<h3/>").text("example 0");
		container.append(heading);
		$("body").append(container);
		// create a simple plant creature
		terra.registerCreature({
			type: 'simplePlant',
			color: [166, 226, 46],
			size: 10,
			reproduceLv: 0.8,
			wait: function() { this.energy += 3; },
			move: false
		});
		// initialize our environment
		var ex1 = new terra.Terrarium(60, 25, {
			id: id,
			insertAfter:heading[0]
		});
		ex1.grid = ex1.makeGridWithDistribution([['secondCreature', 10], ['simplePlant', 90]]);
		ex1.animate(300);
	}
	{
		var id=idutils.uuidv4();
		var container=$("<div/>").attr("id",id).css({"padding":"8px","background":"#111111","margin":"8px"});
		var heading=$("<h3/>").text("example 1");
		container.append(heading);
		$("body").append(container);
		var gameOfLife = new terra.Terrarium(60, 25, {
			trails: 0.9,
			periodic: true,
			background: [22, 22, 22],
			id: id,
			insertAfter:heading[0]
		});

		terra.registerCA({
			type: 'GoL',
			colorFn: function () { return this.alive ? this.color + ',1' : '0,0,0,0'; },
			process: function (neighbors, x, y) {
				var surrounding = neighbors.filter(function (spot) {
					return spot.creature.alive;
				}).length;
				this.alive = surrounding === 3 || surrounding === 2 && this.alive;
				return true;
			}
		}, function () {
			this.alive = Math.random() < 0.5;
		});

		gameOfLife.grid = gameOfLife.makeGrid('GoL');
		gameOfLife.animate();
	}
	{
		var id=idutils.uuidv4();
		var container=$("<div/>").attr("id",id).css({"padding":"8px","background":"#111111","margin":"8px"});
		var heading=$("<h3/>").text("example 2");
		container.append(heading);
		$("body").append(container);
		var cyclic = new terra.Terrarium(60, 25,{
			insertAfter:heading[0]
		});

		terra.registerCA({
			type: 'cyclic',
			colors: ['255,0,0,1', '255,96,0,1', '255,191,0,1', '223,255,0,1', '128,255,0,1', '32,255,0,1', '0,255,64,1', '0,255,159,1', '0,255,255,1', '0,159,255,1', '0,64,255,1', '32,0,255,1', '127,0,255,1', '223,0,255,1', '255,0,191,1', '255,0,96,1'],
			colorFn: function () { return this.colors[this.state];},
			process: function (neighbors, x, y) {
				var next = (this.state + 1) % 16;
				var changing = neighbors.some(function (spot) {
					return spot.creature.state === next;
				});
				if (changing) this.state = next;
				return true;
			}
		}, function () {
			this.state = Math.floor(Math.random() * 16);
		});

		cyclic.grid = cyclic.makeGrid('cyclic');
		cyclic.animate();
	}
	{
		var id=idutils.uuidv4();
		var container=$("<div/>").attr("id",id).css({"padding":"8px","background":"#111111","margin":"8px"});
		var heading=$("<h3/>").text("example 3");
		container.append(heading);
		$("body").append(container);
		// the demo running at the top of this page
		var bbTerrarium = new terra.Terrarium(60, 25,{
			insertAfter:heading[0]
		});

		terra.registerCreature({
			type: 'plant',
			color: [0, 120, 0],
			size: 10,
			initialEnergy: 5,
			maxEnergy: 20,
			wait: function() {
				// photosynthesis :)
				this.energy += 1;
			},
			move: false,
			reproduceLv: 0.65
		});

		terra.registerCreature({
			type: 'brute',
			color: [0, 255, 255],
			maxEnergy: 50,
			initialEnergy: 10,
			size: 20
		});

		terra.registerCreature({
			type: 'bully',
			color: [241, 196, 15],
			initialEnergy: 20,
			reproduceLv: 0.6,
			sustainability: 3
		});

		bbTerrarium.grid = bbTerrarium.makeGridWithDistribution([['plant', 50], ['brute', 5], ['bully', 5]]);
		bbTerrarium.animate();
	}
	{
		var id=idutils.uuidv4();
		var container=$("<div/>").attr("id",id).css({"padding":"8px","background":"#111111","margin":"8px"});
		var heading=$("<h3/>").text("example 3");
		container.append(heading);
		$("body").append(container);
		var elementary = new terra.Terrarium(60,60,{
			insertAfter:heading[0]
		});

		terra.registerCA({
			type: 'elementary',
			alive: false,
			ruleset: [1, 0, 0, 1, 0, 0, 1, 0].reverse(), // rule 146
			colorFn: function () { return this.alive ? this.color + ',1' : '0,0,0,0'; },
			process: function (neighbors, x, y) {
				if (this.age === y) {
					var index = neighbors.filter(function (neighbor) { return neighbor.coords.y === y - 1;
					}).map(function (neighbor) { return neighbor.creature.alive ? 1 : 0; });
					index = parseInt(index.join(''), 2);
					this.alive = isNaN(index) ? !x : this.ruleset[index];
				}
				return true;
			}
		});

		elementary.grid = elementary.makeGrid('elementary');
		elementary.animate();
	}
	{
		//http://crawfy48.github.io/Ising-model/ising.html
		//https://en.wikipedia.org/wiki/Ising_model
		var id=idutils.uuidv4();
		var container=$("<div/>").attr("id",id).css({"padding":"8px","background":"#111111","margin":"8px"});
		var heading=$("<h3/>").text("example 4");
		container.append(heading);
		$("body").append(container);
		var size=80;	//lattice size is 50x50
		var IsingModel = new terra.Terrarium
		(size, size,
		{
			id: 'IsingTerrarium',
			periodic: true,
			neighborhood: 'vonNeumann',
			insertAfter:heading[0]
		});

		var magnetization = 0;
		var counter=0;
		var N=size*size;
		var randomness=0.9;
		var coupling=1.0;
		var temp=0.2;
		var field=0.0;
		var friction=0.0;
		terra.registerCA({
			type: 'Ising',
			colorFn: function () { return this.state === 1 ? this.color + ',1' : '0,0,0,0'; },
			process: function (neighbors, x, y)
			{
			counter+=1;
			if (counter==N)
			{	 // Magnetization is the sum of domains' states
				//document.getElementById("printM").innerHTML = magnetization;
				//document.getElementById("printm").innerHTML = magnetization*1.0/N;
				counter=magnetization=0;
			}	 // zero M to count it again
			magnetization +=this.state;
			//randomness = parseFloat(document.getElementById("R").value);
			if (Math.random() > randomness)
			{
				// 3 parameters of the model: temperature, external field and friction
				//temp =	parseFloat(document.getElementById("T").value);
				//field = parseFloat(document.getElementById("H").value);
				//friction = parseFloat(document.getElementById("F").value);
				//coupling = parseFloat(document.getElementById("J").value);
				//document.getElementById("printJ").innerHTML = coupling;
				//document.getElementById("printT").innerHTML = temp;
				//document.getElementById("printH").innerHTML = field;
				//document.getElementById("printF").innerHTML = friction;
				deltaE = 0;	// Change of energy in case of domain flip
				for (var i = 0; i < neighbors.length; i++) 
					deltaE += neighbors[i].creature.state;
				// only neighbors determine the energy change
				deltaE *= coupling*this.state;	// everything is counted in respect to the domain
				deltaE += field*this.state;			 // external field influence
				deltaE += friction;		// friction is added as a "potential step"
				if (deltaE<0)					// Metropolis criterion
					this.state *= -1;	// domain flipping
				else if (Math.random() < Math.exp(-deltaE*0.5/temp))
				{	// Every constant, like Boltzmann's k, is equal to 1 here
					this.state *= -1;	// domain flipping
				}
			}
			return true;
			}
		}, function () {
		 if (Math.random() > 0.5)
				this.state = 1;
			else		 // Initial state is chosen randomly
				this.state = -1;
		});

		IsingModel.grid = IsingModel.makeGrid('Ising');
		IsingModel.animate();
	}

});
