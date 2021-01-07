define(["module",'../operations/convolution'],function(module,convolution){

const lowpass3 = function (pixels) {
  const k = 1 / 9
  const operator = [k, k, k, k, k, k, k, k, k]

  return convolution(pixels, operator)
}

module.exports=lowpass3
});
