import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditEpicComponent } from '../EditEpic/EditEpic.component';

@Component({
  selector: 'app-newepic',
  templateUrl: './NewEpic.component.html',
  styleUrls: ['./NewEpic.component.css']
})
export class NewEpicComponent implements OnInit {
  epicModel: any = {};
  constructor(
    public dialogRef: MatDialogRef<NewEpicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  create() {
    this.dialogRef.close(this.epicModel);
  }
  close() {
    this.dialogRef.close(null);
  }
}
