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
    setPosition2(pos1: number, pos2: number, vertical: boolean){
        if(vertical){
            this.$fill[0].style['bottom'] = (pos1) + 'px';
            this.$fill[0].style['height'] = (pos2-pos1) + 'px';
        }else{
            this.$fill[0].style['left'] = (pos1) + 'px';
            this.$fill[0].style['width'] = (pos2-pos1) + 'px';
        }
    }
    setPosition(pos: number, vertical: boolean){
        if(vertical){
            this.$fill[0].style['height'] = (pos) + 'px';
        }else{
            this.$fill[0].style['width'] = (pos) + 'px';
        }
    }
}
class rsControl{
    left: number;
    bottom: number;
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
    getPosition(){
        if(this.vertical)  
            return this.bottom 
        else
            return this.left;
    };
    setPosition(pos: number, vertical: boolean){
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
    DIMENSION: any;
    DIRECTION: string;
    DIRECTION_STYLE: string;
    COORDINATE: string;
    identifier: string;
    element: JQuery<HTMLElement>;
    two: boolean;
    constructor($two: boolean, $vertical: boolean, $id: number, $element: JQuery<any>, rootObject: JQuery<HTMLElement>){
        this.identifier = 'mySlider-'+$id;
        //input[range]
        this.element = $element;
        this.$window  = $(window);
        this.$document  = $(document);
        this.rootObject = rootObject;
        this.$fillObject = new rsFill(this.fillClass);
        this.$fill      = this.$fillObject.$fill;
        this.$controlObject = new rsControl(this.handleClass, true, $vertical);
        this.$controlObject2 = new rsControl(this.handleClass2, true, $vertical);
        this.$control   = this.$controlObject.$control;
        this.$control2   = this.$controlObject2.$control;
        this.two = $two;
        if(!$two){
            this.$control2.css("display","none");
        }

        if($vertical) {
            this.vertical = true;
            this.$range = $('<div class="' + this.rangeClass + ' '+this.rangeClass+'-vertical'+'" id="' + this.identifier + '" />').insertAfter(this.element).prepend(this.$fill, this.$control, this.$control2).appendTo(this.rootObject);
            this.grabPos = this.$control[0]['offsetHeight'];
        }else{
            this.$range = $('<div class="' + this.rangeClass + ' '+this.rangeClass+'-horizontal'+'" id="' + this.identifier + '" />').insertAfter(this.element).prepend(this.$fill, this.$control, this.$control2).appendTo(this.rootObject);
            this.grabPos = this.$control[0]['offsetWidth'];
        }
    };
    setPositionView(pos: number){
        if(this.$controlObject.active){
            this.$controlObject.setPosition(pos, this.vertical);
            (!this.two) ? this.$fillObject.setPosition(pos+this.grabPos/2, this.vertical): 
                this.$fillObject.setPosition2(this.$controlObject.getPosition(), this.$controlObject2.getPosition()+this.grabPos/2, this.vertical);
        }else{
            this.$controlObject2.setPosition(pos, this.vertical);
            //console.log(this.$controlObject2.getPosition());
            (this.two) ? this.$fillObject.setPosition2(this.$controlObject.getPosition(), this.$controlObject2.getPosition()+this.grabPos/2, this.vertical): null;
        }
    }
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
};
export {rsView};