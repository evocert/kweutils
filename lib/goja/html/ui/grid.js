define([
	'document',
	'console',
	'class',
	'node',
	'idutils'
],function(document,console,Class,node,idutils){
	return new Class(node).extend({
		initialize:function(options){
			this.parent({tag:'table'});
			for(var i=0;i<8;i++){
				var td=new node({tag:'tr'});
				for(var j=0;j<8;j++){
					var tr=new node({tag:'td'});
					tr.text('foo');
					td.append(tr);
				}
				this.append(td)
			}
		}
	});
});
