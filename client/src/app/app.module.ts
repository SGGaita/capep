import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DropdownModule } from 'angular-dropdown-component';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import {NgxPrintModule} from 'ngx-print';
import  {ChartsModule} from 'ng2-charts';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from "ngx-spinner";
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSidenavModule, MatToolbarModule, MatDividerModule, MatIconModule, MatMenuModule, MatListModule} from '@angular/material';


//import components
import { BranchcreateComponent } from './branchcreate/branchcreate.component';
import { LoginComponent } from './login/login.component';
import { GroupcreateComponent } from './groupcreate/groupcreate.component';
import { MembersComponent } from './members/members.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoansComponent } from './loans/loans.component';
import { ReportsComponent } from './reports/reports.component';
import { BranchdetailsComponent } from './branchdetails/branchdetails.component';
import { BranchlistComponent } from './branchlist/branchlist.component';
import { BranchComponent } from './branch/branch.component';
import { GroupComponent } from './group/group.component';
import { GroupdetailsComponent } from './groupdetails/groupdetails.component';
import { GrouplistComponent } from './grouplist/grouplist.component';
import { FilterCodePipe } from './_filters/filter-code.pipe';
import { UserComponent } from './user/user.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UsercreateComponent } from './usercreate/usercreate.component';
import { UserupdateComponent } from './userupdate/userupdate.component';
import { MembercreateComponent } from './membercreate/membercreate.component';
import { DashboardComponent } from './dashboard/dashboard.component';


//import services
import { AuthenticationService } from './auth/authentication.service'
import { AuthGuard } from './auth/auth.guard';
import { HeaderComponent } from './header/header.component';
import { MemberlistComponent } from './memberlist/memberlist.component';
import { MemberdetailsComponent } from './memberdetails/memberdetails.component';
import { MemberupdateComponent } from './memberupdate/memberupdate.component';
import { SavingsComponent } from './savings/savings.component';
import { FilterGroupByNamePipe } from './_filters/filter-group-by-name.pipe';
import { FilterMemberByNamePipe } from './_filters/filter-member-by-name.pipe';
import { FilterMemberByCodePipe } from './_filters/filter-member-by-code.pipe';
import { FilterGroupByCodePipe } from './_filters/filter-group--by-code.pipe'
import { GroupService } from './_services/group.service';
import { BrancheditComponent } from './branchedit/branchedit.component';
import { GroupupdateComponent } from './groupupdate/groupupdate.component';
import { SavingscreateComponent } from './savingscreate/savingscreate.component';
import { LoanapplicationComponent } from './loanapplication/loanapplication.component';
import { AdminComponent } from './admin/admin.component';
import { LoansmanagerComponent } from './loansmanager/loansmanager.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { LoanTypesComponent } from './loan-types/loan-types.component';
import { LoanRepayPeriodComponent } from './loan-repay-period/loan-repay-period.component';
import { LoansappliedComponent } from './loansapplied/loansapplied.component';
import { LoanRepaylistComponent } from './loan-repaylist/loan-repaylist.component';
import { LoanRateslistComponent } from './loan-rateslist/loan-rateslist.component';
import { StafflistComponent } from './stafflist/stafflist.component';
import { StaffcreateComponent } from './staffcreate/staffcreate.component';
import { StaffupdateComponent } from './staffupdate/staffupdate.component';
import { LoanRepaycreateComponent } from './loan-repaycreate/loan-repaycreate.component';
import { LoanRepayupdateComponent } from './loan-repayupdate/loan-repayupdate.component';
import { LoanRatecreateComponent } from './loan-ratecreate/loan-ratecreate.component';
import { LoanRateupdateComponent } from './loan-rateupdate/loan-rateupdate.component';
import { LoanParametersComponent } from './loan-parameters/loan-parameters.component';
import { StaffmanagerComponent } from './staffmanager/staffmanager.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TopnavComponent } from './topnav/topnav.component';
import { FilterByBnamePipe } from './_filters/filter-by-bname.pipe';
import { MemberGroupsComponent } from './member-groups/member-groups.component';
import { SavingsGroupsComponent } from './savings-groups/savings-groups.component';
import { SavingsMembersListComponent } from './savings-members-list/savings-members-list.component';
import { DividendGroupsComponent } from './dividend-groups/dividend-groups.component';
import { DividendMembersListComponent } from './dividend-members-list/dividend-members-list.component';
import { LoanGroupsComponent } from './loan-groups/loan-groups.component';
import { LoansMembersListComponent } from './loans-members-list/loans-members-list.component';
import { OrderByPipe } from './_filters/order-by.pipe';
import { DividendComponent } from './dividend/dividend.component';
import { DividendCreateComponent } from './dividend-create/dividend-create.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { GroupReportComponent } from './group-report/group-report.component';
import { BranchReportComponent } from './branch-report/branch-report.component';
import { MembershipManagerComponent } from './membership-manager/membership-manager.component';
import { GroupManagerComponent } from './group-manager/group-manager.component';
import { LogComponent } from './log/log.component';
import { LoanrepayComponent } from './loanrepay/loanrepay.component';
import { SysManagerComponent } from './sys-manager/sys-manager.component';
import { MemberReportComponent } from './member-report/member-report.component';
import { LoanReviewComponent } from './loan-review/loan-review.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { SavingsDetailsComponent } from './savings-details/savings-details.component';
import { PrintTemplateComponent } from './print-template/print-template.component';
import { GroupReportsComponent } from './group-reports/group-reports.component';
import { BranchReportDetsComponent } from './reports/branch-report-dets/branch-report-dets.component';
import { GroupReportDetsComponent } from './reports/group-report-dets/group-report-dets.component';
import { MemberReportDetsComponent } from './member-report-dets/member-report-dets.component';
import { RecordsBfComponent } from './records-bf/records-bf.component';
import { RecordsComponent } from './records/records.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { LoanUpdateComponent } from './loan-update/loan-update.component';
import { BranchNewLoansComponent } from './branch-new-loans/branch-new-loans.component';
import { BranchAcceptedLoansComponent } from './branch-accepted-loans/branch-accepted-loans.component';
import { BranchDeclinedLoansComponent } from './branch-declined-loans/branch-declined-loans.component';
import { BranchDefaultedLoansComponent } from './branch-defaulted-loans/branch-defaulted-loans.component';
import { BranchLoansComponent } from './branch-loans/branch-loans.component';
import { GroupLoansComponent } from './group-loans/group-loans.component';
import { MemberLoansComponent } from './member-loans/member-loans.component';
import { GroupDefaultedLoansComponent } from './group-defaulted-loans/group-defaulted-loans.component';
import { GroupDeclinedLoansComponent } from './group-declined-loans/group-declined-loans.component';
import { GroupAcceptedLoansComponent } from './group-accepted-loans/group-accepted-loans.component';
import { GroupNewLoansComponent } from './group-new-loans/group-new-loans.component';
import { UploadComponent } from './upload/upload.component';
import { RecordsBfUpdateComponent } from './records-bf-update/records-bf-update.component';
import { LogoutModalComponent } from './sidenav/_modals/logout-modal/logout-modal.component';
import { DividendUpdateComponent } from './dividend-update/dividend-update.component';
import { AdminCreateHeaderComponent } from './admin-create-header/admin-create-header.component';
import { FooterComponent } from './footer/footer.component';
//import { jwtInterceptProviders } from './_http-interceptors';



