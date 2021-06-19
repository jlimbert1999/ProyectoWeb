import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterdestinos'
})
export class FilterdestinosPipe implements PipeTransform {

  transform(value: any, arg: any):any{
    if(arg ==='' || arg.length<3)
    return value;
    const resultadoPots=[];
    for(const post of value){
      if(post.origen.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultadoPots.push(post);
      };
    };
    return resultadoPots;
  }

}

