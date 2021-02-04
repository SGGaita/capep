import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterGroupByCode'
})
export class FilterGroupByCodePipe implements PipeTransform {

  transform(groups: any, term3: any): any {
    //check if search term is undefined
     if (term3 === undefined) return groups;
    // return updated branches array
    return groups.filter(function(group){
      return group.group_code.toLowerCase().includes(term3.toLowerCase());
    })

    }

}


