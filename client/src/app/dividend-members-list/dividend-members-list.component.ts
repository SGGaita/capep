import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MemberService } from '../_services/member.service';
import { GroupService } from '../_services/group.service';
import { Title } from '@angular/platform-browser';
import { Member } from '../_models/member';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
    selector: 'app-dividend-members-list',
    templateUrl: './dividend-members-list.component.html',
    styleUrls: ['./dividend-members-list.component.css']
})
export class DividendMembersListComponent implements OnInit {
    pageTitle = "CAPEP KENYA: Dividend: Members list";

    public searchMnumber: string;
    public searchMname: string;
    group_id: number;
    member: Member;
    members: Member[]
    errorMsg: any;
    group: any;
    interval:  any;
    _membership_count: number;

    constructor(private spinner: NgxSpinnerService,private title: Title, private route: ActivatedRoute, private router: Router, private memberService: MemberService, private groupService: GroupService) { }

    ngOnInit() {
        //refresh component
        /**this.interval = setInterval(() => {
            this.getGroupMembership();
            this.loadGroup();
            console.log("Random values", Math.floor(Math.random() * 20))
        }, 5000);*/

        this.title.setTitle(this.pageTitle);
        this.spinner.show()
        this.getGroupMembership();
        this.loadGroup();
    }

    getGroupMembership() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            let id = parseInt(params.get('id'));
            this.memberService.getMemberByGId(id)
                .subscribe(data => {
                    this.members = data;
                    console.log("this members", this.members)
                    this._membership_count = this.members.length
                    console.log("membership", this._membership_count)
                    this.spinner.hide()
                },
                    //display a failure error
                    error => {
                        this.errorMsg = error;
                        console.log("this error", this.errorMsg)
                    }

                )
        });
    }

    loadGroup() {

        this.route.paramMap.subscribe((params: ParamMap) => {
            let id = parseInt(params.get('id'));
            this.group_id = id;
            //console.log(this.group_id);
            this.groupService.getGroupById(this.group_id)
                .subscribe(m => {
                    this.group = m;
                },
                    //display a failure error
                    error => { this.errorMsg = error; });
        });
    };

    onSelect(member) {
        //this.router.navigate(['/branch', branch.branch_id]);  
        this.router.navigate(['../../dividend/create/', member.member_id], { relativeTo: this.route });
    };

    onSelectHistory(member) {
        //this.router.navigate(['/branch', branch.branch_id]);
        this.router.navigate(['../../member', member.member_id], { relativeTo: this.route });
    };

    goMembers() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            let id = parseInt(params.get('id'));
            this.router.navigate(['group/mlist', id]);
        });
    }

    goSavings() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            let id = parseInt(params.get('id'));
            this.router.navigate(['group/slist', id]);
        });
    }

    goLoans() {

        this.route.paramMap.subscribe((params: ParamMap) => {
            let id = parseInt(params.get('id'));
            this.router.navigate(['group/llist', id]);
        });
    }

    grouplist() {
        this.router.navigate(['group/dgroups']);
    };

    //refresh list
    refresh() {
        this.ngOnInit()
    }

}
