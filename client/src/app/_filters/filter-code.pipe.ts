import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCode'
})
export class FilterCodePipe implements PipeTransform {

  transform(branchs: any, termBcode: any): any {
    //check if search term is undefined
     if (termBcode === undefined) return branchs;
    // return updated branches array
    return branchs.filter(function(branch){
      return branch.branch_code.toLowerCase().includes(termBcode.toLowerCase());
    })

    }

}
