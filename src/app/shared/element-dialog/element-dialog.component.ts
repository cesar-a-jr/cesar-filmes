import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MovieElement } from 'src/app/dashboard/dashboard.component';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css']
})
export class ElementDialogComponent implements OnInit {
  element!: MovieElement;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: MovieElement,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
  ) {}


  ngOnInit(): void {
    if (this.data.title.length > 1){
      this.isChange = true;
    } else {
      this.isChange = false;
    }
    console.log(this.isChange)
  }

  onCacelar(): void {
    this.dialogRef.close();
  }
}
