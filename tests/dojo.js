/*
 * dojo load test - dojo require works different, thats one issue, and propper changes needs to be implemented for goja
 */
require([
	'console',
	'document',
	'node',
	"dojo/_base/configRhino",
	"dojo/_base/Color",
	//"dojo/_base/Deferred",
	//"dojo/_base/NodeList",
	"dojo/_base/array",
	//"dojo/_base/browser",
	"dojo/_base/config",
	//"dojo/_base/configFirefoxExtension",
	//"dojo/_base/configNode",
	//"dojo/_base/configRhino",
	//"dojo/_base/configSpidermonkey",
	//"dojo/_base/connect",
	"dojo/_base/declare",
	//"dojo/_base/event",
	//"dojo/_base/fx",
	//"dojo/_base/html",
	"dojo/_base/json",
	"dojo/_base/kernel",
	"dojo/_base/lang",
	//"dojo/_base/loader",
	//"dojo/_base/query",
	"dojo/_base/sniff",
	//"dojo/_base/unload",
	"dojo/_base/url",
	"dojo/_base/window",
	//"dojo/_base/xhr",
	//"dojo/number",
	//"dojo/_base/configNode",
],function(console,document,node,rhino,Color,array,config,declare,json,kernel,lang,sniff,url,window,number){
	var body;
	var head;
	var html=(new node({tag:"html"})).append([
		head=new node({tag:"head"}).append([
			new node({tag:"meta"}).attr('charset','utf-8'),
			new node({tag:"style"}).text('*{background:#000000;color:#00FF00;}')
		]),
		body=new node({tag:"body"}).append([
			new node({tag:'h3'}).text('dojo color tests')
		])
	])
	function test_color(){
		try{
			var emptyColor = new Color();
			var namedColor = new Color("purple");
			var hexColor = new Color("#cdefa0");
			var a3Color = new Color([123, 123, 234]);
			var a4Color = new Color([123, 123, 234, 0.6]);
			var objColor = new Color({r:23,g:45,b:67,a:0.7});
			Color.fromHex("#FF0000")
			Color.fromHex("#F00")
			Color.fromArray([255, 0, 0])
			Color.fromArray([255, 0, 0, 1])
			Color.fromRgb("rgb(255, 0, 0)")
			Color.fromRgb("rgba(255, 0, 0, 1)")
			Color.fromString("red")
			//var myColor = Color.colorFromString("red");
			var myColor = new Color('purple');
			console.log(myColor.toRgb());
			console.log(myColor.toRgba());
			console.log(myColor.toHex());
			console.log(myColor.toCss(false));
			console.log(myColor.toCss(true));
			console.log(myColor.toString());

			var nitr=33;
			var tblwidth=512;
			var tblheight=512;
			var tbl=new node({tag:"table"}).attr("class","colortable");
			head.append(new node({tag:"style"}).text('.colortable{border-collapse:collapse;}.colortable td{width:'+tblwidth/nitr+'px;height:'+tblheight/nitr+'px;background:red;}'));


			for(var i=0;i<nitr;i++){
				var tr=new node({tag:"tr"});
				for(var j=0;j<nitr;j++){
					var col=Color.blendColors(new Color('#FF0000'),new Color('#00FF00'),i/nitr);
					col=Color.blendColors(new Color('#0000FF'),col,j/nitr);
					var td=new node({tag:"td"}).attr('style','background:'+col.toCss(true));
					tr.append(td);
				}
				tbl.append(tr);
			}
			body.append(tbl);

		}catch(e){
			console.error(e.toString());
		}
	}
	function test_array(){
		//https://dojotoolkit.org/reference-guide/1.7/quickstart/arrays.html#quickstart-arrays
		var arrIndxOf = ["foo", "hoo", "zoo"];
		var position = array.indexOf(arrIndxOf, "zoo");
		console.log(position)
	}
	function test_declare(){
		//https://dojotoolkit.org/reference-guide/1.7/dojo/declare.html#dojo-declare
		//global
		declare("my.Thinger", null, {
			count: 100,
			constructor: function(args){
				declare.safeMixin(this, args);
			}
		});
		var thing1 = new my.Thinger();
		var thing2 = new my.Thinger({ count:200 });
		console.log(thing1.count, thing2.count);
		//local
		var localThinger = declare(null, {
			count: 100,
			constructor: function(args){
				lang.mixin(this, args);
			}
		});
		var thing1 = new localThinger();
		var thing2 = new localThinger({ count:200 });
		console.log(thing1.count, thing2.count);
		//inheritance
		declare("my.OtherThinger", [my.Thinger], {
			divisor: 5,
			constructor: function(args){
				console.log('OtherThinger constructor called');
				this.total = this.count / this.divisor;
			}
		});
		var thing = new my.OtherThinger({ count:50 });
		console.log(thing.total); // 
		//multiple inheritance
		declare("VanillaSoftServe", null, {
			constructor: function(){ console.debug ("mixing in Vanilla"); }
		});
		declare("MandMs", null, {
			constructor: function(){ console.debug("mixing in MandM's"); },
			kind: "plain"
		});
		declare("CookieDough", null, {
			chunkSize: "medium"
		});
		declare("Blizzard", [VanillaSoftServe, MandMs, CookieDough], {
				constructor: function(){
						 console.debug("A blizzard with " +
								 this.kind + " M and Ms and " +
								 this.chunkSize +" chunks of cookie dough."
						 );
				}
		});
		// make a Blizzard:
		new Blizzard();
	}
	test_color();
	test_array();
	test_declare();
	document.write(html.toString());
});
