import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'Timepipe' })
export class Timepipe implements PipeTransform {

    transform(date: any): string {
        const myArray = date.split(':');
        var hours: any = myArray[0];
        var minutes: any = myArray[1];
        var tformate = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + tformate;
        return strTime;
    }
}