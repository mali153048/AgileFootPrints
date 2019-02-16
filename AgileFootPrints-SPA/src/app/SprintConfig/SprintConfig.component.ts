import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-sprintconfig',
  templateUrl: './SprintConfig.component.html',
  styleUrls: ['./SprintConfig.component.css']
})
export class SprintConfigComponent implements OnInit {
  minDate = new Date();
  maxDate = new Date(2099, 0, 1);
  starts: Date;
  ends: Date;
  message: string;
  errorState: string;
  sprinDates = {
    startDate: Date,
    endDate: Date
  };
  constructor(
    public dialogRef: MatDialogRef<SprintConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.sprinDates.startDate = undefined;
    this.sprinDates.endDate = undefined;
  }

  save() {
    // tslint:disable-next-line:prefer-const
    let sprintDates = [this.starts, this.ends];
    console.log('In sprint Config comp', this.sprinDates);
    // this.dialogRef.close(sprintDates);
  }
  close() {
    this.dialogRef.close(null);
  }
}
