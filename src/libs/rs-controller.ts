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
        this.controlDown = $.proxy(this.controlDown, this);
        this.controlMove = $.proxy(this.controlMove, this);
        this.controlEnd  = $.proxy(this.controlEnd, this);

        this.moveEvent  = this.moveEvent + '.' + view.identifier; // добавляем пространство имен для слайдера (id слайдера)
        this.endEvent   = this.endEvent + '.' + view.identifier;
        this.startEvent = this.startEvent + '.' + view.identifier;
        this.view.$range.on(this.startEvent, this.controlDown);

        if(this.view.vertical){
            this.maxHandlePos = this.view.$fillObject.height - this.view.grabPos;
        }else{
            let str: string = this.view.$range.css('width');
            this.maxHandlePos = parseFloat(str.substr(0,str.length-2)) - this.view.grabPos;
        }
        let pos:number,value:number;
        //Установим начальную позицию 1 контрола
        this.view.setActiveControl(1);
        pos = this.getPositionFromValue(model.value);
        this.view.setPositionView(pos);
        // получим значение для бегунка и установим над бегунком
        value = this.getValueFromPosition(this.inrange(pos, 0, this.model.max));
        this.view.$control.find('input:text').val(value+''); 

        //Установим начальную позицию 2 контрола
        if(this.view.two){
            this.view.setActiveControl(2);
            pos = this.getPositionFromValue(model.value2);
            this.view.setPositionView(pos);
            value = this.getValueFromPosition(this.inrange(pos, 0, this.model.max));
            this.view.$control2.find('input:text').val(value+''); 
        }
        // подключаем события для <input type='range' и изменения размеров окна
        let _this = this;
        this.view.element.on('change.' + view.identifier, function(e, data){
            if(!_this.view.two){
                let val: any = $(e.target).val();
                pos = _this.getPositionFromValue(val);
                _this.view.setActiveControl(1);            
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
    updateSlider(){
        this.maxHandlePos = this.view.$range[0]['offsetWidth'] - this.view.grabPos; 

        this.view.setActiveControl(1);
        let pos: number = this.getPositionFromValue(this.model.value);
        this.view.setPositionView(pos);

        this.view.setActiveControl(2);
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
    controlDown(e: any){
        e.preventDefault();
        this.view.$range.on(this.moveEvent, this.controlMove);
        this.view.$document.on(this.endEvent, this.controlEnd);
        
        this.view.$range.addClass('rSlider1410--active');

        //Если нажали на бегунок позиция не меняется переходим к controlmove
        if ((' ' + e.target.className + ' ').replace(/[\n\t]/g, ' ').indexOf(this.controlClass2) > -1){
            if(this.view.vertical)
                this.minHandlePos = this.view.$controlObject.bottom;
            else
                this.minHandlePos = this.view.$controlObject.left;
            this.view.setActiveControl(2);
            return;
        }
        //нажимаем на первый бегунок и покидаем событие
        if ((' ' + e.target.className + ' ').replace(/[\n\t]/g, ' ').indexOf(this.controlClass) > -1){
            this.minHandlePos = 0;
            this.view.setActiveControl(1);
            return;
        }
        if(this.view.two){ 
            return;
        }
        this.view.setActiveControl(1);
        
        let pos: number = this.view.getPositionView(e) - this.view.grabPos/2;;
        let value: number = this.getValueFromPosition(this.inrange(pos, 0, this.maxHandlePos));
        let newPos: number = this.getPositionFromValue(value);
        this.view.setPositionView(newPos);
        this.setOutValue(value);
        this.view.$control.find('input:text').val(value+'');    
    }
    controlMove(e: any){
        e.preventDefault();
        let pos: number = this.view.getPositionView(e)-this.view.grabPos/2;
        // фильтруем перемещение мыши
        if(this.view.vertical){
            if(this.view.$controlObject2.active && pos < this.view.$controlObject.bottom) return;
            if(this.view.$controlObject.active && pos > this.view.$controlObject2.bottom) return;
        }else{
            if(this.view.$controlObject.active && pos > this.view.$controlObject2.left) return;
            if(this.view.$controlObject2.active && pos > this.maxHandlePos) return;

        }
        if(pos<this.minHandlePos) return;
        // прошли все returnы можно двигать бегунок
        let newPos: number = this.inrange(pos, this.minHandlePos, this.maxHandlePos);
        this.view.setPositionView(newPos);

        let value:number = this.getValueFromPosition(this.inrange(pos, 0, this.model.max));
        if(this.view.$controlObject2.active){
            this.view.$control2.find('input:text').val(value+'');    
        }else{
            this.view.$control.find('input:text').val(value+'');    
        }
        // меняем input[range]
        this.setOutValue(value);
    }
    controlEnd(e: any){
        e.preventDefault();
        // удаляем обработчики
        this.view.$range.off(this.moveEvent, this.controlMove);
        this.view.$range.off(this.endEvent, this.controlEnd);
        this.view.$controlObject.active=false;        
        this.view.$controlObject2.active=false;        
        this.view.$range.removeClass('rSlider1410--active');
    }
    setOutValue(value: number){
        // вызовем событие инпут c источником this.view.identifier
        this.view.element
            .val(value)
            .trigger('input', { origin: this.view.identifier });
    }
}
export {rsController};