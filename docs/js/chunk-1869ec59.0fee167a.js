(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1869ec59"],{"028b":function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return i}));var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"toggle"},[n("span",{ref:"short",staticClass:"toggle-label selected",attrs:{id:"label-short"}},[t._v("license abbreviation")]),n("input",{staticClass:"toggle-input",attrs:{id:"copy-type","aria-labelledby":t.currentLabel,type:"checkbox",name:"copy-type"},on:{input:t.onInput}}),n("span",{ref:"full",staticClass:"toggle-label",attrs:{id:"label-full"}},[t._v("full license name")])])},i=[]},"06b6":function(t,e,n){"use strict";n("6d8e")},"15e9":function(t,e,n){"use strict";n.r(e);var r=n("028b"),i=n("81d3");for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("06b6");var a=n("2877"),s=Object(a["a"])(i["default"],r["a"],r["b"],!1,null,"8e84a60e",null);e["default"]=s.exports},"23cf":function(t,e,n){"use strict";n.r(e);var r=n("5d99"),i=n.n(r);for(var o in r)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},"38dc":function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return i}));var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a",{ref:"xmp",staticClass:"button donate small copy-button is-xmp",attrs:{type:"text/xml",href:t.xmpHref,download:t.xmpFilename}},[t._v(" "+t._s(t.xmpLabel)+" ")])},i=[]},"4a5a":function(t,e,n){"use strict";n("56f7")},"56f7":function(t,e,n){},"5d99":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n("2f62"),i=o(n("20bb"));function o(t){return t&&t.__esModule?t:{default:t}}var a={name:"LicenseText",components:{LicenseIcons:i.default},props:{textFor:{type:String,default:"web",validate:function(t){return["web","print"].indexOf(t)>-1}}},computed:{...(0,r.mapGetters)(["shortName","fullName","licenseUrl","iconsList"]),...(0,r.mapState)(["attributionDetails","attributionType"]),licensedMarkedString(){return"CC0 1.0"===this.shortName?"license-use.richtext.marked-text":"license-use.richtext.licensed-text"},isCreatorLink(){return this.creatorName&&this.creatorProfileUrl&&this.isWeb},licenseName(){return"short"===this.attributionType?this.shortName:this.fullName},byString(){return this.creatorName?this.$t("license-use.richtext.by"):""},creatorProps(){const t={property:"cc:attributionName"};return this.isCreatorLink&&(t.href=this.creatorProfileUrl,t.rel="cc:attributionURL noopener noreferrer",t.target="_blank"),t},creatorName(){return this.attributionDetails.creatorName},creatorProfileUrl(){const{creatorProfileUrl:t}=this.attributionDetails;return t&&!t.startsWith("http")?"http://"+t:this.attributionDetails.creatorProfileUrl},workTitle(){return this.attributionDetails.workTitle?""+this.attributionDetails.workTitle:this.$t("license-use.richtext.workTitle")},yearOfCreation(){return this.attributionDetails.yearOfCreation?"© "+this.attributionDetails.yearOfCreation:""},workUrl(){const{workUrl:t}=this.attributionDetails;return t&&!t.startsWith("http")?"http://"+t:t},workProps(){const t={},{workTitle:e}=this.attributionDetails;return e&&(t.property="dct:title"),this.workUrl&&(t.href=this.workUrl,t.rel="cc:attributionURL noopener noreferrer",t.target="_blank"),t},isWeb(){return"web"===this.textFor}}};e.default=a},6549:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n("fe66"),i=n("2f62"),o={name:"XmpButton",computed:{...(0,i.mapGetters)(["shortName"]),xmpLabel(){return this.$t("license-use.xmp-label")},xmpFilename(){return this.shortName+".xmp"},xmpHref(){const t=this.$store.getters.shortName,{workUrl:e,workTitle:n,creatorName:i}=this.$store.state.attributionDetails,o=(0,r.createXMP)({shortName:t,workUrl:e,workTitle:n,creatorName:i}),a=new Blob([o],{type:"text/xml;charset=utf-8"});return URL.createObjectURL(a)}}};e.default=o},"6b84":function(t,e,n){"use strict";n.r(e);var r=n("9330"),i=n("23cf");for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);var a=n("2877"),s=Object(a["a"])(i["default"],r["a"],r["b"],!1,null,null,null);e["default"]=s.exports},"6d8e":function(t,e,n){},"78d1":function(t,e,n){"use strict";n("a7ca")},"7b7c":function(t,e,n){},"7bd5":function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return i}));var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"license-use-card",on:{click:t.updateCopyTarget}},[n("h3",[t._v(" "+t._s(t.$t("license-use.heading"))+" ")]),n("p",{staticClass:"license-use-instructions"},[t._v(" "+t._s(t.$t("license-use.common-instructions"))+" ")]),n("tabs",{ref:"alltabs",staticClass:"top-tabs"},[n("tab",{ref:"web",staticClass:"main-tabs",attrs:{title:t.$t("license-use.web-tab-heading")}},[t._v(" "+t._s(t.$t("license-use.web-instructions"))+" "),n("tabs",{ref:"web",staticClass:"attribution-tabs",attrs:{boxed:!0}},[n("tab",{ref:"richtext",attrs:{title:t.$t("license-use.rich-text-label")}},[n("license-text",{staticClass:"richtext",attrs:{"text-for":"web"}})],1),n("tab",{ref:"html",attrs:{title:t.$t("license-use.html-label")}},[n("license-h-t-m-l",{staticClass:"html"})],1),n("tab",{ref:"xmp",attrs:{title:"XMP"}})],1)],1),n("tab",{ref:"printmedia",attrs:{title:t.$t("license-use.print-media-tab-heading")}},[t._v(" "+t._s(t.$t("license-use.print-media-instructions"))+" "),n("tabs",{staticClass:"attribution-tabs",attrs:{boxed:!0}},[n("tab",{ref:"plaintext",attrs:{title:t.$t("license-use.plain-text-label")}},[n("license-text",{staticClass:"plaintext",attrs:{"text-for":"print"}})],1)],1)],1)],1),n("copy-tools",{attrs:{"clipboard-target":t.copyTarget}})],1)},i=[]},"81d3":function(t,e,n){"use strict";n.r(e);var r=n("b21b"),i=n.n(r);for(var o in r)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},"847f":function(t,e,n){"use strict";n.r(e);var r=n("e8f0"),i=n.n(r);for(var o in r)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},"903d":function(t,e,n){"use strict";n.r(e);var r=n("b7ee"),i=n("847f");for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("ff7b");var a=n("2877"),s=Object(a["a"])(i["default"],r["a"],r["b"],!1,null,"b41dd392",null);e["default"]=s.exports},"932a":function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return i}));var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"copy-tools"},[".xmp"!==t.clipboardTarget?n("copy-type-switch",{on:{"change-copy-type":t.changeCopyType}}):t._e(),".xmp"!==t.clipboardTarget?n("v-button",{staticClass:"donate small copy-button",attrs:{"data-clipboard-target":t.clipboardTarget},on:{click:t.handleCopy}},[t._v(" "+t._s(t.copyLabel)+" ")]):t._e(),".xmp"===t.clipboardTarget?n("xmp-button"):t._e()],1)},i=[]},9330:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return i}));var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("i18n",{staticClass:"license-text",attrs:{path:"license-use.richtext.full-text",tag:"p","xmlns:dct":"http://purl.org/dc/terms/","xmlns:cc":"http://creativecommons.org/ns#"},scopedSlots:t._u([{key:"workTitle",fn:function(){return[n(t.workUrl&&t.isWeb?"a":"span",t._b({tag:"component"},"component",t.workProps,!1),[t._v(" "+t._s(t.workTitle)+" ")])]},proxy:!0},{key:"yearOfCreation",fn:function(){return[n("span",{tag:"component"},[t._v(" "+t._s(t.yearOfCreation)+" ")])]},proxy:!0},{key:"creator",fn:function(){return[t.creatorName?n(t.isCreatorLink?"a":"span",t._b({tag:"component"},"component",t.creatorProps,!1),[t._v(" "+t._s(t.creatorName)+" ")]):t._e()]},proxy:!0},{key:"by",fn:function(){return[t._v(" "+t._s(t.byString)+" ")]},proxy:!0},{key:"licenseMark",fn:function(){return[n("span",[t._v(t._s(t.$t(t.licensedMarkedString)))])]},proxy:!0},{key:"license",fn:function(){return[t.isWeb?n("a",{attrs:{href:t.licenseUrl("web"),target:"_blank",rel:"license noopener noreferrer"}},[t._v(" "+t._s("short"===t.attributionType?t.shortName:t.fullName)+" "),n("license-icons",{class:["icon"],attrs:{"icons-arr":["logo",t.iconsList]}})],1):n("span",[t._v(t._s(t.licenseName)+".")])]},proxy:!0},{key:"print-instructions",fn:function(){return[t.isWeb?t._e():n("span",[t._v(t._s(t.$t("license-use.print.label",{linkToLicenseDeed:t.licenseUrl("print")})))])]},proxy:!0}])})},i=[]},"96cd":function(t,e,n){"use strict";n.r(e);var r=n("6549"),i=n.n(r);for(var o in r)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},a7ca:function(t,e,n){},a7f5:function(t,e,n){"use strict";n.r(e);var r=n("f27e"),i=n.n(r);for(var o in r)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},b21b:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n("2f62"),i={name:"CopyTypeSwitch",data(){return{selected:"short"}},computed:{currentLabel(){return"label-"+this.selected}},methods:{...(0,r.mapMutations)(["setAttributionType"]),onInput(t){const e=t.target.checked?"full":"short";this.selected=e,this.$refs.full.classList.toggle("selected"),this.$refs.short.classList.toggle("selected"),this.setAttributionType(e)}}};e.default=i},b311:function(t,e,n){
/*!
 * clipboard.js v2.0.6
 * https://clipboardjs.com/
 * 
 * Licensed MIT © Zeno Rocha
 */
(function(e,n){t.exports=n()})(0,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=6)}([function(t,e){function n(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var r=window.getSelection(),i=document.createRange();i.selectNodeContents(t),r.removeAllRanges(),r.addRange(i),e=r.toString()}return e}t.exports=n},function(t,e){function n(){}n.prototype={on:function(t,e,n){var r=this.e||(this.e={});return(r[t]||(r[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){var r=this;function i(){r.off(t,i),e.apply(n,arguments)}return i._=e,this.on(t,i,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),r=0,i=n.length;for(r;r<i;r++)n[r].fn.apply(n[r].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),r=n[t],i=[];if(r&&e)for(var o=0,a=r.length;o<a;o++)r[o].fn!==e&&r[o].fn._!==e&&i.push(r[o]);return i.length?n[t]=i:delete n[t],this}},t.exports=n,t.exports.TinyEmitter=n},function(t,e,n){var r=n(3),i=n(4);function o(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!r.string(e))throw new TypeError("Second argument must be a String");if(!r.fn(n))throw new TypeError("Third argument must be a Function");if(r.node(t))return a(t,e,n);if(r.nodeList(t))return s(t,e,n);if(r.string(t))return c(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function a(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}function s(t,e,n){return Array.prototype.forEach.call(t,(function(t){t.addEventListener(e,n)})),{destroy:function(){Array.prototype.forEach.call(t,(function(t){t.removeEventListener(e,n)}))}}}function c(t,e,n){return i(document.body,t,e,n)}t.exports=o},function(t,e){e.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},e.nodeList=function(t){var n=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===n||"[object HTMLCollection]"===n)&&"length"in t&&(0===t.length||e.node(t[0]))},e.string=function(t){return"string"===typeof t||t instanceof String},e.fn=function(t){var e=Object.prototype.toString.call(t);return"[object Function]"===e}},function(t,e,n){var r=n(5);function i(t,e,n,r,i){var o=a.apply(this,arguments);return t.addEventListener(n,o,i),{destroy:function(){t.removeEventListener(n,o,i)}}}function o(t,e,n,r,o){return"function"===typeof t.addEventListener?i.apply(null,arguments):"function"===typeof n?i.bind(null,document).apply(null,arguments):("string"===typeof t&&(t=document.querySelectorAll(t)),Array.prototype.map.call(t,(function(t){return i(t,e,n,r,o)})))}function a(t,e,n,i){return function(n){n.delegateTarget=r(n.target,e),n.delegateTarget&&i.call(t,n)}}t.exports=o},function(t,e){var n=9;if("undefined"!==typeof Element&&!Element.prototype.matches){var r=Element.prototype;r.matches=r.matchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector||r.webkitMatchesSelector}function i(t,e){while(t&&t.nodeType!==n){if("function"===typeof t.matches&&t.matches(e))return t;t=t.parentNode}}t.exports=i},function(t,e,n){"use strict";n.r(e);var r=n(0),i=n.n(r),o="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var c=function(){function t(e){s(this,t),this.resolveOptions(e),this.initSelection()}return a(t,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=t.action,this.container=t.container,this.emitter=t.emitter,this.target=t.target,this.text=t.text,this.trigger=t.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var t=this,e="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[e?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=i()(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=i()(this.target),this.copyText()}},{key:"copyText",value:function(){var t=void 0;try{t=document.execCommand(this.action)}catch(e){t=!1}this.handleResult(t)}},{key:"handleResult",value:function(t){this.emitter.emit(t?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),document.activeElement.blur(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=t,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(t){if(void 0!==t){if(!t||"object"!==("undefined"===typeof t?"undefined":o(t))||1!==t.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(t.hasAttribute("readonly")||t.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=t}},get:function(){return this._target}}]),t}(),l=c,u=n(1),f=n.n(u),d=n(2),p=n.n(d),h="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},b=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();function m(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function y(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==typeof e&&"function"!==typeof e?t:e}function v(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var g=function(t){function e(t,n){m(this,e);var r=y(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return r.resolveOptions(n),r.listenClick(t),r}return v(e,t),b(e,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"===typeof t.action?t.action:this.defaultAction,this.target="function"===typeof t.target?t.target:this.defaultTarget,this.text="function"===typeof t.text?t.text:this.defaultText,this.container="object"===h(t.container)?t.container:document.body}},{key:"listenClick",value:function(t){var e=this;this.listener=p()(t,"click",(function(t){return e.onClick(t)}))}},{key:"onClick",value:function(t){var e=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new l({action:this.action(e),target:this.target(e),text:this.text(e),container:this.container,trigger:e,emitter:this})}},{key:"defaultAction",value:function(t){return x("action",t)}},{key:"defaultTarget",value:function(t){var e=x("target",t);if(e)return document.querySelector(e)}},{key:"defaultText",value:function(t){return x("text",t)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],e="string"===typeof t?[t]:t,n=!!document.queryCommandSupported;return e.forEach((function(t){n=n&&!!document.queryCommandSupported(t)})),n}}]),e}(f.a);function x(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}e["default"]=g}])["default"]}))},b749:function(t,e,n){"use strict";n.r(e);var r=n("d522"),i=n.n(r);for(var o in r)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},b7ee:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return i}));var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"textarea-html",attrs:{id:"attribution-html","aria-label":t.$t("license-use.html-label"),readonly:""}},[t._v(" "+t._s(t.htmlLicenseParagraph.replace(/ {2,}/g," "))+" ")])},i=[]},d522:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n("fada")),i=a(n("903d")),o=a(n("6b84"));function a(t){return t&&t.__esModule?t:{default:t}}var s={name:"LicenseUseCard",components:{LicenseHTML:i.default,LicenseText:o.default,CopyTools:r.default},data(){return{copyTarget:".richtext"}},methods:{updateCopyTarget(){const t=0===this.$refs.alltabs.$data.activeTabIndex?"web":"print";if("web"===t){const t=Number.parseInt(this.$refs.web.$data.activeTabIndex);this.copyTarget="."+["richtext","html","xmp"][t]}else this.copyTarget=".plaintext"}}};e.default=s},d8f9:function(t,e,n){"use strict";n.r(e);var r=n("7bd5"),i=n("b749");for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("78d1");var a=n("2877"),s=Object(a["a"])(i["default"],r["a"],r["b"],!1,null,null,null);e["default"]=s.exports},da76:function(t,e,n){"use strict";n.r(e);var r=n("38dc"),i=n("96cd");for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);var a=n("2877"),s=Object(a["a"])(i["default"],r["a"],r["b"],!1,null,null,null);e["default"]=s.exports},e8f0:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n("2f62"),i=n("768b"),o={name:"LicenseHTML",computed:{...(0,r.mapGetters)(["shortName","fullName","iconsList","licenseUrl"]),...(0,r.mapState)(["attributionDetails","attributionType"]),htmlLicenseParagraph(){const t="full"===this.attributionType,{workTitle:e}=this.attributionDetails,n=!e,r={...this.attributionDetails,workTitle:e||this.$t("license-use.richtext.workTitle")},{work:o,creator:a,license:s}=(0,i.generateHTML)(r,this.shortName,t,n),c=this.$t("license-use.richtext.full-text",{workTitle:o,creator:a,license:s,by:a?this.$t("license-use.richtext.by"):"",licenseMark:this.shortName===i.LICENSES.CC0.SHORT?this.$t("license-use.richtext.marked-text"):this.$t("license-use.richtext.licensed-text")}),l='xmlns:cc="http://creativecommons.org/ns#" '+(n?"":'xmlns:dct="http://purl.org/dc/terms/"');return`<p ${l}>${c}</p>`}}};e.default=o},f27e:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n("15e9")),i=a(n("b311")),o=a(n("da76"));function a(t){return t&&t.__esModule?t:{default:t}}var s={name:"CopyTools",components:{CopyTypeSwitch:r.default,XmpButton:o.default},props:{clipboardTarget:{type:String,default:".license-text"}},data(){return{copyType:"short",copyLabel:this.$t("license-use.copy-label"),xmpLabel:this.$t("license-use.xmp-label")}},mounted(){this.clipboard=new i.default(".copy-button"),this.clipboard.on("success",this.onCopySuccess),this.clipboard.on("error",this.onCopyError)},destroyed(){this.clipboard.destroy()},methods:{changeCopyType(){this.copyType="short"===this.copyType?"full":"short",this.$emit("change-copy-type",this.copyType)},handleCopy(){this.copyLabel=this.$t("license-use.copied-label"),setTimeout(()=>{this.copyLabel=this.$t("license-use.copy-label")},2e3)},onCopySuccess(t){this.success=!0,setTimeout(()=>{this.success=!1},2e3),t.clearSelection()},onCopyError(t){t.clearSelection()}}};e.default=s},fada:function(t,e,n){"use strict";n.r(e);var r=n("932a"),i=n("a7f5");for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("4a5a");var a=n("2877"),s=Object(a["a"])(i["default"],r["a"],r["b"],!1,null,"2214843a",null);e["default"]=s.exports},fe66:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.createXMP=void 0;var r=n("768b");const i=({shortName:t,workUrl:e="",workTitle:n="",creatorName:i="",lang:o="en-US"})=>{const a=(0,r.licenseSlug)(t).replace(/-/gi,"_").toUpperCase(),s=r.LICENSES[a].URL,c=r.LICENSES[a].FULL,l=`This work is licensed under <a href="${s}">${c}</a>`.replace(/</gi,"&lt;").replace(/>/gi,"&gt;").replace(/"/gi,"&quot;"),u=t!==r.LICENSES.CC0.SHORT?"True":"False";return`<?xpacket begin='' id='W5M0MpCehiHzreSzNTczkc9d'?>\n<x:xmpmeta xmlns:x='adobe:ns:meta/'>\n    <rdf:RDF xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#'\n             xmlns:xapRights='http://ns.adobe.com/xap/1.0/rights/'\n             xmlns:cc='http://creativecommons.org/ns#'${n?"xmlns:dc='http://purl.org/dc/elements/1.1/'":""}>\n        <rdf:Description rdf:about=''>\n            <xapRights:Marked>${u}</xapRights:Marked>${i?`\n            <xapRights:Owner>\n                <rdf:Bag>\n                    <rdf:li>${i}</rdf:li>\n                </rdf:Bag>\n            </xapRights:Owner>`:""}${e?`\n            <xapRights:WebStatement rdf:resource='${e}'/>`:""}\n            <xapRights:UsageTerms>\n                <rdf:Alt>\n                  <rdf:li xml:lang='x-default'>${l}</rdf:li>\n                  <rdf:li xml:lang='${o}' >${l}</rdf:li>\n                </rdf:Alt>\n            </xapRights:UsageTerms>\n            <cc:license rdf:resource='${s}'/>${i?`\n            <cc:attributionName>${i}</cc:attributionName>`:""}${n?`\n            <dc:title>\n                <rdf:Alt>\n                  <rdf:li xml:lang='x-default'>${n}</rdf:li>\n                  <rdf:li xml:lang='${o}'>${n}</rdf:li>\n                </rdf:Alt>\n            </dc:title>`:""}\n        </rdf:Description>\n    </rdf:RDF>\n</x:xmpmeta>\n<?xpacket end='r'?>`};e.createXMP=i},ff7b:function(t,e,n){"use strict";n("7b7c")}}]);
//# sourceMappingURL=chunk-1869ec59.0fee167a.js.map