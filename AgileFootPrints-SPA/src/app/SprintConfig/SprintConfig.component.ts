import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-sprintconfig',
  templateUrl: './SprintConfig.component.html',
  styleUrls: ['./SprintConfig.component.css']
})
export class SprintConfigComponent implements OnInit {
  public dateTimeRange: Date[];
  errorState: string;
  constructor(
    public dialogRef: MatDialogRef<SprintConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  save() {
    this.dialogRef.close(this.dateTimeRange);
  }
  close() {
    this.dialogRef.close(null);
  }
}
