(()=>{var e={267:(e,r,n)=>{"use strict";n.d(r,{Z:()=>a});var t=n(645),o=n.n(t)()((function(e){return e[1]}));o.push([e.id,"html {\r\n    overflow: hidden;\r\n    /* position: fixed; */\r\n}\r\nbody {\r\n    margin: 0;\r\n    background-color: #F00;\r\n    color: #FFF;\r\n}\r\n#container {\r\n    width:100%;\r\n    height:100%;\r\n    /* width:800px;\r\n    height:800px; */\r\n    /* margin: auto; */\r\n    overflow:hidden;\r\n    position:fixed;\r\n}\r\ncanvas {\r\n  /* position: absolute;\r\n  left: 0px;\r\n  top: 0px; */\r\n  /* width:800px;\r\n  height:800px; */\r\n  /* padding: 0px auto; */\r\n  /* margin: 0px 10px; */\r\n}\r\n",""]);const a=o},645:e=>{"use strict";e.exports=function(e){var r=[];return r.toString=function(){return this.map((function(r){var n=e(r);return r[2]?"@media ".concat(r[2]," {").concat(n,"}"):n})).join("")},r.i=function(e,n,t){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(t)for(var a=0;a<this.length;a++){var i=this[a][0];null!=i&&(o[i]=!0)}for(var c=0;c<e.length;c++){var l=[].concat(e[c]);t&&o[l[0]]||(n&&(l[2]?l[2]="".concat(n," and ").concat(l[2]):l[2]=n),r.push(l))}},r}},127:e=>{e.exports="//\tSimplex 3D Noise\r\n//\tby Ian McEwan, Ashima Arts\r\n//\r\n\r\n#define saturate(x) clamp(x, 0.0, 1.0)\r\n#define M_PI 3.1415926\r\n#define M_PI2 6.2831852\r\n\r\nvec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}\r\nvec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}\r\n\r\nfloat snoise(vec3 v){\r\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\r\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\r\n\r\n// First corner\r\n  vec3 i  = floor(v + dot(v, C.yyy) );\r\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\r\n\r\n// Other corners\r\n  vec3 g = step(x0.yzx, x0.xyz);\r\n  vec3 l = 1.0 - g;\r\n  vec3 i1 = min( g.xyz, l.zxy );\r\n  vec3 i2 = max( g.xyz, l.zxy );\r\n\r\n  //  x0 = x0 - 0. + 0.0 * C\r\n  vec3 x1 = x0 - i1 + 1.0 * C.xxx;\r\n  vec3 x2 = x0 - i2 + 2.0 * C.xxx;\r\n  vec3 x3 = x0 - 1. + 3.0 * C.xxx;\r\n\r\n// Permutations\r\n  i = mod(i, 289.0 );\r\n  vec4 p = permute( permute( permute(\r\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\r\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\r\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\r\n\r\n// Gradients\r\n// ( N*N points uniformly over a square, mapped onto an octahedron.)\r\n  float n_ = 1.0/7.0; // N=7\r\n  vec3  ns = n_ * D.wyz - D.xzx;\r\n\r\n  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)\r\n\r\n  vec4 x_ = floor(j * ns.z);\r\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\r\n\r\n  vec4 x = x_ *ns.x + ns.yyyy;\r\n  vec4 y = y_ *ns.x + ns.yyyy;\r\n  vec4 h = 1.0 - abs(x) - abs(y);\r\n\r\n  vec4 b0 = vec4( x.xy, y.xy );\r\n  vec4 b1 = vec4( x.zw, y.zw );\r\n\r\n  vec4 s0 = floor(b0)*2.0 + 1.0;\r\n  vec4 s1 = floor(b1)*2.0 + 1.0;\r\n  vec4 sh = -step(h, vec4(0.0));\r\n\r\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\r\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\r\n\r\n  vec3 p0 = vec3(a0.xy,h.x);\r\n  vec3 p1 = vec3(a0.zw,h.y);\r\n  vec3 p2 = vec3(a1.xy,h.z);\r\n  vec3 p3 = vec3(a1.zw,h.w);\r\n\r\n//Normalise gradients\r\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\r\n  p0 *= norm.x;\r\n  p1 *= norm.y;\r\n  p2 *= norm.z;\r\n  p3 *= norm.w;\r\n\r\n// Mix final noise value\r\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\r\n  m = m * m;\r\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\r\n                                dot(p2,x2), dot(p3,x3) ) );\r\n}\r\n\r\nfloat circle(in vec2 uv, in float radius) {\r\n    vec2 l = uv - vec2(0.5);\r\n    return 1.0 - smoothstep(radius - (radius * 0.1), radius + (radius * 0.1), dot(l,l) * 4.0);\r\n}\r\n\r\nfloat triangle( vec2 p0, vec2 p1, vec2 p2, vec2 p )\r\n{\r\n\tvec2 e0 = p1 - p0;\r\n\tvec2 e1 = p2 - p1;\r\n\tvec2 e2 = p0 - p2;\r\n\r\n\tvec2 v0 = p - p0;\r\n\tvec2 v1 = p - p1;\r\n\tvec2 v2 = p - p2;\r\n\r\n\tvec2 pq0 = v0 - e0*clamp( dot(v0,e0)/dot(e0,e0), 0.0, 1.0 );\r\n\tvec2 pq1 = v1 - e1*clamp( dot(v1,e1)/dot(e1,e1), 0.0, 1.0 );\r\n\tvec2 pq2 = v2 - e2*clamp( dot(v2,e2)/dot(e2,e2), 0.0, 1.0 );\r\n\r\n    float s = sign( e0.x*e2.y - e0.y*e2.x );\r\n    vec2 d = min( min( vec2( dot( pq0, pq0 ), s*(v0.x*e0.y-v0.y*e0.x) ),\r\n                       vec2( dot( pq1, pq1 ), s*(v1.x*e1.y-v1.y*e1.x) )),\r\n                       vec2( dot( pq2, pq2 ), s*(v2.x*e2.y-v2.y*e2.x) ));\r\n\r\n\treturn -sqrt(d.x)*sign(d.y);\r\n}\r\n\r\nfloat triangle(vec2 p, float r, float angle) {\r\n    float a1 = radians (-30. + angle);\r\n    float a2 = radians (-150. + angle);\r\n    float a3 = radians (-270. + angle);\r\n\r\n    vec2 v1 = vec2(cos(a1), sin(a1)) * r;\r\n    vec2 v2 = vec2(cos(a2), sin(a2)) * r;\r\n    vec2 v3 = vec2(cos(a3), sin(a3)) * r;\r\n\r\n    return triangle(v1, v2, v3, p);\r\n}\r\n\r\nfloat line( in vec2 p, in vec2 a, in vec2 b,in float t,in float blur)\r\n{\r\n    vec2 pa = p - a;\r\n    vec2 ba = b - a;\r\n    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );\r\n    float d = length( pa - ba*h );\r\n\r\n    float r = t;\r\n    float bl = blur;\r\n    float len = d - r;\r\n\r\n    return (len < 0. ? 1. : len < bl ? mix(1., 0., len / bl) : 0.);\r\n}\r\n\r\n// Palettes by iq\r\n// https://www.iquilezles.org/www/articles/palettes/palettes.htm\r\nvec3 palette(float t,vec3 a,vec3 b,vec3 c,vec3 d)\r\n{\r\n  return a+b*cos(6.28318*(c*t+d));\r\n}\r\n\r\nvec3 pal_morning(float t){return palette(t,vec3(0.5019607843137255),vec3(0.5019607843137255),vec3(1.),vec3(0.22,0.43000000000000005,0.6000000000000001));}\r\n//vec3 pal_day(float t){return palette(t,vec3(0.5019607843137255),vec3(0.5019607843137255),vec3(1.),vec3(0.22,0.34,0.47000000000000003));}\r\n//vec3 pal_day(float t){return palette(t,vec3(0.5019607843137255),vec3(0.5019607843137255),vec3(0.3,0.9,1.),vec3(0.,0.,0.2));}\r\nvec3 pal_day(float t){return palette(t,vec3(0.5019607843137255),vec3(0.5019607843137255),vec3(0.3,0.9,1.),vec3(0.,0.53,0.2));}\r\n//vec3 pal_evening(float t){return palette(t,vec3(0.5019607843137255),vec3(0.5019607843137255),vec3(1.,0.1,0.1),vec3(0.77,0.35000000000000003,0.53));}\r\n//vec3 pal_evening(float t){return palette(t,vec3(0.8196078431372549,0.0784313725490196,0.0784313725490196),vec3(0.5019607843137255),vec3(1.,0.3,0.2),vec3(0.84,0.5900000000000001,0.29000000000000004));}\r\n// vec3 pal_evening(float t){return palette(t,vec3(1.,0.4470588235294118,0.4470588235294118),vec3(0.08235294117647059,0.30980392156862746,0.37254901960784315),vec3(1.,0.4,0.3),vec3(0.21,0.16,0.36000000000000004));}\r\nvec3 pal_evening(float t){return palette(t,vec3(1.,0.4470588235294118,0.4470588235294118),vec3(0.054901960784313725,0.37254901960784315,0.7058823529411765),vec3(1.2,0.4,0.2),vec3(0.21,0.17,0.5800000000000001));}\r\n//vec3 pal_night(float t){return palette(t,vec3(0.5019607843137255),vec3(0.5019607843137255),vec3(1.),vec3(0.,0.,0.2));}\r\n//vec3 pal_night(float t){return palette(t,vec3(0.5019607843137255),vec3(0.5019607843137255),vec3(0.4,0.7,0.9),vec3(0.33,0.32,0.2));}\r\nvec3 pal_night(float t){return palette(t,vec3(0.5019607843137255),vec3(0.5019607843137255),vec3(0.4,0.7,0.9),vec3(0.42,0.23,0.2));}\r\n\r\nvec3 getTimeColor(float d, float t)\r\n{\r\n    float hour = clamp(t / 3600., 0., 23.);\r\n    vec3 col = vec3(0);\r\n\r\n    if((hour >= 5.)&&(hour <= 11.)){\r\n        col = pal_morning(d);\r\n    }\r\n    else if((hour > 11.)&&(hour < 12.))\r\n    {\r\n        float dd = saturate(mod(t / 60., 60.) / 60.);\r\n        col = mix(pal_morning(d), pal_day(d), dd);\r\n    }\r\n    else if((hour >= 12.)&&(hour <= 16.))\r\n    {\r\n        col = pal_day(d);\r\n    }\r\n    else if((hour > 16.)&&(hour < 17.))\r\n    {\r\n        float dd = saturate(mod(t / 60., 60.) / 60.);\r\n        col = mix(pal_day(d), pal_evening(d), dd);\r\n    }\r\n    else if((hour >= 17.)&&(hour < 18.))\r\n    {\r\n        col = pal_evening(d);\r\n    }\r\n    else if((hour >= 18.)&&(hour < 19.))\r\n    {\r\n        float dd = saturate(mod(t / 60., 60.) / 60.);\r\n        col = mix(pal_evening(d), pal_night(d), dd);\r\n    }\r\n    else if((hour >= 4.)&&(hour < 5.))\r\n    {\r\n        float dd = saturate(mod(t / 60., 60.) / 60.);\r\n        col = mix(pal_night(d), pal_morning(d), dd);\r\n    }\r\n    else\r\n    {\r\n        //col = vec3(1,0,0);\r\n        col = pal_night(d);\r\n    }\r\n    return col;\r\n}\r\n\r\nmat2 rot( float th ){ vec2 a = sin(vec2(1.5707963, 0) + th); return mat2(a, -a.y, a.x); }\r\n\r\nvoid mainImage( out vec4 fragColor, in vec2 fragCoord )\r\n{\r\n    // Normalized pixel coordinates (from 0 to 1)\r\n    vec2 uv = fragCoord/iResolution.xy;\r\n    //vec2 uv = fragCoord/max(iResolution.x, iResolution.y);\r\n    //vec2 uv = (-iResolution.xy + 2.0*fragCoord)/min(iResolution.x, iResolution.y);\r\n\r\n    float timeP = iTime;\r\n    //float timeP = 2.04;\r\n    //float timeP = 36.34;\r\n    //float timeP = 55.06;\r\n    //float timeP = 318.07;\r\n    //float timeP = 333.11;\r\n\r\n    //uv.x *= iResolution.x / iResolution.y;\t// aspect\r\n    if(iResolution.x > iResolution.y)\r\n    {\r\n        uv.x *= max(iResolution.x / iResolution.y, iResolution.y / iResolution.x);\r\n    }else{\r\n        uv.y *= max(iResolution.x / iResolution.y, iResolution.y / iResolution.x);\r\n    }\r\n\r\n    float divCount = 32.0;\r\n\r\n    vec2 divUv = uv * divCount;\r\n    divUv = fract(divUv);\r\n\r\n    // dot pattern\r\n    vec2 p1 = divUv;\r\n    vec2 p2 = fract(divUv + vec2(0.5, 0.5));\r\n    vec2 gridIndex1 = floor(uv * divCount);\r\n    vec2 gridIndex2 = floor((uv + vec2(0.5,0.5) / divCount) * divCount);\r\n\r\n    float noiseScale = 0.035;\r\n    float noiseSpeed = timeP * 0.05;\r\n    float min_th = 0.1;\r\n    float max_th = 0.9;\r\n    float radius = 1.25;\r\n    float an1 = smoothstep(min_th, max_th, (snoise(vec3((gridIndex1) * noiseScale + vec2(noiseSpeed, -noiseSpeed) * 0.5, -noiseSpeed)) * 0.5 + 0.5));\r\n    float an2 = smoothstep(min_th, max_th, (snoise(vec3((gridIndex2) * noiseScale + vec2(noiseSpeed, -noiseSpeed) * 0.5, -noiseSpeed)) * 0.5 + 0.5));\r\n\r\n    float c0 = circle(p1, an1 * radius);\r\n    float c1 = circle(p2, an2 * radius);\r\n\t  float cc = max(c0, c1);\r\n\r\n    float ts = 0.5; // triangle scale\r\n\r\n    // triangle\r\n    vec2 uv2 = fragCoord/iResolution.xy + vec2(-0.5,-0.5);\r\n    //uv2.x *= iResolution.x / iResolution.y;\t// aspect\r\n    if(iResolution.x > iResolution.y)\r\n    {\r\n        uv2.x *= max(iResolution.x / iResolution.y, iResolution.y / iResolution.x);\r\n    }else{\r\n        uv2.y *= max(iResolution.x / iResolution.y, iResolution.y / iResolution.x);\r\n    }\r\n\r\n    uv2 = rot(fract(iDate.w / 86400.) * M_PI2) * uv2;\r\n    // uv2 = rot(fract(iTime*100. / 86399.))*uv2;\r\n\r\n    vec2 uv3 = uv2 - vec2(cos(radians(30.)), sin(radians(30.))) * ts;\r\n    vec2 uv4 = uv2 - vec2(cos(radians(150.)), sin(radians(150.))) * ts;\r\n    vec2 uv5 = uv2 - vec2(cos(radians(270.)), sin(radians(270.))) * ts;\r\n\r\n    // inner triangle scale\r\n    float its = ts * 0.25;\r\n    //float its = ts * ( (sin(iTime) * 0.5 + 0.5) * 1.0);\r\n\r\n    float tri1 = 1. - smoothstep(0.0, 0.001, triangle(uv2, ts, 180.));\r\n    float tri2 = smoothstep(0.0, 0.001, triangle(uv3, ts * 0.75, 180.));\r\n    float tri3 = smoothstep(0.0, 0.001, triangle(uv4, ts * 0.75, 180.));\r\n    float tri4 = smoothstep(0.0, 0.001, triangle(uv5, ts * 0.75, 180.));\r\n    float tri5 = smoothstep(0.0, 0.001, triangle(uv2, its, 180.));\r\n\r\n    //float tri = tri1 * tri2 * tri3 * tri4 * tri5;\r\n\t//float tri = tri1 * tri5;\r\n    float tri = tri1;\r\n\r\n    // lines\r\n    vec2 lp1 = vec2(cos(radians(30.)), sin(radians(30.))) * its;\r\n    vec2 lp11 = lp1 + vec2(cos(radians(240.)), sin(radians(240.))) * ts / its;\r\n    float l1 = 1. - line(uv2, lp1, lp11, 0.005, 0.001);\r\n\r\n    vec2 lp2 = vec2(cos(radians(150.)), sin(radians(150.))) * its;\r\n    vec2 lp22 = lp2 + vec2(cos(radians(0.)), sin(radians(0.))) * ts / its;\r\n\tfloat l2 = 1. - line(uv2, lp2, lp22, 0.005, 0.001);\r\n\r\n    vec2 lp3 = vec2(cos(radians(270.)), sin(radians(270.))) * its;\r\n    vec2 lp33 = lp3 + vec2(cos(radians(120.)), sin(radians(120.))) * ts / its;\r\n\tfloat l3 = 1. - line(uv2, lp3, lp33, 0.005, 0.001);\r\n\r\n    // merge\r\n    float o = cc * tri * l1 * l2 * l3;\r\n\r\n    // color\r\n    float tt = snoise(uv.xyx * 0.75 + vec3(0,2,4. + timeP * 0.025)) * 0.5 + 0.5;\r\n    //vec3 col = 0.8 + 0.4 * cos(timeP + uv.xyx * 2.5 + vec3(0,2,4));\r\n    vec3 col = getTimeColor(tt, iDate.w);\r\n    //vec3 col = getTimeColor(tt, iTime*3600.);\r\n    // vec3 col = getTimeColor(tt, 14400. + iTime*100.);\r\n\r\n    col = mix(vec3(0,1,0), col, o);\r\n\r\n    // Output to screen\r\n    fragColor = vec4(col, 1.0);\r\n\r\n}\r\n"},174:e=>{e.exports="void main(void){\r\n  vec4 col = vec4(0);\r\n\r\n  mainImage(col, texCoord * iResolution.xy);\r\n\r\n  gl_FragColor = col;\r\n}\r\n"},749:e=>{e.exports="precision mediump float;\r\n\r\nuniform float iTime;\r\nuniform vec3  iResolution;\r\nuniform vec4  iMouse;\r\nuniform vec4  iDate;\r\n\r\nvarying vec2 texCoord;\r\n// out vec4 fragmentColor;\r\n"},558:e=>{e.exports="attribute vec3 position;\r\nvarying vec2 texCoord;\r\n\r\nvoid main() {\r\n  texCoord = ((position + 1.0) * 0.5).xy;\r\n  gl_Position = vec4( position, 1.0 );\r\n}\r\n"},379:(e,r,n)=>{"use strict";var t,o=function(){var e={};return function(r){if(void 0===e[r]){var n=document.querySelector(r);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[r]=n}return e[r]}}(),a=[];function i(e){for(var r=-1,n=0;n<a.length;n++)if(a[n].identifier===e){r=n;break}return r}function c(e,r){for(var n={},t=[],o=0;o<e.length;o++){var c=e[o],l=r.base?c[0]+r.base:c[0],v=n[l]||0,s="".concat(l," ").concat(v);n[l]=v+1;var u=i(s),d={css:c[1],media:c[2],sourceMap:c[3]};-1!==u?(a[u].references++,a[u].updater(d)):a.push({identifier:s,updater:m(d,r),references:1}),t.push(s)}return t}function l(e){var r=document.createElement("style"),t=e.attributes||{};if(void 0===t.nonce){var a=n.nc;a&&(t.nonce=a)}if(Object.keys(t).forEach((function(e){r.setAttribute(e,t[e])})),"function"==typeof e.insert)e.insert(r);else{var i=o(e.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(r)}return r}var v,s=(v=[],function(e,r){return v[e]=r,v.filter(Boolean).join("\n")});function u(e,r,n,t){var o=n?"":t.media?"@media ".concat(t.media," {").concat(t.css,"}"):t.css;if(e.styleSheet)e.styleSheet.cssText=s(r,o);else{var a=document.createTextNode(o),i=e.childNodes;i[r]&&e.removeChild(i[r]),i.length?e.insertBefore(a,i[r]):e.appendChild(a)}}function d(e,r,n){var t=n.css,o=n.media,a=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),a&&"undefined"!=typeof btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}var f=null,p=0;function m(e,r){var n,t,o;if(r.singleton){var a=p++;n=f||(f=l(r)),t=u.bind(null,n,a,!1),o=u.bind(null,n,a,!0)}else n=l(r),t=d.bind(null,n,r),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else o()}}e.exports=function(e,r){(r=r||{}).singleton||"boolean"==typeof r.singleton||(r.singleton=(void 0===t&&(t=Boolean(window&&document&&document.all&&!window.atob)),t));var n=c(e=e||[],r);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var t=0;t<n.length;t++){var o=i(n[t]);a[o].references--}for(var l=c(e,r),v=0;v<n.length;v++){var s=i(n[v]);0===a[s].references&&(a[s].updater(),a.splice(s,1))}n=l}}}}},r={};function n(t){var o=r[t];if(void 0!==o)return o.exports;var a=r[t]={id:t,exports:{}};return e[t](a,a.exports,n),a.exports}n.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return n.d(r,{a:r}),r},n.d=(e,r)=>{for(var t in r)n.o(r,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},n.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{"use strict";function e(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}var r=function(){function r(e){!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,r),this.gl=e}var n,t;return n=r,(t=[{key:"create_v_shader",value:function(e){var r=this.gl,n=r.createShader(r.VERTEX_SHADER);if(r.shaderSource(n,e),r.compileShader(n),r.getShaderParameter(n,r.COMPILE_STATUS))return n;console.log(r.getShaderInfoLog(n)+"\n"+e)}},{key:"create_f_shader",value:function(e){var r=this.gl,n=r.createShader(r.FRAGMENT_SHADER);if(r.shaderSource(n,e),r.compileShader(n),r.getShaderParameter(n,r.COMPILE_STATUS))return n;console.log(r.getShaderInfoLog(n)+"\n"+e)}},{key:"create_shader",value:function(e){var r,n=this.gl,t=document.getElementById(e);if(t){switch(t.type){case"x-shader/x-vertex":r=n.createShader(n.VERTEX_SHADER);break;case"x-shader/x-fragment":r=n.createShader(n.FRAGMENT_SHADER);break;default:return}if(n.shaderSource(r,t.text),n.compileShader(r),n.getShaderParameter(r,n.COMPILE_STATUS))return r;console.log(n.getShaderInfoLog(r)),alert(n.getShaderInfoLog(r))}}},{key:"create_program",value:function(e,r){var n=this.gl,t=n.createProgram();if(n.attachShader(t,e),n.attachShader(t,r),n.linkProgram(t),n.getProgramParameter(t,n.LINK_STATUS))return n.useProgram(t),t;alert(n.getProgramInfoLog(t))}},{key:"create_vbo",value:function(e){var r=this.gl,n=r.createBuffer();return r.bindBuffer(r.ARRAY_BUFFER,n),r.bufferData(r.ARRAY_BUFFER,new Float32Array(e),r.STATIC_DRAW),r.bindBuffer(r.ARRAY_BUFFER,null),n}},{key:"create_ibo",value:function(e){var r=this.gl,n=r.createBuffer();return r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,n),r.bufferData(r.ELEMENT_ARRAY_BUFFER,new Int16Array(e),r.STATIC_DRAW),r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,null),n}},{key:"set_attribute",value:function(e,r,n){var t=this.gl;for(var o in e)t.bindBuffer(t.ARRAY_BUFFER,e[o]),t.enableVertexAttribArray(r[o]),t.vertexAttribPointer(r[o],n[o],t.FLOAT,!1,0,0)}},{key:"create_framebuffer",value:function(e,r){var n=this.gl,t=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,t);var o=n.createRenderbuffer();n.bindRenderbuffer(n.RENDERBUFFER,o),n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_COMPONENT16,e,r),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,o);var a=n.createTexture();return n.bindTexture(n.TEXTURE_2D,a),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,e,r,0,n.RGBA,n.UNSIGNED_BYTE,null),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,a,0),n.bindTexture(n.TEXTURE_2D,null),n.bindRenderbuffer(n.RENDERBUFFER,null),n.bindFramebuffer(n.FRAMEBUFFER,null),{f:t,d:o,t:a}}},{key:"create_vao",value:function(e,r,n,t){var o,a,i,c,l=this.gl;for(c in o=l.createVertexArray(),l.bindVertexArray(o),e)a=l.createBuffer(),l.bindBuffer(l.ARRAY_BUFFER,a),l.bufferData(l.ARRAY_BUFFER,new Float32Array(e[c]),l.STATIC_DRAW),l.enableVertexAttribArray(r[c]),l.vertexAttribPointer(r[c],n[c],l.FLOAT,!1,0,0);return t&&(i=l.createBuffer(),l.bindBuffer(l.ELEMENT_ARRAY_BUFFER,i),l.bufferData(l.ELEMENT_ARRAY_BUFFER,new Int16Array(t),l.STATIC_DRAW)),l.bindVertexArray(null),o}},{key:"clear",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,t=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,a=this.gl;a.viewport(0,0,a.canvas.width,a.canvas.height),a.clearColor(e,r,n,t),a.clearDepth(o),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT)}}])&&e(n.prototype,t),r}(),t=n(379),o=n.n(t),a=n(267);o()(a.Z,{insert:"head",singleton:!1}),a.Z.locals;var i,c,l,v,s,u,d,f,p,m,x,h,g,y=new Array,R=[];function b(){var e=l.clientWidth,r=l.clientHeight;console.log("resize "+e+" "+r),R.forEach((function(n){n(e,r)}))}function E(e){m=e.offsetX,x=e.offsetY}function _(e){0==e.button&&(h=1),1==e.button&&(g=1),console.log("onMouseDown "+e.button)}function T(e){0==e.button&&(h=0),1==e.button&&(g=0),console.log("onMouseUp "+e.button)}function A(){p.clear();var e=.001*(Date.now()-v),r=new Date,n=parseInt(r.getFullYear()),t=parseInt(r.getMonth()),o=parseInt(r.getDate()),a=3600*parseInt(r.getHours())+60*parseInt(r.getMinutes())+parseInt(r.getSeconds());i.useProgram(s),i.uniform1f(y[0],e),i.uniform3fv(y[1],[c.width,c.height,0]),i.uniform4fv(y[2],[m,x,h,g]),i.uniform4fv(y[3],[n,t,o,a]),i.drawElements(i.TRIANGLES,f.length,i.UNSIGNED_SHORT,0),i.flush(),setTimeout((function(){requestAnimationFrame(A)}),1e3/30)}window.addEventListener("load",(function(){if(l=document.getElementById("container"),window.addEventListener("resize",b),(c=document.getElementById("canvas")).addEventListener("mousemove",E),c.addEventListener("mousedown",_),c.addEventListener("mouseup",T),m=0,x=0,h=0,g=0,null==(i=c.getContext("webgl")||c.getContext("experimental-webgl")))return console.log("webgl unsupported"),void document.write("webgl unsupported");R.push((function(e,r){c.width=e,c.height=r,m=e/2,x=r/2,i.viewport(0,0,e,r),A()}));var e=(p=new r(i)).create_v_shader(n(558)),t=n(749)+n(127)+n(174),o=p.create_f_shader(t);s=p.create_program(e,o),y[0]=i.getUniformLocation(s,"iTime"),y[1]=i.getUniformLocation(s,"iResolution"),y[2]=i.getUniformLocation(s,"iMouse"),y[3]=i.getUniformLocation(s,"iDate");var a=new Array;a[0]=i.getAttribLocation(s,"position");var F=[];F[0]=3,f=[0,1,2,2,1,3],u=p.create_vbo([1,1,0,-1,1,0,1,-1,0,-1,-1,0]),d=p.create_ibo(f),p.set_attribute([u],a,F),i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,d),v=Date.now(),b(),requestAnimationFrame(A)}),!1)})()})();