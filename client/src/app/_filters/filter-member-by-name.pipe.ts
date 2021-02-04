import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMemberByName'
})
export class FilterMemberByNamePipe implements PipeTransform {

  transform(members: any,term_member_name: any): any {
   //check if search term is undefined
   if (term_member_name === undefined) return members;
   // return updated branches array
   return members.filter(function(member){
     return member.member_name.toLowerCase().includes(term_member_name.toLowerCase());
   })

   }

}