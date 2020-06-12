interface IModel{
    min:    number;
    max:    number;
    value:  number;
    value2: number;
    step:   number;
}
export default class rsModel implements IModel {
    min: number;
    max: number;
    value: number = 0;
    value2: number = 0;
    step: number;
    constructor($element: JQuery<HTMLElement>, two: boolean) {
        //$element - <input type='range'
        this.min    = this.tryParseFloat($element[0].getAttribute('min'), 0);
        this.max    = this.tryParseFloat($element[0].getAttribute('max'), 100);
        if(two){
            this.value  = this.min + (this.max-this.min)/4;
            this.value2 = this.min + ((this.max-this.min)*3)/4;
        }else{
            this.value  = this.tryParseFloat($element[0].nodeValue, Math.round(this.min + (this.max-this.min)/2));
        }
        this.step   = this.tryParseFloat($element[0].getAttribute('step'), 1);
    };
    tryParseFloat(str: string, defaultValue: number) {
        var value = parseFloat(str);
        return Number.isNaN(value) ? defaultValue : value;
    }
}
