!function(t){function i(i){for(var o,r,l=i[0],h=i[1],a=i[2],v=0,d=[];v<l.length;v++)r=l[v],Object.prototype.hasOwnProperty.call(s,r)&&s[r]&&d.push(s[r][0]),s[r]=0;for(o in h)Object.prototype.hasOwnProperty.call(h,o)&&(t[o]=h[o]);for(c&&c(i);d.length;)d.shift()();return n.push.apply(n,a||[]),e()}function e(){for(var t,i=0;i<n.length;i++){for(var e=n[i],o=!0,l=1;l<e.length;l++){var h=e[l];0!==s[h]&&(o=!1)}o&&(n.splice(i--,1),t=r(r.s=e[0]))}return t}var o={},s={0:0},n=[];function r(i){if(o[i])return o[i].exports;var e=o[i]={i:i,l:!1,exports:{}};return t[i].call(e.exports,e,e.exports,r),e.l=!0,e.exports}r.m=t,r.c=o,r.d=function(t,i,e){r.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:e})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,i){if(1&i&&(t=r(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var o in t)r.d(e,o,function(i){return t[i]}.bind(null,o));return e},r.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(i,"a",i),i},r.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},r.p="";var l=window.webpackJsonp=window.webpackJsonp||[],h=l.push.bind(l);l.push=i,l=l.slice();for(var a=0;a<l.length;a++)i(l[a]);var c=h;n.push([6,1]),e()}([,,function(t,i,e){var o=e(1),s=e(3);"string"==typeof(s=s.__esModule?s.default:s)&&(s=[[t.i,s,""]]);var n={insert:"head",singleton:!1};o(s,n);t.exports=s.locals||{}},function(t,i,e){},function(t,i,e){var o=e(1),s=e(5);"string"==typeof(s=s.__esModule?s.default:s)&&(s=[[t.i,s,""]]);var n={insert:"head",singleton:!1};o(s,n);t.exports=s.locals||{}},function(t,i,e){},function(t,i,e){"use strict";e.r(i);var o=e(0),s=(e(2),e(4),function(){function t(t,i){this.value=0,this.value2=0,this.min=this.tryParseFloat(t[0].getAttribute("min"),0),this.max=this.tryParseFloat(t[0].getAttribute("max"),100),i?(this.value=this.min+(this.max-this.min)/4,this.value2=this.min+3*(this.max-this.min)/4):this.value=this.tryParseFloat(t[0].nodeValue,Math.round(this.min+(this.max-this.min)/2)),this.step=this.tryParseFloat(t[0].getAttribute("step"),1)}return t.prototype.tryParseFloat=function(t,i){var e=parseFloat(t);return Number.isNaN(e)?i:e},t}()),n=void 0!==document.location?e(0):e(0)(window),r=function(){function t(t){this.$fill=n('<div class="'+t+'" />')}return Object.defineProperty(t.prototype,"height",{get:function(){var t=this.$fill.parent().css("height");return parseFloat(t.substr(0,t.length-2))},set:function(t){this._height=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"width",{get:function(){var t=this.$fill.parent().css("width");return parseFloat(t.substr(0,t.length-2))},set:function(t){this._width=t},enumerable:!1,configurable:!0}),t.prototype.setPosition2=function(t,i,e){e?(this.$fill[0].style.bottom=t+"px",this.$fill[0].style.height=i-t+"px"):(this.$fill[0].style.left=t+"px",this.$fill[0].style.width=i-t+"px")},t.prototype.setPosition=function(t,i){i?this.$fill[0].style.height=t+"px":this.$fill[0].style.width=t+"px"},t}(),l=function(){function t(t,i,e){this.left=void 0,this.bottom=void 0,this.active=!1,this.isVertical=e,this.led=i,this.$control=n(i?'<div class="'+t+'" ><input type="text"></div>':'<div class="'+t+'" >')}return t.prototype.getPosition=function(){return this.isVertical?this.bottom:this.left},t.prototype.setPosition=function(t,i){i?(this.$control[0].style.bottom=t+"px",this.bottom=t):(this.$control[0].style.left=t+"px",this.left=t)},t}(),h=function(){function t(t,i,e,o,s){this.rangeClass="rSlider1410",this.fillClass="rSlider1410__fill",this.handleClass="rSlider1410__control",this.handleClass2="rSlider1410__control2",this.isVertical=!1,this.identifier="mySlider-"+e,this.$element=o,this.$window=n(window),this.$document=n(document),this.$rootObject=s,this.$fillObject=new r(this.fillClass),this.$fill=this.$fillObject.$fill,this.$controlObject=new l(this.handleClass,!0,i),this.$controlObject2=new l(this.handleClass2,!0,i),this.$control=this.$controlObject.$control,this.$control2=this.$controlObject2.$control,this.isTwo=t,t||this.$control2.css("display","none"),i?(this.isVertical=!0,this.$range=n('<div class="'+this.rangeClass+" "+this.rangeClass+'-vertical" id="'+this.identifier+'" />').insertAfter(this.$element).prepend(this.$fill,this.$control,this.$control2).appendTo(this.$rootObject),this.grabPos=this.$control[0].offsetHeight):(this.$range=n('<div class="'+this.rangeClass+" "+this.rangeClass+'-horizontal" id="'+this.identifier+'" />').insertAfter(this.$element).prepend(this.$fill,this.$control,this.$control2).appendTo(this.$rootObject),this.grabPos=this.$control[0].offsetWidth)}return t.prototype.setPositionView=function(t){this.$controlObject.active?(this.$controlObject.setPosition(t,this.isVertical),this.isTwo?this.$fillObject.setPosition2(this.$controlObject.getPosition(),this.$controlObject2.getPosition()+this.grabPos/2,this.isVertical):this.$fillObject.setPosition(t+this.grabPos/2,this.isVertical)):(this.$controlObject2.setPosition(t,this.isVertical),this.isTwo&&this.$fillObject.setPosition2(this.$controlObject.getPosition(),this.$controlObject2.getPosition()+this.grabPos/2,this.isVertical))},t.prototype.getPositionView=function(t){var i;return this.isVertical?(i=this.$range[0].getBoundingClientRect().bottom)-t.clientY:(i=this.$range[0].getBoundingClientRect().left,t.clientX-i)},t.prototype.setActiveControl=function(t){t>2||t<1||(1===t?(this.$controlObject.active=!0,this.$controlObject2.active=!1,this.$control.css("z-index",100),this.$control2.css("z-index",1)):(this.$controlObject2.active=!0,this.$controlObject.active=!1,this.$control.css("z-index",1),this.$control2.css("z-index",100)))},t.prototype.setOutValue=function(t){this.$element.val(t).trigger("input",{origin:this.identifier})},t}(),a=void 0!==document.location?e(0):e(0)(window),c=function(){function t(t,i){if(this.startEvent="mousedown",this.moveEvent="mousemove",this.endEvent="mouseup",this.controlClass="rSlider1410__control",this.controlClass2="rSlider1410__control2",this.inrange=function(t,i,e){return t<i?i:t>e?e:t},this.model=t,this.view=i,this.controlDown=a.proxy(this.controlDown,this),this.controlMove=a.proxy(this.controlMove,this),this.controlEnd=a.proxy(this.controlEnd,this),this.moveEvent=this.moveEvent+"."+i.identifier,this.endEvent=this.endEvent+"."+i.identifier,this.startEvent=this.startEvent+"."+i.identifier,this.view.$range.on(this.startEvent,this.controlDown),this.view.isVertical)this.maxHandlePos=this.view.$fillObject.height-this.view.grabPos;else{var e=this.view.$range.css("width");this.maxHandlePos=parseFloat(e.substr(0,e.length-2))-this.view.grabPos}var o,s;this.view.setActiveControl(1),o=this.getPositionFromValue(t.value),this.view.setPositionView(o),s=this.getValueFromPosition(this.inrange(o,0,this.model.max)),this.view.$control.find("input:text").val(s+""),this.view.isTwo&&(this.view.setActiveControl(2),o=this.getPositionFromValue(t.value2),this.view.setPositionView(o),s=this.getValueFromPosition(this.inrange(o,0,this.model.max)),this.view.$control2.find("input:text").val(s+""));var n=this;this.view.$element.on("change."+i.identifier,(function(t,i){if(!n.view.isTwo){var e=a(t.target).val();o=n.getPositionFromValue(e),n.view.setActiveControl(1),n.view.setPositionView(o),n.view.$control.find("input:text").val(e+"")}})),this.view.$window.on("resize."+i.identifier,(function(t){n.view.$rootObject.parent().width()>n.view.$rootObject.outerWidth(!0)||n.view.isVertical||setTimeout((function(){n.updateSlider()}),500)}))}return t.prototype.updateSlider=function(){this.maxHandlePos=this.view.$range[0].offsetWidth-this.view.grabPos,this.view.setActiveControl(1);var t=this.getPositionFromValue(this.model.value);this.view.setPositionView(t),this.view.setActiveControl(2),t=this.getPositionFromValue(this.model.value2),this.view.setPositionView(t)},t.prototype.getValueFromPosition=function(t){var i=t/(this.maxHandlePos||1),e=this.model.step*Math.round(i*(this.model.max-this.model.min)/this.model.step)+this.model.min;return e=e>this.model.max?this.model.max:e},t.prototype.getPositionFromValue=function(t){var i=(t-this.model.min)/(this.model.max-this.model.min);return Number.isNaN(i)?0:i*this.maxHandlePos},t.prototype.controlDown=function(t){if(t.preventDefault(),this.view.$range.on(this.moveEvent,this.controlMove),this.view.$document.on(this.endEvent,this.controlEnd),this.view.$range.addClass("rSlider1410--active"),(" "+t.target.className+" ").replace(/[\n\t]/g," ").indexOf(this.controlClass2)>-1)return this.view.isVertical?this.minHandlePos=this.view.$controlObject.bottom:this.minHandlePos=this.view.$controlObject.left,void this.view.setActiveControl(2);if((" "+t.target.className+" ").replace(/[\n\t]/g," ").indexOf(this.controlClass)>-1)return this.minHandlePos=0,void this.view.setActiveControl(1);if(!this.view.isTwo){this.view.setActiveControl(1);var i=this.view.getPositionView(t)-this.view.grabPos/2,e=this.getValueFromPosition(this.inrange(i,0,this.maxHandlePos)),o=this.getPositionFromValue(e);this.view.setPositionView(o),this.view.setOutValue(e),this.view.$control.find("input:text").val(e+"")}},t.prototype.controlMove=function(t){t.preventDefault();var i=this.view.getPositionView(t)-this.view.grabPos/2;if(this.view.isVertical){if(this.view.$controlObject2.active&&i<this.view.$controlObject.bottom)return;if(this.view.$controlObject.active&&i>this.view.$controlObject2.bottom)return}else{if(this.view.$controlObject.active&&i>this.view.$controlObject2.left)return;if(this.view.$controlObject2.active&&i>this.maxHandlePos)return}if(!(i<this.minHandlePos)){var e=this.inrange(i,this.minHandlePos,this.maxHandlePos);this.view.setPositionView(e);var o=this.getValueFromPosition(this.inrange(i,0,this.model.max));this.view.$controlObject2.active?this.view.$control2.find("input:text").val(o+""):this.view.$control.find("input:text").val(o+""),this.view.setOutValue(o)}},t.prototype.controlEnd=function(t){t.preventDefault(),this.view.$range.off("mousemove",this.controlMove),this.view.$range.off(this.endEvent,this.controlEnd),this.view.$controlObject.active=!1,this.view.$controlObject2.active=!1,this.view.$range.removeClass("rSlider1410--active")},t}();o.fn.extend({addSlider1410:function(t,i,e,n,r,l,a){return void 0===i&&(i=0),void 0===e&&(e=1e3),void 0===n&&(n=10),void 0===r&&(r=200),this.each((function(){var d,u=o(this),f=o("<input type='range' max='"+e+"' step='"+n+"' value='"+r+"' min='"+i+"'>").appendTo(u),p=new s(f,a);d=new h(a,l,v++,f,!0===l?o('<div style="height:'+t+';width:20px;margin:30px"/>').appendTo(u):o('<div style="padding:20px;max-width:'+t+';margin-bottom:30px"/>').appendTo(u));new c(p,d)}))}});var v=0,d=o(".mySliders");d.addSlider1410("300px",5,400,5,100,!0,!1),d.addSlider1410("800px",10,1e3,10,300,!1,!0),d.addSlider1410("800px",0,1e3,1,300,!1,!1)}]);
//# sourceMappingURL=app.js.map