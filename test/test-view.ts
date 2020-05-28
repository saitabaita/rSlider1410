let jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('<!DOCTYPE html><html><body><div class="mySliders"></div></body></html>')).window;
global.window = window;
global.document = document;

let $ = require('jquery')(window);

import { rsView } from "../src/libs/rs-view";
import { rsModel } from "../src/libs/rs-model";

let expect_test  = require('chai').expect;

describe('Object VIEW Test', () => {
    let elementRange: JQuery<HTMLElement> = $("<input type='range' />").appendTo($(".mySliders"));
    let elementSlider: JQuery<HTMLElement> = $("<div style='padding:20px;max-width:400px;margin-bottom:30px'/>").appendTo($(".mySliders"));
    let view: rsView = new rsView(false, false, 0, elementRange, elementSlider);
    it('Checks if the VIEW works with one runner by default', () => {
        expect_test(view).to.have.property('isTwo', false);
        expect_test(view).to.have.property('isVertical', false);
        expect_test(view).to.have.property('identifier', 'mySlider-0');
        expect_test(view.$controlObject).to.exist;
        expect_test(view.$controlObject2).to.exist;
        expect_test(view.$fillObject).to.exist;
        expect_test(view.$controlObject).to.be.an('object');
        expect_test(view.$controlObject2).to.be.an('object');
        expect_test(view.$fillObject).to.be.an('object');
    });
    it('Checks rsControl', () => {
        expect_test(view.$controlObject).to.have.property('active');
        expect_test(view.$controlObject).to.have.property('isVertical');
        expect_test(view.$controlObject).to.have.property('led');
        expect_test(view.$controlObject).to.have.property('$control');
        expect_test(view.$controlObject).to.have.property('bottom');
        expect_test(view.$controlObject).to.have.property('left');
        expect_test(view.$controlObject.setPosition).to.exist;
        expect_test(view.$controlObject.getPosition).to.exist;
        expect_test(view.$controlObject.setPosition(100, false)).to.be.a('undefined');
        expect_test(view.$controlObject.getPosition()).to.be.a('number');
        expect_test(view.$controlObject.getPosition()).to.be.equal(100);
    });
});
