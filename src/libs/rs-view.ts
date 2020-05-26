//mport * as $ from 'jquery';
//const isBrowser = document.location.href !== 'about:blank';

const isBrowser = document.location !== undefined;
const $ = isBrowser ? require('jquery'): require('jquery')(window);

class rsFill{
    $fill: JQuery<HTMLElement>;
    private _height: number;
    private _width: number;
    constructor(fillClass: string){
        this.$fill = $('<div class="' + fillClass + '" />');
    }
    public get height(): number {
        let str: string = this.$fill.parent().css('height');
        return parseFloat(str.substr(0,str.length-2));
    }
    public set height(val: number) {
        this._height = val;
    }
    public get width(): number {
        let str: string = this.$fill.parent().css('width');
        return parseFloat(str.substr(0,str.length-2));
    }
    public set width(val: number) {
        this._width = val;
    }
    //если два бегунка, устанавливает размер филла
    setPosition2(pos1: number, pos2: number, vertical: boolean){
        if(vertical){
            this.$fill[0].style['bottom'] = (pos1) + 'px';
            this.$fill[0].style['height'] = (pos2-pos1) + 'px';
        }else{
            this.$fill[0].style['left'] = (pos1) + 'px';
            this.$fill[0].style['width'] = (pos2-pos1) + 'px';
        }
    }
    //если бегунок один, устанавливает размер филла
    setPosition(pos: number, vertical: boolean){
        if(vertical){
            this.$fill[0].style['height'] = (pos) + 'px';
        }else{
            this.$fill[0].style['width'] = (pos) + 'px';
        }
    }
}
class rsControl{
    left: number = undefined;
    bottom: number = undefined;
    led: boolean;
    vertical: boolean;
    $control: JQuery<HTMLElement>;
    active: boolean=false;
    constructor(controlClass: string, led: boolean, vertical: boolean){
        this.vertical = vertical;
        this.led = led;
        if(led)
            this.$control = $('<div class="' + controlClass + '" ><input type="text"></div>');
        else
            this.$control = $('<div class="' + controlClass + '" >');
    }
    getPosition(): number{
        if(this.vertical)  
            return this.bottom 
        else
            return this.left;
    };
    setPosition(pos: number, vertical: boolean): void {
        if(vertical){
            this.$control[0].style['bottom'] = (pos) + 'px';
            this.bottom = pos;
        }else{
            this.$control[0].style['left'] = (pos) + 'px';
            this.left = pos;
            //console.log(this.left);
        }        
    }
}
//const constants: {[index: string]:any} = {};   
class rsView{
    $window: JQuery<Window>;
    rootObject: JQuery<HTMLElement>;
    $range: JQuery<HTMLElement>;
    $fillObject: rsFill;
    $fill: JQuery<HTMLElement>;
    $controlObject: rsControl;
    $controlObject2: rsControl;
    $control: JQuery<HTMLElement>;
    $control2: JQuery<HTMLElement>;
    $document: JQuery<HTMLDocument>;
    rangeClass: string='rSlider1410';
    fillClass: string  = 'rSlider1410__fill';
    handleClass: string = 'rSlider1410__control';
    handleClass2: string = 'rSlider1410__control2';
    vertical: boolean = false;
    grabPos: number;
    identifier: string;
    element: JQuery<HTMLElement>;
    two: boolean;
    constructor($two: boolean, $vertical: boolean, $id: number, $element: JQuery<any>, rootObject: JQuery<HTMLElement>){
        this.identifier = 'mySlider-'+$id; // id слайдера
        this.element = $element; //input[range]
        this.$window  = $(window);
        this.$document  = $(document);
        this.rootObject = rootObject; //элемент, в который вставляются слайдеры
        this.$fillObject = new rsFill(this.fillClass); //объект заполнителя
        this.$fill      = this.$fillObject.$fill;
        this.$controlObject = new rsControl(this.handleClass, true, $vertical); //1 бегунок
        this.$controlObject2 = new rsControl(this.handleClass2, true, $vertical);//2 бегунок
        this.$control   = this.$controlObject.$control;
        this.$control2   = this.$controlObject2.$control;
        this.two = $two;
        if(!$two){
            this.$control2.css("display","none");
        }
        if($vertical) {
            this.vertical = true;
            // HTML элемент слайдера с 2-мя бегунками
            this.$range = $('<div class="' + this.rangeClass + ' '+this.rangeClass+'-vertical'+'" id="' + this.identifier + '" />').insertAfter(this.element).prepend(this.$fill, this.$control, this.$control2).appendTo(this.rootObject);
            this.grabPos = this.$control[0]['offsetHeight'];
        }else{
            this.$range = $('<div class="' + this.rangeClass + ' '+this.rangeClass+'-horizontal'+'" id="' + this.identifier + '" />').insertAfter(this.element).prepend(this.$fill, this.$control, this.$control2).appendTo(this.rootObject);
            this.grabPos = this.$control[0]['offsetWidth'];
        }
    };
    // устанавливает позицию бегунка
    setPositionView(pos: number){
        if(this.$controlObject.active){
            this.$controlObject.setPosition(pos, this.vertical);
            (!this.two) ? this.$fillObject.setPosition(pos+this.grabPos/2, this.vertical): 
                this.$fillObject.setPosition2(this.$controlObject.getPosition(), this.$controlObject2.getPosition()+this.grabPos/2, this.vertical);
        }else{
            this.$controlObject2.setPosition(pos, this.vertical);
            (this.two) ? this.$fillObject.setPosition2(this.$controlObject.getPosition(), this.$controlObject2.getPosition()+this.grabPos/2, this.vertical): null;
        }
    }
    //возвращает координаты мыши
    getPositionView(e: any){
        let pageCoordinate:number = 0;
        let rangePos: number;
        if(this.vertical){
            rangePos = this.$range[0].getBoundingClientRect()['bottom'];
            pageCoordinate = e.originalEvent['clientY'];
            return rangePos - pageCoordinate;
        }else{
            rangePos = this.$range[0].getBoundingClientRect()['left'];
            pageCoordinate = e.originalEvent['clientX'];
            return pageCoordinate - rangePos;
        }
    }
    setActiveControl(num: number){
        if(num>2 || num<1) return;
        if(num===1){
            this.$controlObject.active=true;
            this.$controlObject2.active=false;
            this.$control.css('z-index', 100);
            this.$control2.css('z-index', 1);
        }else{
            this.$controlObject2.active=true;
            this.$controlObject.active=false;
            this.$control.css('z-index', 1);
            this.$control2.css('z-index', 100);
        }
    }
    setOutValue(value: number){
        // вызовем событие инпут c источником this.view.identifier
        this.element
            .val(value)
            .trigger('input', { origin: this.identifier });
    }


};
export {rsView};