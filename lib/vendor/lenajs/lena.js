define([
	"module",
	"./filters/invert",
	"./filters/contrast",
	"./filters/mirror",
	"./filters/red",
	"./filters/green",
	"./filters/blue",
	"./filters/brightness",
	"./filters/sepia",
	"./filters/saturation",
	"./filters/thresholding",
	"./filters/grayscale",
	"./filters/noise",
	"./filters/roberts",
	"./filters/lowpass3",
	"./filters/lowpass5",
	"./filters/highpass",
	"./filters/laplacian",
	"./filters/prewittVertical",
	"./filters/prewittHorizontal",
	"./filters/sharpen",
	"./filters/sobelVertical",
	"./filters/sobelHorizontal",
	"./filters/gaussian",
	"./filters/bigGaussian",
	"./filters/canny",
	/*
	*/
	"./operations/convolution",
	"./utils/printCanvas",
	"./utils/getImage",
	"./utils/filterImage",
	"./utils/redrawCanvas",
	"./utils/histogram"
],function(
	module,
	invert,
	contrast,
	mirror,
	red,
	green,
	blue,
	brightness,
	sepia,
	saturation,
	thresholding,
	grayscale,
	noise,
	roberts,
	lowpass3,
	lowpass5,
	highpass,
	laplacian,
	prewittVertical,
	prewittHorizontal,
	sharpen,
	sobelVertical,
	sobelHorizontal,
	gaussian,
	bigGaussian,
	canny,
	convolution,
	printCanvas,
	getImage,
	filterImage,
	redrawCanvas,
	histogram
){
	module.exports={
		"invert":invert,
		"contrast":contrast,
		"mirror":mirror,
		"red":red,
		"green":green,
		"blue":blue,
		"brightness":brightness,
		"sepia":sepia,
		"saturation":saturation,
		"thresholding":thresholding,
		"grayscale":grayscale,
		"noise":noise,
		"roberts":roberts,
		"lowpass3":lowpass3,
		"lowpass5":lowpass5,
		"highpass":highpass,
		"laplacian":laplacian,
		"prewittVertical":prewittVertical,
		"prewittHorizontal":prewittHorizontal,
		"sharpen":sharpen,
		"sobelVertical":sobelVertical,
		"sobelHorizontal":sobelHorizontal,
		"gaussian":gaussian,
		"bigGaussian":bigGaussian,
		"canny":canny,
		"convolution":convolution,
		"printCanvas":printCanvas,
		"getImage":getImage,
		"filterImage":filterImage,
		"redrawCanvas":redrawCanvas,
		"histogram":histogram
	}
	/*
export { default as invert } from './filters/invert'
export { default as contrast } from './filters/contrast'
export { default as mirror } from './filters/mirror'

// RGB filters
export { default as red } from './filters/red'
export { default as green } from './filters/green'
export { default as blue } from './filters/blue'
export { default as brightness } from './filters/brightness'

export { default as sepia } from './filters/sepia'
export { default as saturation } from './filters/saturation'

export { default as thresholding } from './filters/thresholding'
export { default as grayscale } from './filters/grayscale'
export { default as noise } from './filters/noise'

// with convolution
export { default as roberts } from './filters/roberts'
export { default as lowpass3 } from './filters/lowpass3'
export { default as lowpass5 } from './filters/lowpass5'
export { default as highpass } from './filters/highpass'
export { default as laplacian } from './filters/laplacian'
export { default as prewittVertical } from './filters/prewittVertical'
export { default as prewittHorizontal } from './filters/prewittHorizontal'
export { default as sharpen } from './filters/sharpen'
export { default as sobelVertical } from './filters/sobelVertical'
export { default as sobelHorizontal } from './filters/sobelHorizontal'
export { default as gaussian } from './filters/gaussian'
export { default as bigGaussian } from './filters/bigGaussian'
export { default as canny } from './filters/canny'

// utils
export { default as convolution } from './operations/convolution'
export { default as printCanvas } from './utils/printCanvas'
export { default as getImage } from './utils/getImage'
export { default as filterImage } from './utils/filterImage'
export { default as redrawCanvas } from './utils/redrawCanvas'
export { default as histogram } from './utils/histogram'
	*/
});
