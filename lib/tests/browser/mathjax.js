//https://github.com/mathjax/MathJax-demos-web
define([
	"module",
	"jquery",
	"mathjax",
],function(
	module,
	jq,
	MathJax
){
	console.log([module.id,'start'].join(':'));
	console.log(MathJax);
	$=jq;
	//mathml
	$('body').append($(`
<p>
When
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mi>a</mi><mo>&#x2260;</mo><mn>0</mn>
</math>,
there are two solutions to
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mi>a</mi><msup><mi>x</mi><mn>2</mn></msup>
  <mo>+</mo> <mi>b</mi><mi>x</mi>
  <mo>+</mo> <mi>c</mi> <mo>=</mo> <mn>0</mn>
</math>
and they are
<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
  <mi>x</mi> <mo>=</mo>
  <mrow>
    <mfrac>
      <mrow>
        <mo>&#x2212;</mo>
        <mi>b</mi>
        <mo>&#x00B1;</mo>
        <msqrt>
          <msup><mi>b</mi><mn>2</mn></msup>
          <mo>&#x2212;</mo>
          <mn>4</mn><mi>a</mi><mi>c</mi>
        </msqrt>
      </mrow>
      <mrow>
        <mn>2</mn><mi>a</mi>
      </mrow>
    </mfrac>
  </mrow>
  <mtext>.</mtext>
</math>
</p>
	`));
	//asciimath
	//http://docs.mathjax.org/en/latest/input/asciimath.html#asciimath-support
	$('body').append($('\n\
<p>When `a != 0`, there are two solutions to `ax^2 + bx + c = 0` and\n\
they are</p>\n\
<p style="text-align:center">\n\
  `x = (-b +- sqrt(b^2-4ac))/(2a) .`\n\
</p>\n\
	'));
	//[la]tex
	//typeset nod
	//	[a]sync typeset function
	//		http://docs.mathjax.org/en/latest/web/typeset.html
	//http://docs.mathjax.org/en/latest/options/output/svg.html
	nod=jQuery('<p/>').html('\\frac{1}{\\sqrt{x^2 + 1}}');
	MathJax.texReset();
	MathJax.typeset(nod);
	console.log('<p>:');
	console.log(nod.html());
	$('body').append($('<div/>').text(nod.html()))
	$('body').append($('<hr/>'));
	nod=jQuery('<p/>').html('\\begin{array}{cc} a & b \\\\ c & d \\end{array}');
	MathJax.texReset();
	MathJax.typeset(nod);
	console.log('<p>:');
	console.log(nod.html());
	$('body').append($('<div/>').text(nod.html()))
	//promises
	  MathJax.startup.promise
		.then(() => MathJax.typesetPromise(nod))
		.catch((err) => console.log('Typeset failed: ' + err.message));

});
