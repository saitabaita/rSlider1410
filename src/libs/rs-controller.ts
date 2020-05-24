import * as $ from 'jquery';
import { rsModel } from './rs-model';
import { rsView } from './rs-view';

class rsController{
    private model: rsModel;
    private view: rsView;
    startEvent: string = 'mousedown';
    moveEvent: string= 'mousemove';
    endEvent: string = 'mouseup';
    controlClass: string = 'rSlider1410__control';
    controlClass2: string = 'rSlider1410__control2';
    maxHandlePos: number; 
    minHandlePos: number; 
    constructor(model: rsModel, view: rsView){
        this.model = model;
        this.view = view;
        //Передадим контекст в обработчики событий
        this.handleDown = $.proxy(this.handleDown, this);
        this.handleMove = $.proxy(this.handleMove, this);
        this.handleEnd  = $.proxy(this.handleEnd, this);

        this.moveEvent  = this.moveEvent + '.' + view.identifier + '.' + view.identifier;
        this.endEvent   = this.endEvent + '.' + view.identifier + '.' + view.identifier;
        this.startEvent = this.startEvent + '.' + view.identifier + '.' + view.identifier;
        this.view.$range.on(this.startEvent, this.handleDown);

        if(this.view.vertical){
            this.maxHandlePos = this.view.$fillObject.height - this.view.grabPos;
        }else{
            let str: string = this.view.$range.css('width');
            this.maxHandlePos = parseFloat(str.substr(0,str.length-2)) - this.view.grabPos;
        }
        let pos:number,value:number;
        //Установим начальную позицию 1 контрола
        this.setActiveControl_1(true);
        pos = this.getPositionFromValue(model.value);
        this.view.setPositionView(pos);
        value = this.getValueFromPosition(this.inrange(pos, 0, this.model.max));
        this.view.$control.find('input:text').val(value+''); 

        //Установим начальную позицию 2 контрола
        if(this.view.two){
            this.setActiveControl_1(false);
            pos = this.getPositionFromValue(model.value2);
            this.view.setPositionView(pos);
            value = this.getValueFromPosition(this.inrange(pos, 0, this.model.max));
            this.view.$control2.find('input:text').val(value+''); 
        }
        let _this = this;
        this.view.element.on('change.' + view.identifier, function(e, data){
            if(!_this.view.two){
                let val: any = $(e.target).val();
                pos = _this.getPositionFromValue(val);
                _this.setActiveControl_1(true);;            
                _this.view.setPositionView(pos);
                _this.view.$control.find('input:text').val(val+'');    
           }
        });
        this.view.$window.on('resize.' + view.identifier, function(e){
            if(_this.view.rootObject.parent().width() > _this.view.rootObject.outerWidth(true)){
                return;
            }
                if(!_this.view.vertical)
                setTimeout(function() { _this.updateSlider() }, 500);
        });
    };
    setActiveControl_1(contr1: boolean){
        if(contr1){
            this.view.$controlObject.active=true;
            this.view.$controlObject2.active=false;
            this.view.$control.css('z-index', 100);
            this.view.$control2.css('z-index', 1);
        }else{
            this.view.$controlObject2.active=true;
            this.view.$controlObject.active=false;
            this.view.$control.css('z-index', 1);
            this.view.$control2.css('z-index', 100);
        }
    }
    updateSlider(){
        this.maxHandlePos = this.view.$range[0]['offsetWidth'] - this.view.$control[0]['offsetWidth'];
        
        this.setActiveControl_1(true);
        let pos: number = this.getPositionFromValue(this.model.value);
        this.view.setPositionView(pos);

        this.setActiveControl_1(false);
        pos = this.getPositionFromValue(this.model.value2);
        this.view.setPositionView(pos);
    }
    getValueFromPosition(pos: number){
        let percentage: number = ((pos) / (this.maxHandlePos || 1));
        let value = this.model.step * Math.round(percentage * (this.model.max - this.model.min) / this.model.step) + this.model.min;
        value = (value>this.model.max) ? this.model.max : value;
        return value;
    }
    getPositionFromValue(value: number){
        let percentage: number = (value - this.model.min)/(this.model.max - this.model.min);
        let pos: number = (!Number.isNaN(percentage)) ? percentage * this.maxHandlePos : 0;
        return pos;
    }
    inrange = function(pos:number, min:number, max:number) {
        if (pos < min) { return min; }
        if (pos > max) { return max; }
        return pos;
    };
    handleDown(e: any){
        e.preventDefault();
        this.view.$range.on(this.moveEvent, this.handleMove);
        this.view.$document.on(this.endEvent, this.handleEnd);
        
        this.view.$range.addClass('rSlider1410--active');

        //Если нажали на бегунок позиция не меняется
        if ((' ' + e.target.className + ' ').replace(/[\n\t]/g, ' ').indexOf(this.controlClass2) > -1){
            if(this.view.vertical)
                this.minHandlePos = this.view.$controlObject.bottom;
            else
                this.minHandlePos = this.view.$controlObject.left;
            this.setActiveControl_1(false);
            return;
        }
        if ((' ' + e.target.className + ' ').replace(/[\n\t]/g, ' ').indexOf(this.controlClass) > -1){
            this.minHandlePos = 0;
            this.setActiveControl_1(true);
            return;
        }
        if(this.view.two){ 
            return;
        }
        this.setActiveControl_1(true);
        
        let pos: number = this.view.getPositionView(e);
        pos = pos - this.view.grabPos/2;
        let value: number = this.getValueFromPosition(this.inrange(pos, 0, this.maxHandlePos));
        let newPos: number = this.getPositionFromValue(value);
        this.view.setPositionView(newPos);
        this.setOutValue(value);
        this.view.$control.find('input:text').val(value+'');    
    }
    handleMove(e: any){
        e.preventDefault();
        let pos: number = this.view.getPositionView(e)-this.view.grabPos/2;
        if(this.view.vertical){
            if(this.view.$controlObject2.active && pos<this.view.$controlObject.bottom) return;
            if(this.view.$controlObject.active && pos>this.view.$controlObject2.bottom) return;
        }else{
            if(this.view.$controlObject.active && pos>this.view.$controlObject2.left) return;
            if(this.view.$controlObject2.active && pos>this.maxHandlePos) return;

        }
//        if(this.view.$controlObject2.active && pos>this.maxHandlePos) return;
        if(pos<this.minHandlePos) return;
        let newPos: number = this.inrange(pos, this.minHandlePos, this.maxHandlePos);
        this.view.setPositionView(newPos);

        let value:number = this.getValueFromPosition(this.inrange(pos, 0, this.model.max));
        if(this.view.$controlObject2.active){
            this.view.$control2.find('input:text').val(value+'');    
        }else{
            this.view.$control.find('input:text').val(value+'');    
        }
        this.setOutValue(value);

    }
    handleEnd(e: any){
        e.preventDefault();
        this.view.$range.off(this.moveEvent, this.handleMove);
        this.view.$range.off(this.endEvent, this.handleEnd);
        this.view.$controlObject.active=false;        
        this.view.$controlObject2.active=false;        
        this.view.$range.removeClass('rSlider1410--active');
    }
    setOutValue(value: number){
        this.view.element
            .val(value)
            .trigger('input', { origin: this.view.identifier });
    }
}
export {rsController};