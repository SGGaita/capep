import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMemberByCode'
})
export class FilterMemberByCodePipe implements PipeTransform {

  transform(members: any,term_member_code: any): any {
    //check if search term is undefined
    if (term_member_code === undefined) return members;
    // return updated branches array
    return members.filter(function(member){
      return member.membership_no.toLowerCase().includes(term_member_code.toLowerCase());
    })
 
    }
 
 }
