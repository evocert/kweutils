define(["module",'../operations/convolution'],function(module,convolution){

const lowpass5 = function (pixels) {
  const k = 1 / 25
  const operator = [k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k, k]

  return convolution(pixels, operator)
}

module.exports=lowpass5
});
