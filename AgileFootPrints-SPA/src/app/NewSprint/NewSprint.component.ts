import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewStoryComponent } from '../newStory/newStory.component';

@Component({
  selector: 'app-newsprint',
  templateUrl: './NewSprint.component.html',
  styleUrls: ['./NewSprint.component.css']
})
export class NewSprintComponent implements OnInit {
  sprintName: string;
  constructor(
    public dialogRef: MatDialogRef<NewSprintComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  save() {
    this.dialogRef.close(this.sprintName);
  }
  close() {
    this.dialogRef.close(null);
  }
}
