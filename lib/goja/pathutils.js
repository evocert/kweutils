define([
],function(){
	return{
		normalizepath:function(path){
			if(typeof(path)!=='string') {
				throw new TypeError('PATH not a string');
			}
			if(path==='\\'||path==='/')return '/';
			var len=path.length;
			if(len<=1)return path;
			var prefix='';
			if(len>4&&path[3]==='\\') {
				var ch=path[2];
				if((ch==='?'||ch==='.')&&path.slice(0,2)==='\\\\'){
					path=path.slice(2);
					prefix='//';
				}
			}
			var segs=path.split(/[/\\]+/);
			path=prefix+segs.join('/');
			var stack=[];
			path.split("/").forEach(function(part,partidx){
				switch(part){
					case null:
						break;
					case '.':
						break;
					case '..':
						stack.pop();
						break;
					default:
						stack.push(part);
				}
			});
			return stack.join('/');
		}
	};
});

