(()=>{var e={267:(e,r,n)=>{"use strict";n.d(r,{Z:()=>o});var t=n(645),a=n.n(t)()((function(e){return e[1]}));a.push([e.id,"html {\r\n    overflow: hidden;\r\n    /* position: fixed; */\r\n}\r\nbody {\r\n    margin: 0;\r\n    background-color: #F00;\r\n    color: #FFF;\r\n}\r\n#container {\r\n    width:100%;\r\n    height:100%;\r\n    /* width:800px;\r\n    height:800px; */\r\n    /* margin: auto; */\r\n    overflow:hidden;\r\n    position:fixed;\r\n}\r\ncanvas {\r\n  /* position: absolute;\r\n  left: 0px;\r\n  top: 0px; */\r\n  /* width:800px;\r\n  height:800px; */\r\n  /* padding: 0px auto; */\r\n  /* margin: 0px 10px; */\r\n}\r\n",""]);const o=a},645:e=>{"use strict";e.exports=function(e){var r=[];return r.toString=function(){return this.map((function(r){var n=e(r);return r[2]?"@media ".concat(r[2]," {").concat(n,"}"):n})).join("")},r.i=function(e,n,t){"string"==typeof e&&(e=[[null,e,""]]);var a={};if(t)for(var o=0;o<this.length;o++){var i=this[o][0];null!=i&&(a[i]=!0)}for(var l=0;l<e.length;l++){var c=[].concat(e[l]);t&&a[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),r.push(c))}},r}},174:e=>{e.exports="void main(void){\r\n  vec4 col = vec4(0);\r\n\r\n  mainImage(col, texCoord * iResolution.xy);\r\n\r\n  gl_FragColor = col;\r\n}\r\n"},749:e=>{e.exports="// precision mediump float;\r\nprecision highp float;\r\n\r\nuniform float iTime;\r\nuniform vec3  iResolution;\r\nuniform vec4  iMouse;\r\nuniform vec4  iDate;\r\n\r\nvarying vec2 texCoord;\r\n// out vec4 fragmentColor;\r\n"},558:e=>{e.exports="attribute vec3 position;\r\nvarying vec2 texCoord;\r\n\r\nvoid main() {\r\n  texCoord = ((position + 1.0) * 0.5).xy;\r\n  gl_Position = vec4( position, 1.0 );\r\n}\r\n"},810:e=>{e.exports="#define saturate(x) clamp(x, 0.0, 1.0)\r\n#define M_PI 3.1415926\r\n#define M_PI2 6.2831852\r\n\r\nfloat triangle( vec2 p0, vec2 p1, vec2 p2, vec2 p )\r\n{\r\n\tvec2 e0 = p1 - p0;\r\n\tvec2 e1 = p2 - p1;\r\n\tvec2 e2 = p0 - p2;\r\n\r\n\tvec2 v0 = p - p0;\r\n\tvec2 v1 = p - p1;\r\n\tvec2 v2 = p - p2;\r\n\r\n\tvec2 pq0 = v0 - e0*clamp( dot(v0,e0)/dot(e0,e0), 0.0, 1.0 );\r\n\tvec2 pq1 = v1 - e1*clamp( dot(v1,e1)/dot(e1,e1), 0.0, 1.0 );\r\n\tvec2 pq2 = v2 - e2*clamp( dot(v2,e2)/dot(e2,e2), 0.0, 1.0 );\r\n\r\n    float s = sign( e0.x*e2.y - e0.y*e2.x );\r\n    vec2 d = min( min( vec2( dot( pq0, pq0 ), s*(v0.x*e0.y-v0.y*e0.x) ),\r\n                       vec2( dot( pq1, pq1 ), s*(v1.x*e1.y-v1.y*e1.x) )),\r\n                       vec2( dot( pq2, pq2 ), s*(v2.x*e2.y-v2.y*e2.x) ));\r\n\r\n\treturn -sqrt(d.x)*sign(d.y);\r\n}\r\n\r\nfloat triangle(vec2 p, float r, float angle) {\r\n    float a1 = radians (-30. + angle);\r\n    float a2 = radians (-150. + angle);\r\n    float a3 = radians (-270. + angle);\r\n\r\n    vec2 v1 = vec2(cos(a1), sin(a1)) * r;\r\n    vec2 v2 = vec2(cos(a2), sin(a2)) * r;\r\n    vec2 v3 = vec2(cos(a3), sin(a3)) * r;\r\n\r\n    return triangle(v1, v2, v3, p);\r\n}\r\n\r\nfloat line( in vec2 p, in vec2 a, in vec2 b,in float t,in float blur)\r\n{\r\n    vec2 pa = p - a;\r\n    vec2 ba = b - a;\r\n    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );\r\n    float d = length( pa - ba*h );\r\n\r\n    float r = t;\r\n    float bl = blur;\r\n    float len = d - r;\r\n\r\n    return (len < 0. ? 1. : len < bl ? mix(1., 0., len / bl) : 0.);\r\n}\r\n\r\nvoid mainImage( out vec4 fragColor, in vec2 fragCoord )\r\n{\r\n    // Normalized pixel coordinates (from 0 to 1)\r\n    vec2 uv = fragCoord/iResolution.xy;\r\n\r\n    // triangle\r\n    vec2 uv2 = fragCoord/iResolution.xy + vec2(-0.5,-0.5);\r\n    //uv2.x *= iResolution.x / iResolution.y;\t// aspect\r\n    if(iResolution.x > iResolution.y)\r\n    {\r\n        uv2.x *= max(iResolution.x / iResolution.y, iResolution.y / iResolution.x);\r\n    }else{\r\n        uv2.y *= max(iResolution.x / iResolution.y, iResolution.y / iResolution.x);\r\n    }\r\n\r\n    float ts = 0.5; // triangle scale\r\n\r\n    // uv2 = rot(fract(iDate.w / 86400.) * M_PI2) * uv2;\r\n    // uv2 = rot(fract(iTime*100. / 86399.))*uv2;\r\n\r\n    vec2 uv3 = uv2 - vec2(cos(radians(30.)), sin(radians(30.))) * ts;\r\n    vec2 uv4 = uv2 - vec2(cos(radians(150.)), sin(radians(150.))) * ts;\r\n    vec2 uv5 = uv2 - vec2(cos(radians(270.)), sin(radians(270.))) * ts;\r\n\r\n    // inner triangle scale\r\n    float its = ts * 0.25;\r\n    //float its = ts * ( (sin(iTime) * 0.5 + 0.5) * 1.0);\r\n\r\n    float tri1 = 1. - smoothstep(0.0, 0.001, triangle(uv2, ts, 180.));\r\n    float tri2 = smoothstep(0.0, 0.001, triangle(uv3, ts * 0.75, 180.));\r\n    float tri3 = smoothstep(0.0, 0.001, triangle(uv4, ts * 0.75, 180.));\r\n    float tri4 = smoothstep(0.0, 0.001, triangle(uv5, ts * 0.75, 180.));\r\n    float tri5 = smoothstep(0.0, 0.001, triangle(uv2, its, 180.));\r\n\r\n    float tri = tri1;\r\n\r\n    // lines\r\n    vec2 lp1 = vec2(cos(radians(30.)), sin(radians(30.))) * its;\r\n    vec2 lp11 = lp1 + vec2(cos(radians(240.)), sin(radians(240.))) * ts / its;\r\n    float l1 = 1. - line(uv2, lp1, lp11, 0.005, 0.001);\r\n\r\n    vec2 lp2 = vec2(cos(radians(150.)), sin(radians(150.))) * its;\r\n    vec2 lp22 = lp2 + vec2(cos(radians(0.)), sin(radians(0.))) * ts / its;\r\n    float l2 = 1. - line(uv2, lp2, lp22, 0.005, 0.001);\r\n\r\n    vec2 lp3 = vec2(cos(radians(270.)), sin(radians(270.))) * its;\r\n    vec2 lp33 = lp3 + vec2(cos(radians(120.)), sin(radians(120.))) * ts / its;\r\n    float l3 = 1. - line(uv2, lp3, lp33, 0.005, 0.001);\r\n\r\n    // merge\r\n    float o = tri * l1 * l2 * l3;\r\n\r\n    // Time varying pixel color\r\n    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));\r\n\r\n    col = mix(col * 0.5 , col, o);\r\n\r\n    fragColor = vec4(col,1.0);\r\n}\r\n"},379:(e,r,n)=>{"use strict";var t,a=function(){var e={};return function(r){if(void 0===e[r]){var n=document.querySelector(r);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[r]=n}return e[r]}}(),o=[];function i(e){for(var r=-1,n=0;n<o.length;n++)if(o[n].identifier===e){r=n;break}return r}function l(e,r){for(var n={},t=[],a=0;a<e.length;a++){var l=e[a],c=r.base?l[0]+r.base:l[0],s=n[c]||0,u="".concat(c," ").concat(s);n[c]=s+1;var f=i(u),v={css:l[1],media:l[2],sourceMap:l[3]};-1!==f?(o[f].references++,o[f].updater(v)):o.push({identifier:u,updater:g(v,r),references:1}),t.push(u)}return t}function c(e){var r=document.createElement("style"),t=e.attributes||{};if(void 0===t.nonce){var o=n.nc;o&&(t.nonce=o)}if(Object.keys(t).forEach((function(e){r.setAttribute(e,t[e])})),"function"==typeof e.insert)e.insert(r);else{var i=a(e.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(r)}return r}var s,u=(s=[],function(e,r){return s[e]=r,s.filter(Boolean).join("\n")});function f(e,r,n,t){var a=n?"":t.media?"@media ".concat(t.media," {").concat(t.css,"}"):t.css;if(e.styleSheet)e.styleSheet.cssText=u(r,a);else{var o=document.createTextNode(a),i=e.childNodes;i[r]&&e.removeChild(i[r]),i.length?e.insertBefore(o,i[r]):e.appendChild(o)}}function v(e,r,n){var t=n.css,a=n.media,o=n.sourceMap;if(a?e.setAttribute("media",a):e.removeAttribute("media"),o&&"undefined"!=typeof btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}var d=null,p=0;function g(e,r){var n,t,a;if(r.singleton){var o=p++;n=d||(d=c(r)),t=f.bind(null,n,o,!1),a=f.bind(null,n,o,!0)}else n=c(r),t=v.bind(null,n,r),a=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else a()}}e.exports=function(e,r){(r=r||{}).singleton||"boolean"==typeof r.singleton||(r.singleton=(void 0===t&&(t=Boolean(window&&document&&document.all&&!window.atob)),t));var n=l(e=e||[],r);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var t=0;t<n.length;t++){var a=i(n[t]);o[a].references--}for(var c=l(e,r),s=0;s<n.length;s++){var u=i(n[s]);0===o[u].references&&(o[u].updater(),o.splice(u,1))}n=c}}}}},r={};function n(t){var a=r[t];if(void 0!==a)return a.exports;var o=r[t]={id:t,exports:{}};return e[t](o,o.exports,n),o.exports}n.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return n.d(r,{a:r}),r},n.d=(e,r)=>{for(var t in r)n.o(r,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},n.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{"use strict";function e(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}var r=function(){function r(e){!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,r),this.gl=e}var n,t;return n=r,(t=[{key:"create_v_shader",value:function(e){var r=this.gl,n=r.createShader(r.VERTEX_SHADER);if(r.shaderSource(n,e),r.compileShader(n),r.getShaderParameter(n,r.COMPILE_STATUS))return n;console.log(r.getShaderInfoLog(n)+"\n"+e)}},{key:"create_f_shader",value:function(e){var r=this.gl,n=r.createShader(r.FRAGMENT_SHADER);if(r.shaderSource(n,e),r.compileShader(n),r.getShaderParameter(n,r.COMPILE_STATUS))return n;console.log(r.getShaderInfoLog(n)+"\n"+e)}},{key:"create_shader",value:function(e){var r,n=this.gl,t=document.getElementById(e);if(t){switch(t.type){case"x-shader/x-vertex":r=n.createShader(n.VERTEX_SHADER);break;case"x-shader/x-fragment":r=n.createShader(n.FRAGMENT_SHADER);break;default:return}if(n.shaderSource(r,t.text),n.compileShader(r),n.getShaderParameter(r,n.COMPILE_STATUS))return r;console.log(n.getShaderInfoLog(r)),alert(n.getShaderInfoLog(r))}}},{key:"create_program",value:function(e,r){var n=this.gl,t=n.createProgram();if(n.attachShader(t,e),n.attachShader(t,r),n.linkProgram(t),n.getProgramParameter(t,n.LINK_STATUS))return n.useProgram(t),t;alert(n.getProgramInfoLog(t))}},{key:"create_vbo",value:function(e){var r=this.gl,n=r.createBuffer();return r.bindBuffer(r.ARRAY_BUFFER,n),r.bufferData(r.ARRAY_BUFFER,new Float32Array(e),r.STATIC_DRAW),r.bindBuffer(r.ARRAY_BUFFER,null),n}},{key:"create_ibo",value:function(e){var r=this.gl,n=r.createBuffer();return r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,n),r.bufferData(r.ELEMENT_ARRAY_BUFFER,new Int16Array(e),r.STATIC_DRAW),r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,null),n}},{key:"set_attribute",value:function(e,r,n){var t=this.gl;for(var a in e)t.bindBuffer(t.ARRAY_BUFFER,e[a]),t.enableVertexAttribArray(r[a]),t.vertexAttribPointer(r[a],n[a],t.FLOAT,!1,0,0)}},{key:"create_framebuffer",value:function(e,r){var n=this.gl,t=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,t);var a=n.createRenderbuffer();n.bindRenderbuffer(n.RENDERBUFFER,a),n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_COMPONENT16,e,r),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,a);var o=n.createTexture();return n.bindTexture(n.TEXTURE_2D,o),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,e,r,0,n.RGBA,n.UNSIGNED_BYTE,null),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,o,0),n.bindTexture(n.TEXTURE_2D,null),n.bindRenderbuffer(n.RENDERBUFFER,null),n.bindFramebuffer(n.FRAMEBUFFER,null),{f:t,d:a,t:o}}},{key:"create_vao",value:function(e,r,n,t){var a,o,i,l,c=this.gl;for(l in a=c.createVertexArray(),c.bindVertexArray(a),e)o=c.createBuffer(),c.bindBuffer(c.ARRAY_BUFFER,o),c.bufferData(c.ARRAY_BUFFER,new Float32Array(e[l]),c.STATIC_DRAW),c.enableVertexAttribArray(r[l]),c.vertexAttribPointer(r[l],n[l],c.FLOAT,!1,0,0);return t&&(i=c.createBuffer(),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,i),c.bufferData(c.ELEMENT_ARRAY_BUFFER,new Int16Array(t),c.STATIC_DRAW)),c.bindVertexArray(null),a}},{key:"clear",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,t=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,o=this.gl;o.viewport(0,0,o.canvas.width,o.canvas.height),o.clearColor(e,r,n,t),o.clearDepth(a),o.clear(o.COLOR_BUFFER_BIT|o.DEPTH_BUFFER_BIT)}}])&&e(n.prototype,t),r}(),t=n(379),a=n.n(t),o=n(267);a()(o.Z,{insert:"head",singleton:!1}),o.Z.locals;var i,l,c,s,u,f,v,d,p,g,h,m,R,E=new Array,b=[];function x(){var e=window.devicePixelRatio||1,r=c.clientWidth,n=c.clientHeight;console.log("resize "+r+" "+n+" devicePixelRatio "+e),b.forEach((function(t){t(r,n,e)}))}function A(e){g=e.offsetX,h=e.offsetY}function T(e){0==e.button&&(m=1),1==e.button&&(R=1),console.log("onMouseDown "+e.button)}function y(e){0==e.button&&(m=0),1==e.button&&(R=0),console.log("onMouseUp "+e.button)}function _(){p.clear();var e=.001*(Date.now()-s),r=new Date,n=parseInt(r.getFullYear()),t=parseInt(r.getMonth()),a=parseInt(r.getDate()),o=3600*parseInt(r.getHours())+60*parseInt(r.getMinutes())+parseInt(r.getSeconds());i.useProgram(u),i.uniform1f(E[0],e),i.uniform3fv(E[1],[l.width,l.height,0]),i.uniform4fv(E[2],[g,h,m,R]),i.uniform4fv(E[3],[n,t,a,o]),i.drawElements(i.TRIANGLES,d.length,i.UNSIGNED_SHORT,0),i.flush(),setTimeout((function(){requestAnimationFrame(_)}),1e3/30)}window.addEventListener("load",(function(){if(c=document.getElementById("container"),window.addEventListener("resize",x),(l=document.getElementById("canvas")).addEventListener("mousemove",A),l.addEventListener("mousedown",T),l.addEventListener("mouseup",y),g=0,h=0,m=0,R=0,null==(i=l.getContext("webgl")||l.getContext("experimental-webgl")))return console.log("webgl unsupported"),void document.write("webgl unsupported");b.push((function(e,r,n){l.width=e*n,l.height=r*n,l.style.width=e+"px",l.style.height=r+"px",g=e*n/2,h=r*n/2,i.viewport(0,0,e,r),_()}));var e=(p=new r(i)).create_v_shader(n(558)),t=n(749)+n(810)+n(174),a=p.create_f_shader(t);u=p.create_program(e,a),E[0]=i.getUniformLocation(u,"iTime"),E[1]=i.getUniformLocation(u,"iResolution"),E[2]=i.getUniformLocation(u,"iMouse"),E[3]=i.getUniformLocation(u,"iDate");var o=new Array;o[0]=i.getAttribLocation(u,"position");var F=[];F[0]=3,d=[0,1,2,2,1,3],f=p.create_vbo([1,1,0,-1,1,0,1,-1,0,-1,-1,0]),v=p.create_ibo(d),p.set_attribute([f],o,F),i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,v),s=Date.now(),x(),requestAnimationFrame(_)}),!1)})()})();