'use strict'

import * as $ from 'jquery';
import './src/index.css'
import './src/libs/rsSlider1410.css'
import rsModel from './src/libs/rs-model';
import { rsView } from './src/libs/rs-view';
import { rsController } from './src/libs/rs-controller';

$.fn.extend({
    addSlider1410: function (wh:string, min: number=0, max: number=1000, step: number=10, val: number=200, isVertical: boolean, isTwo: boolean) {
        return this.each(function () {
            const $this = $(this);
            let element: JQuery<HTMLElement> = $("<input type='range' max='"+max+"' step='"+step+"' value='"+val+"' min='"+min+"'>").appendTo($this); 
            let model: rsModel = new rsModel(element, isTwo);
            let view: rsView;
            if(isVertical===true){
                view = new rsView(isTwo, isVertical, pluginId++, element, $('<div style="height:'+wh+';width:20px;margin:30px"/>').appendTo($this));
            }else{
                view = new rsView(isTwo, isVertical, pluginId++, element, $('<div style="padding:20px;max-width:'+wh+';margin-bottom:30px"/>').appendTo($this));
            }
            let controller: rsController = new rsController(model, view);
        });
    }
});
let pluginId: number = 0; // номер слайдера

const jQuerySlider = $(".mySliders");
jQuerySlider.addSlider1410('300px', 5, 400, 5, 100, true, false);
jQuerySlider.addSlider1410('800px', 10, 1000, 10, 300, false, true);
jQuerySlider.addSlider1410('800px', 0, 1000, 1, 300, false, false);


