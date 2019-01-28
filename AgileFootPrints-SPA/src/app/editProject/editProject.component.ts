import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-editproject',
  templateUrl: './editProject.component.html',
  styleUrls: ['./editProject.component.css']
})
export class EditProjectComponent implements OnInit {
  project: any = {};
  projectForm: FormGroup;
  status = [];

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.project = this.data.project;

    console.log(this.project);
  }

  save() {
    this.dialogRef.close(this.project);
  }
  close() {
    this.dialogRef.close(null);
  }
}
