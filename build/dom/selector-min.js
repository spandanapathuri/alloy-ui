/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0
build: nightly
*/
YUI.add("selector-native",function(A){(function(D){D.namespace("Selector");var C="compareDocumentPosition",E="ownerDocument";var B={_foundCache:[],useNative:true,_compare:("sourceIndex" in D.config.doc.documentElement)?function(I,H){var G=I.sourceIndex,F=H.sourceIndex;if(G===F){return 0;}else{if(G>F){return 1;}}return -1;}:(D.config.doc.documentElement[C]?function(G,F){if(G[C](F)&4){return -1;}else{return 1;}}:function(J,I){var F,G,H;if(J&&I){F=J[E].createRange();F.setStart(J,0);G=I[E].createRange();G.setStart(I,0);H=F.compareBoundaryPoints(1,G);}return H;}),_sort:function(F){if(F){F=D.Array(F,0,true);if(F.sort){F.sort(B._compare);}}return F;},_deDupe:function(F){var G=[],H,I;for(H=0;(I=F[H++]);){if(!I._found){G[G.length]=I;I._found=true;}}for(H=0;(I=G[H++]);){I._found=null;I.removeAttribute("_found");}return G;},query:function(G,O,P,F){O=O||D.config.doc;var K=[],J=(D.Selector.useNative&&D.config.doc.querySelector&&!F),I=[[G,O]],L,N,H,M=(J)?D.Selector._nativeQuery:D.Selector._bruteQuery;if(G&&M){if(!F&&(!J||O.tagName)){I=B._splitQueries(G,O);}for(H=0;(L=I[H++]);){N=M(L[0],L[1],P);if(!P){N=D.Array(N,0,true);}if(N){K=K.concat(N);}}if(I.length>1){K=B._sort(B._deDupe(K));}}return(P)?(K[0]||null):K;},_splitQueries:function(H,K){var L=H.split(","),I=[],G="",J,F;if(K){if(K.tagName){K.id=K.id||D.guid();G='[id="'+K.id+'"] ';}for(J=0,F=L.length;J<F;++J){H=G+L[J];I.push([H,K]);}}return I;},_nativeQuery:function(F,G,H){if(D.UA.webkit&&F.indexOf(":checked")>-1&&(D.Selector.pseudos&&D.Selector.pseudos.checked)){return D.Selector.query(F,G,H,true);}try{return G["querySelector"+(H?"":"All")](F);}catch(I){return D.Selector.query(F,G,H,true);}},filter:function(G,F){var H=[],I,J;if(G&&F){for(I=0;(J=G[I++]);){if(D.Selector.test(J,F)){H[H.length]=J;}}}else{}return H;},test:function(F,G,N){var L=false,J=G.split(","),K=false,P,R,M,Q,I,H,O;if(F&&F.tagName){if(!N&&!D.DOM.inDoc(F)){P=F.parentNode;if(P){N=P;}else{Q=F[E].createDocumentFragment();Q.appendChild(F);N=Q;K=true;}}N=N||F[E];if(!F.id){F.id=D.guid();}for(I=0;(O=J[I++]);){O+='[id="'+F.id+'"]';M=D.Selector.query(O,N);for(H=0;R=M[H++];){if(R===F){L=true;break;}}if(L){break;}}if(K){Q.removeChild(F);}}return L;},ancestor:function(G,F,H){return D.DOM.ancestor(G,function(I){return D.Selector.test(I,F);},H);}};D.mix(D.Selector,B,true);})(A);},"3.2.0",{requires:["dom-base"]});YUI.add("selector-css2",function(H){var G="parentNode",C="tagName",D="attributes",A="combinator",F="pseudos",B=H.Selector,E={_reRegExpTokens:/([\^\$\?\[\]\*\+\-\.\(\)\|\\])/,SORT_RESULTS:true,_children:function(M,I){var J=M.children,L,K=[],N,O;if(M.children&&I&&M.children.tags){K=M.children.tags(I);}else{if((!J&&M[C])||(J&&I)){N=J||M.childNodes;J=[];for(L=0;(O=N[L++]);){if(O.tagName){if(!I||I===O.tagName){J.push(O);}}}}}return J||[];},_re:{attr:/(\[[^\]]*\])/g,pseudos:/:([\-\w]+(?:\(?:['"]?(.+)['"]?\)))*/i},shorthand:{"\\#(-?[_a-z]+[-\\w]*)":"[id=$1]","\\.(-?[_a-z]+[-\\w]*)":"[className~=$1]"},operators:{"":function(J,I){return H.DOM.getAttribute(J,I)!=="";},"~=":"(?:^|\\s+){val}(?:\\s+|$)","|=":"^{val}-?"},pseudos:{"first-child":function(I){return H.Selector._children(I[G])[0]===I;}},_bruteQuery:function(N,R,T){var Q=[],K=[],I=B._tokenize(N),O=I[I.length-1],S=H.DOM._getDoc(R),M,L,J,P;if(O){L=O.id;J=O.className;P=O.tagName||"*";if(R.getElementsByTagName){if(L&&(R.all||(R.nodeType===9||H.DOM.inDoc(R)))){K=H.DOM.allById(L,R);}else{if(J){K=R.getElementsByClassName(J);}else{K=R.getElementsByTagName(P);}}}else{M=R.firstChild;while(M){if(M.tagName){K.push(M);}M=M.nextSilbing||M.firstChild;}}if(K.length){Q=B._filterNodes(K,I,T);}}return Q;},_filterNodes:function(P,a,N){var W=0,V,X=a.length,Q=X-1,J=[],S=P[0],R=S,U=H.Selector.getters,K,Z,M,O,I,T,L,Y;for(W=0;(R=S=P[W++]);){Q=X-1;O=null;testLoop:while(R&&R.tagName){M=a[Q];L=M.tests;V=L.length;if(V&&!I){while((Y=L[--V])){K=Y[1];if(U[Y[0]]){T=U[Y[0]](R,Y[0]);}else{T=R[Y[0]];if(T===undefined&&R.getAttribute){T=R.getAttribute(Y[0]);}}if((K==="="&&T!==Y[2])||(typeof K!=="string"&&K.test&&!K.test(T))||(!K.test&&typeof K==="function"&&!K(R,Y[0]))){if((R=R[O])){while(R&&(!R.tagName||(M.tagName&&M.tagName!==R.tagName))){R=R[O];}}continue testLoop;}}}Q--;if(!I&&(Z=M.combinator)){O=Z.axis;R=R[O];while(R&&!R.tagName){R=R[O];}if(Z.direct){O=null;}}else{J.push(S);if(N){return J;}break;}}}S=R=null;return J;},combinators:{" ":{axis:"parentNode"},">":{axis:"parentNode",direct:true},"+":{axis:"previousSibling",direct:true}},_parsers:[{name:D,re:/^\[(-?[a-z]+[\w\-]*)+([~\|\^\$\*!=]=?)?['"]?([^\]]*?)['"]?\]/i,fn:function(J,K){var L=J[2]||"",I=H.Selector.operators,M;if((J[1]==="id"&&L==="=")||(J[1]==="className"&&H.config.doc.documentElement.getElementsByClassName&&(L==="~="||L==="="))){K.prefilter=J[1];K[J[1]]=J[3];}if(L in I){M=I[L];if(typeof M==="string"){J[3]=J[3].replace(H.Selector._reRegExpTokens,"\\$1");M=H.DOM._getRegExp(M.replace("{val}",J[3]));}J[2]=M;}if(!K.last||K.prefilter!==J[1]){return J.slice(1);}}},{name:C,re:/^((?:-?[_a-z]+[\w-]*)|\*)/i,fn:function(J,K){var I=J[1].toUpperCase();K.tagName=I;if(I!=="*"&&(!K.last||K.prefilter)){return[C,"=",I];}if(!K.prefilter){K.prefilter="tagName";}}},{name:A,re:/^\s*([>+~]|\s)\s*/,fn:function(I,J){}},{name:F,re:/^:([\-\w]+)(?:\(['"]?(.+)['"]?\))*/i,fn:function(I,J){var K=B[F][I[1]];if(K){return[I[2],K];}else{return false;}}}],_getToken:function(I){return{tagName:null,id:null,className:null,attributes:{},combinator:null,tests:[]};},_tokenize:function(J){J=J||"";J=B._replaceShorthand(H.Lang.trim(J));var K=B._getToken(),P=J,I=[],Q=false,M,O,L,N;outer:do{Q=false;for(L=0;(N=B._parsers[L++]);){if((M=N.re.exec(J))){if(N.name!==A){K.selector=J;}J=J.replace(M[0],"");if(!J.length){K.last=true;}if(B._attrFilters[M[1]]){M[1]=B._attrFilters[M[1]];}O=N.fn(M,K);if(O===false){Q=false;break outer;}else{if(O){K.tests.push(O);}}if(!J.length||N.name===A){I.push(K);K=B._getToken(K);if(N.name===A){K.combinator=H.Selector.combinators[M[1]];}}Q=true;}}}while(Q&&J.length);if(!Q||J.length){I=[];}return I;},_replaceShorthand:function(J){var N=B.shorthand,K=J.match(B._re.attr),O=J.match(B._re.pseudos),M,L,I;
if(O){J=J.replace(B._re.pseudos,"!!REPLACED_PSEUDO!!");}if(K){J=J.replace(B._re.attr,"!!REPLACED_ATTRIBUTE!!");}for(M in N){if(N.hasOwnProperty(M)){J=J.replace(H.DOM._getRegExp(M,"gi"),N[M]);}}if(K){for(L=0,I=K.length;L<I;++L){J=J.replace("!!REPLACED_ATTRIBUTE!!",K[L]);}}if(O){for(L=0,I=O.length;L<I;++L){J=J.replace("!!REPLACED_PSEUDO!!",O[L]);}}return J;},_attrFilters:{"class":"className","for":"htmlFor"},getters:{href:function(J,I){return H.DOM.getAttribute(J,I);}}};H.mix(H.Selector,E,true);H.Selector.getters.src=H.Selector.getters.rel=H.Selector.getters.href;if(H.Selector.useNative&&H.config.doc.querySelector){H.Selector.shorthand["\\.(-?[_a-z]+[-\\w]*)"]="[class~=$1]";}},"3.2.0",{requires:["selector-native"]});YUI.add("selector",function(A){},"3.2.0",{use:["selector-native","selector-css2"]});