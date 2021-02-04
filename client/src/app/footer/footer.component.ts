import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  today_date = new Date();
  _year: number;

  constructor() { }

  ngOnInit() {

    this._year = this.today_date.getFullYear()
  }

}
