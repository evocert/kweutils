//https://brython.info/static_tutorial/en/index.html
//https://github.com/brython-dev/brython
define([
	"module",
	"brython",
	"brython_stdlib",
	"threejs",
	"Phaser",
],function(
	module,
	brython,
	brython_stdlib,
	THREE,
	phaser
){
	console.log([module.id,'start'].join(':'));
	console.log(brython);//__BRYTHON__
	console.log(brython_stdlib);//__BRYTHON__
	console.log(THREE);//__BRYTHON__
	console.log(phaser);//__BRYTHON__
	try{
		eval(brython.python_to_js(`
from browser import document, html
document <= html.B("Hello ")
document <= "world!"
#document.attach("Hello world!")
document <= html.B("Hello world!")
document <= html.B(html.I("Hello !"))
document <= html.B("Hello, ") + "world !"
document <= html.UL(html.LI(i) for i in range(5))
		`));
	}catch(e){console.error(e.toString)}
	try{//calculator
		eval(brython.python_to_js(`
from browser import document, html

# Construction de la calculatrice
calc = html.TABLE()
calc <= html.TR(html.TH(html.DIV("0", id="result"), colspan=3) +
                html.TD("C"))
lines = ["789/", "456*", "123-", "0.=+"]

calc <= (html.TR(html.TD(x) for x in line) for line in lines)

document <= calc

result = document["result"] # direct acces to an element by its id

def action(event):
    """Handles the "click" event on a button of the calculator."""
    # The element the user clicked on is the attribute "target" of the
    # event object
    element = event.target
    # The text printed on the button is the element's "text" attribute
    value = element.text
    if value not in "=C":
        # update the result zone
        if result.text in ["0", "error"]:
            result.text = value
        else:
            result.text = result.text + value
    elif value == "C":
        # reset
        result.text = "0"
    elif value == "=":
        # execute the formula in result zone
        try:
            result.text = eval(result.text)
        except:
            result.text = "error"

# Associate function action() to the event "click" on all buttons
for button in document.select("td"):
    button.bind("click", action)
		`));
	}catch(e){console.error(e.toString)}
	try{//threejs
		window.THREE=THREE;//how to access context variable within brython??? (THREEjs leaks anyway so this is not necessary)
		eval(brython.python_to_js(`
from browser import document, window

THREE = window.THREE

camera = THREE.PerspectiveCamera.new(75, 1, 1, 10000)
camera.position.z = 1000
scene = THREE.Scene.new()
geometry = THREE.CubeGeometry.new(200, 200, 200)
material = THREE.MeshBasicMaterial.new({"color": "#ff0000", "wireframe": True})
mesh = THREE.Mesh.new(geometry, material)
scene.add(mesh)

renderer = THREE.WebGLRenderer.new()
renderer.setSize(444, 444)

document <= renderer.domElement
renderer.render(scene, camera)

def animate(i):
    # note: three.js includes requestAnimationFrame shim
    window.requestAnimationFrame(animate)

    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.02

    renderer.render(scene, camera)   

animate(0)
		`));
	}catch(e){console.error(e.toString)}
	try{//phaser
		//https://github.com/OnkelBogi/brython-phaser/blob/master/test.py
		//not getting this example working yet
		window.phaser=phaser;//how to access context variable within brython??? (THREEjs leaks anyway so this is not necessary)
		eval(brython.python_to_js(`
from browser import window, document
import javascript
Phaser=window.phaser
class Game(object):
	def __init__(self):
		self.game=window.Phaser.Game.new(
		    {
			'type': Phaser.AUTO,
			'width': 800,
			'height': 600,
			'physics': {
			    'default': 'arcade',
			    'arcade': {
				'gravity': {'y': 200}
			    }
			},
			'scene': {
			    'preload': self.preload,
			    'create': self.create
			}
		    }
		)
	def preload(self,*args):
		print('Preload...');
	def create(self,*args):
		print('Create...');
		graphicscfg={ 'fillStyle': { 'color': 0xff0000 } }
		window.console.log(graphicscfg)
		window.console.log(self)
		window.console.log(self.game)
		window.console.log(args)
		graphics = self.game.add.graphics(graphicscfg)
		#circle = Phaser.Geom.Circle.new(400, 300, 100);
GAME=Game()
		`));
	}catch(e){console.error(e.toString)}
});