@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    BranchComponent,
    BranchcreateComponent,
    LoginComponent,
    GroupcreateComponent,
    MembersComponent,
    PageNotFoundComponent,
    LoansComponent,
    ReportsComponent,
    BranchdetailsComponent,
    BranchlistComponent,
    GroupComponent,
    GroupdetailsComponent,
    GrouplistComponent,
    FilterCodePipe,
    UserComponent,
    UserlistComponent,
    UsercreateComponent,
    UserupdateComponent,
    MembercreateComponent,
    DashboardComponent,
    HeaderComponent,
    MemberlistComponent,
    MemberdetailsComponent,
    MemberupdateComponent,
    SavingsComponent,
    FilterGroupByNamePipe,
    FilterMemberByNamePipe,
    FilterMemberByCodePipe,
    FilterGroupByCodePipe,
    BrancheditComponent,
    GroupupdateComponent,
    SavingscreateComponent,
    LoanapplicationComponent,
    AdminComponent,
    LoansmanagerComponent,
    UserdetailsComponent,
    LoanTypesComponent,
    LoanRepayPeriodComponent,
    LoansappliedComponent,
    LoanRepaylistComponent,
    LoanRateslistComponent,
    StafflistComponent,
    StaffcreateComponent,
    StaffupdateComponent,
    LoanRepaycreateComponent,
    LoanRepayupdateComponent,
    LoanRatecreateComponent,
    LoanRateupdateComponent,
    LoanParametersComponent,
    StaffmanagerComponent,
    SidenavComponent,
    TopnavComponent,
    FilterByBnamePipe,
    MemberGroupsComponent,
    SavingsGroupsComponent,
    SavingsMembersListComponent,
    DividendGroupsComponent,
    DividendMembersListComponent,
    LoanGroupsComponent,
    LoansMembersListComponent,
    OrderByPipe,
    DividendComponent,
    DividendCreateComponent,
    AdmindashboardComponent,
    GroupReportComponent,
    BranchReportComponent,
    MembershipManagerComponent,
    GroupManagerComponent,
    LogComponent,
    LoanrepayComponent,
    SysManagerComponent,
    MemberReportComponent,
    LoanReviewComponent,
    LoanDetailsComponent,
    SavingsDetailsComponent,
    PrintTemplateComponent,
    GroupReportsComponent,
    BranchReportDetsComponent,
    GroupReportDetsComponent,
    MemberReportDetsComponent,
    RecordsBfComponent,
    RecordsComponent,
    ImageUploadComponent,
    LoanUpdateComponent,
    BranchNewLoansComponent,
    BranchAcceptedLoansComponent,
    BranchDeclinedLoansComponent,
    BranchDefaultedLoansComponent,
    BranchLoansComponent,
    GroupLoansComponent,
    MemberLoansComponent,
    GroupDefaultedLoansComponent,
    GroupDeclinedLoansComponent,
    GroupAcceptedLoansComponent,
    GroupNewLoansComponent,
    UploadComponent,
    RecordsBfUpdateComponent,
    LogoutModalComponent,
    DividendUpdateComponent,
    AdminCreateHeaderComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    DropdownModule,
    RouterModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' //set defaults  here
    }),
    NgxPrintModule,
    NgxSpinnerModule,
    ChartsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule,
    MatDialogModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatDividerModule,
    MatMenuModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents:[LogoutModalComponent],
  providers: [AuthenticationService, AuthGuard, GroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
