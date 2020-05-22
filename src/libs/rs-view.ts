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
    setPosition(pos: number, vertical: boolean){
        if(vertical){
            this.$fill[0].style['height'] = (pos) + 'px';
        }else{
            this.$fill[0].style['width'] = (pos) + 'px';
        }
    }
}
class rsControl{
    private _offset: number;
    led: boolean;
    vertical: boolean;
    $control: JQuery<HTMLElement>;
    constructor(handleClass: string, led: boolean, vertical: boolean){
        this.vertical = vertical;
        this.led = led;
        if(led)
            this.$control = $('<div class="' + handleClass + '" ><input type="text"></div>');
        else
            this.$control = $('<div class="' + handleClass + '" >');
    }
    public set offset(val: number){
        this._offset = val;
    }
    public get offset(): number{
        if(this.vertical)
            return this.$control[0]['offsetHeight'];
        else
            return this.$control[0]['offsetWidth'];
    }
    setPosition(pos: number, vertical: boolean){
        if(vertical){
            this.$control[0].style['bottom'] = (pos) + 'px';
        }else{
            this.$control[0].style['left'] = (pos) + 'px';
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
    $control: JQuery<HTMLElement>;
    $document: JQuery<HTMLDocument>;
    rangeClass: string='rSlider1410';
    fillClass: string  = 'rSlider1410__fill';
    handleClass: string = 'rSlider1410__control';
    maxHandlePos: number; 
    vertical: boolean = false;
    grabPos: number;
    DIMENSION: any;
    DIRECTION: string;
    DIRECTION_STYLE: string;
    COORDINATE: string;
    identifier: string;
    element: JQuery<HTMLElement>;
    constructor($vertical: boolean, $id: number, $element: JQuery<any>, rootObject: JQuery<HTMLElement>){
        this.identifier = 'mySlider-'+$id;
        this.element = $element;
        this.$window  = $(window);
        this.$document  = $(document);
        this.rootObject = rootObject;
        this.$fillObject = new rsFill(this.fillClass);
        this.$fill      = this.$fillObject.$fill;
        this.$controlObject = new rsControl(this.handleClass, true, true);
        this.$control   = this.$controlObject.$control;
        //this.$range = $('<div class="' + this.rangeClass + ' '+this.rangeClass+'-'+ model.orientation+'" id="' + model.identifier + '" />').insertAfter(model.element).prepend(this.$fill, this.$control).appendTo(this.rootObject);
        if($vertical) {
            this.vertical = true;
            this.$range = $('<div class="' + this.rangeClass + ' '+this.rangeClass+'-vertical'+'" id="' + this.identifier + '" />').insertAfter(this.element).prepend(this.$fill, this.$control).appendTo(this.rootObject);
            this.grabPos = this.$controlObject.offset;
            this.maxHandlePos = this.$fillObject.height - this.grabPos;
        }else{
            this.$range = $('<div class="' + this.rangeClass + ' '+this.rangeClass+'-horizontal'+'" id="' + this.identifier + '" />').insertAfter(this.element).prepend(this.$fill, this.$control).appendTo(this.rootObject);
            this.grabPos = this.$controlObject.offset;
            this.maxHandlePos = this.$fillObject.width - this.grabPos;
        }
    };
    setPositionView(pos: number){
        this.$fillObject.setPosition(pos+this.grabPos/2, this.vertical);
        this.$controlObject.setPosition(pos, this.vertical)
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
//        console.log('pageCoordinate - '+pageCoordinate, 'rangePos - '+rangePos)
    }
};
export {rsView};