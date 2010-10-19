/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0
build: nightly
*/
YUI.add("dd-proxy",function(H){var F=H.DD.DDM,B="node",D="dragNode",A="host",C=true,E,G=function(I){G.superclass.constructor.apply(this,arguments);};G.NAME="DDProxy";G.NS="proxy";G.ATTRS={host:{},moveOnEnd:{value:C},hideOnEnd:{value:C},resizeFrame:{value:C},positionProxy:{value:C},borderStyle:{value:"1px solid #808080"},cloneNode:{value:false}};E={_hands:null,_init:function(){if(!F._proxy){F._createFrame();H.on("domready",H.bind(this._init,this));return;}if(!this._hands){this._hands=[];}var K,J,L=this.get(A),I=L.get(D);if(I.compareTo(L.get(B))){if(F._proxy){L.set(D,F._proxy);}}H.each(this._hands,function(M){M.detach();});K=F.on("ddm:start",H.bind(function(){if(F.activeDrag===L){F._setFrame(L);}},this));J=F.on("ddm:end",H.bind(function(){if(L.get("dragging")){if(this.get("moveOnEnd")){L.get(B).setXY(L.lastXY);}if(this.get("hideOnEnd")){L.get(D).setStyle("display","none");}if(this.get("cloneNode")){L.get(D).remove();L.set(D,F._proxy);}}},this));this._hands=[K,J];},initializer:function(){this._init();},destructor:function(){var I=this.get(A);H.each(this._hands,function(J){J.detach();});I.set(D,I.get(B));},clone:function(){var I=this.get(A),K=I.get(B),J=K.cloneNode(true);delete J._yuid;J.setAttribute("id",H.guid());J.setStyle("position","absolute");K.get("parentNode").appendChild(J);I.set(D,J);return J;}};H.namespace("Plugin");H.extend(G,H.Base,E);H.Plugin.DDProxy=G;H.mix(F,{_createFrame:function(){if(!F._proxy){F._proxy=C;var J=H.Node.create("<div></div>"),I=H.one("body");J.setStyles({position:"absolute",display:"none",zIndex:"999",top:"-999px",left:"-999px"});I.prepend(J);J.set("id",H.guid());J.addClass(F.CSS_PREFIX+"-proxy");F._proxy=J;}},_setFrame:function(J){var M=J.get(B),L=J.get(D),I,K="auto";I=F.activeDrag.get("activeHandle");if(I){K=I.getStyle("cursor");}if(K=="auto"){K=F.get("dragCursor");}L.setStyles({visibility:"hidden",display:"block",cursor:K,border:J.proxy.get("borderStyle")});if(J.proxy.get("cloneNode")){L=J.proxy.clone();}if(J.proxy.get("resizeFrame")){L.setStyles({height:M.get("offsetHeight")+"px",width:M.get("offsetWidth")+"px"});}if(J.proxy.get("positionProxy")){L.setXY(J.nodeXY);}L.setStyle("visibility","visible");}});},"3.2.0",{requires:["dd-ddm","dd-drag"],skinnable:false});