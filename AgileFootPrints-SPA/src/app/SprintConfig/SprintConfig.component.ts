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
  constructor(
    public dialogRef: MatDialogRef<SprintConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  save() {
    // tslint:disable-next-line:prefer-const
    let sprintDates = [this.starts, this.ends];
    this.dialogRef.close(sprintDates);
  }
  close() {
    this.dialogRef.close(null);
  }
}
