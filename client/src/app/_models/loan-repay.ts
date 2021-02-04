export class LoanRepay {
    loan_repayment_id: number;
    loan_id_fk: number;
    savings_id_fk: number;
    principal_amount: number;
    interest: number;
    default_amount: number;
    default: number;
    date_of_payment: Date
    _total_bf: number;
}
