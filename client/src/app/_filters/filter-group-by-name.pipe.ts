import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterGroupByName'
})
export class FilterGroupByNamePipe implements PipeTransform {

  transform(groups: any, term2: any): any {
    //check if search term is undefined
     if (term2 === undefined) return groups;
    // return updated branches array
    return groups.filter(function(group){
      return group.group_name.toLowerCase().includes(term2.toLowerCase());
    })

    }

}
