//http://vanilla-js.blogspot.com/2017/02/requirejs-with-babel-6-and-babel-5.html
//https://github.com/mikach/requirejs-babel
import console from './console';
import A from './class';
import{
	find
}from './min-dash/index';
console.log('es6:start');
var arr=[0,1,2,3,42];
var result=find(arr,42);
console.log(result);
new A("lorem");
//https://blog.realworldfullstack.io/real-world-app-part-23-ssr-with-angular-universal-637ec8490c44
//https://github.com/fgnass/domino
//import domino from './domino/index';
console.log('es6:end');
