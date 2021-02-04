import { Component, OnInit } from "@angular/core";
import { Group } from "../_models/group";
import { Title } from "@angular/platform-browser";
import { GroupService } from "../_services/group.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-dividend-groups",
  templateUrl: "./dividend-groups.component.html",
  styleUrls: ["./dividend-groups.component.css"]
})
export class DividendGroupsComponent implements OnInit {
  pageTitle = "CAPEP KENYA : Dividend : Groups list";

  public searchText: string;
  public searchGname: string;
  public searchGcode: string;

  group: Group;
  groups: Group[];
  errorMsg: any;

  constructor(
    private title: Title,
    private groupService: GroupService,
    private router: Router,
    private route: ActivatedRoute, 
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    
    this.spinner.show()
    this.groupService.getGroup().subscribe(groups => {
      this.groups = groups;
      this.spinner.hide()
    }, error => this.errorMsg = error);
  }

  onSelect(group) {
    //this.router.navigate(['/branch', branch.branch_id]);
    this.router.navigate(["../dlist", group.group_id], {
      relativeTo: this.route
    });
  }

  goSavings() {
    this.router.navigate(["group/sgroups"]);
  }

  goLoans() {
    this.router.navigate(["group/lgroups"]);
  }
  goMembers() {
    this.router.navigate(["group/mgroups"]);
  }
}
