import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-subnavbar',
  templateUrl: './subNavBar.component.html',
  styleUrls: ['./subNavBar.component.css']
})
export class SubNavBarComponent implements OnInit {
  @Input() epics = [];

  constructor() {}

  ngOnInit() {
    console.log(this.epics);
  }
}
