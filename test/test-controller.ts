const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const document = new JSDOM('<!DOCTYPE html><html><body><div class="mySliders"></div></body></html>');
let $ = require("jquery")(document.window); 
global.window = document.window;
global.document = document;

import rsModel from "../src/libs/rs-model";
import { rsView } from "../src/libs/rs-view";
import { rsController } from "../src/libs/rs-controller";

let expect_test  = require('chai').expect;

describe('Object CONTROLLER Test', () => {
    let elementSlider: JQuery<HTMLElement> = $("<div style='padding:20px;max-width:400px;margin-bottom:30px'/>").appendTo($(".mySliders"));
    let element: JQuery<HTMLElement> = $("<input type='range' max='400' step='10' value='300' min='10' />").appendTo($(".mySliders"));
    let model: rsModel = new rsModel(element, false);
    let view: rsView = new rsView(false, false, 0, element, elementSlider);
    let controller: rsController = new rsController(model, view);
    it('Checks if the CONTROLLER works', () => {
        expect_test(controller).to.have.property('model', model);
        expect_test(controller).to.have.property('view', view);
        expect_test(controller.getValueFromPosition).to.exist;
        expect_test(controller.getPositionFromValue).to.exist;
        expect_test(controller.inrange).to.exist;
        expect_test(controller.controlDown).to.exist;
        expect_test(controller.controlMove).to.exist;
        expect_test(controller.controlEnd).to.exist;
        expect_test(controller.getValueFromPosition(100)).to.be.a('number');
        expect_test(controller.inrange(100, 0, 200)).to.be.a('number');
        expect_test(controller.inrange(100, 0, 200)).to.be.equal(100);
        expect_test(controller.inrange(10, 100, 200)).to.be.equal(100);
    });
});