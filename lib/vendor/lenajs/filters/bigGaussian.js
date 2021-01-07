define(["module","../operations/convolution"],function(module,convolution){

const bigGaussian = function (pixels) {
  const divider = 159
  const operator = [
    2 / divider,
    4 / divider,
    5 / divider,
    4 / divider,
    2 / divider,
    4 / divider,
    9 / divider,
    12 / divider,
    9 / divider,
    4 / divider,
    5 / divider,
    12 / divider,
    15 / divider,
    12 / divider,
    5 / divider,
    4 / divider,
    9 / divider,
    12 / divider,
    9 / divider,
    4 / divider,
    2 / divider,
    4 / divider,
    5 / divider,
    4 / divider,
    2 / divider,
  ]

  return convolution(pixels, operator)
}

module.exports=bigGaussian
});
