export class Group {
  map(arg0: (a: any) => any): string {
    throw new Error("Method not implemented.");
  }
  
    group_id: number;
    group_name: string;
    group_code: string;
    group_location: string;
    group_town: string;
    group_created_at: Date;
    branch_id_fk: number;
    user_id_fk: number;
    branch_name: string;
    branch_code: string;
}
