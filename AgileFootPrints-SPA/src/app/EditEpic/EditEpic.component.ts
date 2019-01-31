import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditProjectComponent } from '../editProject/editProject.component';

@Component({
  selector: 'app-editepic',
  templateUrl: './EditEpic.component.html',
  styleUrls: ['./EditEpic.component.css']
})
export class EditEpicComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditEpicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log(this.data);
  }

  close() {
    this.dialogRef.close(null);
  }
  save() {
    this.dialogRef.close(this.data.epic);
  }
}
