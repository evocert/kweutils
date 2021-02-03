/*
  Flod JS 2.0
  2012/04/01
  Christian Corti
  Neoart Costa Rica

  Last Update: Flod JS 2.0 - 2012/03/13

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
  IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  This work is licensed under the Creative Commons Attribution-Noncommercial-Share Alike 3.0 Unported License.
  To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/ or send a letter to
  Creative Commons, 171 Second Street, Suite 300, San Francisco, California, 94105, USA.
*/
function ZipFile(e){function h(c){var b=Object.create(null,{count:{value:null,writable:!0},symbol:{value:null,writable:!0}});b.count=new Uint16Array(c);b.symbol=new Uint16Array(c);return Object.seal(b)}function n(){var c=Object.create(null,{output:{value:null,writable:!0},inpbuf:{value:null,writable:!0},inpcnt:{value:0,writable:!0},outcnt:{value:0,writable:!0},bitbuf:{value:0,writable:!0},bitcnt:{value:0,writable:!0},flencode:{value:null,writable:!0},fdiscode:{value:null,writable:!0},dlencode:{value:null,
writable:!0},ddiscode:{value:null,writable:!0},input:{set:function(b){this.inpbuf=b[0];this.inpbuf.endian=b[2];this.inpcnt=this.inpbuf.position=0;this.output=ByteArray(new ArrayBuffer(b[1]));this.output.endian=b[2];this.outcnt=this.output.position=0}},inflate:{value:function(){var b,a;do if(a=this.bits(1),b=this.bits(2),b=0==b?this.stored():1==b?this.codes(this.flencode,this.fdiscode):2==b?this.dynamic():1)throw o;while(!a)}},initialize:{value:function(){var b=new Uint8Array(288),a=0;this.flencode=
h(288);for(this.fdiscode=h(30);144>a;++a)b[a]=8;for(;256>a;++a)b[a]=9;for(;280>a;++a)b[a]=7;for(;288>a;++a)b[a]=8;this.construct(this.fdiscode,b,288);for(a=0;30>a;++a)b[a]=5;this.construct(this.fdiscode,b,30);this.dlencode=h(286);this.ddiscode=h(30)}},construct:{value:function(b,a,k){for(var c=0,d=1,i=new Uint16Array(16),f=0;16>c;++c)b.count[c]=0;for(;f<k;++f)b.count[a[f]]++;if(b.count[0]==k)return 0;for(c=1;16>c;++c)if(d<<=1,d-=b.count[c],0>d)return d;for(c=1;15>c;++c)i[c+1]=i[c]+b.count[c];for(f=
0;f<k;++f)0!=a[f]&&(b.symbol[i[a[f]]++]=f);return d}},bits:{value:function(b){for(var a=this.bitbuf,c=this.inpbuf.length;this.bitcnt<b;){if(this.inpcnt==c)throw j;a|=this.inpbuf.readAt(this.inpcnt++)<<this.bitcnt;this.bitcnt+=8}this.bitbuf=a>>b;this.bitcnt-=b;return a&(1<<b)-1}},codes:{value:function(b,a){var c,g,d;do{d=this.decode(b);if(0>d)return d;if(256>d)this.output.writeAt(this.outcnt++,d);else if(256<d){d-=257;if(29<=d)throw ERRRO7;g=p[d]+this.bits(q[d]);d=this.decode(a);if(0>d)return d;c=
r[d]+this.bits(s[d]);if(c>this.outcnt)throw t;for(c=this.outcnt-c;g--;)this.output.writeAt(this.outcnt++,this.output.readAt(c++))}}while(256!=d);return 0}},decode:{value:function(b){for(var a=this.bitbuf,c=0,g,d=0,i=0,f=this.inpbuf.length,e=this.bitcnt,h=1;;){for(;e--;){c|=a&1;a>>=1;g=b.count[h];if(c<d+g)return this.bitbuf=a,this.bitcnt=this.bitcnt-h&7,b.symbol[i+(c-d)];i+=g;d+=g;d<<=1;c<<=1;++h}e=16-h;if(!e)break;if(this.inpcnt==f)throw j;a=this.inpbuf.readAt(this.inpcnt++);8<e&&(e=8)}return-9}},
stored:{value:function(){var b=this.inpbuf.length,a;this.bitbuf=this.bitcnt=0;if(this.inpcnt+4>b)throw j;a=this.inpbuf.readAt(this.inpcnt++);a|=this.inpbuf.readAt(this.inpcnt++)<<8;if(this.inpbuf.readAt(this.inpcnt++)!=(~a&255)||this.inpbuf.readAt(this.inpcnt++)!=(~a>>8&255))throw u;if(this.inpcnt+a>b)throw j;for(;a--;)this.output.writeAt(this.outcnt++,this.inpbuf.readAt(this.inpcnt++));return 0}},dynamic:{value:function(){var b=new Uint8Array(316),a;a=0;var c,g=this.bits(5)+257,d=this.bits(5)+1;
c=this.bits(4)+4;var e=g+d,f;if(286<g||30<d)throw v;for(;a<c;++a)b[m[a]]=this.bits(3);for(;19>a;++a)b[m[a]]=0;if(a=this.construct(this.dlencode,b,19))throw w;for(a=0;a<e;)if(f=this.decode(this.dlencode),16>f)b[a++]=f;else{c=0;if(16==f){if(0==a)throw x;c=b[a-1];f=3+this.bits(2)}else f=17==f?3+this.bits(3):11+this.bits(7);if(a+f>e)throw y;for(;f--;)b[a++]=c}a=this.construct(this.dlencode,b,g);if(0>a||0<a&&1!=g-this.dlencode.count[0])throw z;a=this.construct(this.ddiscode,b.subarray(g),d);if(0>a||0<
a&&1!=d-this.ddiscode.count[0])throw A;return this.codes(this.dlencode,this.ddiscode)}}});c.initialize();return Object.seal(c)}function B(){return Object.create(null,{name:{value:"",writable:!0},extra:{value:null,writable:!0},version:{value:0,writable:!0},flag:{value:0,writable:!0},method:{value:0,writable:!0},time:{value:0,writable:!0},crc:{value:0,writable:!0},compressed:{value:0,writable:!0},size:{value:0,writable:!0},offset:{value:0,writable:!0},date:{get:function(){return new Date((this.time>>
25&127)+1980,(this.time>>21&15)-1,this.time>>16&31,this.time>>11&31,this.time>>5&63,(this.time&31)<<1)}},isDirectory:{get:function(){return"/"==this.name.charAt(this.name.length-1)}}})}if(!e)return null;var o="Invalid block type.",j="Available inflate data did not terminate.",t="Distance is too far back.",u="Stored block length did not match one's complement.",v="Too many length or distance codes.",w="Code lengths codes incomplete.",x="Repeat lengths with no first length.",y="Repeat more than specified lengths.",
z="Invalid literal/length code lengths.",A="Invalid distance code lengths.",p=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258],q=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],r=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],s=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],m=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],l=Object.create(null,{endian:{value:1,
writable:!0},entries:{value:null,writable:!0},stream:{value:null,writable:!0},uncompress:{value:function(c){var b=this.stream,a;a=!1;var e,g,d;if(!c)return null;if("string"==typeof c){d=this.entries.length;for(e=0;e<d;++e)if(g=this.entries[e],g.name==c){c=g;a=!0;break}if(!a)return null}b.position=c.offset+28;a=b.readUshort();b.position+=c.name.length+a;if(c.compressed)switch(a=ByteArray(new ArrayBuffer(c.compressed),this.endian),b.readBytes(a,0,c.compressed),c.method){case 0:return a;case 8:return b=n(),
b.input=[a,c.size,this.endian],b.inflate(),b.output;default:throw"Compression method not supported.";}}},parseCentral:{value:function(){var c=this.stream,b,a=ByteArray(new ArrayBuffer(46),this.endian),e,g=this.entries.length,d;for(e=0;e<g;++e){c.readBytes(a,0,46);a.position=0;if(33639248!=a.readUint())throw"Unexpected end of archive.";a.position+=24;d=a.readUshort();if(!d)throw"Unexpected end of archive.";b=B();b.name=c.readString(d);if(d=a.readUshort())b.extra=ByteArray(new ArrayBuffer(d),this.endian),
c.readBytes(b.extra,0,d);c.position+=a.readUshort();a.position=6;b.version=a.readUshort();b.flag=a.readUshort();if(1==(b.flag&1))throw"Encrypted archive not supported.";b.method=a.readUshort();b.time=a.readUint();b.crc=a.readUint();b.compressed=a.readUint();b.size=a.readUint();a.position=42;b.offset=a.readUint();Object.freeze(b);this.entries[e]=b}}},parseEnd:{value:function(){var c=this.stream,b=c.length-22,a=b-65536;0>a&&(a=0);do if(80==c.readAt(b)&&(c.position=b,101010256==c.readUint()))break;while(--b>
a);if(b==a)throw"The archive is either in unknown format or damaged.";c.position=b+10;this.entries=[];this.entries.length=c.readUshort();c.position=b+16;c.position=c.readUint();this.parseCentral()}}});e.view||(e=ByteArray(e));e.endian=1;e.position=0;l.stream=e;l.parseEnd();return Object.seal(l)}window.neoart.Unzip=1;