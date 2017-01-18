!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.holmes=t()}(this,function(){"use strict";function e(e){var n=function(){for(var n=void 0,o=arguments.length,i=Array(o),s=0;s<o;s++)i[s]=arguments[s];return n="undefined"!=typeof this&&this!==t?e.call.apply(e,[this].concat(i)):new(Function.prototype.bind.apply(e,[null].concat(i)))};return n.__proto__=e,n.prototype=e.prototype,n}var t="undefined"!=typeof window?window:global,n=function(e,t){return e.indexOf(t)!==-1},o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=function(){function e(t){var s=this;i(this,e);var r=!1;if("object"!==("undefined"==typeof t?"undefined":o(t)))throw new Error('The options need to be given inside an object like this:\nnew Holmes({\n\tfind:".result"\n});\nsee also https://haroen.me/holmes/doc/holmes.html');if("string"!=typeof t.find)throw new Error('A find argument is needed. That should be a querySelectorAll for each of the items you want to match individually. You should have something like: \nnew Holmes({\n\tfind:".result"\n});\nsee also https://haroen.me/holmes/doc/holmes.html');var l={input:"input[type=search]",find:"",placeholder:void 0,mark:!1,class:{visible:void 0,hidden:"hidden"},dynamic:!1,minCharacters:0,hiddenAttr:!1,onHidden:void 0,onVisible:void 0,onEmpty:void 0,onFound:void 0,onInput:void 0};this.options=Object.assign({},l,t),this.options.class=Object.assign({},l.class,t.class),this.hidden=0,this.running=!1,window.addEventListener("DOMContentLoaded",function(){s.start()}),this._inputHandler=function(){s.running=!0;var e=!1;s.searchString=s.inputString(),s.options.minCharacters&&0!==s.searchString.length&&s.options.minCharacters>s.searchString.length||(s.options.dynamic&&(s.elements=document.querySelectorAll(s.options.find),s.elementsLength=s.elements.length,s.elementsArray=Array.prototype.slice.call(s.elements)),s.options.mark&&(s._regex=new RegExp("("+s.searchString+")(?![^<]*>)","gi")),s.elementsArray.forEach(function(t){n(t.textContent.toLowerCase(),s.searchString)?(s._showElement(t),r&&"function"==typeof s.options.onFound&&s.options.onFound(s.placeholderNode),e=!0):s._hideElement(t)}),"function"==typeof s.options.onInput&&s.options.onInput(s.searchString),e?s.options.placeholder&&s._hideElement(s.placeholderNode):(s.options.placeholder&&s._showElement(s.placeholderNode),r===!1&&(r=!0,"function"==typeof s.options.onEmpty&&s.options.onEmpty(s.placeholderNode))))}}return s(e,[{key:"_hideElement",value:function(e){this.options.class.visible&&e.classList.remove(this.options.class.visible),e.classList.contains(this.options.class.hidden)||(e.classList.add(this.options.class.hidden),this.hidden++,"function"==typeof this.options.onHidden&&this.options.onHidden(e)),this.options.hiddenAttr&&e.setAttribute("hidden","true"),this.options.mark&&(e.innerHTML=e.innerHTML.replace(/<\/?mark>/g,""))}},{key:"_showElement",value:function(e){this.options.class.visible&&e.classList.add(this.options.class.visible),e.classList.contains(this.options.class.hidden)&&(e.classList.remove(this.options.class.hidden),this.hidden--,"function"==typeof this.options.onVisible&&this.options.onVisible(e)),this.options.hiddenAttr&&e.removeAttribute("hidden"),this.options.mark&&(e.innerHTML=e.innerHTML.replace(/<\/?mark>/g,""),this.searchString.length&&(e.innerHTML=e.innerHTML.replace(this._regex,"<mark>$1</mark>")))}},{key:"inputString",value:function(){if(this.input instanceof HTMLInputElement)return this.input.value.toLowerCase();if(this.input.contentEditable)return this.input.textContent.toLowerCase();throw new Error("The Holmes input was no <input> or contenteditable.")}},{key:"setInput",value:function(e){if(this.input instanceof HTMLInputElement)this.input.value=e;else{if(!this.input.contentEditable)throw new Error("The Holmes input was no <input> or contenteditable.");this.input.textContent=e}}},{key:"start",value:function(){var e=this,t=document.querySelector(this.options.input);if(!(t instanceof HTMLElement))throw new Error("Your Holmes.input didn't match a querySelector");if(this.input=t,"string"!=typeof this.options.find)throw new Error('A find argument is needed. That should be a querySelectorAll for each of the items you want to match individually. You should have something like:\nnew Holmes({\n\tfind:".result"\n});\nsee also https://haroen.me/holmes/doc/holmes.html');if(this.elements=document.querySelectorAll(this.options.find),this.elementsLength=this.elements.length,this.elementsArray=Array.prototype.slice.call(this.elements),this.hidden=0,this.options.placeholder){if(this.placeholderNode=document.createElement("div"),this.placeholderNode.id="holmes-placeholder",this._hideElement(this.placeholderNode),this.placeholderNode.innerHTML=this.options.placeholder,!(this.elements[0].parentNode instanceof Element))throw new Error("The Holmes placeholder could't be put; the elements had no parent.");this.elements[0].parentNode.appendChild(this.placeholderNode)}this.options.class.visible&&!function(){var t=e.options.class.visible;e.elementsArray.forEach(function(e){e.classList.add(t)})}(),this.input.addEventListener("input",this._inputHandler)}},{key:"stop",value:function(){var e=this;return new Promise(function(t,n){try{if(e.input.removeEventListener("input",e._inputHandler),e.options.placeholder){if(!e.placeholderNode.parentNode)throw new Error("The Holmes placeholderNode has no parent.");e.placeholderNode.parentNode.removeChild(e.placeholderNode)}e.options.mark&&e.elementsArray.forEach(function(e){e.innerHTML=e.innerHTML.replace(/<\/?mark>/g,"")}),e.running=!1,t("This instance of Holmes has been stopped.")}catch(e){n(e)}})}},{key:"clear",value:function(){var e=this;this.setInput(""),this.elementsArray.forEach(function(t){e._showElement(t)}),this.options.placeholder&&this._hideElement(this.placeholderNode),this.hidden=0}},{key:"count",value:function(){return{all:this.elementsLength,hidden:this.hidden,visible:this.elementsLength-this.hidden}}}]),e}(),l=e(r);return l});
