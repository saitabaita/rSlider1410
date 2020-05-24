class rsModel{
    min: number;
    max: number;
    value: number;
    value2: number;
    step: number;
    constructor($element: JQuery<any>, two: boolean) {
        this.min    = this.tryParseFloat($element[0].getAttribute('min'), 0);
        this.max    = this.tryParseFloat($element[0].getAttribute('max'), 100);
        if(two){
            this.value  = this.min + (this.max-this.min)/4;
            this.value2 = this.min + ((this.max-this.min)*3)/4;
        }else{
            this.value  = this.tryParseFloat($element[0].value, Math.round(this.min + (this.max-this.min)/2));
        }
        this.step   = this.tryParseFloat($element[0].getAttribute('step'), 1);
    };
    tryParseFloat(str: string, defaultValue: number) {
        var value = parseFloat(str);
        return Number.isNaN(value) ? defaultValue : value;
    }
};
export {rsModel};