
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM('<!DOCTYPE html><html><body><div class="mySliders"></div></body></html>');
let $ = require("jquery")(dom.window); 

import rsModel from "../src/libs/rs-model";
let expect_test  = require('chai').expect;
//let request = require('request');
//const fModel = require('../src/libs/rs-model');

describe('Object model Test', () => {
    it('Checks if the model works with one runner by default', () => {
        let element: JQuery<HTMLElement> = $("<input type='range' />").appendTo($(".mySliders"));
        let model: rsModel = new rsModel(element, false);
        expect_test(model).to.have.property('min', 0);
        expect_test(model).to.have.property('max', 100);
        expect_test(model).to.have.property('value', 50);
        expect_test(model).to.have.property('value2', 0);
        expect_test(model).to.have.property('step', 1);
    });
    it('Checks if the model works with two runner by default', () => {
        let element: JQuery<HTMLElement> = $("<input type='range' />").appendTo($(".mySliders"));
        let model: rsModel = new rsModel(element, true);
        expect_test(model).to.have.property('min', 0);
        expect_test(model).to.have.property('max', 100);
        expect_test(model).to.have.property('value', 25);
        expect_test(model).to.have.property('value2', 75);
        expect_test(model).to.have.property('step', 1);
    });
    it('Checks if the model works with two runner', () => {
        let element: JQuery<HTMLElement> = $("<input type='range' max='400' step='10' value='300' min='10' />").appendTo($(".mySliders"));
        let model: rsModel = new rsModel(element, true);
        expect_test(model).to.have.property('min', 10);
        expect_test(model).to.have.property('max', 400);
        expect_test(model).to.have.property('value', 107.5);
        expect_test(model).to.have.property('value2', 302.5);
        expect_test(model).to.have.property('step', 10);
        expect_test(model.tryParseFloat).to.exist;
        expect_test(typeof model.tryParseFloat).to.be.equals('function');
        expect_test(model.tryParseFloat('100', 10)).to.equal(100);
        expect_test(model.tryParseFloat('f100', 10)).to.equal(10);

    });
});
