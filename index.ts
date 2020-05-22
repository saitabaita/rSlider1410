'use strict'
import * as $ from 'jquery';
import './src/index.css'
import './src/libs/rsSlider1410.css'
import { rsModel } from './src/libs/rs-model';
import { rsView } from './src/libs/rs-view';
import { rsController } from './src/libs/rs-controller';

let pluginId: number = 0;

function rSlider1410(wh:string, min: number, max: number, step: number, val: number, vertical: boolean){
    let element = $("<input type='range' max='"+max+"' step='"+step+"' value='"+val+"' min='"+min+"'>").appendTo($(".mySliders"));
    let model = new rsModel(element);
    let view: rsView;
    if(vertical==true){
        view = new rsView(vertical, pluginId++, element, $('<div style="height:'+wh+';width:20px;margin:30px"/>').appendTo($(".mySliders")));
    }else{
        view = new rsView(vertical, pluginId++, element, $('<div style="padding:20px;max-width:'+wh+';margin-bottom:30px"/>').appendTo($(".mySliders")));
    }
    let controller = new rsController(model, view);
}

$(document).ready(function(){
    rSlider1410('200px', 0, 1000, 10, 100, true);
    rSlider1410('1000px', 10, 1000, 20, 100, false);
    //rSlider1410(400, 10, 1000, 10, 100, false);
    //rSlider1410(200, 10, 1000, 10, 100, false);

/*    let element = $("<input type='range' max='1000' step='10' value='500' min='0'>").appendTo($(".mySliders"));
    let model = new rsModel(element, pluginId++);
    let view = new rsView(model, $('<div style="width:400px;margin-bottom:30px"/>').appendTo($(".mySliders")));
    let controller = new rsController(model, view);

/*    let element2 = $("<input type='range' max='1000' step='10' value='300' min='10'>").appendTo($(".mySliders"));
    let model2 = new rsModel(element2, pluginId++);
    let view2 = new rsView(model2, $('<div/>').appendTo($(".mySliders")));
    let controller2 = new rsController(model2, view2);*/
});


