export class Loan {
  _savings_total: any;
  total_savings: number;
  type_name: any;
  group_id: any;
  map(arg0: (a: any) => any): any {
    throw new Error("Method not implemented.");
  }
  loan_id: number;

  loan_type_id_fk: number;
  member_id_fk: number;
  loan_amount: number;
  loan_fee: number;
  loan_amount_approved: number;
  loan_purpose: string;
  guarantorsName: string;
  loan_status: number
  overide_status: number;
  overide_comments: string;
  comments: string;
  start_date: Date;
  end_date: Date;
  action_date: Date;
  repayment_status: number;
  loan_bf: number;
  insurance_amount:number;
  default: number;
  default_amount: number



}
