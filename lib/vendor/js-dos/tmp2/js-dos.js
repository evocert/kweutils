! function i(r, a, l) {
    function u(t, e) {
        if (!a[t]) {
            if (!r[t]) {
                var n = "function" == typeof require && require;
                if (!e && n) return n(t, !0);
                if (c) return c(t, !0);
                var o = new Error("Cannot find module '" + t + "'");
                throw o.code = "MODULE_NOT_FOUND", o
            }
            var s = a[t] = {
                exports: {}
            };
            r[t][0].call(s.exports, function(e) {
                return u(r[t][1][e] || e)
            }, s, s.exports, i, r, a, l)
        }
        return a[t].exports
    }
    for (var c = "function" == typeof require && require, e = 0; e < l.length; e++) u(l[e]);
    return u
}({
    1: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.Build = {
            version: "6.22.33 (f4423f98f23ae8f2bd689442f95fc29e)",
            jsVersion: "59875851282d50e241d418337cfa413f093cf347",
            jsSize: 196977,
            wasmVersion: "03ff8f9208bc11b041bebc7cce39e56d",
            wasmSize: 1810179
        }
    }, {}],
    2: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t, n) {
                var o = this;
                if (this.storeName = "files", this.db = null, this.version = e, this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB, this.indexedDB) {
                    var s = this.indexedDB.open("js-dos-cache (" + e + ")", 1);
                    s.onerror = function(e) {
                        n("Can't open cache database")
                    }, s.onsuccess = function(e) {
                        o.db = s.result, t(o)
                    }, s.onupgradeneeded = function(e) {
                        try {
                            o.db = s.result, o.db.onerror = function(e) {
                                n("Can't upgrade cache database")
                            }, o.db.createObjectStore(o.storeName)
                        } catch (e) {
                            n("Can't upgrade cache database")
                        }
                    }
                } else n("Indexed db is not supported on this host")
            }
            return e.prototype.put = function(e, t, n) {
                if (null !== this.db) {
                    var o = this.db.transaction(this.storeName, "readwrite");
                    o.oncomplete = function() {
                        return n()
                    }, o.objectStore(this.storeName).put(t, e)
                } else n()
            }, e.prototype.get = function(e, t, n) {
                if (null !== this.db) {
                    var o = this.db.transaction(this.storeName, "readonly").objectStore(this.storeName).get(e);
                    o.onerror = function() {
                        return n("Can't read value for key '" + e + "'")
                    }, o.onsuccess = function() {
                        o.result ? t(o.result) : n("Result is empty for key '" + e + "', result: " + o.result)
                    }
                } else n("db is not initalized")
            }, e.prototype.forEach = function(n, o) {
                if (null !== this.db) {
                    var e = this.db.transaction(this.storeName, "readonly").objectStore(this.storeName).openCursor();
                    e.onerror = function() {
                        return o()
                    }, e.onsuccess = function(e) {
                        var t = e.target.result;
                        t ? (n(t.key.toString(), t.value), t.continue()) : o()
                    }
                } else o()
            }, e
        }();
        n.default = o
    }, {}],
    3: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e() {}
            return e.prototype.put = function(e, t, n) {}, e.prototype.get = function(e, t, n) {
                n("Cache is not supported on this host")
            }, e.prototype.forEach = function(e, t) {
                t()
            }, e
        }();
        n.default = o
    }, {}],
    4: [function(e, t, n) {
        "use strict";
        var o = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var s = o(e("./js-dos-cache-db")),
            i = o(e("./js-dos-cache-noop"));
        n.default = function(t, n) {
            new s.default(t.version, n, function(e) {
                void 0 !== t.log && t.log("ERR! Can't initalize cache, cause: " + e), n(new i.default)
            })
        }
    }, {
        "./js-dos-cache-db": 2,
        "./js-dos-cache-noop": 3
    }],
    5: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                var o = this;
                this.shellInputQueue = [], this.shellInputClients = [], this.dos = e, this.em = e, this.api = e, this.api.ping = function(e) {
                    for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                    o.onping(e, t)
                }, this.onready = t
            }
            return e.prototype.width = function() {
                return this.dos.canvas.width
            }, e.prototype.height = function() {
                return this.dos.canvas.height
            }, e.prototype.shell = function() {
                for (var i = this, r = [], e = 0; e < arguments.length; e++) r[e] = arguments[e];
                if (0 !== r.length) return new Promise(function(e, t) {
                    i.shellInputClients.push(e);
                    for (var n = 0, o = r; n < o.length; n++) {
                        var s = o[n];
                        i.shellInputQueue.push(s)
                    }
                    i.requestShellInput()
                })
            }, e.prototype.screenshot = function() {
                var e = this;
                return new Promise(function(t) {
                    e.api.send("screenshot", "", function(e) {
                        t(e)
                    })
                })
            }, e.prototype.exit = function() {
                try {
                    this.dos.terminate(), this.api.send("exit")
                } catch (e) {
                    return 0
                }
                return this.dos.error("Runtime is still alive!"), -1
            }, e.prototype.simulateKeyEvent = function(e, t) {
                var n = t ? "keydown" : "keyup",
                    o = document.createEvent("KeyboardEvent"),
                    s = {
                        get: function() {
                            return this.keyCodeVal
                        }
                    };
                Object.defineProperty(o, "keyCode", s), Object.defineProperty(o, "which", s), Object.defineProperty(o, "charCode", s), o.initKeyboardEvent ? o.initKeyboardEvent(n, !0, !0, document.defaultView, !1, !1, !1, !1, e, e) : o.initKeyEvent(n, !0, !0, document.defaultView, !1, !1, !1, !1, e, 0), o.keyCodeVal = e, this.dos.canvas && this.dos.canvas.dispatchEvent(o)
            }, e.prototype.simulateKeyPress = function(e) {
                var t = this;
                this.simulateKeyEvent(e, !0), setTimeout(function() {
                    return t.simulateKeyEvent(e, !1)
                }, 100)
            }, e.prototype.sendKeyPress = function(e) {
                this.api.send("sdl_key_event", e + "")
            }, e.prototype.requestShellInput = function() {
                this.sendKeyPress(13)
            }, e.prototype.onping = function(e, t) {
                switch (e) {
                    case "ready":
                        this.onready(this);
                        break;
                    case "frame":
                        this.onframe();
                        break;
                    case "shell_input":
                        if (0 === this.shellInputQueue.length) return;
                        var n = t[0],
                            o = t[1],
                            s = this.shellInputQueue.shift(),
                            i = this.em.lengthBytesUTF8(s) + 1;
                        if (o < i) return void(void 0 !== this.dos.onerror && this.dos.onerror("Can't execute cmd '" + s + "', because it's bigger then max cmd length " + o));
                        if (this.em.stringToUTF8(s, n, i), 0 === this.shellInputQueue.length) {
                            for (var r = 0, a = this.shellInputClients; r < a.length; r++) {
                                (0, a[r])()
                            }
                            this.shellInputClients = []
                        } else this.requestShellInput()
                }
            }, e.prototype.onframe = function() {
                this.dos.tick()
            }, e
        }();
        n.DosCommandInterface = o
    }, {}],
    6: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var s = e("./js-dos-options");
        n.default = function(n) {
            var o = i;
            return Object.keys(s.DosBoxConfigDefaults).forEach(function(e) {
                return t = e, void(o = o.replace("%" + t + "%", (n[t] || s.DosBoxConfigDefaults[t]) + ""));
                var t
            }), o
        };
        var i = "\n# This is the configurationfile for DOSBox 0.74. (Please use the latest version of DOSBox)\n# Lines starting with a # are commentlines and are ignored by DOSBox.\n# They are used to (briefly) document the effect of each option.\n\n[sdl]\n#       fullscreen: Start dosbox directly in fullscreen. (Press ALT-Enter to go back)\n#       fulldouble: Use double buffering in fullscreen. It can reduce screen flickering, but it can also result in a slow DOSBox.\n#   fullresolution: What resolution to use for fullscreen: original or fixed size (e.g. 1024x768).\n#                     Using your monitor's native resolution with aspect=true might give the best results.\n#                     If you end up with small window on a large screen, try an output different from surface.\n# windowresolution: Scale the window to this size IF the output device supports hardware scaling.\n#                     (output=surface does not!)\n#           output: What video system to use for output.\n#                   Possible values: surface, overlay, opengl, openglnb.\n#         autolock: Mouse will automatically lock, if you click on the screen. (Press CTRL-F10 to unlock)\n#      sensitivity: Mouse sensitivity.\n#      waitonerror: Wait before closing the console if dosbox has an error.\n#         priority: Priority levels for dosbox. Second entry behind the comma is for when dosbox is not focused/minimized.\n#                     pause is only valid for the second entry.\n#                   Possible values: lowest, lower, normal, higher, highest, pause.\n#       mapperfile: File used to load/save the key/event mappings from. Resetmapper only works with the defaul value.\n#     usescancodes: Avoid usage of symkeys, might not work on all operating systems.\n\nfullscreen=false\nfulldouble=false\nfullresolution=original\nwindowresolution=original\noutput=surface\nautolock=false\nsensitivity=100\nwaitonerror=true\npriority=higher,normal\nmapperfile=mapper-jsdos.map\nusescancodes=true\nvsync=false\n\n[dosbox]\n# language: Select another language file.\n#  machine: The type of machine tries to emulate.\n#           Possible values: hercules, cga, tandy, pcjr, ega, vgaonly, svga_s3, svga_et3000, svga_et4000, svga_paradise, vesa_nolfb, vesa_oldvbe.\n# captures: Directory where things like wave, midi, screenshot get captured.\n#  memsize: Amount of memory DOSBox has in megabytes.\n#             This value is best left at its default to avoid problems with some games,\n#             though few games might require a higher value.\n#             There is generally no speed advantage when raising this value.\n\nlanguage=\nmachine=svga_s3\ncaptures=capture\nmemsize=16\n\n[render]\n# frameskip: How many frames DOSBox skips before drawing one.\n#    aspect: Do aspect correction, if your output method doesn't support scaling this can slow things down!.\n#    scaler: Scaler used to enlarge/enhance low resolution modes.\n#              If 'forced' is appended, then the scaler will be used even if the result might not be desired.\n#            Possible values: none, normal2x, normal3x, advmame2x, advmame3x, advinterp2x, advinterp3x, hq2x, hq3x, 2xsai, super2xsai, supereagle, tv2x, tv3x, rgb2x, rgb3x, scan2x, scan3x.\n\nframeskip=0\naspect=false\nscaler=none\n\n[cpu]\n#      core: CPU Core used in emulation. auto will switch to dynamic if available and appropriate.\n#            Possible values: auto, dynamic, normal, simple.\n#   cputype: CPU Type used in emulation. auto is the fastest choice.\n#            Possible values: auto, 386, 386_slow, 486_slow, pentium_slow, 386_prefetch.\n#    cycles: Amount of instructions DOSBox tries to emulate each millisecond.\n#            Setting this value too high results in sound dropouts and lags.\n#            Cycles can be set in 3 ways:\n#              'auto'          tries to guess what a game needs.\n#                              It usually works, but can fail for certain games.\n#              'fixed #number' will set a fixed amount of cycles. This is what you usually need if 'auto' fails.\n#                              (Example: fixed 4000).\n#              'max'           will allocate as much cycles as your computer is able to handle.\n#\n#            Possible values: auto, fixed, max.\n#   cycleup: Amount of cycles to decrease/increase with keycombo.(CTRL-F11/CTRL-F12)\n# cycledown: Setting it lower than 100 will be a percentage.\n\ncore=auto\ncputype=auto\ncycles=%cycles%\ncycleup=10\ncycledown=20\n\n[mixer]\n#   nosound: Enable silent mode, sound is still emulated though.\n#      rate: Mixer sample rate, setting any device's rate higher than this will probably lower their sound quality.\n#            Possible values: 44100, 48000, 32000, 22050, 16000, 11025, 8000, 49716.\n# blocksize: Mixer block size, larger blocks might help sound stuttering but sound will also be more lagged.\n#            Possible values: 1024, 2048, 4096, 8192, 512, 256.\n# prebuffer: How many milliseconds of data to keep on top of the blocksize.\n\nnosound=false\nrate=44100\nblocksize=1024\nprebuffer=20\n\n[midi]\n#     mpu401: Type of MPU-401 to emulate.\n#             Possible values: intelligent, uart, none.\n# mididevice: Device that will receive the MIDI data from MPU-401.\n#             Possible values: default, win32, alsa, oss, coreaudio, coremidi, none.\n# midiconfig: Special configuration options for the device driver. This is usually the id of the device you want to use.\n#               See the README/Manual for more details.\n\nmpu401=intelligent\nmididevice=default\nmidiconfig=\n\n[sblaster]\n#  sbtype: Type of Soundblaster to emulate. gb is Gameblaster.\n#          Possible values: sb1, sb2, sbpro1, sbpro2, sb16, gb, none.\n#  sbbase: The IO address of the soundblaster.\n#          Possible values: 220, 240, 260, 280, 2a0, 2c0, 2e0, 300.\n#     irq: The IRQ number of the soundblaster.\n#          Possible values: 7, 5, 3, 9, 10, 11, 12.\n#     dma: The DMA number of the soundblaster.\n#          Possible values: 1, 5, 0, 3, 6, 7.\n#    hdma: The High DMA number of the soundblaster.\n#          Possible values: 1, 5, 0, 3, 6, 7.\n# sbmixer: Allow the soundblaster mixer to modify the DOSBox mixer.\n# oplmode: Type of OPL emulation. On 'auto' the mode is determined by sblaster type. All OPL modes are Adlib-compatible, except for 'cms'.\n#          Possible values: auto, cms, opl2, dualopl2, opl3, none.\n#  oplemu: Provider for the OPL emulation. compat might provide better quality (see oplrate as well).\n#          Possible values: default, compat, fast.\n# oplrate: Sample rate of OPL music emulation. Use 49716 for highest quality (set the mixer rate accordingly).\n#          Possible values: 44100, 49716, 48000, 32000, 22050, 16000, 11025, 8000.\n\nsbtype=sb16\nsbbase=220\nirq=7\ndma=1\nhdma=5\nsbmixer=true\noplmode=auto\noplemu=default\noplrate=44100\n\n[gus]\n#      gus: Enable the Gravis Ultrasound emulation.\n#  gusrate: Sample rate of Ultrasound emulation.\n#           Possible values: 44100, 48000, 32000, 22050, 16000, 11025, 8000, 49716.\n#  gusbase: The IO base address of the Gravis Ultrasound.\n#           Possible values: 240, 220, 260, 280, 2a0, 2c0, 2e0, 300.\n#   gusirq: The IRQ number of the Gravis Ultrasound.\n#           Possible values: 5, 3, 7, 9, 10, 11, 12.\n#   gusdma: The DMA channel of the Gravis Ultrasound.\n#           Possible values: 3, 0, 1, 5, 6, 7.\n# ultradir: Path to Ultrasound directory. In this directory\n#           there should be a MIDI directory that contains\n#           the patch files for GUS playback. Patch sets used\n#           with Timidity should work fine.\n\ngus=false\ngusrate=44100\ngusbase=240\ngusirq=5\ngusdma=3\nultradir=C:ULTRASND\n\n[speaker]\n# pcspeaker: Enable PC-Speaker emulation.\n#    pcrate: Sample rate of the PC-Speaker sound generation.\n#            Possible values: 44100, 48000, 32000, 22050, 16000, 11025, 8000, 49716.\n#     tandy: Enable Tandy Sound System emulation. For 'auto', emulation is present only if machine is set to 'tandy'.\n#            Possible values: auto, on, off.\n# tandyrate: Sample rate of the Tandy 3-Voice generation.\n#            Possible values: 44100, 48000, 32000, 22050, 16000, 11025, 8000, 49716.\n#    disney: Enable Disney Sound Source emulation. (Covox Voice Master and Speech Thing compatible).\n\npcspeaker=true\npcrate=44100\ntandy=auto\ntandyrate=44100\ndisney=true\n\n[joystick]\n# joysticktype: Type of joystick to emulate: auto (default), none,\n#               2axis (supports two joysticks),\n#               4axis (supports one joystick, first joystick used),\n#               4axis_2 (supports one joystick, second joystick used),\n#               fcs (Thrustmaster), ch (CH Flightstick).\n#               none disables joystick emulation.\n#               auto chooses emulation depending on real joystick(s).\n#               (Remember to reset dosbox's mapperfile if you saved it earlier)\n#               Possible values: auto, 2axis, 4axis, 4axis_2, fcs, ch, none.\n#        timed: enable timed intervals for axis. Experiment with this option, if your joystick drifts (away).\n#     autofire: continuously fires as long as you keep the button pressed.\n#       swap34: swap the 3rd and the 4th axis. can be useful for certain joysticks.\n#   buttonwrap: enable button wrapping at the number of emulated buttons.\n\njoysticktype=auto\ntimed=true\nautofire=false\nswap34=false\nbuttonwrap=false\n\n[serial]\n# serial1: set type of device connected to com port.\n#          Can be disabled, dummy, modem, nullmodem, directserial.\n#          Additional parameters must be in the same line in the form of\n#          parameter:value. Parameter for all types is irq (optional).\n#          for directserial: realport (required), rxdelay (optional).\n#                           (realport:COM1 realport:ttyS0).\n#          for modem: listenport (optional).\n#          for nullmodem: server, rxdelay, txdelay, telnet, usedtr,\n#                         transparent, port, inhsocket (all optional).\n#          Example: serial1=modem listenport:5000\n#          Possible values: dummy, disabled, modem, nullmodem, directserial.\n# serial2: see serial1\n#          Possible values: dummy, disabled, modem, nullmodem, directserial.\n# serial3: see serial1\n#          Possible values: dummy, disabled, modem, nullmodem, directserial.\n# serial4: see serial1\n#          Possible values: dummy, disabled, modem, nullmodem, directserial.\n\nserial1=dummy\nserial2=dummy\nserial3=disabled\nserial4=disabled\n\n[dos]\n#            xms: Enable XMS support.\n#            ems: Enable EMS support.\n#            umb: Enable UMB support.\n# keyboardlayout: Language code of the keyboard layout (or none).\n\nxms=true\nems=true\numb=true\nkeyboardlayout=auto\n\n[ipx]\n# ipx: Enable ipx over UDP/IP emulation.\n\nipx=false\n\n[autoexec]\n# Lines in this section will be run at startup.\n# You can put your MOUNT lines here.\n\n# https://js-dos.com\n# ΓûêΓûÇΓûÇΓûÇΓûÇΓûÇΓûê Γûê  ΓûäΓûäΓûäΓûÇΓûÇΓûê ΓûêΓûÇΓûÇΓûÇΓûÇΓûÇΓûê\n# Γûê ΓûêΓûêΓûê Γûê ΓûêΓûêΓûä Γûê ΓûÇ Γûä Γûê ΓûêΓûêΓûê Γûê\n# Γûê ΓûÇΓûÇΓûÇ Γûê ΓûäΓûêΓûê ΓûÇ ΓûÇΓûÇΓûê Γûê ΓûÇΓûÇΓûÇ Γûê\n# ΓûÇΓûÇΓûÇΓûÇΓûÇΓûÇΓûÇ ΓûÇ ΓûêΓûäΓûÇΓûäΓûÇ Γûê ΓûÇΓûÇΓûÇΓûÇΓûÇΓûÇΓûÇ\n# ΓûêΓûÇΓûäΓûäΓûêΓûÇΓûÇΓûäΓûä ΓûÇ ΓûÇΓûêΓûäΓûäΓûäΓûä ΓûÇΓûäΓûêΓûÇΓûêΓûÇ\n# ΓûêΓûÇ ΓûÇ ΓûÇΓûÇΓûä ΓûêΓûÇ Γûä ΓûäΓûÇΓûÇΓûÇΓûä ΓûêΓûÇΓûêΓûä\n# Γûä ΓûäΓûä ΓûêΓûÇΓûÇΓûä ΓûäΓûÇΓûäΓûÇΓûÇΓûê  ΓûÇΓûÇΓûäΓûÇΓûÇΓûêΓûÇ\n#   ΓûäΓûÇΓûÇΓûêΓûÇΓûÇ ΓûêΓûÇΓûêΓûÇΓûêΓûÇΓûÇΓûä ΓûÇΓûêΓûêΓûÇΓûêΓûä\n# ΓûÇΓûÇΓûÇ ΓûÇ ΓûÇ ΓûêΓûäΓûê ΓûÇΓûêΓûäΓûäΓûêΓûÇΓûÇΓûÇΓûêΓûÇΓûÇ\n# ΓûêΓûÇΓûÇΓûÇΓûÇΓûÇΓûê ΓûäΓûäΓûä Γûä Γûä Γûê ΓûÇ ΓûêΓûäΓûäΓûäΓûä\n# Γûê ΓûêΓûêΓûê Γûê ΓûÇΓûêΓûÇΓûÇΓûäΓûÇΓûÇΓûäΓûêΓûêΓûêΓûêΓûÇΓûÇΓûêΓûäΓûê\n# Γûê ΓûÇΓûÇΓûÇ Γûê ΓûäΓûÇΓûÇΓûêΓûÇΓûêΓûÇΓûä ΓûÇΓûÇΓûäΓûäΓûêΓûäΓûê \n# ΓûÇΓûÇΓûÇΓûÇΓûÇΓûÇΓûÇ ΓûÇ   ΓûÇΓûÇ ΓûÇ  ΓûÇ   ΓûÇΓûÇΓûÇ\n"
    }, {
        "./js-dos-options": 11
    }],
    7: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.applyCss = function(e, t) {
            if (null === document.getElementById(e)) {
                var n = document.createElement("style");
                n.id = e, n.innerHTML = t, document.head.appendChild(n)
            }
        }, n.createDiv = function(e) {
            var t = document.createElement("div");
            return void 0 !== e && (t.className = e), t
        }
    }, {}],
    8: [function(e, t, n) {
        "use strict";
        var o = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var l = o(e("./js-dos-cache-noop")),
            u = e("./js-dos-xhr"),
            s = function() {
                function e(e) {
                    var t = this;
                    this.syncingPromise = null, this.lastSyncTime = 0, this.dos = e, this.em = e, this.fs = e.FS, this.dos.registerTickListener(function() {
                        Date.now() - t.lastSyncTime < 5e3 || (t.lastSyncTime = Date.now(), t.syncFs())
                    }), this.dos.registerPauseListener(function() {
                        return t.syncFs()
                    }), this.dos.registerTerminateListener(function() {
                        return t.syncFs()
                    })
                }
                return e.prototype.chdir = function(e) {
                    this.fs.chdir(e)
                }, e.prototype.extract = function(n, r, e) {
                    var a = this;
                    void 0 === r && (r = "/"), void 0 === e && (e = "zip");
                    var t = (r = this.normalizePath(r)).split("/");
                    this.createPath(t, 0, t.length), this.chdir(r);
                    var o = function() {
                        return new Promise(function(s, i) {
                            "zip" === e ? new u.Xhr(n, {
                                cache: new l.default,
                                responseType: "arraybuffer",
                                fail: function(e) {
                                    return i(e)
                                },
                                progress: function(e, t) {
                                    void 0 !== a.dos.onprogress && a.dos.onprogress("Downloading " + n, e, t)
                                },
                                success: function(e) {
                                    var t = new Uint8Array(e),
                                        n = a.em._malloc(t.length);
                                    a.em.HEAPU8.set(t, n);
                                    var o = a.em._extract_zip(n, t.length);
                                    a.em._free(n), 0 === o ? (a.writeOk(r), a.syncFs().then(s).catch(i)) : i("Can't extract zip, retcode " + o + ", see more info in logs")
                                }
                            }) : i("Only ZIP archive is supported")
                        })
                    };
                    return "/" === r || 0 === r.length ? o() : new Promise(function(t, n) {
                        0 < a.lastSyncTime ? n("Can't create persistent mount point, after syncing process starts") : (a.fs.mount(a.fs.filesystems.IDBFS, {}, r), a.fs.syncfs(!0, function(e) {
                            if (!e) return a.readOk(r) ? void t() : (a.dos.warn("Indexed db contains broken FS, resetting..."), void o().then(t).catch(n));
                            n("Can't restore FS from indexed db, cause: " + e)
                        }))
                    })
                }, e.prototype.createFile = function(e, t) {
                    t instanceof ArrayBuffer && (t = new Uint8Array(t));
                    var n = (e = e.replace(new RegExp("^[a-zA-z]+:"), "").replace(new RegExp("\\\\", "g"), "/")).split("/");
                    if (0 !== n.length) {
                        var o = n[n.length - 1].trim();
                        if (0 !== o.length) {
                            var s = this.createPath(n, 0, n.length - 1);
                            this.fs.createDataFile(s, o, t, !0, !0, !0)
                        } else void 0 !== this.dos.onerror && this.dos.onerror("Can't create file '" + e + "', because file name is empty")
                    } else void 0 !== this.dos.onerror && this.dos.onerror("Can't create file '" + e + "', because it's not valid file path")
                }, e.prototype.createPath = function(e, t, n) {
                    for (var o = "", s = t; s < n; ++s) {
                        var i = e[s].trim();
                        0 !== i.length && (this.fs.createPath(o, i, !0, !0), o = o + "/" + i)
                    }
                    return o
                }, e.prototype.syncFs = function() {
                    var o = this;
                    return this.syncingPromise || (this.syncingPromise = new Promise(function(t, n) {
                        Date.now();
                        o.fs.syncfs(!1, function(e) {
                            e && (o.dos.error("Can't sync FS to indexed db, cause: " + e), n(e)), o.syncingPromise = null, o.lastSyncTime = Date.now(), t()
                        })
                    })), this.syncingPromise
                }, e.prototype.normalizePath = function(e) {
                    return 0 !== e.length && "/" === e[0] || (e = "/" + e), 1 < e.length && e.endsWith("/") && (e = e.substr(0, e.length - 1)), e
                }, e.prototype.readOk = function(e) {
                    try {
                        var t = this.fs.readFile(e + "/state.fs");
                        return 79 === t[0] && 70 === t[1]
                    } catch (e) {
                        return !1
                    }
                }, e.prototype.writeOk = function(e) {
                    this.createFile(e + "/state.fs", new Uint8Array([79, 70]))
                }, e
            }();
        n.DosFS = s
    }, {
        "./js-dos-cache-noop": 3,
        "./js-dos-xhr": 13
    }],
    9: [function(e, t, n) {
        "use strict";
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var d = e("./js-dos-build"),
            h = e("./js-dos-xhr"),
            s = function() {
                function e() {
                    this.wasmSupported = !1, this.global = window, this.wdosboxPromise = null, this.global.exports = {};
                    try {
                        if ("object" === ("undefined" == typeof WebAssembly ? "undefined" : o(WebAssembly)) && "function" == typeof WebAssembly.instantiate && "function" == typeof WebAssembly.compile) {
                            var e = new WebAssembly.Module(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0));
                            e instanceof WebAssembly.Module && (this.wasmSupported = new WebAssembly.Instance(e) instanceof WebAssembly.Instance)
                        }
                    } catch (e) {}
                    this.polyfill()
                }
                return e.prototype.polyfill = function() {
                    Math.imul && -5 === Math.imul(4294967295, 5) || (Math.imul = function(e, t) {
                        var n = 65535 & e,
                            o = 65535 & t;
                        return n * o + ((e >>> 16) * o + n * (t >>> 16) << 16) | 0
                    }), Math.imul = Math.imul, Math.fround || (Math.fround = function(e) {
                        return e
                    }), Math.fround = Math.fround, Math.clz32 || (Math.clz32 = function(e) {
                        e >>>= 0;
                        for (var t = 0; t < 32; t++)
                            if (e & 1 << 31 - t) return t;
                        return 32
                    }), Math.clz32 = Math.clz32, Math.trunc || (Math.trunc = function(e) {
                        return e < 0 ? Math.ceil(e) : Math.floor(e)
                    }), Math.trunc = Math.trunc
                }, e.prototype.resolveDosBox = function(e, t, n) {
                    var o = this;
                    this.global.exports.WDOSBOX ? n.ondosbox(this.global.exports.WDOSBOX, this.global.exports.instantiateWasm) : this.wasmSupported ? (null === this.wdosboxPromise && (this.wdosboxPromise = this.compileDosBox(e, t, n)), this.wdosboxPromise.then(function(e) {
                        setTimeout(function() {
                            //o.wdosboxPromise = null, n.ondosbox(o.global.exports.WDOSBOX, o.global.exports.instantiateWasm)
                            o.wdosboxPromise = null, n.ondosbox(WDOSBOX, o.global.exports.instantiateWasm)//mendix fix
                        }, 1)
                    }, function(e) {
                        setTimeout(function() {
                            o.wdosboxPromise = null, void 0 !== n.onerror && n.onerror(e)
                        }, 1)
                    })) : void 0 !== n.onerror && n.onerror("WebAssembly is not supported, can't resolve wdosbox")
                }, e.prototype.compileDosBox = function(r, a, l) {
                    var u = this,
                        c = d.Build.wasmSize + d.Build.jsSize;
                    return new Promise(function(s, i) {
                        var e = r.replace(".js", ".wasm.js");
                        new h.Xhr(e, {
                            cache: a,
                            responseType: "arraybuffer",
                            progress: function(e, t) {
                                l.onprogress && l.onprogress("Resolving DosBox", c, t)
                            },
                            fail: function(e, t, n) {
                                i("Can't download wasm, code: " + t + ", message: " + n + ", url: " + e)
                            },
                            success: function(e) {
                                var t = WebAssembly.compile(e),
                                    o = function(e) {
                                        i(e + "")
                                    };
                                t.catch(o), t.then(function(n) {
                                    u.global.exports.instantiateWasm = function(e, t) {
                                        return e.env.globalscall = function() {
                                            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                            l.onglobals && l.onglobals.apply(null, e)
                                        }, WebAssembly.instantiate(n, e).catch(o).then(function(e) {
                                            t(e, n)
                                        })
                                    }, new h.Xhr(r, {
                                        cache: a,
                                        progress: function(e, t) {
                                            l.onprogress && l.onprogress("Resolving DosBox", c, d.Build.wasmSize + t)
                                        },
                                        fail: function(e, t, n) {
                                            i("Can't download wdosbox.js, code: " + t + ", message: " + n + ", url: " + e)
                                        },
                                        success: function(e) {
                                            void 0 !== l.onprogress && l.onprogress("Resolving DosBox", c, c), e += eval.call(window, e), s(u.global.exports.WDOSBOX)
                                        }
                                    })
                                })
                            }
                        })
                    })
                }, e
            }();
        n.Host = new s
    }, {
        "./js-dos-build": 1,
        "./js-dos-xhr": 13
    }],
    10: [function(e, t, n) {
        "use strict";
        var o, s = (o = function(e, t) {
                return (o = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    })(e, t)
            }, function(e, t) {
                function n() {
                    this.constructor = e
                }
                o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }),
            i = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("./js-dos-build"),
            a = e("./js-dos-ci"),
            l = i(e("./js-dos-conf")),
            u = e("./js-dos-fs"),
            c = e("./js-dos-options"),
            d = e("./js-dos-ui"),
            h = function(o) {
                function e(e, t) {
                    var n = o.call(this) || this;
                    return n.isValid = !1, n.version = r.Build.version, n.ci = null, n.fs = null, n.ui = null, n.tickListeners = [], n.pauseListeners = [], n.resumeListeners = [], n.terminateListeners = [], n.canvas = e, n.onready = t, n.registerDefaultListeners(), n
                }
                return s(e, o), e.prototype.registerDefaultListeners = function() {
                    var e, t = this;
                    void 0 !== document.hidden ? e = "hidden" : void 0 !== document.mozHidden ? e = "mozHidden" : void 0 !== document.msHidden ? e = "msHidden" : void 0 !== document.webkitHidden && (e = "webkitHidden"), document.addEventListener("visibilityChange", function() {
                        document[e] ? t.pause() : t.resume()
                    }, !1), window.addEventListener("beforeunload", function() {
                        t.terminate()
                    })
                }, e.prototype.debug = function(e) {
                    void 0 !== this.log && this.log("[DEBUG] " + e)
                }, e.prototype.info = function(e) {
                    void 0 !== this.log && this.log("[INFO] " + e)
                }, e.prototype.warn = function(e) {
                    void 0 !== this.log && this.log("[WARN] " + e)
                }, e.prototype.error = function(e) {
                    void 0 !== this.log && this.log("[ERROR] " + e)
                }, e.prototype.ondosbox = function(e, t) {
                    this.info("DosBox resolved"), this.instantiateWasm = t, this.instance = new e(this)
                }, e.prototype.resolve = function() {
                    var o = this;
                    this.wdosboxUrl || (this.wdosboxUrl = "wdosbox.js"), this.log || (this.log = function(e) {
                        return console.log(e)
                    }), this.canvas ? (this.onprogress || (this.ui = new d.DosUi(this), this.onprogress = function(e, t, n) {
                        null !== o.ui && o.ui.onprogress(e, t, n)
                    }), this.SDL = {
                        defaults: {
                            widht: 320,
                            height: 200,
                            copyOnLock: !1,
                            discardOnLock: !0,
                            opaqueFrontBuffer: !1
                        }
                    }, this.isValid = !0) : void 0 !== this.onerror && this.onerror("canvas field is required, but not set!")
                }, e.prototype.onRuntimeInitialized = function() {
                    var n = this;
                    this.fs = new u.DosFS(this), this.onready({
                        fs: this.fs,
                        main: function(e) {
                            return null !== n.ui && (n.ui.detach(), n.ui = null), e || (e = []), null === n.fs ? new Promise(function(e, t) {
                                t("IllegalState: fs is null")
                            }) : (n.fs.chdir("/"), n.fs.createFile("/home/web_user/.dosbox/dosbox-jsdos.conf", l.default(n)), e.unshift("-userconf", "-c", "mount c .", "-c", "c:"), n.callMain(e), new Promise(function(t) {
                                new a.DosCommandInterface(n, function(e) {
                                    t(e)
                                })
                            }))
                        }
                    })
                }, e.prototype.registerTickListener = function(e) {
                    this.tickListeners.push(e)
                }, e.prototype.registerPauseListener = function(e) {
                    this.pauseListeners.push(e)
                }, e.prototype.registerResumeListener = function(e) {
                    this.resumeListeners.push(e)
                }, e.prototype.registerTerminateListener = function(e) {
                    this.terminateListeners.push(e)
                }, e.prototype.tick = function() {
                    for (var e = 0, t = this.tickListeners; e < t.length; e++) {
                        (0, t[e])()
                    }
                }, e.prototype.pause = function() {
                    for (var e = 0, t = this.pauseListeners; e < t.length; e++) {
                        (0, t[e])()
                    }
                }, e.prototype.resume = function() {
                    for (var e = 0, t = this.resumeListeners; e < t.length; e++) {
                        (0, t[e])()
                    }
                }, e.prototype.terminate = function() {
                    for (var e = 0, t = this.terminateListeners; e < t.length; e++) {
                        (0, t[e])()
                    }
                }, e
            }(c.DosOptions);
        n.DosModule = h
    }, {
        "./js-dos-build": 1,
        "./js-dos-ci": 5,
        "./js-dos-conf": 6,
        "./js-dos-fs": 8,
        "./js-dos-options": 11,
        "./js-dos-ui": 12
    }],
    11: [function(e, t, n) {
        "use strict";
        var o, s = (o = function(e, t) {
            return (o = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
        }, function(e, t) {
            function n() {
                this.constructor = e
            }
            o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
        });
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = function() {},
            r = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return s(t, e), t
            }(n.DosBoxConfig = i);
        n.DosOptions = r, n.DosBoxConfigDefaults = {
            cycles: "auto"
        }
    }, {}],
    12: [function(e, t, n) {
        "use strict";
        var o = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t.default = e, t
        };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var s = o(e("./js-dos-dom")),
            i = function() {
                function e(e) {
                    this.overlay = null, this.loaderMessage = null, this.hidden = !0, this.css = '\n    .dosbox-container { position: relative; min-width: 320px; min-height: 200px; display: inline-block; }\n    .dosbox-overlay, .dosbox-loader { position: absolute; left: 0; right: 0; top: 0; bottom: 0; background-color: rgba(51, 51, 51, 0.7); }\n    .dosbox-start { text-align: center; position: absolute; left: 0; right: 0; bottom: 50%; color: #fff; font-size: 1.5em; text-decoration: underline; cursor: pointer; }\n    .dosbox-overlay a { color: #fff; }\n    .dosbox-powered { position: absolute; right: 1em; bottom: 1em; font-size: 0.8em; color: #9C9C9C; }\n    .dosbox-loader-message { text-align: center; position: absolute; left: 0; right: 0; bottom: 50%; margin: 0 0 -3em 0; box-sizing: border-box; color: #fff; font-size: 1.5em; }\n    @-moz-keyframes loading { 0% { left: 0; } 50% { left: 8.33333em; } 100% { left: 0; } } @-webkit-keyframes loading { 0% { left: 0; } 50% { left: 8.33333em; } 100% { left: 0; } } @keyframes loading { 0% { left: 0; } 50% { left: 8.33333em; } 100% { left: 0; } } .st-loader { width: 10em; height: 2.5em; position: absolute; top: 50%; left: 50%; margin: -1.25em 0 0 -5em; box-sizing: border-box; }\n    .st-loader:before, .st-loader:after { content: ""; display: block; position: absolute; top: 0; bottom: 0; width: 1.25em; box-sizing: border-box; border: 0.25em solid #fff; }\n    .st-loader:before { left: -0.76923em; border-right: 0; }\n    .st-loader:after { right: -0.76923em; border-left: 0; }\n    .st-loader .equal { display: block; position: absolute; top: 50%; margin-top: -0.5em; left: 4.16667em; height: 1em; width: 1.66667em; border: 0.25em solid #fff; box-sizing: border-box; border-width: 0.25em 0; -moz-animation: loading 1.5s infinite ease-in-out; -webkit-animation: loading 1.5s infinite ease-in-out; animation: loading 1.5s infinite ease-in-out; background: #fff; }\n    ', this.overlayHtml = '\n        <div class="dosbox-loader">\n            <div class="st-loader">\n                <span class="equal"></span>\n            </div>\n            <div class="dosbox-loader-message"></div>\n        </div>\n        <div class="dosbox-powered">\n            Powered by &nbsp;<a href="https://js-dos.com">js-dos.com</a> (6.22)\n        </div>\n    ', this.dos = e, this.canvas = e.canvas;
                    try {
                        if (s.applyCss("js-dos-ui-css", this.css), null !== this.canvas.parentElement && "dosbox-container" !== this.canvas.parentElement.className) {
                            var t = s.createDiv("dosbox-container");
                            this.canvas.parentElement.replaceChild(t, this.canvas), t.appendChild(this.canvas);
                            var n = s.createDiv("dosbox-overlay");
                            t.appendChild(n), n.innerHTML = this.overlayHtml
                        }
                        var o = this.canvas.parentElement;
                        if (null === o) throw new Error("Illegal state, container is null");
                        if (this.overlay = this.childById(o, "dosbox-overlay"), null === this.overlay) throw new Error("Illegal state, overlay is null");
                        this.loaderMessage = this.childById(this.overlay, "dosbox-loader-message"), this.hidden = !0, this.show()
                    } catch (e) {
                        this.onprogress = this.onprogressFallback
                    }
                }
                return e.prototype.onprogress = function(e, t, n) {
                    var o = e + " " + Math.round(100 * n / t * 10) / 10 + "%";
                    null !== this.loaderMessage && (this.loaderMessage.innerHTML = o), this.dos.info(o), t <= n ? this.hide() : this.show()
                }, e.prototype.detach = function() {
                    this.hide(), this.onprogress = this.onprogressFallback
                }, e.prototype.hide = function() {
                    this.hidden || (this.hidden = !0, null !== this.overlay && this.overlay.setAttribute("style", "display: none"))
                }, e.prototype.show = function() {
                    this.hidden && (this.hidden = !1, null !== this.overlay && this.overlay.setAttribute("style", "display: block"))
                }, e.prototype.onprogressFallback = function(e, t, n) {
                    this.dos.info(e + " " + 100 * n / t + "%")
                }, e.prototype.childById = function(e, t) {
                    if (null === e) return null;
                    for (var n = 0; n < e.childElementCount; ++n) {
                        var o = e.children[n];
                        if (o.className === t) return o;
                        if (null !== (o = this.childById(o, t))) return o
                    }
                    return null
                }, e
            }();
        n.DosUi = i
    }, {
        "./js-dos-dom": 7
    }],
    13: [function(e, t, n) {
        "use strict";
        var o = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var s = o(e("./js-dos-cache-noop")),
            i = function() {
                function e(e, t) {
                    var n = this;
                    this.xhr = null, this.total = 0, this.loaded = 0, this.resource = e, this.options = t, this.options.method = t.method || "GET", this.cache = t.cache || new s.default, "GET" === this.options.method && this.cache.get(this.resource, function(e) {
                        void 0 !== n.options.success && n.options.success(e)
                    }, function() {
                        n.makeHttpRequest()
                    })
                }
                return e.prototype.makeHttpRequest = function() {
                    var e, t, n = this;
                    this.xhr = new XMLHttpRequest, this.xhr.open(this.options.method || "GET", this.resource, !0), "POST" === this.options.method && this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), this.xhr.overrideMimeType("text/plain; charset=x-user-defined"), "function" == typeof(e = this.xhr).addEventListener && e.addEventListener("progress", function(e) {
                        if (n.total = e.total, n.loaded = e.loaded, n.options.progress) return n.options.progress(e.total, e.loaded)
                    }), "function" == typeof(t = this.xhr).addEventListener && t.addEventListener("error", function(e) {
                        if (n.options.fail) return n.options.fail(n.resource, n.xhr.status, "connection problem"), delete n.options.fail
                    }), this.xhr.onreadystatechange = function() {
                        return n.onReadyStateChange()
                    }, this.options.responseType && (this.xhr.responseType = this.options.responseType), this.xhr.send(this.options.data)
                }, e.prototype.onReadyStateChange = function() {
                    var e = this.xhr;
                    if (4 === e.readyState)
                        if (200 === e.status) {
                            if (this.options.success) {
                                var t = Math.max(this.total, this.loaded);
                                return void 0 !== this.options.progress && this.options.progress(t, t), "GET" === this.options.method && this.resource.indexOf("?") < 0 && this.cache.put(this.resource, e.response, function() {}), this.options.success(e.response)
                            }
                        } else if (this.options.fail) return this.options.fail(this.resource, e.status, "connection problem"), delete this.options.fail
                }, e
            }();
        n.Xhr = i
    }, {
        "./js-dos-cache-noop": 3
    }],
    14: [function(e, t, n) {
        "use strict";
        var o = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        };
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = o(e("./js-dos-cache")),
            a = e("./js-dos-host"),
            l = e("./js-dos-module"),
            s = function(s, i) {
                var e = new Promise(function(e, t) {
                    var n = new l.DosModule(s, e);
                    i || (i = {}), i.onerror || (i.onerror = function(e) {
                        console.error(e)
                    }), Object.assign(n, i);
                    var o = n.onerror;
                    n.onerror = function(e) {
                        t(e);
                        setTimeout(function() {
                            n.onerror = o ? (o(e), o) : n.error
                        }, 1)
                    }, n.resolve(), n.isValid && r.default(n, function(e) {
                        a.Host.resolveDosBox(n.wdosboxUrl, e, n)
                    })
                });
                return e.ready = function(t) {
                    return e.then(function(e) {
                        t(e.fs, e.main)
                    }), e
                }, e
            };
        n.default = s, window.Dos = s
    }, {
        "./js-dos-cache": 4,
        "./js-dos-host": 9,
        "./js-dos-module": 10
    }]
}, {}, [14]);
//ignore # sourceMappingURL=js-dos.js.map
