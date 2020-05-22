class rsModel{
    min: number;
    max: number;
    value: number;
    step: number;
    //private _element: JQuery<HTMLElement>;
    constructor($element: JQuery<any>) {
        //this._element = $element;
        this.min    = this.tryParseFloat($element[0].getAttribute('min'), 0);
        this.max    = this.tryParseFloat($element[0].getAttribute('max'), 100);
        this.value  = this.tryParseFloat($element[0].getAttribute('value'), Math.round(this.min + (this.max-this.min)/2));
        this.step   = this.tryParseFloat($element[0].getAttribute('step'), 1);
        //console.log(this.step+' '+this.value);

    };
    /*public get element(): JQuery<HTMLElement> {
        return this._element;
    }
    public set element(val: JQuery<HTMLElement>) {
        this._element = val;
    }*/
    tryParseFloat(str: string, defaultValue: number) {
        var value = parseFloat(str);
        return Number.isNaN(value) ? defaultValue : value;
    }
};
export {rsModel};