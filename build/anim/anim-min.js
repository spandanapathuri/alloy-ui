/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("anim-base",function(b){var c="running",n="startTime",l="elapsedTime",j="start",i="tween",m="end",d="node",k="paused",o="reverse",h="iterationCount",a=Number;var f={},e;b.Anim=function(){b.Anim.superclass.constructor.apply(this,arguments);b.Anim._instances[b.stamp(this)]=this;};b.Anim.NAME="anim";b.Anim._instances={};b.Anim.RE_DEFAULT_UNIT=/^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i;b.Anim.DEFAULT_UNIT="px";b.Anim.DEFAULT_EASING=function(q,p,s,r){return s*q/r+p;};b.Anim._intervalTime=20;b.Anim.behaviors={left:{get:function(q,p){return q._getOffset(p);}}};b.Anim.behaviors.top=b.Anim.behaviors.left;b.Anim.DEFAULT_SETTER=function(s,t,v,w,y,r,u,x){var q=s._node,p=u(y,a(v),a(w)-a(v),r);if(t in q._node.style||t in b.DOM.CUSTOM_STYLES){x=x||"";q.setStyle(t,p+x);}else{if(q._node.attributes[t]){q.setAttribute(t,p);}else{q.set(t,p);}}};b.Anim.DEFAULT_GETTER=function(r,p){var q=r._node,s="";if(p in q._node.style||p in b.DOM.CUSTOM_STYLES){s=q.getComputedStyle(p);}else{if(q._node.attributes[p]){s=q.getAttribute(p);}else{s=q.get(p);}}return s;};b.Anim.ATTRS={node:{setter:function(p){p=b.one(p);this._node=p;if(!p){}return p;}},duration:{value:1},easing:{value:b.Anim.DEFAULT_EASING,setter:function(p){if(typeof p==="string"&&b.Easing){return b.Easing[p];}}},from:{},to:{},startTime:{value:0,readOnly:true},elapsedTime:{value:0,readOnly:true},running:{getter:function(){return !!f[b.stamp(this)];},value:false,readOnly:true},iterations:{value:1},iterationCount:{value:0,readOnly:true},direction:{value:"normal"},paused:{readOnly:true,value:false},reverse:{value:false}};b.Anim.run=function(){var q=b.Anim._instances;for(var p in q){if(q[p].run){q[p].run();}}};b.Anim.pause=function(){for(var p in f){if(f[p].pause){f[p].pause();}}b.Anim._stopTimer();};b.Anim.stop=function(){for(var p in f){if(f[p].stop){f[p].stop();}}b.Anim._stopTimer();};b.Anim._startTimer=function(){if(!e){e=setInterval(b.Anim._runFrame,b.Anim._intervalTime);}};b.Anim._stopTimer=function(){clearInterval(e);e=0;};b.Anim._runFrame=function(){var p=true;for(var q in f){if(f[q]._runFrame){p=false;f[q]._runFrame();}}if(p){b.Anim._stopTimer();}};b.Anim.RE_UNITS=/^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/;var g={run:function(){if(this.get(k)){this._resume();}else{if(!this.get(c)){this._start();}}return this;},pause:function(){if(this.get(c)){this._pause();}return this;},stop:function(p){if(this.get(c)||this.get(k)){this._end(p);}return this;},_added:false,_start:function(){this._set(n,new Date()-this.get(l));this._actualFrames=0;if(!this.get(k)){this._initAnimAttr();}f[b.stamp(this)]=this;b.Anim._startTimer();this.fire(j);},_pause:function(){this._set(n,null);this._set(k,true);delete f[b.stamp(this)];this.fire("pause");},_resume:function(){this._set(k,false);f[b.stamp(this)]=this;this._set(n,new Date()-this.get(l));b.Anim._startTimer();this.fire("resume");},_end:function(p){var q=this.get("duration")*1000;if(p){this._runAttrs(q,q,this.get(o));}this._set(n,null);this._set(l,0);this._set(k,false);delete f[b.stamp(this)];this.fire(m,{elapsed:this.get(l)});},_runFrame:function(){var u=this._runtimeAttr.duration,r=new Date()-this.get(n),q=this.get(o),p=(r>=u),s,v;this._runAttrs(r,u,q);this._actualFrames+=1;this._set(l,r);this.fire(i);if(p){this._lastFrame();}},_runAttrs:function(A,z,w){var x=this._runtimeAttr,r=b.Anim.behaviors,y=x.easing,p=z,u=false,q,s,v;if(A>=z){u=true;}if(w){A=z-A;p=0;}for(v in x){if(x[v].to){q=x[v];s=(v in r&&"set" in r[v])?r[v].set:b.Anim.DEFAULT_SETTER;if(!u){s(this,v,q.from,q.to,A,z,y,q.unit);}else{s(this,v,q.from,q.to,p,z,y,q.unit);}}}},_lastFrame:function(){var p=this.get("iterations"),q=this.get(h);q+=1;if(p==="infinite"||q<p){if(this.get("direction")==="alternate"){this.set(o,!this.get(o));}this.fire("iteration");}else{q=0;this._end();}this._set(n,new Date());this._set(h,q);},_initAnimAttr:function(){var w=this.get("from")||{},v=this.get("to")||{},p={duration:this.get("duration")*1000,easing:this.get("easing")},r=b.Anim.behaviors,u=this.get(d),t,s,q;b.each(v,function(A,y){if(typeof A==="function"){A=A.call(this,u);}s=w[y];if(s===undefined){s=(y in r&&"get" in r[y])?r[y].get(this,y):b.Anim.DEFAULT_GETTER(this,y);}else{if(typeof s==="function"){s=s.call(this,u);}}var x=b.Anim.RE_UNITS.exec(s);var z=b.Anim.RE_UNITS.exec(A);s=x?x[1]:s;q=z?z[1]:A;t=z?z[2]:x?x[2]:"";if(!t&&b.Anim.RE_DEFAULT_UNIT.test(y)){t=b.Anim.DEFAULT_UNIT;}if(!s||!q){b.error('invalid "from" or "to" for "'+y+'"',"Anim");return;}p[y]={from:s,to:q,unit:t};},this);this._runtimeAttr=p;},_getOffset:function(q){var s=this._node,t=s.getComputedStyle(q),r=(q==="left")?"getX":"getY",u=(q==="left")?"setX":"setY";if(t==="auto"){var p=s.getStyle("position");if(p==="absolute"||p==="fixed"){t=s[r]();s[u](t);}else{t=0;}}return t;},destructor:function(){delete b.Anim._instances[b.stamp(this)];}};b.extend(b.Anim,b.Base,g);},"3.4.0",{requires:["base-base","node-style"]});YUI.add("anim-color",function(b){var a=Number;b.Anim.behaviors.color={set:function(f,d,i,h,c,g,e){i=b.Color.re_RGB.exec(b.Color.toRGB(i));h=b.Color.re_RGB.exec(b.Color.toRGB(h));if(!i||i.length<3||!h||h.length<3){b.error("invalid from or to passed to color behavior");}f._node.setStyle(d,"rgb("+[Math.floor(e(c,a(i[1]),a(h[1])-a(i[1]),g)),Math.floor(e(c,a(i[2]),a(h[2])-a(i[2]),g)),Math.floor(e(c,a(i[3]),a(h[3])-a(i[3]),g))].join(", ")+")");},get:function(d,c){var e=d._node.getComputedStyle(c);e=(e==="transparent")?"rgb(255, 255, 255)":e;return e;}};b.each(["backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"],function(c,d){b.Anim.behaviors[c]=b.Anim.behaviors.color;});},"3.4.0",{requires:["anim-base"]});YUI.add("anim-curve",function(a){a.Anim.behaviors.curve={set:function(f,c,i,h,b,g,e){i=i.slice.call(i);h=h.slice.call(h);var d=e(b,0,100,g)/100;h.unshift(i);f._node.setXY(a.Anim.getBezier(h,d));},get:function(c,b){return c._node.getXY();}};a.Anim.getBezier=function(f,e){var g=f.length;var d=[];for(var c=0;c<g;++c){d[c]=[f[c][0],f[c][1]];
}for(var b=1;b<g;++b){for(c=0;c<g-b;++c){d[c][0]=(1-e)*d[c][0]+e*d[parseInt(c+1,10)][0];d[c][1]=(1-e)*d[c][1]+e*d[parseInt(c+1,10)][1];}}return[d[0][0],d[0][1]];};},"3.4.0",{requires:["anim-xy"]});YUI.add("anim-easing",function(b){var a={easeNone:function(f,e,h,g){return h*f/g+e;},easeIn:function(f,e,h,g){return h*(f/=g)*f+e;},easeOut:function(f,e,h,g){return -h*(f/=g)*(f-2)+e;},easeBoth:function(f,e,h,g){if((f/=g/2)<1){return h/2*f*f+e;}return -h/2*((--f)*(f-2)-1)+e;},easeInStrong:function(f,e,h,g){return h*(f/=g)*f*f*f+e;},easeOutStrong:function(f,e,h,g){return -h*((f=f/g-1)*f*f*f-1)+e;},easeBothStrong:function(f,e,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+e;}return -h/2*((f-=2)*f*f*f-2)+e;},elasticIn:function(g,e,k,j,f,i){var h;if(g===0){return e;}if((g/=j)===1){return e+k;}if(!i){i=j*0.3;}if(!f||f<Math.abs(k)){f=k;h=i/4;}else{h=i/(2*Math.PI)*Math.asin(k/f);}return -(f*Math.pow(2,10*(g-=1))*Math.sin((g*j-h)*(2*Math.PI)/i))+e;},elasticOut:function(g,e,k,j,f,i){var h;if(g===0){return e;}if((g/=j)===1){return e+k;}if(!i){i=j*0.3;}if(!f||f<Math.abs(k)){f=k;h=i/4;}else{h=i/(2*Math.PI)*Math.asin(k/f);}return f*Math.pow(2,-10*g)*Math.sin((g*j-h)*(2*Math.PI)/i)+k+e;},elasticBoth:function(g,e,k,j,f,i){var h;if(g===0){return e;}if((g/=j/2)===2){return e+k;}if(!i){i=j*(0.3*1.5);}if(!f||f<Math.abs(k)){f=k;h=i/4;}else{h=i/(2*Math.PI)*Math.asin(k/f);}if(g<1){return -0.5*(f*Math.pow(2,10*(g-=1))*Math.sin((g*j-h)*(2*Math.PI)/i))+e;}return f*Math.pow(2,-10*(g-=1))*Math.sin((g*j-h)*(2*Math.PI)/i)*0.5+k+e;},backIn:function(f,e,i,h,g){if(g===undefined){g=1.70158;}if(f===h){f-=0.001;}return i*(f/=h)*f*((g+1)*f-g)+e;},backOut:function(f,e,i,h,g){if(typeof g==="undefined"){g=1.70158;}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+e;},backBoth:function(f,e,i,h,g){if(typeof g==="undefined"){g=1.70158;}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+e;}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+e;},bounceIn:function(f,e,h,g){return h-b.Easing.bounceOut(g-f,0,h,g)+e;},bounceOut:function(f,e,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+e;}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+e;}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+e;}}}return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+e;},bounceBoth:function(f,e,h,g){if(f<g/2){return b.Easing.bounceIn(f*2,0,h,g)*0.5+e;}return b.Easing.bounceOut(f*2-g,0,h,g)*0.5+h*0.5+e;}};b.Easing=a;},"3.4.0",{requires:["anim-base"]});YUI.add("anim-node-plugin",function(b){var a=function(c){c=(c)?b.merge(c):{};c.node=c.host;a.superclass.constructor.apply(this,arguments);};a.NAME="nodefx";a.NS="fx";b.extend(a,b.Anim);b.namespace("Plugin");b.Plugin.NodeFX=a;},"3.4.0",{requires:["node-pluginhost","anim-base"]});YUI.add("anim-scroll",function(b){var a=Number;b.Anim.behaviors.scroll={set:function(f,g,i,j,k,e,h){var d=f._node,c=([h(k,a(i[0]),a(j[0])-a(i[0]),e),h(k,a(i[1]),a(j[1])-a(i[1]),e)]);if(c[0]){d.set("scrollLeft",c[0]);}if(c[1]){d.set("scrollTop",c[1]);}},get:function(d){var c=d._node;return[c.get("scrollLeft"),c.get("scrollTop")];}};},"3.4.0",{requires:["anim-base"]});YUI.add("anim-xy",function(b){var a=Number;b.Anim.behaviors.xy={set:function(f,d,i,h,c,g,e){f._node.setXY([e(c,a(i[0]),a(h[0])-a(i[0]),g),e(c,a(i[1]),a(h[1])-a(i[1]),g)]);},get:function(c){return c._node.getXY();}};},"3.4.0",{requires:["anim-base","node-screen"]});YUI.add("anim",function(a){},"3.4.0",{skinnable:false,use:["anim-base","anim-color","anim-curve","anim-easing","anim-node-plugin","anim-scroll","anim-xy"]});