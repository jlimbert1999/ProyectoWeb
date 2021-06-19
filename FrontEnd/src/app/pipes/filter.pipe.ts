import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any):any{
    if(arg ==='' || arg.length<3)return value;
    const resultadoPots=[];
    for(const post of value){
      if(post.origen.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultadoPots.push(post);
      }else if(arg ==='todos'){
        return value;
      };
    };
    return resultadoPots;
  }
}
