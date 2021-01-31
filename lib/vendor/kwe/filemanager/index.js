define([
	"module",
	"console",
	"pathutils"
],function(
	module,
	console,
	pathutils
){
	"use strict";
	function FileManager(options){
		options=typeof(options)=="object"?options:{};
		options.cwd=typeof(options.cwd)=="string"?options.cwd:"/";
		options.cwd=pathutils.normalizepath(options.cwd)
		this.options=options;
		this.cwd=this.options.cwd;
		this.cd=function(path){
			path=typeof(path)=='undefined'?this.cwd:path;
			if(typeof(path)!='string')throw("invalid path");
			path=path.indexOf("./")==0||path.indexOf("../")==0?pathutils.normalizepath([this.cwd,path].join("/")):path;
			var cwd_=path;
			var ret={};
			var listing;
			try{
				listing=fsutils.List(cwd_);
				this.cwd=cwd_;
				ret={cwd:this.cwd};
			}catch(e){
				ret.error=e.toString();
			}
			return ret;
		};
		this.pwd=function(){
			var ret={};
			ret.cwd=this.cwd;
			return ret;
		}
		this.ls=function(path){
			path=typeof(path)=='undefined'?this.cwd:path;
			if(typeof(path)!='string')throw("invalid path");
			path=path.indexOf("./")==0||path.indexOf("../")==0?pathutils.normalizepath([this.cwd,path].join("/")):path;
			console.log(path);
			var entries;
			var ret={};
			try{entries=fsutils.List(path)}catch(e){ret.error=e.toString();};
			ret.entries=entries;
			return ret;
		}
		this.find=function(path){
			path=typeof(path)=='undefined'?this.cwd:path;
			if(typeof(path)!='string')throw("invalid path");
			path=path.indexOf("./")==0||path.indexOf("../")==0?pathutils.normalizepath([this.cwd,path].join("/")):path;
			var ret={};
			var entries;
			try{entries=fsutils.Walk(path);ret.entries=entries;}catch(e){ret.error=e.toString();};
			return ret;
		}
		this.cat=function(path){
			path=typeof(path)=='undefined'?this.cwd:path;
			if(typeof(path)!='string')throw("invalid path");
			path=path.indexOf("./")==0||path.indexOf("../")==0?pathutils.normalizepath([this.cwd,path].join("/")):path;
			var ret={};
			var contents;
			try{contents=fsutils.File2String(path);ret.contents=contents}catch(e){ret.error=e.toString();}
			return ret;
		}
		this.touch=function(path){
			path=typeof(path)=='undefined'?this.cwd:path;
			if(typeof(path)!='string')throw("invalid path");
			path=path.indexOf("./")==0||path.indexOf("../")==0?pathutils.normalizepath([this.cwd,path].join("/")):path;
			var ret={};
			try{ret.created=fsutils.String2File(path,"");}catch(e){ret.error=e.toString();}
			return ret;
		}
		this.mkdir=function(path){
			path=typeof(path)=='undefined'?this.cwd:path;
			if(typeof(path)!='string')throw("invalid path");
			path=path.indexOf("./")==0||path.indexOf("../")==0?pathutils.normalizepath([this.cwd,path].join("/")):path;
			var ret={};
			try{ret.created=fsutils.MkDir(path,"");}catch(e){ret.error=e.toString();}
			return ret;
		}
		this.rm=function(path){
			path=typeof(path)=='undefined'?this.cwd:path;
			if(typeof(path)!='string')throw("invalid path");
			path=path.indexOf("./")==0||path.indexOf("../")==0?pathutils.normalizepath([this.cwd,path].join("/")):path;
			var ret={};
			try{ret.removed=fsutils.Rm(path,"");}catch(e){ret.error=e.toString();}
			return ret;
		}
		this.setcontents=function(path,contents){
			path=typeof(path)=='undefined'?this.cwd:path;
			if(typeof(path)!='string')throw("invalid path");
			path=path.indexOf("./")==0||path.indexOf("../")==0?pathutils.normalizepath([this.cwd,path].join("/")):path;
			if(typeof(contents)!='string')throw("invalid contents");
			var ret={};
			try{ret.updated=fsutils.String2File(path,contents);}catch(e){ret.error=e.toString();}
			return ret;
		}
	};
	module.exports=FileManager;
});
