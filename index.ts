'use strict'

import * as $ from 'jquery';
import './src/index.css'
import './src/libs/rsSlider1410.css'
import { rsModel } from './src/libs/rs-model';
import { rsView } from './src/libs/rs-view';
import { rsController } from './src/libs/rs-controller';

let pluginId: number = 0;

function rSlider1410(wh:string, min: number, max: number, step: number, val: number, vertical: boolean, two: boolean){
    let element = $("<input type='range' max='"+max+"' step='"+step+"' value='"+val+"' min='"+min+"'>").appendTo($(".mySliders"));
    let model = new rsModel(element, two);
    let view: rsView;
    if(vertical===true){
        view = new rsView(two, vertical, pluginId++, element, $('<div style="height:'+wh+';width:20px;margin:30px"/>').appendTo($(".mySliders")));
    }else{
        view = new rsView(two, vertical, pluginId++, element, $('<div style="padding:20px;max-width:'+wh+';margin-bottom:30px"/>').appendTo($(".mySliders")));
    }
    let controller = new rsController(model, view);
}

$(document).ready(function(){
    rSlider1410('300px', 5, 400, 5, 100, true, false);
    rSlider1410('800px', 10, 1000, 10, 300, false, true);
    rSlider1410('800px', 0, 1000, 1, 300, false, false);
    //rSlider1410('600px', 0, 1000, 10, 300, false);

});


