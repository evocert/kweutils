//Keypress is a robust keyboard input capturing Javascript utility focused on input for games. For details and documentation, please visit http://dmauro.github.io/Keypress/
//https://github.com/dmauro/Keypress
//http://dmauro.github.io/Keypress/
//todo: fix up keyboard demo
define([
	"module",
	"jquery",
	"keypress",
	"text!./frag/keyboard.html",
],function(
	module,
	jq,
	keypress,
	frag
){
	console.log([module.id,'start'].join(':'));
	console.log(keypress);
	$=jq;
	{//basic usage
		$("body").append($(frag));
		//$("body").html(frag);
		//bind_keyboard = function() {
		var combos, key_nodes, keyboard_msg_node, keys, on_down, on_shift_down, on_shift_up, on_up;
		keyboard_msg_node = $('.keyboard .message');
		$('body').bind('keydown', function(e) {
			return keyboard_msg_node.text("" + e.keyCode + " keyDown");
		}).bind('keyup', function(e) {
			return keyboard_msg_node.text("" + e.keyCode + " keyUp");
		});
		keys = $('.keyboard .key');
		key_nodes = {};
		$.each(keys, function(_, node) {
			var id, name;
			node = $(node);
			id = node.attr("id");
			name = id.substr(4);
			return key_nodes[name] = node;
		});
		on_down = function(node) {
			return node.addClass("pressed");
		};
		on_up = function(node) {
			return node.removeClass("pressed");
		};
		on_shift_down = function(node) {
			return node.addClass("shift_pressed");
		};
		on_shift_up = function(node) {
			return node.removeClass("shift_pressed");
		};
		combos = [
			{
				keys: "`",
				on_keydown: function() {
					return on_down(key_nodes.accent);
				},
				on_keyup: function() {
					return on_up(key_nodes.accent);
				}
			}, {
				keys: "~",
				on_keydown: function() {
					return on_shift_down(key_nodes.accent);
				},
				on_keyup: function() {
					return on_shift_up(key_nodes.accent);
				}
			}, {
				keys: "1",
				on_keydown: function() {
					return on_down(key_nodes.one);
				},
				on_keyup: function() {
					return on_up(key_nodes.one);
				}
			}, {
				keys: "!",
				on_keydown: function() {
					return on_shift_down(key_nodes.one);
				},
				on_keyup: function() {
					return on_shift_up(key_nodes.one);
				}
			}, {
				keys: "2",
				on_keydown: function() {
					return on_down(key_nodes.two);
				},
				on_keyup: function() {
					return on_up(key_nodes.two);
				}
			}, {
				keys: "@",
				on_keydown: function() {
					return on_shift_down(key_nodes.two);
				},
				on_keyup: function() {
					return on_shift_up(key_nodes.two);
				}
			}, {
				keys: "3",
				on_keydown: function() {
					return on_down(key_nodes.three);
				},
				on_keyup: function() {
					return on_up(key_nodes.three);
				}
			}, {
				keys: "#",
				on_keydown: function() {
					return on_shift_down(key_nodes.three);
				},
				on_keyup: function() {
					return on_shift_up(key_nodes.three);
				}
			}, {
				keys: "4",
				on_keydown: function() {
					return on_down(key_nodes.four);
				},
				on_keyup: function() {
					return on_up(key_nodes.four);
				}
			}, {
				keys: "$",
				on_keydown: function() {
					return on_shift_down(key_nodes.four);
				},
				on_keyup: function() {
					return on_shift_up(key_nodes.four);
				}
			}, {
				keys: "5",
				on_keydown: function() {
					return on_down(key_nodes.five);
				},
				on_keyup: function() {
					return on_up(key_nodes.five);
				}
			}, {
				keys: "%",
				on_keydown: function() {
					return on_shift_down(key_nodes.five);
				},
				on_keyup: function() {
					return on_shift_up(key_nodes.five);
				}
			}, {
				keys: "6",
				on_keydown: function() {
					return on_down(key_nodes.six);
				},
				on_keyup: function() {
					return on_up(key_nodes.six);
				}
			}, {
				keys: "^",
				on_keydown: function() {
					return on_shift_down(key_nodes.six);
				},
				on_keyup: function() {
					return on_shift_up(key_nodes.six);
				}
			}, {
				keys: "7",
				on_keydown: function() {
					return on_down(key_nodes.seven);
				},
				on_keyup: function() {
					return on_up(key_nodes.seven);
				}
			}, {
				keys: "&",
				on_keydown: function() {
					return on_shift_down(key_nodes.seven);
				},
				on_keyup: function() {
					return on_shift_up(key_nodes.seven);
				}
			}, {
				keys: "8",
				on_keydown: function() {
					return on_down(key_nodes.eight);
				},
				on_keyup: function() {
					return on_up(key_nodes.eight);
				}
			}, {
				keys: "*",
				on_keydown: function() {
					return on_shift_down(key_nodes.eight);
				},
				on_keyup: function() {
					return on_shift_up(key_nodes.eight);
				}
			}, {
				keys: "9",
				on_keydown: function() {
					return on_down(key_nodes.nine);
				},
				on_keyup: function() {
					return on_up(key_nodes.nine);
				}
			}, {
				keys: "(",
				on_keydown: function() {
					return on_shift_down(key_nodes.nine);
				},
				on_keyup: function() {
					return on_shift_up(key_nodes.nine);
				}
			}, {
				keys: "0",
				on_keydown: function() {
					return on_down(key_nodes.zero);
				},
				on_keyup: function() {
					return on_up(key_nodes.zero);
				}
			}, {
				keys: ")",
				on_keydown: function() {
					return on_shift_down(key_nodes.zero);
				},
				on_keyup: function() {
					return on_shift_up(key_nodes.zero);
				}
			}, {
				keys: "-",
				on_keydown: function() {
					return on_down(key_nodes.hyphen);
				},
				on_keyup: function() {
					return on_up(key_nodes.hyphen);
				}
			}, {
				keys: "_",
				on_keydown: function() {
					return on_shift_down(key_nodes.hyphen);
				},
				on_keyup: function() {
					return on_shift_up(key_nodes.hyphen);
				}
			}, {
				keys: "=",
				on_keydown: function() {
					return on_down(key_nodes.equals);
				},
				on_keyup: function() {
					return on_up(key_nodes.equals);
				}
			}, {
				keys: "+",
				on_keydown: function() {
					return on_shift_down(key_nodes.equals);
				},
				on_keyup: function() {
					return on_shift_up(key_nodes.equals);
				}
			}, {
				keys: "backspace",
				on_keydown: function() {
					return on_down(key_nodes.backspace);
				},
				on_keyup: function() {
					return on_up(key_nodes.backspace);
				}
			}, {
				keys: "tab",
				on_keydown: function() {
					return on_down(key_nodes.tab);
				},
				on_keyup: function() {
					return on_up(key_nodes.tab);
				}
			}, {
				keys: "q",
				on_keydown: function() {
					return on_down(key_nodes.q);
				},
				on_keyup: function() {
					return on_up(key_nodes.q);
				}
			}, {
				keys: "w",
				on_keydown: function() {
					return on_down(key_nodes.w);
				},
				on_keyup: function() {
					return on_up(key_nodes.w);
				}
			}, {
				keys: "e",
				on_keydown: function() {
					return on_down(key_nodes.e);
				},
				on_keyup: function() {
					return on_up(key_nodes.e);
				}
			}, {
				keys: "r",
				on_keydown: function() {
					return on_down(key_nodes.r);
				},
				on_keyup: function() {
					return on_up(key_nodes.r);
				}
			}, {
				keys: "t",
				on_keydown: function() {
					return on_down(key_nodes.t);
				},
				on_keyup: function() {
					return on_up(key_nodes.t);
				}
			}, {
				keys: "y",
				on_keydown: function() {
					return on_down(key_nodes.y);
				},
				on_keyup: function() {
					return on_up(key_nodes.y);
				}
			}, {
				keys: "u",
				on_keydown: function() {
					return on_down(key_nodes.u);
				},
				on_keyup: function() {
					return on_up(key_nodes.u);
				}
			}, {
				keys: "i",
				on_keydown: function() {
					return on_down(key_nodes.i);
				},
				on_keyup: function() {
					return on_up(key_nodes.i);
				}
			}, {
				keys: "o",
				on_keydown: function() {
					return on_down(key_nodes.o);
				},
				on_keyup: function() {
					return on_up(key_nodes.o);
				}
			}, {
				keys: "p",
				on_keydown: function() {
					return on_down(key_nodes.p);
				},
				on_keyup: function() {
					return on_up(key_nodes.p);
				}
			}, {
				keys: "[",
				on_keydown: function() {
					return on_down(key_nodes.left_bracket);
				},
				on_keyup: function() {
					return on_up(key_nodes.left_bracket);
				}
			}, {
				keys: "{",
				on_keydown: function() {
					return on_shift_down(key_nodes.left_bracket);
				},
				on_keyup: function() {
					return on_shift_up(key_nodes.left_bracket);
				}
			}, {
				keys: "]",
				on_keydown: function() {
					return on_down(key_nodes.right_bracket);
				},
				on_keyup: function() {
					return on_up(key_nodes.right_bracket);
				}
			}, {
				keys: "}",
				on_keydown: function() {
					return on_shift_down(key_nodes.right_bracket);
				},
				on_keyup: function() {
					return on_shift_up(key_nodes.right_bracket);
				}
			}, {
				keys: "\\",
				on_keydown: function() {
					return on_down(key_nodes.backslash);
				},
				on_keyup: function() {
					return on_up(key_nodes.backslash);
				}
			}, {
				keys: "|",
				on_keydown: function() {
					return on_shift_down(key_nodes.backslash);
				},
				on_keyup: function() {
					return on_shift_up(key_nodes.backslash);
				}
			}, {
				keys: "caps_lock",
				on_keydown: function() {
					return on_down(key_nodes.caps_lock);
				},
				on_keyup: function() {
					return on_up(key_nodes.caps_lock);
				}
			}, {
				keys: "a",
				on_keydown: function() {
					return on_down(key_nodes.a);
				},
				on_keyup: function() {
					return on_up(key_nodes.a);
				}
			}, {
				keys: "s",
				on_keydown: function() {
					return on_down(key_nodes.s);
				},
				on_keyup: function() {
					return on_up(key_nodes.s);
				}
			}, {
				keys: "d",
				on_keydown: function() {
					return on_down(key_nodes.d);
				},
				on_keyup: function() {
					return on_up(key_nodes.d);
				}
			}, {
				keys: "f",
				on_keydown: function() {
					return on_down(key_nodes.f);
				},
				on_keyup: function() {
					return on_up(key_nodes.f);
				}
			}, {
				keys: "g",
				on_keydown: function() {
					return on_down(key_nodes.g);
				},
				on_keyup: function() {
					return on_up(key_nodes.g);
				}
			}, {
				keys: "h",
				on_keydown: function() {
					return on_down(key_nodes.h);
				},
				on_keyup: function() {
					return on_up(key_nodes.h);
				}
			}, {
				keys: "j",
				on_keydown: function() {
					return on_down(key_nodes.j);
				},
				on_keyup: function() {
					return on_up(key_nodes.j);
				}
			}, {
				keys: "k",
				on_keydown: function() {
					return on_down(key_nodes.k);
				},
				on_keyup: function() {
					return on_up(key_nodes.k);
				}
			}, {
				keys: "l",
				on_keydown: function() {
					return on_down(key_nodes.l);
				},
				on_keyup: function() {
					return on_up(key_nodes.l);
				}
			}, {
				keys: ";",
				on_keydown: function() {
					return on_down(key_nodes.semicolon);
				},
				on_keyup: function() {
					return on_up(key_nodes.semicolon);
				}
			}, {
				keys: ":",
				on_keydown: function() {
					return on_shift_down(key_nodes.semicolon);
				},
				on_keyup: function() {
					return on_shift_up(key_nodes.semicolon);
				}
			}, {
				keys: "\'",
				on_keydown: function() {
					return on_down(key_nodes.apostrophe);
				},
				on_keyup: function() {
					return on_up(key_nodes.apostrophe);
				}
			}, {
				keys: "\"",
				on_keydown: function() {
					return on_shift_down(key_nodes.apostrophe);
				},
				on_keyup: function() {
					return on_shift_up(key_nodes.apostrophe);
				}
			}, {
				keys: "enter",
				on_keydown: function() {
					return on_down(key_nodes.enter);
				},
				on_keyup: function() {
					return on_up(key_nodes.enter);
				}
			}, {
				keys: "shift",
				on_keydown: function() {
					on_down(key_nodes.left_shift);
					return on_down(key_nodes.right_shift);
				},
				on_keyup: function() {
					on_up(key_nodes.left_shift);
					return on_up(key_nodes.right_shift);
				}
			}, {
				keys: "z",
				on_keydown: function() {
					return on_down(key_nodes.z);
				},
				on_keyup: function() {
					return on_up(key_nodes.z);
				}
			}, {
				keys: "x",
				on_keydown: function() {
					return on_down(key_nodes.x);
				},
				on_keyup: function() {
					return on_up(key_nodes.x);
				}
			}, {
				keys: "c",
				on_keydown: function() {
					return on_down(key_nodes.c);
				},
				on_keyup: function() {
					return on_up(key_nodes.c);
				}
			}, {
				keys: "v",
				on_keydown: function() {
					return on_down(key_nodes.v);
				},
				on_keyup: function() {
					return on_up(key_nodes.v);
				}
			}, {
				keys: "b",
				on_keydown: function() {
					return on_down(key_nodes.b);
				},
				on_keyup: function() {
					return on_up(key_nodes.b);
				}
			}, {
				keys: "n",
				on_keydown: function() {
					return on_down(key_nodes.n);
				},
				on_keyup: function() {
					return on_up(key_nodes.n);
				}
			}, {
				keys: "m",
				on_keydown: function() {
					return on_down(key_nodes.m);
				},
				on_keyup: function() {
					return on_up(key_nodes.m);
				}
			}, {
				keys: ",",
				on_keydown: function() {
					return on_down(key_nodes.comma);
				},
				on_keyup: function() {
					return on_up(key_nodes.comma);
				}
			}, {
				keys: "<",
				on_keydown: function() {
					return on_shift_down(key_nodes.comma);
				},
				on_keyup: function() {
					return on_shift_up(key_nodes.comma);
				}
			}, {
				keys: ".",
				on_keydown: function() {
					return on_down(key_nodes.period);
				},
				on_keyup: function() {
					return on_up(key_nodes.period);
				}
			}, {
				keys: ">",
				on_keydown: function() {
					return on_shift_down(key_nodes.period);
				},
				on_keyup: function() {
					return on_shift_up(key_nodes.period);
				}
			}, {
				keys: "/",
				on_keydown: function() {
					return on_down(key_nodes.forwardslash);
				},
				on_keyup: function() {
					return on_up(key_nodes.forwardslash);
				}
			}, {
				keys: "?",
				on_keydown: function() {
					return on_shift_down(key_nodes.forwardslash);
				},
				on_keyup: function() {
					return on_shift_up(key_nodes.forwardslash);
				}
			}, {
				keys: "ctrl",
				on_keydown: function() {
					on_down(key_nodes.left_ctrl);
					return on_down(key_nodes.right_ctrl);
				},
				on_keyup: function() {
					on_up(key_nodes.left_ctrl);
					return on_up(key_nodes.right_ctrl);
				}
			}, {
				keys: "alt",
				on_keydown: function() {
					on_down(key_nodes.left_alt);
					return on_down(key_nodes.right_alt);
				},
				on_keyup: function() {
					on_up(key_nodes.left_alt);
					return on_up(key_nodes.right_alt);
				}
			}, {
				keys: "cmd",
				on_keydown: function() {
					on_down(key_nodes.left_cmd);
					return on_down(key_nodes.right_cmd);
				},
				on_keyup: function() {
					on_up(key_nodes.left_cmd);
					return on_up(key_nodes.right_cmd);
				}
			}, {
				keys: "space",
				on_keydown: function() {
					return on_down(key_nodes.space);
				},
				on_keyup: function() {
					return on_up(key_nodes.space);
				}
			}, {
				keys: "up",
				on_keydown: function() {
					return on_down(key_nodes.up);
				},
				on_keyup: function() {
					return on_up(key_nodes.up);
				}
			}, {
				keys: "down",
				on_keydown: function() {
					return on_down(key_nodes.down);
				},
				on_keyup: function() {
					return on_up(key_nodes.down);
				}
			}, {
				keys: "left",
				on_keydown: function() {
					return on_down(key_nodes.left);
				},
				on_keyup: function() {
					return on_up(key_nodes.left);
				}
			}, {
				keys: "right",
				on_keydown: function() {
					return on_down(key_nodes.right);
				},
				on_keyup: function() {
					return on_up(key_nodes.right);
				}
			}, {
				keys: "print",
				on_keydown: function(e) {
					return on_down(key_nodes.print);
				},
				on_keyup: function() {
					return on_up(key_nodes.print);
				}
			}, {
				keys: "scroll",
				on_keydown: function() {
					return on_down(key_nodes.scroll_lock);
				},
				on_keyup: function() {
					return on_up(key_nodes.scroll_lock);
				}
			}, {
				keys: "pause",
				on_keydown: function() {
					return on_down(key_nodes.pause_break);
				},
				on_keyup: function() {
					return on_up(key_nodes.pause_break);
				}
			}, {
				keys: "insert",
				on_keydown: function() {
					return on_down(key_nodes.insert);
				},
				on_keyup: function() {
					return on_up(key_nodes.insert);
				}
			}, {
				keys: "home",
				on_keydown: function() {
					return on_down(key_nodes.home);
				},
				on_keyup: function() {
					return on_up(key_nodes.home);
				}
			}, {
				keys: "pageup",
				on_keydown: function() {
					return on_down(key_nodes.page_up);
				},
				on_keyup: function() {
					return on_up(key_nodes.page_up);
				}
			}, {
				keys: "delete",
				on_keydown: function() {
					return on_down(key_nodes["delete"]);
				},
				on_keyup: function() {
					return on_up(key_nodes["delete"]);
				}
			}, {
				keys: "end",
				on_keydown: function() {
					return on_down(key_nodes.end);
				},
				on_keyup: function() {
					return on_up(key_nodes.end);
				}
			}, {
				keys: "pagedown",
				on_keydown: function() {
					return on_down(key_nodes.page_down);
				},
				on_keyup: function() {
					return on_up(key_nodes.page_down);
				}
			}, {
				keys: "num",
				on_keydown: function() {
					return on_down(key_nodes.num_lock);
				},
				on_keyup: function() {
					return on_up(key_nodes.num_lock);
				}
			}, {
				keys: "num_divide",
				on_keydown: function() {
					return on_down(key_nodes.divide);
				},
				on_keyup: function() {
					return on_up(key_nodes.divide);
				}
			}, {
				keys: "num_multiply",
				on_keydown: function() {
					return on_down(key_nodes.multiply);
				},
				on_keyup: function() {
					return on_up(key_nodes.multiply);
				}
			}, {
				keys: "num_subtract",
				on_keydown: function() {
					return on_down(key_nodes.subtract);
				},
				on_keyup: function() {
					return on_up(key_nodes.subtract);
				}
			}, {
				keys: "num_add",
				on_keydown: function() {
					return on_down(key_nodes.add);
				},
				on_keyup: function() {
					return on_up(key_nodes.add);
				}
			}, {
				keys: "num_enter",
				on_keydown: function() {
					return on_down(key_nodes.num_enter);
				},
				on_keyup: function() {
					return on_up(key_nodes.num_enter);
				}
			}, {
				keys: "num_decimal",
				on_keydown: function() {
					return on_down(key_nodes.num_decimal);
				},
				on_keyup: function() {
					return on_up(key_nodes.num_decimal);
				}
			}, {
				keys: "num_0",
				on_keydown: function() {
					return on_down(key_nodes.num_0);
				},
				on_keyup: function() {
					return on_up(key_nodes.num_0);
				}
			}, {
				keys: "num_1",
				on_keydown: function() {
					return on_down(key_nodes.num_1);
				},
				on_keyup: function() {
					return on_up(key_nodes.num_1);
				}
			}, {
				keys: "num_2",
				on_keydown: function() {
					return on_down(key_nodes.num_2);
				},
				on_keyup: function() {
					return on_up(key_nodes.num_2);
				}
			}, {
				keys: "num_3",
				on_keydown: function() {
					return on_down(key_nodes.num_3);
				},
				on_keyup: function() {
					return on_up(key_nodes.num_3);
				}
			}, {
				keys: "num_4",
				on_keydown: function() {
					return on_down(key_nodes.num_4);
				},
				on_keyup: function() {
					return on_up(key_nodes.num_4);
				}
			}, {
				keys: "num_5",
				on_keydown: function() {
					return on_down(key_nodes.num_5);
				},
				on_keyup: function() {
					return on_up(key_nodes.num_5);
				}
			}, {
				keys: "num_6",
				on_keydown: function() {
					return on_down(key_nodes.num_6);
				},
				on_keyup: function() {
					return on_up(key_nodes.num_6);
				}
			}, {
				keys: "num_7",
				on_keydown: function() {
					return on_down(key_nodes.num_7);
				},
				on_keyup: function() {
					return on_up(key_nodes.num_7);
				}
			}, {
				keys: "num_8",
				on_keydown: function() {
					return on_down(key_nodes.num_8);
				},
				on_keyup: function() {
					return on_up(key_nodes.num_8);
				}
			}, {
				keys: "num_9",
				on_keydown: function() {
					return on_down(key_nodes.num_9);
				},
				on_keyup: function() {
					return on_up(key_nodes.num_9);
				}
			}
		];
		//return listener.register_many(combos);
	//};
		/*
		var listener = new keypress.Listener();
		listener.simple_combo("shift s", function() {
			console.log("You pressed shift and s");
		});

		// There are also a few other shortcut methods:

		// If we want to register a counting combo
		listener.counting_combo("tab space", function(e, count) {
			console.log("You've pressed this " + count + " times.");
		});

		// If you want to register a sequence combo
		listener.sequence_combo("up up down down left right left right b a enter", function() {
			lives = 30;
		}, true);
		*/
	}
});
