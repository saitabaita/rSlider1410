'use strict'

import * as $ from 'jquery';
import './src/index.css'
import './src/libs/rsSlider1410.css'
import { rsModel } from './src/libs/rs-model';
import { rsView } from './src/libs/rs-view';
import { rsController } from './src/libs/rs-controller';

let pluginId: number = 0;

function rSlider1410(wh:string, min: number=0, max: number=1000, step: number=10, val: number=200, isVertical: boolean, isTwo: boolean){
    let element: JQuery<HTMLElement> = $("<input type='range' max='"+max+"' step='"+step+"' value='"+val+"' min='"+min+"'>").appendTo($(".mySliders"));
    let model: rsModel = new rsModel(element, isTwo);
    let view: rsView;
    if(isVertical===true){
        view = new rsView(isTwo, isVertical, pluginId++, element, $('<div style="height:'+wh+';width:20px;margin:30px"/>').appendTo($(".mySliders")));
    }else{
        view = new rsView(isTwo, isVertical, pluginId++, element, $('<div style="padding:20px;max-width:'+wh+';margin-bottom:30px"/>').appendTo($(".mySliders")));
    }
    let controller: rsController = new rsController(model, view);
}

$(document).ready(function(){
    rSlider1410('300px', 5, 400, 5, 100, true, false);
    rSlider1410('800px', 10, 1000, 10, 300, false, true);
    rSlider1410('800px', 0, 1000, 1, 300, false, false);
    //rSlider1410('600px', 0, 1000, 10, 300, false);

});


