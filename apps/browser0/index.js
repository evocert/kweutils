var CONFIG="/kweutils/lib/config.js"+"?"+"cachebust="+new Date().getTime();
var MAIN=window.location.href.substring(0,window.location.href.lastIndexOf('/')+1)+"main.js";
//var MAIN="./main";
//require([CONFIG],function(){require([window.location.href.substring(0,window.location.href.lastIndexOf('/')+1)+"main.js"],function(){});});
require([CONFIG],function(){require([MAIN],function(){});});
