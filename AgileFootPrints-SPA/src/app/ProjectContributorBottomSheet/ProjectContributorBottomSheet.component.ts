import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-projectcontributorbottomsheet',
  templateUrl: './ProjectContributorBottomSheet.component.html',
  styleUrls: ['./ProjectContributorBottomSheet.component.css']
})
export class ProjectContributorBottomSheetComponent implements OnInit {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<
      ProjectContributorBottomSheetComponent
    >
  ) {}
  userData: any;
  space = ' ';
  projectId: string;
  ngOnInit() {
    // this.projectId = localStorage.getItem('projectId');
    console.log(this.data);
    this.userData = this.data;
  }

  invite() {
    this.userData = {};
    this.projectId = localStorage.getItem('projectId');
    this.userData.projectId = +this.projectId;
    this.bottomSheetRef.dismiss(this.userData);
  }
  close() {
    this.bottomSheetRef.dismiss(null);
  }
}
