define([
	'console',
	'classjs',
	'node',
	'idutils'
],function(console,Class,node,idutils){
	return new Class(node).extend({
		id:null,
		script:null,
		setdata:function(data){
			this.data=data;
		},
		initialize:function(options){
			options=options==null?{}:options;
			console.log('init');
			this.width=options.width==null?256:options.width;
			this.height=options.height==null?256:options.height;
			this.data=options.data==null?(function(){
				var data=[];
				for(var x=0;x<this.width;x++){
					var row=[]
					for(var y=0;y<this.width;y++){
						row.push([0,0,0,0]);
					}
					data.push(row);
				}
				return data;
			}).call(this):options.data;
			this.parent({tag:'canvas'})
			this.id=idutils.uuidv4();
			this.attr('width',this.width);
			this.attr('height',this.height);
			this.attr('style','border:1px solid #00FF00;');
			this.attr('id',this.id);
			this.script=new node({tag:'script'}).text(
'(function(){var d='+JSON.stringify(this.data)+';var cid="'+this.id+'";var c=document.getElementById(cid);var ctx=c.getContext("2d");var cw=c.width;var ch=c.height;ctx.clearRect(0,0,cw,ch);var id=ctx.getImageData(0,0,cw, ch);var px=id.data;for(var x=0;x<cw;x++){for(var y=0;y<ch;y++){var off=(y*cw+x)*4;px[off]=d[x][y][0];px[off+1]=d[x][y][1];px[off+2]=d[x][y][2];px[off+3]=d[x][y][3];}}ctx.putImageData(id,0,0);})()');
			this.onMove=function(){
				this.parent.append(this.script);
			}
		}
	});
});
