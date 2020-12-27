//https://stackoverflow.com/questions/29353728/exporting-a-class-with-es6-babel
//https://stackoverflow.com/questions/57080497/babel-jest-issues-exporting-default-class
import console from './console';
export default class A {
	constructor(a) {
		console.log('Hello ' + a);
	}
}
