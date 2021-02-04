import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ReportsComponent } from './reports/reports.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BranchComponent } from './branch/branch.component';
import { BranchcreateComponent } from './branchcreate/branchcreate.component';
import { BranchlistComponent } from './branchlist/branchlist.component';
import { BranchdetailsComponent } from './branchdetails/branchdetails.component';
import { BrancheditComponent } from './branchedit/branchedit.component';
import { GroupComponent } from './group/group.component';
import { GroupcreateComponent } from './groupcreate/groupcreate.component';
import { GrouplistComponent } from './grouplist/grouplist.component';
import { GroupupdateComponent } from './groupupdate/groupupdate.component';
import { MembercreateComponent } from './membercreate/membercreate.component';
import { MemberlistComponent } from './memberlist/memberlist.component';
import { MemberdetailsComponent } from './memberdetails/memberdetails.component';
import { MemberupdateComponent } from './memberupdate/memberupdate.component';
import { UserComponent } from './user/user.component';
import { UsercreateComponent } from './usercreate/usercreate.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UserupdateComponent } from './userupdate/userupdate.component';
import { LoansmanagerComponent } from './loansmanager/loansmanager.component';
import { LoansappliedComponent } from './loansapplied/loansapplied.component';

import { SavingsComponent } from './savings/savings.component';
import { SavingscreateComponent } from './savingscreate/savingscreate.component';
import { LoanapplicationComponent } from './loanapplication/loanapplication.component';
import { MembersComponent } from './members/members.component';
import { LoanRepaylistComponent } from './loan-repaylist/loan-repaylist.component';
import { StafflistComponent } from './stafflist/stafflist.component';
import { LoanParametersComponent } from './loan-parameters/loan-parameters.component';
import { StaffmanagerComponent } from './staffmanager/staffmanager.component';
import { LoansComponent } from './loans/loans.component';
import { MemberGroupsComponent } from './member-groups/member-groups.component';
import { SavingsGroupsComponent } from './savings-groups/savings-groups.component';
import { SavingsMembersListComponent } from './savings-members-list/savings-members-list.component';
import { DividendGroupsComponent } from './dividend-groups/dividend-groups.component';
import { DividendMembersListComponent } from './dividend-members-list/dividend-members-list.component';
import { LoanGroupsComponent } from './loan-groups/loan-groups.component';
import { LoansMembersListComponent } from './loans-members-list/loans-members-list.component';
import { DividendComponent } from './dividend/dividend.component';
import { DividendCreateComponent } from './dividend-create/dividend-create.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { StaffcreateComponent } from './staffcreate/staffcreate.component';
import { StaffupdateComponent } from './staffupdate/staffupdate.component';
import { LoanRepaycreateComponent } from './loan-repaycreate/loan-repaycreate.component';
import { LoanRatecreateComponent } from './loan-ratecreate/loan-ratecreate.component';
import { MembershipManagerComponent } from './membership-manager/membership-manager.component';
import { BranchReportComponent } from './branch-report/branch-report.component';
import { GroupReportComponent } from './group-report/group-report.component';
import { GroupManagerComponent } from './group-manager/group-manager.component';
import { LoanrepayComponent } from './loanrepay/loanrepay.component';
import { SysManagerComponent } from './sys-manager/sys-manager.component';
import { MemberReportComponent } from './member-report/member-report.component';
import { LoanReviewComponent } from './loan-review/loan-review.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { SavingsDetailsComponent } from './savings-details/savings-details.component';
import { BranchReportDetsComponent } from './reports/branch-report-dets/branch-report-dets.component';
import { GroupReportDetsComponent } from './reports/group-report-dets/group-report-dets.component';
import { MemberReportDetsComponent } from './member-report-dets/member-report-dets.component';
import { RecordsBfComponent } from './records-bf/records-bf.component';
import { RecordsComponent } from './records/records.component';
import { BranchNewLoansComponent } from './branch-new-loans/branch-new-loans.component';
import { BranchAcceptedLoansComponent } from './branch-accepted-loans/branch-accepted-loans.component';
import { BranchDeclinedLoansComponent } from './branch-declined-loans/branch-declined-loans.component';
import { BranchDefaultedLoansComponent } from './branch-defaulted-loans/branch-defaulted-loans.component';
import { BranchLoansComponent } from './branch-loans/branch-loans.component';
import { GroupLoansComponent } from './group-loans/group-loans.component';
import { MemberLoansComponent } from './member-loans/member-loans.component';
import { GroupDeclinedLoansComponent } from './group-declined-loans/group-declined-loans.component';
import { GroupDefaultedLoansComponent } from './group-defaulted-loans/group-defaulted-loans.component';
import { GroupNewLoansComponent } from './group-new-loans/group-new-loans.component';
import { GroupAcceptedLoansComponent } from './group-accepted-loans/group-accepted-loans.component';
import { LoanUpdateComponent } from './loan-update/loan-update.component';
import { UploadComponent } from './upload/upload.component';
import { RecordsBfUpdateComponent } from './records-bf-update/records-bf-update.component';
import { DividendUpdateComponent } from './dividend-update/dividend-update.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'upload', component: UploadComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'branch', component: BranchComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'create', component: BranchcreateComponent, canActivate: [AuthGuard] },
      { path: 'list', component: BranchlistComponent, canActivate: [AuthGuard] },
      { path: 'list/:id', component: BranchdetailsComponent, canActivate: [AuthGuard] },
      { path: 'edit/:id', component: BrancheditComponent, canActivate: [AuthGuard] }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'group', component: GroupComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'create', component: GroupcreateComponent, canActivate: [AuthGuard] },
      { path: 'list', component: GrouplistComponent, canActivate: [AuthGuard] },
      { path: 'edit/:id', component: GroupupdateComponent, canActivate: [AuthGuard] },
      { path: 'mlist/:id', component: MemberlistComponent, canActivate: [AuthGuard] },
      { path: 'mgroups', component: MemberGroupsComponent, canActivate: [AuthGuard] },
      { path: 'sgroups', component: SavingsGroupsComponent, canActivate: [AuthGuard] },
      { path: 'slist/:id', component: SavingsMembersListComponent, canActivate: [AuthGuard] },
      { path: 'lgroups', component: LoanGroupsComponent, canActivate: [AuthGuard] },
      { path: 'llist/:id', component: LoansMembersListComponent, canActivate: [AuthGuard] },
      { path: 'dgroups', component: DividendGroupsComponent, canActivate: [AuthGuard] },
      { path: 'dlist/:id', component: DividendMembersListComponent, canActivate: [AuthGuard] },
      {
        path: 'member', component: MembersComponent,
        children: [
          {
            path: ':id', component: MemberdetailsComponent
          },
          { path: 'edit/:id', component: MemberupdateComponent },
          { path: 'savings-update/:id', component: SavingsDetailsComponent },
          { path: 'savings_bf_update/:id', component: RecordsBfUpdateComponent },
          { path: 'loan-details/:id', component: LoanDetailsComponent },
          { path: 'loan-edit/:id', component: LoanUpdateComponent },
          {path: 'dividend-update/:id', component: DividendUpdateComponent}
        ], canActivate: [AuthGuard]
      },
      {
        path: 'members', component: MembersComponent,
        children: [
          { path: 'create', component: MembercreateComponent, canActivate: [AuthGuard] }
        ]
      },
      {
        path: 'savings', component: SavingsComponent,
        children: [
          { path: 'create/:id', component: SavingscreateComponent, canActivate: [AuthGuard] }
        ], canActivate: [AuthGuard]
      },
      //end savings
      //begin loans
      {
        path: 'loans', component: LoansComponent,
        children: [
          { path: 'create/:id', component: LoanapplicationComponent },
        ], canActivate: [AuthGuard]
      },
      //begin dividends
      {
        path: 'dividend', component: DividendComponent,
        children: [
          { path: 'create/:id', component: DividendCreateComponent }
        ], canActivate: [AuthGuard]
      },
      //begin dividends
      {
        path: 'records', component: RecordsComponent,
        children: [
          { path: 'create/:id', component: RecordsBfComponent },
          { path: 'update/:id', component: RecordsBfUpdateComponent }
        ], canActivate: [AuthGuard]
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'members', component: MembersComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: MemberlistComponent },
      { path: 'list/:id', component: MemberdetailsComponent },
      { path: 'edit/:id', component: MemberupdateComponent },
      { path: 'finance', component: SavingsComponent },
      { path: 'savings/:id', component: SavingscreateComponent },
      { path: 'loans', component: LoansComponent },
      { path: 'loan/:id', component: LoanapplicationComponent },
      { path: 'records-bf/:id', component: RecordsBfComponent },
      { path: 'records-bf-edit/:id', component: RecordsBfUpdateComponent }
    ], canActivate: [AuthGuard]
  },
  {
    path: 'reports', component: ReportsComponent,
    children: [
      {
        path: 'branch-report', component: BranchReportComponent,
        children: [{
          path: ':id', component: BranchReportDetsComponent
        }]
      },
      {
        path: 'group-report', component: GroupReportComponent,
        children: [{
          path: ':id', component: GroupReportDetsComponent
        }]
      },
      {
        path: 'member-report', component: MemberReportComponent,
        children: [{
          path: ':id', component: MemberReportDetsComponent
        }]
      },
    ], canActivate: [AuthGuard]
  },
  //admin section
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdmindashboardComponent, canActivate: [AuthGuard] },
      {
        path: 'staff', component: StaffmanagerComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: StafflistComponent, canActivate: [AuthGuard] },
        ], canActivate: [AuthGuard]
      },
      {
        path: 'accounts', component: UserComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: UserlistComponent, canActivate: [AuthGuard] },
          { path: 'create', component: UsercreateComponent, canActivate: [AuthGuard] },
          { path: 'edit/:id', component: UserupdateComponent, canActivate: [AuthGuard] },
        ], canActivate: [AuthGuard]
      },
      {
        path: 'staff', component: StaffmanagerComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: StafflistComponent, canActivate: [AuthGuard] },
          { path: 'create', component: StaffcreateComponent, canActivate: [AuthGuard] },
          { path: 'edit/:id', component: StaffupdateComponent, canActivate: [AuthGuard] }
        ],
        canActivate: [AuthGuard]
      },
      {
        path: 'loans', component: LoansmanagerComponent,
        children: [
          { path: '', redirectTo: 'branches', pathMatch: 'full' },
          { path: 'branches', component: LoansappliedComponent },
          {
            path: 'branch', component: BranchLoansComponent,
            children: [
              { path: 'new/:id', component: BranchNewLoansComponent },
              { path: 'accepted/:id', component: BranchAcceptedLoansComponent },
              { path: 'declined/:id', component: BranchDeclinedLoansComponent },
              { path: 'defaulted/:id', component: BranchDefaultedLoansComponent }
            ], canActivate: [AuthGuard]
          },
          { path: ':id', component: LoanReviewComponent },
          {
            path: 'group', component: GroupLoansComponent,
            children: [
              { path: 'new/:id', component: GroupNewLoansComponent },
              { path: 'accepted/:id', component: GroupAcceptedLoansComponent },
              { path: 'declined/:id', component: GroupDeclinedLoansComponent },
              { path: 'defaulted/:id', component: GroupDefaultedLoansComponent }
            ], canActivate: [AuthGuard]
          },
          {
            path: 'members', component: MemberLoansComponent,
            children: [
              { path: 'new/:id', component: BranchNewLoansComponent },
              { path: 'accepted/:id', component: BranchAcceptedLoansComponent },
              { path: 'declined/:id', component: BranchDeclinedLoansComponent },
              { path: 'defaulted/:id', component: BranchDefaultedLoansComponent }
            ], canActivate: [AuthGuard]
          },
          //{path: 'declined/:id', component: LoanDeclineReasonComponent}
        ], canActivate: [AuthGuard]
      },
      {
        path: 'loan-parameters', component: LoanParametersComponent,
        children: [
          {
            path: 'repay-terms', component: LoanrepayComponent,
            children: [
              { path: '', redirectTo: 'list', pathMatch: 'full' },
              { path: 'list', component: LoanRepaylistComponent, canActivate: [AuthGuard] },
              { path: 'create', component: LoanRepaycreateComponent, canActivate: [AuthGuard] },
            ], canActivate: [AuthGuard]
          },
          {
            path: 'loan-rates', component: LoanRatecreateComponent, canActivate: [AuthGuard]
          },
        ]
      },
      {
        path: 'system-manager', component: SysManagerComponent,
        children: [
          {
            path: 'branch', component: BranchComponent,
            children: [
              { path: '', redirectTo: 'list', pathMatch: 'full' },
              { path: 'create', component: BranchcreateComponent, canActivate: [AuthGuard] },
              { path: 'list', component: BranchlistComponent, canActivate: [AuthGuard] },
              { path: 'list/:id', component: BranchdetailsComponent, canActivate: [AuthGuard] },
              { path: 'edit/:id', component: BrancheditComponent, canActivate: [AuthGuard] }
            ],
            canActivate: [AuthGuard]
          },
          { path: 'group-manager', component: GroupManagerComponent, canActivate: [AuthGuard] },
          { path: 'membership-manager', component: MembershipManagerComponent, canActivate: [AuthGuard] }
        ],
        canActivate: [AuthGuard]
      },
      {
        path: 'reports', component: ReportsComponent,
        children: [
          { path: 'branch', component: BranchReportComponent, canActivate: [AuthGuard] },
          { path: 'group', component: GroupReportComponent, canActivate: [AuthGuard] },
          { path: 'member', component: MemberReportComponent, canActivate: [AuthGuard] }
        ], canActivate: [AuthGuard]
      }
    ], canActivate: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
